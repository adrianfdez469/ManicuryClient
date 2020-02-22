import React, { useEffect } from 'react';
import {useMutation, useQuery} from 'react-apollo';
import {
    Container,
    CssBaseline,
    Grid,
    makeStyles    
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

import {OpenIconSpeedDial, useMessage, useProgress} from '../../Generics';

import Row from './ingress/ingressRow.view';
import AddIngress from './addingress.view';
import {editIngressMutation, getIngresses, removeIngressMutation} from './ingressQuerys';



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

const IngressCmp = props => {

    const classes = useStyles();
    const [openAdd, setOpenAdd] = React.useState(false);
    const [editIngress, setEditIngress] = React.useState(null);
    const {data, loading, refetch, error} = useQuery(getIngresses, {variables: {
        start: 0, limit: 20
    }});
    
    const [fnSave] = useMutation(editIngressMutation);
    const [fnRemove] = useMutation(removeIngressMutation);
    const [Message, setMessage] = useMessage();
    const [Progress, setShowProgress] = useProgress();


    const saveIngress = (ingressId, worktypeId, clientId, ingressAmmount, tip, date) => {
        setOpenAdd(false);
        
        setShowProgress(true);
        fnSave({
            variables: {
                ingressId,
                worktypeId,
                clientId,
                ammount: ingressAmmount,
                tip,
                date
            }
        })
        .then(resp => {
            if(!resp.data.upsertIngress.success)
                throw new Error();
            else{
                setMessage("El ingreso ha sido guardado.", "success");
                setShowProgress(false);
            }
        })
        .then(() => {
            refetch();
        })
        .catch(err => {
            //console.log(err);
            setMessage("Ha ocurreido un error. No se ha podido salvar el ingreso.", "error");
            setShowProgress(false);            
        });
    };

    const removeIngress = ingressId => {
        setShowProgress(true);
        fnRemove({variables:{
            ingressId
        }})
        .then(resp => {
            if(!resp.data.removeIngress.success)
                throw new Error();
            else
                setMessage("El ingreso ha sido eliminado.", "success"); 
                setShowProgress(false);
        })
        .then(() => {
            refetch();
        })
        .catch(err => {
            //console.log(err);
            setMessage("Ocurrio un error eliminando el ingreso.", "error");
            setShowProgress(false);            
        });
    };


    useEffect(() => {
        if(loading)
            setShowProgress(true);
        else
            setShowProgress(false);
    }, [loading, setShowProgress]);

    useEffect(() => {
        if(error){
            //console.log(error);
            setMessage("Ocurrio un error al intentar cargar los datos.", "error");
        }
    }, [error, setMessage]);

    return <>
        {Progress}
        <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                
                <Grid container spacing={2}>
                    {data && data.ingresses && data.ingresses.ingress.map(ingress => {
                        return <GridItem key={ingress.id}>
                                    <Row
                                        ingress={ingress}
                                        remove={() => removeIngress(ingress.id)}
                                        edit={() => {
                                            setOpenAdd(true);
                                            setEditIngress(ingress);
                                        }}
                                    />
                                </GridItem>
                    })}                    
                </Grid>
                <OpenIconSpeedDial actions={
                    [{
                        icon: <AddIcon />,
                        name: "Adicionar cliente", 
                        onClick:() => setOpenAdd(true)
                    },{
                        icon: <SearchIcon />,
                        name: "Buscar cliente",
                        onClick:() => alert("TODO: Buscar cliente")
                    }]
                }/>

                
            </Container>
            <AddIngress 
                open={openAdd} 
                handleCancel={() => {
                    setOpenAdd(false);
                    setEditIngress(null);
                }} 
                handleOk={ (ingressId, worktypeId, clientId, ingressAmmount, tip, date) => {
                    saveIngress(ingressId, worktypeId, clientId, ingressAmmount, tip, date);
                    setOpenAdd(false);
                    setEditIngress(null);
                }}
                edit={editIngress}
                
            />
            {Message}
    </>

}
export default IngressCmp;