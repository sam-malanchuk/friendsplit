import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Login from './components/Login';
import Landing from './components/Landing';
import Register from './components/Register';
import Trips from './components/Trips';
import AddTrip from './components/AddTrip';
import Trip from './components/Trip';
import AddExpense from './components/AddExpense';
import NavBar from './components/NavBar';
import { MDBContainer } from "mdbreact";

function App() {
  return (
    <MDBContainer>
      <NavBar />
      <br />
      <Route exact path="/" component={Landing} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/trips" component={Trips} />
      <Route exact path="/trips/add" component={AddTrip} />
      <Route exact path="/trip/:id" component={Trip} />
      <Route exact path="/trip/:id/add" component={AddExpense} />
    </MDBContainer>
  );
}

export default App;