import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import {
    Drawer,
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Divider,
    Typography,
    makeStyles
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home';
import GroupIcon from '@material-ui/icons/Group';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import MoneyOffIcon from '@material-ui/icons/MoneyOff';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
const useStyles = makeStyles({
    list: {
      width: 250,
    }
  });

const Menu = props => {

    const {openMenuState, closeMenu, location} = props;

    const classes = useStyles();

    const selectedLink = {
      inicio: {
        icon: location.pathname === '/' && {color: "primary"},
        text: location.pathname === '/' || {color:"textPrimary"} 
      },
      clientes: {
        icon: location.pathname === '/clientes' && {color: "primary"},
        text: location.pathname === '/clientes' || {color:"textPrimary"} 
      },
      tipotrabajos: {
        icon: location.pathname === '/tipotrabajos' && {color: "primary"},
        text: location.pathname === '/tipotrabajos' || {color:"textPrimary"} 
      },
      gastos: {
        icon: location.pathname === '/gastos' && {color: "primary"},
        text: location.pathname === '/gastos' || {color:"textPrimary"} 
      },
      ingresos: {
        icon: location.pathname === '/ingresos' && {color: "primary"},
        text: location.pathname === '/ingresos' || {color:"textPrimary"} 
      }
    } 

    const sideList = side => (
        <div
          className={classes.list}
          role="presentation"
          onClick={closeMenu}
          onKeyDown={closeMenu}
        >
          <List>
            <Divider />
            <ListItem >
                <ListItemText primary="Menú" />
            </ListItem>
            <Divider />
            
            <Link to="/" style={{textDecoration:"none"}}>
              <ListItem button>
                  <ListItemIcon><HomeIcon {...selectedLink.inicio.icon}/></ListItemIcon>
                  <ListItemText>
                      <Typography {...selectedLink.inicio.text}>
                          Inicio
                      </Typography>
                  </ListItemText>
              </ListItem>
            </Link>

            <Link to="/clientes" style={{textDecoration:"none"}}>
              <ListItem button>
                  <ListItemIcon><GroupIcon {...selectedLink.clientes.icon}/></ListItemIcon>
                  <ListItemText>
                      <Typography {...selectedLink.clientes.text}>
                          Clientes
                      </Typography>
                  </ListItemText>
              </ListItem>
            </Link>

            <Link to="/tipotrabajos" style={{textDecoration:"none"}}>
              <ListItem button>
                  <ListItemIcon><AccountTreeIcon {...selectedLink.tipotrabajos.icon}/></ListItemIcon>
                  <ListItemText>
                      <Typography {...selectedLink.tipotrabajos.text}>
                          Tipos de trabajo
                      </Typography>
                  </ListItemText>
              </ListItem>
            </Link>

            <Link to="/gastos" style={{textDecoration:"none"}}>
              <ListItem button>
                  <ListItemIcon><MoneyOffIcon {...selectedLink.gastos.icon}/></ListItemIcon>
                  <ListItemText>
                      <Typography {...selectedLink.gastos.text}>
                          Gastos
                      </Typography>
                  </ListItemText>
              </ListItem>
            </Link>

            <Link to="/ingresos" style={{textDecoration:"none"}}>
              <ListItem button>
                  <ListItemIcon><AttachMoneyIcon {...selectedLink.ingresos.icon}/></ListItemIcon>
                  <ListItemText>
                      <Typography {...selectedLink.ingresos.text}>
                        Ingresos
                      </Typography>
                  </ListItemText>
              </ListItem>
            </Link>
            

          </List>
        </div>
      );

    return <Drawer open={openMenuState} onClose={closeMenu}>
        {sideList('left')}
      </Drawer>
    ;

}
export default withRouter(Menu);