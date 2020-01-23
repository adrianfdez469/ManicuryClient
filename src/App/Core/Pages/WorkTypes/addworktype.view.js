import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';

import NumberInput from '../../Generics/numberInput.view';
import useWorktype from './useWorktype';

const AddWorkType = props => {

    const {handleOk, handleCancel, open, edit} = props;

    const {useNameState, usePriceState} = useWorktype();
    
    const [nameState, setName] = useNameState;
    const [priceState, setPrice] = usePriceState;
    

    React.useEffect(() => {
        if(edit){
            setName(edit.name);
            setPrice(edit.price);
        }else{
            setName('');
            setPrice(0);
        }

    }, [open, edit, setName, setPrice]);

    
    return <Dialog 
                open={open} 
                onClose={handleCancel} 
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Adicionar tipo de trabajo</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
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