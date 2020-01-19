import React, {Suspense, useCallback} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {CircularProgress, Backdrop, makeStyles} from '@material-ui/core';
import Header from './Header';
import Menu from './Menu';

const AsyncClientesPage = React.lazy(() => import('./Pages/Clients'));

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


    return (
        <>
            <Header setMenuOpen={openMenu}/>
            <Menu openMenuState={openMenuState} closeMenu={closeMenu}/>
            <Switch>
                <Route path={'/clientes'} render={
                    () => {
                        return <Suspense fallback={
                            <Backdrop unmountOnExit open className={classes}>
                                <CircularProgress />
                            </Backdrop>
                        }><AsyncClientesPage /></Suspense>    
                    }
                } />
                <Redirect to="/" />
            </Switch>
        </>
    );

}
export default Core;