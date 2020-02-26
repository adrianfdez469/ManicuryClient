import 'date-fns';
import React, {useEffect, useState, Suspense} from 'react';
import {useQuery} from 'react-apollo';

import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    makeStyles,
    Tooltip,
    Fab
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import TodayIcon from '@material-ui/icons/Today';
import Skeleton from '@material-ui/lab/Skeleton';

import moment from 'moment';
import 'moment/locale/es';

import {useProgress} from '../../Generics';
import {DashBoardData} from './dashboardQuery';
import {getWorkTypeCategories} from '../WorkTypes/worktypeQuerys';
import CountUp from 'react-countup';

import FilterView from './Search/filter.view';
import ChartContainer from '../Charts/chartContainer.view';

const LazyIngressChart = React.lazy(() => import('../Charts/Ingresses/IngressChart.view'));
const LazyWorkTypeChart = React.lazy(() => import('../Charts/Worktypes/worktypesChart.view'));
const LazyCalendar = React.lazy(() => import('../Charts/Days/calendar.view'));


const useStyles = makeStyles(theme => ({
    cardGastos: {
        backgroundColor: theme.palette.error.light,
        color: theme.palette.getContrastText(theme.palette.error.light)    
    },
    cardCantidadGastos: {
        backgroundColor: theme.palette.error.dark,
        color: theme.palette.getContrastText(theme.palette.error.dark)    
    },
    cardPorciento: {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.getContrastText(theme.palette.primary.light)
    },
    cardDias: {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.getContrastText(theme.palette.primary.dark),
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0px 5px 10px -1px rgba(0,0,0,0.5), 0px 1px 1px 0px rgba(0,0,0,0.5), 0px 1px 3px 0px rgba(0 ,0,0,0.5)'
        }
    },
    cardGanancias: {
        backgroundColor: theme.palette.info.light,
        color: theme.palette.getContrastText(theme.palette.info.light)  
    },
    cardIngresos: {
        backgroundColor: theme.palette.success.light,
        color: theme.palette.getContrastText(theme.palette.success.light),
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0px 5px 10px -1px rgba(0,0,0,0.5), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0 ,0,0,0.12)'
        }  
    },
    cardCantidadIngresos: {
        backgroundColor: theme.palette.success.dark,
        color: theme.palette.getContrastText(theme.palette.success.dark),
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0px 5px 10px -1px rgba(0,0,0,0.5), 0px 1px 1px 0px rgba(0,0,0,0.50), 0px 1px 3px 0px rgba(0 ,0,0,0.50)'
        }   
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2)
    }
}));

const ReportDoubleSquare = props => {

    const {cardStyle, contentStyle, 
            
            mainText, mainconcept, mainchilds, 
            mainTextPrefix = '', mainTextSufix = '', 

            middleText, middleconcept, middlechilds, 
            middleTextPrefix = '', middleTextSufix = '', 
            
            secondaryText, secondaryconcept, secondarychilds, 
            secondaryTextPrefix = '', secondaryTextSufix = '', 

            onClick, size = 2} = props;

    return <Grid item xs={12}  sm={size * 4} md={size * 4} lg={size * 3} onClick={onClick}> 
                <Card elevation={0} square className={cardStyle}>
                    <CardContent style={contentStyle}>

                        <Grid
                            container
                            direction="row"
                            justify="space-between"
                            alignItems="baseline"
                        >
                            <Grid item>
                                <Typography variant="h3" style={{textAlign: "left"}}>
                                
                                <CountUp 
                                    start={0} 
                                    end={mainText}
                                    duration={2} 
                                    prefix={mainTextPrefix}
                                    suffix={mainTextSufix}
                                />
                                </Typography>
                                <Typography variant="subtitle1" style={{textAlign: "left"}}>
                                    {mainconcept}
                                </Typography>
                                {mainchilds}
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" style={{textAlign: "center"}}>
                                <CountUp 
                                    start={0} 
                                    end={middleText}
                                    duration={2} 
                                    prefix={middleTextPrefix}
                                    suffix={middleTextSufix}
                                />
                                </Typography>
                                <Typography variant="subtitle1" style={{textAlign: "center"}}>
                                    {middleconcept}
                                </Typography>
                                {middlechilds}
                            </Grid>
                            <Grid item>
                                <Typography variant="h3" style={{textAlign: "right"}}>
                                
                                <CountUp 
                                    start={0} 
                                    end={secondaryText}
                                    duration={2} 
                                    prefix={secondaryTextPrefix}
                                    suffix={secondaryTextSufix}
                                />
                                </Typography>
                                <Typography variant="subtitle1" style={{textAlign: "right"}}>
                                    {secondaryconcept}
                                </Typography>
                                {secondarychilds}
                            </Grid>
                        </Grid>
                    
                        
                    </CardContent>            
                </Card>
            </Grid>;
}

