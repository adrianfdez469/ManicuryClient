import React, {useEffect, useState, useMemo} from 'react';
import {useQuery} from 'react-apollo';

import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    makeStyles,
    Tooltip
} from '@material-ui/core';

import moment from 'moment';
import 'moment/locale/es';

import {useProgress} from '../../Generics';
import {DashBoardData} from './dashboardQuery';
import CountUp from 'react-countup';

const AsyncChart = React.lazy(() => import('../Charts'));


const useStyles = makeStyles(theme => ({
    cardGastos: {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.getContrastText(theme.palette.error.light)    
    },
    cardPorciento: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    cardGanancias: {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.getContrastText(theme.palette.info.light)  
    },
    cardIngresos: {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.getContrastText(theme.palette.success.light)  
    }
}));


const ReportSquare = props => {

    const {cardStyle, contentStyle, mainText, concept, childs, mainTextPrefix = '', mainTextSufix = ''} = props;

       

    return <Grid item xs={12}  sm={4} md={4} lg={3}> 
                <Card elevation={0} square className={cardStyle}>
                    <CardContent style={contentStyle}>
                    
                        <Typography variant="h3" style={{textAlign: "right"}}>
                            
                        <CountUp 
                            start={0} 
                            end={mainText}
                            duration={2} 
                            prefix={mainTextPrefix}
                            suffix={mainTextSufix}
                        />
                        </Typography>
                        <Typography variant="subtitle1" style={{textAlign: "right"}}>
                            {concept}
                        </Typography>
                        {childs}
                    </CardContent>            
                </Card>
            </Grid>;
}

const ChartSqueleton = () => {
    return <div style={{ width: "100%", height: "400px", padding: "25px"}}>
                <div style={{ width: "100%", height: "100%", backgroundColor: '#F3F3F3', paddingTop: '20px  ' }}>
                    <Typography variant="h5" color="textSecondary" style={{textAlign: "center", alignItems: 'center'}}>
                        Cargando... 
                    </Typography>
                </div>
            </div>
}

const Dashboard = props => {

    moment.locale('es');
    const lastDate = useMemo(() => moment(), []);
    const firstDate = useMemo(() => moment(lastDate).subtract(1, 'month'), [lastDate]);

    const [mounted, setMounted] = useState(true)

    const {data, loading, refetch, error } = useQuery(DashBoardData, {variables: {
        before: lastDate,
        after: firstDate
    }});
        
    const [Progress, setShowProgress] = useProgress(false);
    const classes = useStyles();

    useEffect(() => {
        if(loading)
            setShowProgress(true);
        else
            setShowProgress(false);
    }, [loading, setShowProgress]);

    useEffect(() => {
        if(mounted)
            refetch();
        return () => {
            setMounted(false);
        }    
    }, [mounted, refetch]);

    const totalIngresos = data && data.totalIngresses && data.totalIngresses.success ? data.totalIngresses.total : 0; 
    console.log(totalIngresos);
    
    const totalGastos = data && data.totalSpends && data.totalSpends.success ? data.totalSpends.total : 0; 
    const ganancias = totalIngresos - totalGastos;
    const porciento = totalIngresos === 0 ? 0 : ganancias * 100 / totalIngresos;
    
    
    const dataIngresses = data && data.ingresses && data.ingresses.success ? data.ingresses.ingress : [];
    
    const dataMap = new Map();
    let i = 0;
    while(i < dataIngresses.length){
        const dateKey = moment(dataIngresses[i].date).format('L');
        const ingressAmount = dataIngresses[i].ingressAmount;

        if(dataMap.has(dateKey)){
            const ingress = dataMap.get(dateKey).ingressAmount + ingressAmount;
            const date = moment(dataIngresses[i].date).format();
            dataMap.set(dateKey, {
                date: date, ingressAmount: ingress
            })
        }else{
            dataMap.set(dateKey, {
                date: moment(dataIngresses[i].date).format(), 
                ingressAmount: ingressAmount
            });
        }
        i++;
    }


    let currentDate = moment(firstDate);
    const stopDate = moment(lastDate); 
    while(currentDate <= stopDate){
        const dateKey = currentDate.format('L');
        const ingressAmount = 0;

        if(!dataMap.has(dateKey)){
            dataMap.set(dateKey, {
                date: currentDate.format(),
                ingressAmount
            });
        }
        currentDate = moment(currentDate).add(1, 'days');
    }
    
    const acumDataIngress = [...dataMap.values()].sort((a,b) => {
        if(a.date < b.date) return -1
        if(a.date > b.date) return 1;
        return 0;
    });

    const resp = (
        <>
            {Progress}
            
            <Container maxWidth="md">            
                <Grid container spacing={2} style={{marginTop: 10}}>
                    <ReportSquare 
                        cardStyle={classes.cardIngresos}
                        mainText={totalIngresos}
                        mainTextPrefix='$'
                        concept="Ingresos Mes Año"
                    />
                    <ReportSquare 
                        cardStyle={classes.cardGastos}
                        mainText={totalGastos}
                        mainTextPrefix='-$'
                        concept="Gastos Enero 2020"
                    />
                    <ReportSquare 
                        cardStyle={classes.cardGanancias}
                        mainText={ganancias}
                        mainTextPrefix='$'
                        concept="Ganancias Enero 2020"
                    />
                    <ReportSquare 
                        cardStyle={classes.cardPorciento}
                        contentStyle={{paddingBottom: '16px'}}
                        mainTextSufix='%'
                        mainText={porciento}
                        concept="Ganancias Enero 2020"
                        childs={<Tooltip title="85% para llegar al mes con mayor ganancia">
                                    <div style={{height: 7, width: '100%', backgroundColor: 'white'}}>
                                        <div style={{height: 7, width: `${porciento}%`, backgroundColor: '#64b5f6'}}></div>
                                    </div>  
                                </Tooltip>
                        }
                    />
                </Grid>
                {
                <React.Suspense fallback={<ChartSqueleton />}>
                    <AsyncChart 
                        chartIngressDate={acumDataIngress}
                    />
                </React.Suspense>}
        </Container>
      </>
    );

    return error ? <>Error fula</> :resp;

}
export default Dashboard;