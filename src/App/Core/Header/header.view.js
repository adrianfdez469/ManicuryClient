import React, {useContext} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    makeStyles,
    Avatar,
    CssBaseline
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {LoginContext} from '../../Login/login.model';
import { green } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    avatar: {
      backgroundColor: green[400],
  }
  }));

 

const Menu = props => {

    const {setMenuOpen} = props;
    const [loginState] = useContext(LoginContext);

    const classes = useStyles();

    return (
        <>
         <CssBaseline />  
            <AppBar position="sticky">
              <Toolbar>
                <IconButton 
                  edge="start" 
                  className={classes.menuButton} 
                  color="inherit" 
                  aria-label="menu"
                  onClick={setMenuOpen}>
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  Manicury
                </Typography>              
                  <div>
                      <Avatar 
                        className={classes.avatar}
                        alt={loginState.username.toUpperCase()}
                        srcSet={loginState.username.toUpperCase()}
                      />
                  </div>              
              </Toolbar>
            </AppBar>          
        </>
      );

}
export default Menu;