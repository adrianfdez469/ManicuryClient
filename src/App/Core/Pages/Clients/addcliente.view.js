import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button
} from '@material-ui/core';

import useClient from './useClient';

const AddClient = props => {

    const {handleOk, handleCancel, open, edit} = props;

    const {useAddressState, useNameState, usePhoneState} = useClient();
    const [addressState, setAddress] = useAddressState;
    const [nameState, setName] = useNameState;
    const [phoneState, setPhone] = usePhoneState;
    
    React.useEffect(() => {
        if(edit){
            setAddress(edit.address);
            setName(edit.name);
            setPhone(edit.phone);
        }else {
            setAddress('');
            setName('');
            setPhone('');
        };

    }, [open, edit, setName ,setPhone, setAddress]);

    
    return <Dialog 
                open={open} 
                onClose={handleCancel} 
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Adicionar cliente</DialogTitle>
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
                    <TextField
                        margin="dense"
                        label="Teléfono"
                        type="text"
                        fullWidth
                        value={phoneState}
                        onChange={event => setPhone(event.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Dirección"
                        type="text"
                        fullWidth
                        value={addressState}
                        onChange={event => setAddress(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => handleOk( 
                                            (edit) && edit.id,
                                            nameState, 
                                            phoneState, 
                                            addressState)} color="primary">
                    Guardar
                </Button>
                </DialogActions>
            </Dialog>;

}
export default AddClient;