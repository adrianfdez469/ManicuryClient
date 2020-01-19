import React, {useContext} from 'react';
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

  return AppCmp;

}

export default App;
