import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { createBrowserHistory } from 'history'
import Navbar from './containers/Navbar'
import Footer from './containers/Footer'
import Home from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import Children from './components/children/Children'
import Child from './components/children/Child'
import ChildrenForm  from './components/children/ChildrenForm'
import BirthRecord from './components/births/BirthRecord'
import BirthsForm from './components/births/BirthsForm'
import HospitalForm from './components/hospitals/HospitalForm'
import MotherForm from './components/parents/mother/MotherForm'
import FatherForm from './components/parents/father/FatherForm'
import Appointments from './components/appointments/Appointments'
import AppointmentsForm from './components/appointments/AppointmentsForm'
import GrowthAndHealthRecords from './components/growthandhealth/GrowthAndHealthRecords'
import UsefulInformation from './components/usefulInformation/UsefulInformation'

export const HISTORY = createBrowserHistory()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backButton: false,
      errors: [],
      isLoggedIn: false,
      user: {},
      children: []
     };
  }

  componentDidMount() {
    this.loginStatus()
  }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', {
      withCredentials: true,
    })
    .then(response => {
      console.log(response)
      if (response.data.logged_in) {
        console.log(response.data.logged_in)
        this.handleLogin(response.data)
        this.redirect("/")
      } else {
        this.handleLogout()
      }
    })
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user,
      navbar: "loggedIn"
    })
  }

  handleLogout = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      this.setState({
        isLoggedIn: false,
        user: {}
      })
      this.redirect("/")
    })
    .catch(error => console.log(error))
  }

  handleCreateChildren = (data) => {
    console.log(data)
    this.setState({
      children: [...this.state.children, data]
    })
  }

  redirect = (string) => {
    HISTORY.push(string)
  }

  addBackButton = () =>{
    this.setState({
      backButton: true
    })
  }

  render() {
    return (
      <div className="app_main">
        <Router>
        <Navbar navbarController={this.navbarController} loggedInStatus={this.state.isLoggedIn} handleLogout={this.handleLogout} addBackButton={this.addBackButton} backButton={this.state.backButton}/>
          <Routes>
            <Route
              exact path='/'
              element={
              <Home loggedInStatus = {this.state.isLoggedIn} user={this.state.user} children = {this.state.user.children} handleLogout={this.handleLogout} handleLogin={this.handleLogin}/>
              }
            />
            <Route
              exact path='/login'
              element={
              <Login />
            }
            />
            <Route
              exact path='/signup'
              element={
              <Signup handleLogin={this.handleLogin}/>
              }
            />
            <Route
              exact path='/children'
              element={
              <Children user={this.state.user} children={this.state.children}/>
            }
            />
            <Route
            exact path='/add_a_child'
            element={
              <ChildrenForm user={this.state.user} handleCreateChildren={this.handleCreateChildren} />
            }
            />
            <Route
            exact path='/child'
            element={
              <Child user={this.state.user} child={this.props.child}/>
            }
            />
            <Route
              exact path='/birth_record'
              element={
              <BirthRecord/>
              }
            />
            <Route
              exact path='/add_a_birth_record'
              element={
              <BirthsForm/>
              }
            />
            <Route
              exact path ='/add_a_hospital'
              element={
                <HospitalForm />
              }
            />
            <Route
              exact path ='/add_a_mother'
              element={
                <MotherForm />
              }
            />
            <Route
              exact path ='/add_a_father'
              element={
                <FatherForm />
              }
            />
            <Route
              exact path='/appointments_to_keep'
              element={
              <Appointments />
              }
            />
            <Route
              exact path='/add_an_appointment'
              element={
              <AppointmentsForm />
              }
            />
            <Route
              exact path='/records'
              element={
              <GrowthAndHealthRecords />
              }
            />
            <Route
              exact path='/useful_information/*'
              element={
              <UsefulInformation />
              }/>
          </Routes>
        </Router>
        < Footer />
      </div>
    );
  }
}
export default App;