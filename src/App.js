import React, { Suspense } from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Menu from './components/Menu';


import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Menu />


      <BrowserRouter>



        <Switch>
          {/* <PrivateRoute path="/app">
          <AppWithLogin />
        </PrivateRoute> */}
          <Route path="*">
            <Suspense>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/SignIn" component={SignIn} />
                <Route exact path="/SignUp" component={SignUp} />
              </Switch>
            </Suspense>

          </Route>
        </Switch>
      </BrowserRouter >
    </div>

  );


}

export default App;
