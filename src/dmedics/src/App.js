import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import "tailwindcss/dist/base.css";
import "./assets/styles/globalStyles.css";

import Booking from "./pages/Booking.js"
import BookingStatus from "./pages/BookingStatus.js"
import Payment from "./pages/Payment.js"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {
  return (
    <Router>
    <Switch>
      <Route path="/booking">
        <Booking />
      </Route>
    <Route path="/checkout">
        <Payment />
  </Route>
  <Route path = '/completed'>
    <BookingStatus/>
  </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </Router>

  );
}
export default App;
