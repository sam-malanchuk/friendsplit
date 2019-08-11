import React from 'react';
import { withRouter } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
  }
  

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  logout = (evt) => {
    evt.preventDefault()
  
    localStorage.removeItem('token')
    localStorage.removeItem('userID')
    this.props.history.push('/login')
  }

  render() {
    const checkLogin = localStorage.getItem('token') === null;
    return (
      <div>
        <header>
        <MDBNavbar color="default-color" dark expand="md">
            <MDBNavbarBrand href="/">
            <strong>friendSplit</strong>
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
            <MDBNavbarNav left>
                <MDBNavItem>
                    <MDBNavLink to="/">Home</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/trips">My Trips</MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                    <MDBNavLink to="/trips/add">Add Trip</MDBNavLink>
                </MDBNavItem>
            </MDBNavbarNav>
            <MDBNavbarNav right>
                {
                    checkLogin
                    ? <>
                        <MDBNavItem>
                            <MDBNavLink to="/login">Login</MDBNavLink>
                        </MDBNavItem>
                        <MDBNavItem>
                            <MDBNavLink to="/register">Register</MDBNavLink>
                        </MDBNavItem>
                    </>
                    : <span>
                        <MDBNavItem>
                            <MDBNavLink onClick={this.logout}>Logout</MDBNavLink>
                        </MDBNavItem>
                    </span>
                }
            </MDBNavbarNav>
            </MDBCollapse>
        </MDBNavbar>
        </header>
      </div>
    );
  }
}

export default withRouter(NavBar);