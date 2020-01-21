import React, {useReducer, useEffect} from 'react';
import {useLazyQuery} from 'react-apollo';
import {gql} from 'apollo-boost';

const LoginContext = React.createContext(null);

const LoginQuery = gql`
    query($username:String!, $password:String!) {
        login(username:$username, password: $password) {
            success
            message
            token
            username
            avatarUrl
        }
    }
`;

const initialLoginState = {
    loading: false,
    error: false,
    token: localStorage.getItem('token') || null,
    username: localStorage.getItem('username') || null,
    avatarUrl: localStorage.getItem('avatarUrl') || null
}

const loginActions = {
    START_LOGIN: 'START_LOGIN',
    ERROR_LOGIN: 'ERROR_LOGIN',
    SUCCESSFULL_LOGIN: 'SUCCESSFULL_LOGIN',
    START_LOGOUT: 'START_LOGOUT',
    TRY_LOGIN: 'TRY_LOGIN'
}



const startLoginAction = () => {
    return {
        ...initialLoginState,
        loading: true
    }
}
const errorLogin = () => {
    return {
        ...initialLoginState,
        error: true
    }
}

const successfullLoginAction = (state, payload) => {

    localStorage.setItem('token', payload.token);
    localStorage.setItem('username', payload.username);
    localStorage.setItem('avatarUrl', payload.avatarUrl);    

    return {
        ...initialLoginState,
        token: payload.token,
        username: payload.username,
        avatarUrl: payload.avatarUrl
    }
}

const startLogout = () => {
    return initialLoginState;
}

const loginReducer = (state, action) => {
    switch(action.type){
        case loginActions.START_LOGIN:
            return startLoginAction(state, action.payload);
        case loginActions.ERROR_LOGIN:
            return errorLogin(state, action.payload);
        case loginActions.SUCCESSFULL_LOGIN:
            return successfullLoginAction(state, action.payload);
        case loginActions.START_LOGOUT:
            return startLogout(state, action.payload);
        default: return state;
    }
}

const useAsyncDispacher = dispacher => {
    
    const [queryDispatcher, results] = useLazyQuery(LoginQuery);
    
    useEffect(() => {
        
        if(results.loading){
            dispacher({
                type: loginActions.START_LOGIN
            });
        } else if((results.error && !results.loading)){
            dispacher({
                type: loginActions.ERROR_LOGIN
            });
        } 
        
        if(results.data && !results.error && !results.loading){
            if(!results.data.login.success){
                dispacher({
                    type: loginActions.ERROR_LOGIN
                })
            }else{
                dispacher({
                    type: loginActions.SUCCESSFULL_LOGIN,
                    payload: results.data.login
                })
            }
            
        }
    }, [results, dispacher]);


    return action => {
        
        if(action.type === loginActions.TRY_LOGIN){
            
            queryDispatcher({
                variables: {
                    username: action.payload.username,
                    password: action.payload.password
                }
            });
            action.type = loginActions.START_LOGIN;
        }

        dispacher(action);
        
        
    }
} 

const LoginProvider = props => {
    
    const [loginState, dispatch] = useReducer(loginReducer, initialLoginState);
    const dispacher = useAsyncDispacher(dispatch);

    return <LoginContext.Provider value={[loginState, dispacher]}>
                {props.children}
            </LoginContext.Provider>

}

export default LoginProvider;
export {loginActions, LoginContext};