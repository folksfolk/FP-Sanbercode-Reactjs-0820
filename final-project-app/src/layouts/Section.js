import React, {useContext} from "react"
import {
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import About from "../pages/About"
import Home from "../pages/Home"
import Movies from "../pages/Movies"
import Games from "../pages/Games"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ChangePassword from "../pages/ChangePassword"
import {UserContext} from "../context/UserContext"


const Section = () =>{

  const [user] = useContext(UserContext);

  const PrivateRoute = ({user, ...props }) => {
    if (user) {
      return <Route {...props} />;
    } else {
      return <Redirect to="/login" />;
    }
  };

  const LoginRoute = ({user, ...props }) =>
  user ? <Redirect to="/" /> : <Route {...props} />;

  return(    
    <section >
      <Switch>
        <Route exact path="/" user={user} component={Home}/>
        <Route exact path="/about" user={user} component={About}/>
        <LoginRoute exact path="/register" user={user} component={Register}/>
        <Route exact path="/change-password" user={user} component={ChangePassword}/>
        <LoginRoute exact path="/login" user={user} component={Login}/>
        <PrivateRoute exact path="/movies" user={user} component={Movies}/>
        <PrivateRoute exact path="/games" user={user} component={Games}/>
      </Switch>
    </section>
  )
}

export default Section