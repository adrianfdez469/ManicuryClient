import React, {Suspense, useCallback} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {LinearProgress} from '@material-ui/core';
import Header from './Header';
import Menu from './Menu';

//import Charts from './Pages/Charts';
import Dashboard from './Pages/Dashboard';

const AsyncClientesPage = React.lazy(() => import('./Pages/Clients'));
const AsyncWorkTypesPage = React.lazy(() => import('./Pages/WorkTypes'));
const AsyncGastosPage = React.lazy(() => import('./Pages/Spends'));
const AsyncIngresosPage = React.lazy(() => import('./Pages/Ingress'));

const Core = props => {

    const [openMenuState, setMenuOpen] = React.useState();

    const openMenu = useCallback(() => setMenuOpen(true), []);
    const closeMenu = useCallback(() => setMenuOpen(false), []);

    const Progress = <LinearProgress color='secondary' />;

    return (
        <>
            <Header setMenuOpen={openMenu}/>            
            <Menu openMenuState={openMenuState} closeMenu={closeMenu}/>
            <Switch>
                <Route path={'/'} component={Dashboard} exact/>
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
                <Route path={'/gastos'} render={
                    () => {
                        return <Suspense fallback={Progress}>
                                    <AsyncGastosPage />
                                </Suspense>    
                    }
                } />    
                <Route path={'/ingresos'} render={
                    () => {
                        return <Suspense fallback={Progress}>
                                    <AsyncIngresosPage />
                                </Suspense>    
                    }
                } />  

                <Redirect to="/" />
            </Switch>
        </>
    );

}
export default Core;