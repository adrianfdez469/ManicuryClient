import React from 'react';

import {
    Drawer,
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Divider,
    makeStyles
} from '@material-ui/core'

import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles({
    list: {
      width: 250,
    }
  });

const Menu = props => {

    const {openMenuState, closeMenu} = props;

    const classes = useStyles();

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
            
            <ListItem button >
                <ListItemIcon><GroupIcon /></ListItemIcon>
                <ListItemText primary="Clientes" />
            </ListItem>

            

          </List>
        </div>
      );

    return <Drawer open={openMenuState} onClose={closeMenu}>
        {sideList('left')}
      </Drawer>
    ;

}
export default Menu;