import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    DialogActions,
    Button,
    Input,
    Chip,
    Checkbox,
    Switch,
    makeStyles
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';



  const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: 120,
        width: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(0.5)
    },
    chip: {
        marginLeft: theme.spacing(1),
    },
    switch: {
        marginTop: theme.spacing(3)
    }
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/*function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }*/

const FilterDialog = props => {

    const classes = useStyles();
    const {open, handleClose,
        firstDate, handleIniDateChange, lastDate, handleEndDateChange,
        categoryState, setCategoryState, wtCategory,
        useDates, setUseDate
    } = props;

    return <Dialog open={open} /*onClose={handleClose}*/ aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Búsqueda</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Para poder filtrar la información, utilce los siguientes campos.
                    </DialogContentText>
                
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                DialogProps
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                //id="date-picker-inline"
                                label="Inicio"
                                value={firstDate}                            
                                onChange={handleIniDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                disabled={!useDates}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="dd/MM/yyyy"
                                margin="normal"
                                //id="date-picker-inline"
                                label="Fin"
                                value={lastDate}
                                
                                onChange={handleEndDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                disabled={!useDates}
                            />
                            
                            <Switch
                                
                                checked={useDates}
                                onChange={() => setUseDate(!useDates)}
                                value={useDates} 
                                color="primary"
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                                className={classes.switch}
                            />

                            <FormControl className={classes.formControl}>
                                <InputLabel id="mutiple-category-label">Categorías</InputLabel>
                                <Select
                                    labelId="mutiple-category-label"
                                    id="mutiple-category"
                                    multiple
                                    value={categoryState}
                                    
                                    onChange={event => setCategoryState(event.target.value)}
                                    input={<Input id="select-multiple-chip" />}
                                    renderValue={selected => (  
                                        <div className={classes.chips}>
                                        {
                                            selected.map(value => {

                                                const wtCat = wtCategory.worktypecategory.worktypecategory.find(wtc => wtc.id === value);
                                                return (
                                                    <Chip key={value} label={wtCat.name} className={classes.chip} 
                                                        size='small'
                                                        style={{backgroundColor: wtCat.color}}
                                                    />
                                                )
                                        })}
                                        </div>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {
                                        wtCategory && wtCategory.worktypecategory && wtCategory.worktypecategory.worktypecategory.map(wtc => {
                                            return <MenuItem value={wtc.id} key={wtc.id} /*style={getStyles(name, personName, theme)}*/ >
                                                <Checkbox checked={categoryState.indexOf(wtc.id) > -1} />
                                                <div style={{backgroundColor: wtc.color, margin: '0 1rem', width: "1rem", height: "1rem", borderRadius: "50%"}}/>                                             
                                                {wtc.name}   
                                            </MenuItem>
                                        })
                                    }                                    
                                </Select>
                            </FormControl>
                        </Grid>
                    </MuiPickersUtilsProvider>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cerrar
                    </Button>
                </DialogActions>
            </Dialog>;

}
export default FilterDialog;