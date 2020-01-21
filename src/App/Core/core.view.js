import React, {Suspense, useCallback} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LinearProgress, makeStyles} from '@material-ui/core';
import Header from './Header';
import Menu from './Menu';

const AsyncClientesPage = React.lazy(() => import('./Pages/Clients'));
const AsyncWorkTypesPage = React.lazy(() => import('./Pages/WorkTypes'));
//const AsyncGastosPage = React.lazy(() => import('./Pages/Spends'));
//const AsyncIngresosPage = React.lazy(() => import('./Pages/Ingress'));

const useStyles = makeStyles(theme => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));

const Core = props => {

    const classes = useStyles();

    const [openMenuState, setMenuOpen] = React.useState();

    const openMenu = useCallback(() => setMenuOpen(true), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const Progress = <LinearProgress color='secondary' />;

    return (
        <>
            <Header setMenuOpen={openMenu}/>
            <Menu openMenuState={openMenuState} closeMenu={closeMenu}/>
            <Switch>
                <Route path={'/clientes'} render={
                    () => {
                        return <Suspense fallback={Progress}>
                                    <AsyncClientesPage />
                                </Suspense>    
                    }
                } />
                <Route path={'/tipotrabajos'} render={
                    () => {
                        return <Suspense fallback={Progress}>
                                    <AsyncWorkTypesPage />
                                </Suspense>    
                    }
                } />    
                {/*<Route path={'/gastos'} render={
                    () => {
                        return <Suspense fallback={Progress}>
                                    <AsyncWorkTypesPage />
                                </Suspense>    
                    }
                } />    
                <Route path={'/ingresos'} render={
                    () => {
                        return <Suspense fallback={Progress}>
                                    <AsyncWorkTypesPage />
                                </Suspense>    
                    }
                } />  */}  

                <Redirect to="/" />
            </Switch>
        </>
    );

}
export default Core;