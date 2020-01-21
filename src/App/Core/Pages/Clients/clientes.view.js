import React, { useEffect } from 'react';
import {useMutation, useQuery} from 'react-apollo';
import {
    Container,
    CssBaseline,
    Grid,
    makeStyles    
} from '@material-ui/core';

import {CustomFabButton} from '../../Generics';

import useMessage from '../../Generics/messageAPI';
import useProgress from '../../Generics/progressAPI';

import Row from './client/clientRow.view';
import AddClient from './addcliente.view';
import {editClientMutation, getClients, removeClientMutation} from './clientQuerys';



const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1),       
        //backgroundColor: theme.palette.background.paper,
        //height: '100vh'        
    }
}));

const GridItem = props => {
    return <Grid item xs={12}  sm={6} md={6} lg={4}>                    
                {props.children}
            </Grid>
};

const ClienteCmp = props => {

    const classes = useStyles();
    const [openAdd, setOpenAdd] = React.useState(false);
    const [editClient, setEditClient] = React.useState(null);
    const {data, loading, refetch} = useQuery(getClients);
    
    const [fnSave] = useMutation(editClientMutation);
    const [fnRemove] = useMutation(removeClientMutation);
    const [Message, setMessage] = useMessage();
    const [Progress, setShowProgress] = useProgress();


    

    const saveClient = (clientId, nombre, telefono, direccion) => {
        setOpenAdd(false);
        setShowProgress(true);
        fnSave({
            variables: {
                clientId, nombre, telefono, direccion
            }
        })
        .then(resp => {
            if(!resp.data.upsertClient.success)
                return new Error();
            else{
                setMessage("El cliente ha sido guardado.", "success");
                setShowProgress(false);
            }
        })
        .then(() => {
            refetch();
        })
        .catch(err => {
            console.log(err);
            setMessage("Ha ocurreido un error. No se ha podido salvar el cliente.", "error");
            setShowProgress(false);            
        });
    };

    const removeClient = clientId => {
        setShowProgress(true);
        fnRemove({variables:{
            clientId
        }})
        .then(resp => {
            if(!resp.data.removeClient.success)
                return new Error();
            else
                setMessage("El cliente ha sido eliminado.", "success"); 
                setShowProgress(false);
        })
        .then(() => {
            refetch();
        })
        .catch(err => {
            console.log(err);
            setMessage("Ocurrio un error eliminando el cliente.", "error");
            setShowProgress(false);            
        });
    };


    useEffect(() => {
        if(loading)
            setShowProgress(true);
        else
            setShowProgress(false);
    }, [loading, setShowProgress]);

    return <>
        {Progress}
        <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                
                <Grid container spacing={2}>
                    {data && data.clients && data.clients.client.map(cli => {
                        return <GridItem key={cli.id}>
                                    <Row
                                        client={cli}
                                        remove={() => removeClient(cli.id)}
                                        edit={() => {
                                            setOpenAdd(true);
                                            setEditClient(cli);
                                        }}
                                    />
                                </GridItem>
                    })}                    
                </Grid>
                <CustomFabButton onClick={() => setOpenAdd(true)}/>
                
            </Container>
            <AddClient 
                open={openAdd} 
                handleCancel={() => {
                    setOpenAdd(false);
                    setEditClient(null);
                }} 
                handleOk={ (clientId, nombre, telefono, direccion) => {
                    saveClient(clientId, nombre, telefono, direccion);
                    setOpenAdd(false);
                    setEditClient(null);
                }} 
                edit={editClient}
                
            />
            {Message}
    </>

}
export default ClienteCmp;