import React from 'react';
import {
    Fab,
    makeStyles,    
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

const CustomFabButton = props => {

    const {onClick} = props;

    const classes = useStyles();

    return <Fab 
                aria-label='Adicionar' 
                className={classes.fab} 
                color="primary"
                onClick={onClick}
            >
                <AddIcon />
        </Fab>;

}
export {CustomFabButton};