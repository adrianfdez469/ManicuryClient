import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    makeStyles
} from '@material-ui/core';

import {useQuery} from 'react-apollo';

import {NumberInput} from '../../Generics';
import useWorktype from './useWorktype';

import {getWorkTypeCategories} from './worktypeQuerys';

const useStyles = makeStyles(theme => ({
    formControl: {
      //margin: theme.spacing(1),
      minWidth: 120,
      width: '100%',
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(0.5)
    },
    selectEmpty: {
      //marginTop: theme.spacing(2),
    }
  }));

const AddWorkType = props => {

    const classes = useStyles();

    const {handleOk, handleCancel, open, edit} = props;

    const {data} = useQuery(getWorkTypeCategories);
    
    const {useCategoryState, useNameState, usePriceState} = useWorktype();
    
    const [categoryState, setCategory] = useCategoryState;
    const [nameState, setName] = useNameState;
    const [priceState, setPrice] = usePriceState;
    

    React.useEffect(() => {
        if(edit){
            setCategory(edit.category.id)
            setName(edit.name);
            setPrice(edit.price);
        }else{
            setCategory(null)
            setName('');
            setPrice(0);
        }

    }, [open, edit, setName, setPrice, setCategory, data]);

    return <Dialog 
                open={open} 
                onClose={handleCancel} 
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Adicionar tipo de trabajo</DialogTitle>
                <DialogContent>

                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="categoria">Categoria</InputLabel>
                        <Select
                            autoFocus   
                            labelId="categoria"
                            id="categoria-placeholder"
                            value={categoryState}
                            onChange={event => setCategory(event.target.value)}
                            displayEmpty
                            className={classes.selectEmpty}
                        >                            
                            {
                                data && data.worktypecategory && data.worktypecategory.worktypecategory.map(wtc => {
                                    return <MenuItem value={wtc.id} key={wtc.id}>
                                        <Grid container>
                                            <div style={{backgroundColor: wtc.color, margin: '0 1rem', width: "1rem", height: "1rem", borderRadius: "50%"}} />
                                            {wtc.name}
                                        </Grid>
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>

                    <TextField
                        margin="dense"
                        label="Nombre"
                        type="text"
                        fullWidth
                        value={nameState}
                        onChange={event => setName(event.target.value)}
                        
                    />
                    <NumberInput 
                        handleChange={event => setPrice(+event.target.value)}
                        value={priceState}
                        label="Precio"
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => handleOk( 
                                            (edit) && edit.id,
                                            categoryState,
                                            nameState, 
                                            priceState)
                                } 
                color="primary">
                    Guardar
                </Button>
                </DialogActions>
            </Dialog>;

}
export default AddWorkType;