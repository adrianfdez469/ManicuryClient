import React, {useEffect, useState} from 'react';
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

import {useProgress} from '../../Generics';
import {getMonthRange} from '../../Generics'
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

    const date = new Date();
    const {firstDate, lastDate} = getMonthRange(date);

    const [mounted, setMounted] = useState(true)

    const {data, loading, refetch } = useQuery(DashBoardData, {variables: {
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
    const totalGastos = data && data.totalSpends && data.totalSpends.success ? data.totalSpends.total : 0; 
    const ganancias = totalIngresos - totalGastos;
    const porciento = totalIngresos === 0 ? 0 : ganancias * 100 / totalIngresos;
    const dataIngresses = data && data.ingresses && data.ingresses.success ? data.ingresses.ingress : [];
    const dataSpends = data && data.spends && data.spends.success ? data.spends.spend : [];

    return (
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
                {<React.Suspense fallback={<ChartSqueleton />}>
                    <AsyncChart 
                        dataIngresses={dataIngresses} 
                        dataSpends={dataSpends}
                    />
                </React.Suspense>}
        </Container>
      </>
    );

}
export default Dashboard;