import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';

import {
    Dialog, AppBar, Toolbar, IconButton, Typography, Slide, Tooltip
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import LiveHelpIcon from '@material-ui/icons/LiveHelp';

const useStyles = makeStyles(theme => ({
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flexGrow: 1,
    },
}));

const HtmlTooltip = withStyles(theme => ({
    tooltip: {
      //backgroundColor: '#f5f5f9',
      //color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 500,
      fontSize: theme.typography.pxToRem(12),
      //border: '1px solid #dadde9',
    },
  }))(Tooltip);

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ChartContainer = props => {

    const { open, handleClose, title, children, htmlHelpContent } = props;

    const classes = useStyles();

    return (
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {title}
                    </Typography>
                    <div>
                        <HtmlTooltip 
                            title={
                                <React.Fragment>
                                    <Typography color="inherit">{title}</Typography>
                                    {htmlHelpContent}
                                </React.Fragment>
                            }
                            arrow={true}
                        >
                            <LiveHelpIcon />
                        </HtmlTooltip>
                  </div>                
                </Toolbar>
            </AppBar>
            
            {children}

        </Dialog>

    );
}

export default ChartContainer;