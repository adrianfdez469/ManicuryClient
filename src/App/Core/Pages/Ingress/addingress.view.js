import React from 'react';
import {useQuery} from 'react-apollo';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Grid,
    makeStyles
} from '@material-ui/core';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

import {getClients} from '../Clients/clientQuerys';
import {getWorkTypes} from '../WorkTypes/worktypeQuerys';

import useIngress from './useIngress';
import {NumberInput} from '../../Generics';


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

const AddIngress = props => {

    const {handleOk, handleCancel, open, edit} = props;

    const classes = useStyles();

    const {data: dataW} = useQuery(getWorkTypes);
    const {data: dataC} = useQuery(getClients);


    const {useWorkTypeState, useClientState, useAmmountState, useTipState, useDateState} = useIngress();
    const [wtState, setWtState] = useWorkTypeState;
    const [clientState, setClientState] = useClientState;
    const [ammountState, setAmmountState] = useAmmountState;
    const [tipState, setTipState] = useTipState;
    const [dateState, setDateState] = useDateState;
    
    React.useEffect(() => {
        if(edit){
            setWtState(edit.workType.id);
            setClientState(edit.client && edit.client.id);
            setAmmountState(edit.ingressAmount);
            setTipState(edit.tip);
            setDateState(edit.date);
        }else {
            setWtState(null);
            setClientState(null);
            setAmmountState(0);
            setTipState(0);
            setDateState(new Date());
        };

    }, [open, edit, setWtState, setClientState, setAmmountState, setTipState, setDateState]);

    const changeWorkType = event => {
        const wtId = event.target.value;
        const wt = dataW.worktypes.worktype.find(wt => wt.id === wtId);
        setAmmountState(wt.price);
        setWtState(event.target.value);
    }

    return <Dialog 
                open={open} 
                onClose={handleCancel} 
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Adicionar ingreso</DialogTitle>
                <DialogContent>

                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="work-type">Tipo de trabajo</InputLabel>
                        <Select
                            labelId="work-type"
                            id="work-type-placeholder"
                            value={wtState}
                            onChange={changeWorkType}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            {
                                dataW && dataW.worktypes && dataW.worktypes.worktype.map(wt => {
                                    return <MenuItem value={wt.id} key={wt.id}>
                                        <Grid container>
                                            <div style={{backgroundColor: wt.category.color, margin: '0 1rem', width: "1rem", height: "1rem", borderRadius: "50%"}} />
                                            {wt.name}
                                        </Grid>
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>

                    <FormControl className={classes.formControl}>
                        <InputLabel shrink id="cliente">Cliente</InputLabel>
                        <Select
                            labelId="cliente"
                            id="cliente-placeholder"
                            value={clientState}
                            onChange={event => setClientState(event.target.value)}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            <MenuItem value="">
                                <em>Ninguno</em>
                            </MenuItem>
                            {
                                dataC && dataC.clients && dataC.clients.client.map(cli => {
                                    return <MenuItem value={cli.id} key={cli.id}>
                                        {cli.name}
                                    </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>

                    <NumberInput 
                        handleChange={event => setAmmountState(+event.target.value)}
                        value={ammountState}
                        label='Ingreso'
                    />

                    <NumberInput 
                        handleChange={event => setTipState(+event.target.value)}
                        value={tipState}
                        label='Propina'
                    />

                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>                                              
                        <Grid container >
                            <KeyboardDatePicker
                                disableToolbar
                                margin="normal"
                                variant="dialog"
                                format="dd/MM/yyyy"
                                label="Fecha"
                                value={dateState}
                                onChange={setDateState}
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
                                            wtState,
                                            clientState,
                                            ammountState,
                                            tipState,
                                            dateState
                                            )} color="primary">
                    Guardar
                </Button>
                </DialogActions>
            </Dialog>;

}
export default AddIngress;