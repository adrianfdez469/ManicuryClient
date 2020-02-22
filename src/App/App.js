import React, {useContext} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ApolloProvider} from 'react-apollo';
//import {ApolloClient, ApolloLink, HttpLink, InMemoryCache} from 'apollo-boost';
import ApolloClient from 'apollo-boost';

import {graphQlEndPoint} from './utils';
import LoginProvider, {LoginContext} from './Login/login.model';
import Login from './Login/login.view';
import Core from './Core/core.view';



const App = () => {
  
  const client = new ApolloClient({
    uri:graphQlEndPoint
  })

  return (
    <ApolloProvider client={client}>
      <LoginProvider>
        <Main />
      </LoginProvider>
    </ApolloProvider>
  );
}

const Main = () => {

  const [loginState] = useContext(LoginContext);

  const AppCmp = !loginState.token 
                  ? <Login /> 
                  : <Core />

  const client = new ApolloClient({
    uri:graphQlEndPoint,
    headers: {
      authorization: `${loginState.token}`
    }
  });

  return ( 
    <ApolloProvider client={client}>
      <CssBaseline />
      {AppCmp}
    </ApolloProvider>
  );

}

export default App;