const ReportSquare = props => {

    const {cardStyle, contentStyle, mainText, concept, childs, mainTextPrefix = '', mainTextSufix = '', onClick, size = 1} = props;

    return <Grid item xs={size * 12}  sm={size * 4} md={size * 4} lg={size * 3} onClick={onClick}> 
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

const Dashboard = props => {

    moment.locale('es');
    moment.utc(false);

    const [lastDate, setLastDateSt] = useState(moment());
    const [firstDate, setFirstDateSt] = useState(moment(lastDate).subtract(1, 'month'));
    const [useDates, setUseDate] = useState(true);

    const handleIniDateChange = date => {        
        const formatedDate = date.toISOString();
        setFirstDateSt(moment(formatedDate));
    };
    const handleEndDateChange = date => {
        setLastDateSt(moment(date));
    };

    const [mounted, setMounted] = useState(true)
    const [openedIngress, setOpenedIngress] = useState(false);
    const [openedCantTrabajos, setOpenedCantTrab] = useState(false);
    const [openDays, setOpenDays] = useState(false);
    
    //const [categoryState, setCategoryState] = useState(null);
    const [categoryState, setCategoryState] = useState([]);

    const variables = {
        wtcategoryIds: categoryState
    };
    if(useDates){
        variables.before = moment(lastDate).format('YYYY-MM-DD');
        variables.after =  moment(firstDate).format('YYYY-MM-DD');
    }
    const {data, loading, refetch, error } = useQuery(DashBoardData, {variables: {
        before: useDates ? moment(lastDate).format('YYYY-MM-DD'): undefined,
        after: useDates ? moment(firstDate).format('YYYY-MM-DD'): undefined,
        //wtcategoryIds: categoryState ? [categoryState] : []
        wtcategoryIds: categoryState
    }});
    const {data: wtCategory} = useQuery(getWorkTypeCategories);
    const [filterOpen, setFilterOpen] = useState(false);
    
    const filterHandleClose = () => {
        setFilterOpen(false);
    }
    

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
    }, [mounted, refetch, lastDate, firstDate, useDates, categoryState]);

    const totalIngresos = data && data.totalIngresses && data.totalIngresses.success ? data.totalIngresses.total : 0; 
    
    const totalGastos = data && data.totalSpends && data.totalSpends.success ? data.totalSpends.total : 0; 
    const ganancias = totalIngresos - totalGastos;
    const porciento = totalIngresos === 0 ? 0 : ganancias * 100 / totalIngresos;
    
    
    const dataIngresses = data && data.ingresses && data.ingresses.success ? data.ingresses.ingress : [];
    const dataSpends = data && data.spends && data.spends.success ? data.spends.spend : [];
    const cantIngresses = dataIngresses.length;
    const cantSpends = dataSpends.length;
    
    
    const worksTypeMap = new Map();
    const dataMap = new Map();
    let i = 0;
    while(i < dataIngresses.length){
        const dateKey = moment(dataIngresses[i].date).format('L');
        const ingressAmount = dataIngresses[i].ingressAmount;

        const workTypeKey = dataIngresses[i].workType.id;
        if(worksTypeMap.has(workTypeKey)){
            worksTypeMap.set(workTypeKey, {
                ...worksTypeMap.get(workTypeKey),
                ingress: worksTypeMap.get(workTypeKey).ingress + ingressAmount,
                ammount: worksTypeMap.get(workTypeKey).ammount + 1 
            });
        }else{
            worksTypeMap.set(workTypeKey, {
                id: workTypeKey,
                name: dataIngresses[i].workType.name,
                ingress: ingressAmount,
                ammount: 1
            });
        }

        if(dataMap.has(dateKey)){
            const ingress = dataMap.get(dateKey).ingressAmount + ingressAmount;
            const date = moment(dataIngresses[i].date).toDate();
            dataMap.set(dateKey, {
                date: date, ingressAmount: ingress
            })
        }else{
            dataMap.set(dateKey, {
                date: moment(dataIngresses[i].date).toDate(), 
                ingressAmount: ingressAmount
            });
        }
        i++;
    }

    let diasTrabajados = 0;
    let diasNoTrabajados = 0;
    let currentDate = moment(firstDate);
    const stopDate = moment(lastDate); 
    while(currentDate <= stopDate){
        const dateKey = currentDate.format('L');
        const ingressAmount = 0;

        if(!dataMap.has(dateKey)){
            dataMap.set(dateKey, {
                date: currentDate.toDate(),
                ingressAmount
            });
            diasNoTrabajados++;
        }else{
            diasTrabajados++;
        }
        currentDate = moment(currentDate).add(1, 'days');
    }
    const porcientoDias =  100 *  diasTrabajados / (diasTrabajados + diasNoTrabajados);
    
    const acumDataIngress = [...dataMap.values()].sort((a,b) => {
        if(a.date < b.date) return -1
        if(a.date > b.date) return 1;
        return 0;
    });
    const workTypesQuantity = [...worksTypeMap.values()];

    const resp = (
        <>
            {Progress}            
            <Container maxWidth="md">
                

                <Grid container spacing={2} style={{marginTop: 10}}>
                    <ReportSquare 
                        cardStyle={classes.cardIngresos}
                        mainText={totalIngresos}
                        mainTextPrefix='$'
                        concept="Ingresos"
                        onClick={() => setOpenedIngress(true)}                        
                    />
                    <ReportSquare 
                        cardStyle={classes.cardGastos}
                        mainText={totalGastos}
                        mainTextPrefix='-$'
                        concept="Gastos"
                    />
                    <ReportSquare 
                        cardStyle={classes.cardGanancias}
                        mainText={ganancias}
                        mainTextPrefix='$'
                        concept={ganancias > 0 ? "Ganancias" : "Pérdidas"}
                    />
                    <ReportSquare 
                        cardStyle={classes.cardPorciento}
                        contentStyle={{paddingBottom: '16px'}}
                        mainTextSufix='%'
                        mainText={porciento}
                        concept="Ganancias"
                        childs={<Tooltip title={`${porciento.toFixed(2)}% de ingresos sobre gastos`}>
                                    <div style={{height: 7, width: '100%', backgroundColor: 'white'}}>
                                        <div style={{height: 7, width: `${porciento}%`, backgroundColor: '#64b5f6'}}></div>
                                    </div>  
                                </Tooltip>
                        }
                    />
                    <ReportSquare 
                        cardStyle={classes.cardCantidadIngresos}
                        mainText={cantIngresses}
                        mainTextPrefix=''
                        concept="Trabajos realizados"
                        onClick={() => setOpenedCantTrab(true)}                        
                    />  
                    
                    <ReportSquare 
                        cardStyle={classes.cardCantidadGastos}
                        mainText={cantSpends}
                        concept="Gastos realizados"
                        onClick={() => alert('mostrar')}
                    /> 
                    <ReportDoubleSquare 
                        cardStyle={classes.cardDias}
                        contentStyle={{paddingBottom: '16px'}}
                        mainText={diasTrabajados}
                        mainconcept="Días trabajados"
                        
                        middleText={porcientoDias}
                        middleTextSufix="%"
                        middleconcept="Porciento"
                        middlechilds={<Tooltip title={`${porcientoDias.toFixed(2)}% para de dias trabajados.`}>
                                    <div style={{height: 7, width: '100%', backgroundColor: 'white'}}>
                                        <div style={{height: 7, width: `${porcientoDias}%`, backgroundColor: '#64b5f6'}}></div>
                                    </div>  
                                </Tooltip>
                        }

                        secondaryText={diasNoTrabajados}
                        secondaryconcept="Días no trabajados"

                        onClick={() => setOpenDays(true)}
                        
                    /> 
                </Grid>
                

                <ChartContainer
                    open={openedIngress}
                    handleClose={() => setOpenedIngress(false)}
                    title="Ingresos del período"
                    htmlHelpContent={<>
                        <p>{"En esta gráfica se muestran los ingresos diario/semanles/mensuales/anuales"}</p>
                    </>}
                >
                    <Suspense fallback={
                        <Skeleton width={'100%'} height={500}>
                            <EqualizerIcon style={{width: '100%', height: '100%'}} color="disabled"/>
                        </Skeleton>
                    }>
                        <LazyIngressChart 
                            chartIngressDate={acumDataIngress}
                        />
                    </Suspense>
                </ChartContainer>

                <ChartContainer
                    open={openedCantTrabajos}
                    handleClose={() => setOpenedCantTrab(false)}
                    title="Tipos de trabajos"
                    htmlHelpContent={<>
                        <ul>
                            <li><b>{"Gráfica por ingresos"}</b><br/>{"En esta gráfica se muestran por cada tipo de trabajo los ingresos realizados"}</li>
                            <li><b>{"Gráfica por cantidades"}</b><br/>{"En esta gráfica se muestran por cada tipo de trabajo la cantidad realizada"}</li>
                        </ul>
                    </>}
                >
                    <Suspense fallback={
                        <Skeleton width={'100%'} height={500}>
                            <EqualizerIcon style={{width: '100%', height: '100%'}} color="disabled"/>
                        </Skeleton>
                    }>
                        <LazyWorkTypeChart 
                            workTypesQuantity={workTypesQuantity}                        
                        />                    
                    </Suspense>
                </ChartContainer>


                <ChartContainer
                    open={openDays}
                    handleClose={() => setOpenDays(false)}
                    title="Dias trabajados y no trabajados"
                    htmlHelpContent={<>
                        <p>{"En este calendario se muestran los dias trabajados y no trabajados en el mes seleccionado."}</p>
                        <p>{"En cada dia aparecen cada uno de los trabajos realizados. Para conocer más pase el ratón sobre estos."}</p>
                    </>}
                >
                    <Suspense fallback={
                        <Skeleton width={'100%'} height={500} style={{maxWidth: '900px', margin: '40px auto'}}>
                            <TodayIcon style={{width: '100%', height: '100%'}} color="disabled"/>
                        </Skeleton>
                    }>
                        <LazyCalendar 
                            data={dataIngresses}
                            start={useDates ? moment(firstDate).format('YYYY-MM-DD') : undefined}
                            end={useDates ? moment(lastDate).format('YYYY-MM-DD') : undefined}
                        />
                    </Suspense>
                </ChartContainer>
                
            </Container>
        
        
            <Fab 
                aria-label='Buscar' 
                className={classes.fab} 
                color="primary"
                onClick={() => setFilterOpen(true)}
                size='medium'
            >
                <SearchIcon />    
            </Fab>
        
        
        <FilterView 
            open={filterOpen}
            handleClose={filterHandleClose}

            firstDate={firstDate}
            handleIniDateChange={handleIniDateChange}
            lastDate={lastDate}
            handleEndDateChange={handleEndDateChange}
            useDates={useDates}
            setUseDate={setUseDate}
            categoryState={categoryState}
            setCategoryState={setCategoryState}
            wtCategory={wtCategory}
        />
      </>
    );

    return error ? <>Error...</> :resp;

}
export default Dashboard;