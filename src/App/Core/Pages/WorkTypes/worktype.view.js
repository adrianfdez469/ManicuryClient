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

import Row from './worktype/worktypeRow.view';
import AddWorkType from './addworktype.view';
import {getWorkTypes, editWorkTypeMutation, removeWorkTypeMutation} from './worktypeQuerys';



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

const WorkTypeCmp = props => {

    const classes = useStyles();
    const [openAdd, setOpenAdd] = React.useState(false);
    const [editWorktype, setEditWorktype] = React.useState(null);
    const {data, loading, refetch} = useQuery(getWorkTypes);
    
    const [fnSave] = useMutation(editWorkTypeMutation);
    const [fnRemove] = useMutation(removeWorkTypeMutation);
    const [Message, setMessage] = useMessage();
    const [Progress, setShowProgress] = useProgress();


    

    const saveWorktype = (workTypeId, name, price) => {
        setOpenAdd(false);
        setShowProgress(true);
        
        fnSave({
            variables: {
                workTypeId, name, price
            }
        })
        .then(resp => {
            if(!resp.data.upsertWorkType.success)
                return new Error();
            else{
                setMessage("El tipo de trabajo ha sido guardado.", "success");
                setShowProgress(false);
            }
        })
        .then(() => {
            refetch();
        })
        .catch(err => {
            console.log(err);
            setMessage("Ha ocurreido un error. No se ha podido guardar el tipo de trabajo.", "error");
            setShowProgress(false);            
        });
    };

    const removeWorktype = workTypeId => {
        setShowProgress(true);
        fnRemove({variables:{
            workTypeId
        }})
        .then(resp => {
            if(!resp.data.removeWorkType.success)
                return new Error();
            else
                setMessage("El tipo de trabajo ha sido eliminado.", "success"); 
                setShowProgress(false);
        })
        .then(() => {
            refetch();
        })
        .catch(err => {
            console.log(err);
            setMessage("Ocurrio un error eliminando el tipo de trabajo.", "error");
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
                    {data && data.worktypes && data.worktypes.worktype.map(wt => {
                        return <GridItem key={wt.id}>
                                    <Row
                                        worktype={wt}
                                        remove={() => removeWorktype(wt.id)}
                                        edit={() => {
                                            setOpenAdd(true);
                                            setEditWorktype(wt);
                                        }}
                                    />
                                </GridItem>
                    })}                    
                </Grid>
                <CustomFabButton onClick={() => setOpenAdd(true)}/>
                
            </Container>
            <AddWorkType 
                open={openAdd} 
                handleCancel={() => {
                    setOpenAdd(false);
                    setEditWorktype(null);
                }} 
                handleOk={ (id, name, price) => {
                    saveWorktype(id, name, price);
                    setOpenAdd(false);
                    setEditWorktype(null);
                }} 
                edit={editWorktype}/>
            {Message}
    </>

}
export default WorkTypeCmp;