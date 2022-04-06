import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import "tailwindcss/dist/base.css";
import "./assets/styles/globalStyles.css";

import Booking from "./pages/Booking.js"
import BookingStatus from "./pages/BookingStatus.js"
import Payment from "./pages/Payment.js"
import Login from "./pages/Login.js"

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Appointment from './pages/Appointment';
import Dashboard from './pages/Dashboard';
import CreateAppointment from './pages/CreateAppointment';
import AdminViewAppointment from './pages/AdminViewAppointments';
import AdminUpdateAppointment from './pages/AdminUpdateAppointment';
import React from 'react';
import Logout from './pages/Logout';
import ChangePassword from './pages/ChangePassword';


function App() {

  function getToken() {
    const tokenString = sessionStorage.getItem('token');
    return tokenString
  };

  const [token, setToken] = React.useState(getToken());

  function saveToken(userToken) {
    sessionStorage.setItem('token', JSON.stringify(userToken));
    setToken(userToken.token);
  };

  console.log(token)
  return (
    <Router>
      <Switch>
        <Route path="/appointment">
          <Appointment />
        </Route>
        <Route path="/booking">
          <Booking />
        </Route>
        <Route path="/checkout">
          <Payment />
        </Route>
        <Route path='/completed'>
          <BookingStatus />
        </Route>
        <Route path='/update-appointment' render={() => (
          !getToken() ? (<Redirect to="/login" />) :
            (<AdminUpdateAppointment />))}></Route>
        <Route path='/view-appointments' render={() => (
          !getToken() ? (<Redirect to="/login" />) :
            (<AdminViewAppointment />))}></Route>
        <Route path='/create-appointment' render={() => (
          !getToken() ? (<Redirect to="/login" />) :
            (<CreateAppointment />))}></Route>
        <Route path='/dashboard'
          render={() => (
            !getToken() ? (<Redirect to="/login" />) :
              (<Dashboard />))}></Route>
        <Route path='/change-password' render={() => (
          !getToken() ? (<Redirect to="/login" />) :
            (<ChangePassword />))}></Route>
        <Route path='/login'>
          <Login setToken={saveToken} />
        </Route>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router >

  );
}
export default App;


