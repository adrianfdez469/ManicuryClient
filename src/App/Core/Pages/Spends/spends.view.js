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

import Row from './Spend/spendRow.view';
import AddSpend from './addSpend.view';
import {getSpends, editSpendMutation, removeSpendMutation} from './spendQuerys';



const useStyles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)        
    }
}));

const GridItem = props => {
    return <Grid item xs={12}  sm={6} md={6} lg={4}>                    
                {props.children}
            </Grid>
};

const SpendCmp = props => {

    const classes = useStyles();
    const [openAdd, setOpenAdd] = React.useState(false);
    
    const [editSpend, setEditSpend] = React.useState(null);
    const {data, loading, refetch, error} = useQuery(getSpends, {
        variables: {
            start: 0, limit: 20
        }
    });
    
    const [fnSave] = useMutation(editSpendMutation);
    const [fnRemove] = useMutation(removeSpendMutation);
    const [Message, setMessage] = useMessage();
    const [Progress, setShowProgress] = useProgress();


    

    const saveSpend = (spendId, spendtype, spendammount, date) => {
        setOpenAdd(false);
        setShowProgress(true);
        fnSave({
            variables: {
                spendId, spendtype, spendammount, date
            }
        })
        .then(resp => {
            if(!resp.data.upsertSpend.success)
                throw new Error();
            else{
                setMessage("El gasto ha sido guardado.", "success");
                setShowProgress(false);
            }
        })
        .then(() => {
            refetch();
        })
        .catch(err => {
            setMessage("Ha ocurreido un error. No se ha podido salvar el gasto.", "error");
            setShowProgress(false);            
        });
    };

    const removeSpend = spendId => {
        setShowProgress(true);
        fnRemove({variables:{
            spendId
        }})
        .then(resp => {
            if(!resp.data.removeSpend.success)
                throw new Error();
            else
                setMessage("El gasto ha sido eliminado.", "success"); 
                setShowProgress(false);
        })
        .then(() => {
            refetch();
        })
        .catch(err => {
            //console.log(err);
            setMessage("Ocurrio un error eliminando el gasto.", "error");
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
            setMessage("Ocurrio un error al intentar cargar los datos.", "error");
        }
    }, [error, setMessage]);

    return <>
        {Progress}
        <CssBaseline />
            <Container maxWidth="md" className={classes.container}>
                
                <Grid container spacing={2}>
                    {data && data.spends && data.spends.spend.map(spend => {
                        return <GridItem key={spend.id}>
                                    <Row
                                        spend={spend}
                                        remove={() => removeSpend(spend.id)}
                                        edit={() => {
                                            setOpenAdd(true);
                                            setEditSpend(spend);
                                        }}
                                    />
                                </GridItem>
                    })}                    
                </Grid>
                <OpenIconSpeedDial actions={
                    [{
                        icon: <AddIcon />,
                        name: "Adicionar gasto",
                        onClick: () => setOpenAdd(true)
                    },{
                        icon: <SearchIcon />,
                        name: "Buscar gasto",
                        onClick: () => alert("Abrir interfaz para buscar gasto")
                    }]
                }/>
                
            </Container>
            <AddSpend
                open={openAdd} 
                handleCancel={() => {
                    setOpenAdd(false);
                    setEditSpend(null);
                }} 
                handleOk={ (spendId, spendtype, spendammount, date) => {
                    saveSpend(spendId, spendtype, spendammount, date);
                    setOpenAdd(false);
                    setEditSpend(null);
                }} 
                edit={editSpend}
                
            />
            {Message}
    </>

}
export default SpendCmp;