import React from 'react';

import {
    Container,
    CssBaseline,
    Card,
    CardHeader,
    Avatar,
    CardContent,
    Typography,
    Grid,
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
import { red } from '@material-ui/core/colors';
import {CustomFabButton} from '../../Generics';


const useRowStyles = makeStyles(theme => ({
    card: {
        maxWidth: 345        
    },
    cardHeader: {
        overflow: 'auto'
    },
    avatar: {
        backgroundColor: red[500],
    }
}));
  


const Row = props => {

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
             <MenuItem>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Eliminar" />
            </MenuItem>
             <MenuItem>
                <ListItemIcon>
                    <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Modificar" />
            </MenuItem>
        </Menu>
    );

    return <>        
        <Card className={classes.card}>
            <CardHeader
            avatar={
                <Avatar aria-label="recipe" className={classes.avatar}>
                R
                </Avatar>
            }
            action={
                <IconButton aria-label="settings" onClick={openMenu}>
                    <MoreVertIcon />
                </IconButton>
            }
            title="Shrimp and Chorizo Paella"
            subheader="September 14, 2016"
            />
            <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
            </Typography>
            </CardContent>            
        </Card>
        {Actions}
        
    </>
    ;

};

const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1),       
        backgroundColor: theme.palette.background.paper,
        height: '100vh'        
    }
}));

const GridItem = props => {
    return <Grid item xs={12}  sm={6} md={6} lg={4}>                    
                {props.children}
            </Grid>
};

const ClienteCmp = props => {

    const classes = useStyles();

    return <>
        <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                
                <Grid container spacing={2}>
                    <GridItem>
                        <Row />        
                    </GridItem>
                    <GridItem>
                        <Row />        
                    </GridItem>
                    <GridItem>
                        <Row />        
                    </GridItem>
                    <GridItem>
                        <Row />        
                    </GridItem>
                    <GridItem>
                        <Row />        
                    </GridItem>
                    <GridItem>
                        <Row />        
                    </GridItem>
                    <GridItem>
                        <Row />        
                    </GridItem>
                    <GridItem>
                        <Row />        
                    </GridItem>
                </Grid>



                <CustomFabButton />
                
            </Container>
    </>

}
export default ClienteCmp;