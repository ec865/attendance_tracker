import React, { Suspense } from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Contents from './pages/Contents';
import Menu from './components/Menu';
import Con1 from './pages/Con1';
import Con2 from './pages/Con2';
import Con3 from './pages/Con3';
import Con4 from './pages/Con4';
import LastPage from './pages/LastPage';
import Dashboard from './pages/Dashboard';
import DashBoardCon1 from './pages/DashBoardCon1';
import DashBoardCom from './pages/Dashboard';


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
                <Route exact path="/Contents" component={Contents} />
                <Route exact path="/Contents/:event_id" component={Con1} />
                <Route exact path="/Con2" component={Con2} />
                <Route exact path="/Con3" component={Con3} />
                <Route exact path="/Con4" component={Con4} />
                <Route exact path="/LastPage" component={LastPage} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/dashBoard/:DashBoard_event_id" component={DashBoardCon1} />
              </Switch>
            </Suspense>

          </Route>
        </Switch>
      </BrowserRouter >
    </div>

  );


}

export default App;
