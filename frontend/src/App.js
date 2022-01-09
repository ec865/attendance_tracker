import React, { Suspense,useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Landing from './pages/Landing';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Contents from './pages/Contents';
import Menu from './components/Menu';
import Con1 from './pages/Con1';
import LastPage from './pages/LastPage';
import sucess from './pages/sucess';
import signout from './pages/signout';
import Dashboard from './pages/Dashboard';
import DashBoardCon1 from './pages/DashBoardCon1';
import { getRole } from './utils/index.js';



import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {

  const userRole = getRole();
  console.log(userRole)




  return (
    

    <div>
      


      <BrowserRouter>

        <Menu />

        <Switch>
          {/* <PrivateRoute path="/app">
          <AppWithLogin />
        </PrivateRoute> */}
          <Route path="*">
            <Suspense>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/SignIn" component={SignIn} />
                  <Route exact path="/Contents" component={Contents} />
                  <Route exact path="/Contents/:event_id" component={Con1} />
                  <Route exact path="/LastPage" component={LastPage} />
                  <Route exact path="/SignUp" component={SignUp} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/dashBoard/:DashBoard_event_id" component={DashBoardCon1} />
                  <Route exact path="/sucess" component={sucess} />
                  <Route exact path="/signout" component={signout} />
                
               
                
              </Switch>
            </Suspense>

          </Route>
        </Switch>
      </BrowserRouter >
    </div>

  );


}

export default App;
