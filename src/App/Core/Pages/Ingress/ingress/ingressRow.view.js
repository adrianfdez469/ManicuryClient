import React from 'react';

import {
    Card,
    CardHeader,
    CardContent,
    Typography,
    Menu,
    MenuItem,
    IconButton,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Tooltip,
    Grid
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {getStringDate} from '../../../Generics';

const useRowStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345,
        height: 200,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0px 5px 10px -1px rgba(0,0,0,0.3), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0 ,0,0,0.12)'
        },
    },
    cardHeader: {
        overflow: 'auto'
    }
}));
  
const Row = props => {

    const {ingress, remove, edit} = props;
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
         <Tooltip title={ingress.workType.category.name +': '+ ingress.workType.name} >
            <Card className={classes.card} >
                <CardHeader
                    action={
                        <IconButton aria-label="settings" onClick={openMenu}>
                            <MoreVertIcon style={{color: ingress.workType.category.color}}/>
                        </IconButton>
                    }
                    title={`${(ingress.workType.name.length > 18) ? ingress.workType.name.substring(0, 18) + '...' : ingress.workType.name}`}                    
                    subheader={
                        <Typography variant="subtitle2" color="textSecondary">
                            {getStringDate(ingress.date)}
                        </Typography>
                    }
                />
                <CardContent className={classes.cardContent}>                    
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6" color="textPrimary" component="p" style={{position:'static'}}>
                                {`Ingreso: $${ingress.ingressAmount}`}
                            </Typography>    
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6" color="textSecondary" component="p" style={{position:'static'}}>
                                {`Propina: $${ingress.tip}`}
                            </Typography>
                        </Grid>
                    </Grid>                    
                    <Typography variant="subtitle1" color="textSecondary" component="p" style={{position:'static'}}>
                        {`Cliente: ${ingress.client ? ingress.client.name : ''}`}
                    </Typography>
                </CardContent>            
            </Card>
        </Tooltip>    
        {Actions}
    </>
    ;

};

export default Row;