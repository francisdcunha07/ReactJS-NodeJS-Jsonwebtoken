import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import login from './containers/Login/Login'
import Layout from './containers/Layout/Layout';
import AuthContextProvider from './context/AuthContext/AuthContext';
import Registration from './containers/Registration/Registration';



function App() {



  return (
    <div className="app">
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
          <Route path="/registration" component={Registration} />
            <Route path="/login" component={login} />
            <Route path="/" exact component={Layout} />
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
