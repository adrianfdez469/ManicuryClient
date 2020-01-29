import React from 'react';
import PropTypes from 'prop-types';


import { makeStyles } from '@material-ui/core/styles';

import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';



import FilterTiltShiftIcon from '@material-ui/icons/FilterTiltShift';
import FilterCenterFocusIcon from '@material-ui/icons/FilterCenterFocus';


const useStyles = makeStyles(theme => ({
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const OpenIconSpeedDial = props => {
  
  const {actions} = props;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
     
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        icon={<SpeedDialIcon  openIcon={<FilterCenterFocusIcon />} icon={<FilterTiltShiftIcon /> } />}
        
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {
        actions.map(action => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              handleClose();
              action.onClick();
            }}
          />
        ))
        }
      </SpeedDial>
    </div>
  );
}

OpenIconSpeedDial.propTypes = {
    actions: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.element.isRequired,
        name: PropTypes.string.isRequired,
        onClick: PropTypes.func.isRequired
    })).isRequired
}

export {OpenIconSpeedDial};