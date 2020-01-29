import 'date-fns';
import React from 'react';

import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    Grid
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';


import {NumberInput} from '../../Generics';
import useSpend from './useSpend';

const AddSpend = props => {

    const {handleOk, handleCancel, open, edit} = props;

    const {useSpendTypeState, useSpendAmmountState, useSpendDate} = useSpend();
    const [spendTypeState, setSpendType] = useSpendTypeState;
    const [spendAmmountState, setSpendAmmount] = useSpendAmmountState;
    const [selectedDate, setSelectedDate] = useSpendDate;
    
    const handleDateChange = date => {
        setSelectedDate(date);
      };

    React.useEffect(() => {
        if(edit){
            setSpendType(edit.spendtype);
            setSpendAmmount(edit.spendamount);
            setSelectedDate(edit.date);
        }else {
            setSpendType('');
            setSpendAmmount(0);
            setSelectedDate(new Date());
        };

    }, [open, edit, setSpendType ,setSpendAmmount, setSelectedDate]);

    
    return <Dialog 
                open={open} 
                onClose={handleCancel} 
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Adicionar gasto</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Tipo de gasto"
                        type="text"
                        fullWidth
                        value={spendTypeState}
                        onChange={event => setSpendType(event.target.value)}                        
                    />

                    <NumberInput 
                        handleChange={event => setSpendAmmount(+event.target.value)}
                        value={spendAmmountState}
                        label='Cantidad'
                    />
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>                                              
                        <Grid container >
                            <KeyboardDatePicker
                                disableToolbar
                                margin="normal"
                                variant="dialog"
                                format="dd/MM/yyyy"
                                label="Fecha"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'Fecha',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>    
                
                </DialogContent>
                <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancelar
                </Button>
                <Button onClick={() => handleOk( 
                                            (edit) && edit.id,
                                            spendTypeState, 
                                            spendAmmountState,
                                            selectedDate)} color="primary">
                    Guardar
                </Button>
                </DialogActions>
            </Dialog>;

}
export default AddSpend;