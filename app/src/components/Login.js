import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../redux/actions';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert } from "mdbreact";

  class Login extends React.Component {
    constructor() {
		super()
		this.state = {
            username: '',
            password: '',
		}
    }
    
    logout = (evt) => {
        evt.preventDefault()
      
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        this.props.history.push('/login')
      }
 
	handleChange = (evt) => {
		evt.preventDefault()

		this.setState({
			[evt.target.name]: evt.target.value,
        })
    }
    
    handleSubmit = (evt) => {
		evt.preventDefault()

        const { username, password } = this.state;
        const payload = {
            "username": username,
            "password": password,
        }

        this.props.login(payload)
            .then(() => {
                (this.props.loginError !== null)
                ? console.log("there is an error", this.props.loginError)
                : this.props.history.push("/trips")
            })
            .catch((err) => {
                console.error(err)
            })
	}

	render() {
        const { username, password } = this.state
        const { loginError, loginLoading } = this.props
        const loggedIn = localStorage.getItem('token') !== null;
        
        return (
            <MDBRow center>
                <MDBCol md="6">
                    { loggedIn ? <div>
                    <p>You are already logged in.</p>
                    <MDBBtn onClick={this.logout}>Log out</MDBBtn></div> :
                    
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                    <h3 className="text-center mb-4">Sign in</h3>
                    <div className="grey-text">
                    {loginError &&
                        <MDBAlert color="danger">
                            {loginError}
                        </MDBAlert>
                    }
                    <MDBInput
                    label="Username"
                    group
                    type="text"
                    name="username"
                    value={username}
                    validate
                    onChange={this.handleChange}
                    required
                    />
                    <MDBInput
                    label="Password"
                    group
                    name="password"
                    type="password"
                    value={password}
                    onChange={this.handleChange}
                    required
                    validate
                    />
                    </div>
                    <div className="text-center">
                    {loginLoading
					? <p>Authenticating...</p>
                    : <MDBBtn type="submit">
                    Login
                    </MDBBtn>}
                    </div>
                    </form>
                    }
                </MDBCol>
            </MDBRow>
        );
    }
}

const mapStateToProps = (state) => ({
    loginLoading: state.loginLoading,
    loginError: state.loginError,
    loginResponse: state.loginResponse,
})

const mapDispatchToProps = {
	login,
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Login)
)