import React from 'react';
import {
    Card,
    CardHeader,
    Avatar,
    Menu,
    MenuItem,
    IconButton,
    ListItemIcon,
    ListItemText,
    makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { green } from '@material-ui/core/colors';

const useRowStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        height: 150         
    },
    cardHeader: {
        overflow: 'auto'
    },
    avatar: {
        backgroundColor: green[500]
    }
}));
  
const Row = props => {

    const {worktype, remove, edit} = props;
    const classes = useRowStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = event => {
        setAnchorEl(event.target);
    }
    const isMenuOpen = !!anchorEl;
    const handleMenuClose = () => {
        setAnchorEl(null);
    }
    const Actions = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}        
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >

            <MenuItem onClick={() => {
                 handleMenuClose();
                 edit();
            }}>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Modificar" />
            </MenuItem>

            <MenuItem onClick={() => {
                 handleMenuClose();
                 remove();
            }}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Eliminar" />
            </MenuItem>
        </Menu>
    );

    return <>        
        <Card className={classes.card}>
            <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                    {worktype.name[0]}
                </Avatar>
            }
            action={
                <IconButton aria-label="settings" onClick={openMenu}>
                    <MoreVertIcon />
                </IconButton>
            }
            title={worktype.name}
            subheader={worktype.price}
            />      
        </Card>
        {Actions}
    </>
    ;

};

export default Row;