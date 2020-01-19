import React, {useRef, useState, useContext} from 'react';

import { 
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Grid,
    Button,
    DialogActions
} from '@material-ui/core';

import AccountCircle from '@material-ui/icons/AccountCircle';
import VpnKey from '@material-ui/icons/VpnKey';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import {LoginContext, loginActions} from './login.model';

const Login = props => {

    const userInputRef = useRef(null);
    const userPassRef = useRef(null);
    
    const [loginState, dispatch] = useContext(LoginContext);
    const [visibility, setVisivility] = useState(false);

    const onChangeVisibilityPass = () => {
        setVisivility(state => !state);
    }

    const keyPressInPasswordInput = () => {

    }

    return <>
        <Dialog open>
                <DialogTitle>LOGIN</DialogTitle>
                <DialogContent>
                
                    <Grid container spacing={1} alignItems='flex-end'>
                        <Grid item>
                            <AccountCircle />
                        </Grid>
                        <Grid item>
                            <TextField 
                                label='Usuario' 
                                inputRef={userInputRef} 
                                error={loginState.error} 
                                autoFocus 
                                required 
                            />
                        </Grid>
                    </Grid>
                    
                    <Grid container spacing={1} alignItems='flex-end'>
                        <Grid item>
                            <VpnKey />
                        </Grid>
                        <Grid item>
                            <TextField 
                                label='Contraseña' 
                                type={visibility ? 'text' : 'password'} 
                                inputRef={userPassRef} 
                                error={loginState.error} 
                                required
                                onKeyPress={keyPressInPasswordInput}
                            />
                        </Grid>
                        <Grid item>
                            {visibility ? <Visibility onClick={onChangeVisibilityPass}/> : <VisibilityOff onClick={onChangeVisibilityPass}/> }
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>                    
                    <Button variant='text' color="primary" 
                        onClick={() => {
                            dispatch({
                                type: loginActions.TRY_LOGIN, 
                                payload: {
                                     username: userInputRef.current.value,
                                     password: userPassRef.current.value
                                }
                            })
                        }}  
                    >
                        Login
                    </Button>
                </DialogActions>
            </Dialog>
    </>
}

export default Login;