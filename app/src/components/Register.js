import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../redux/actions';
import { login } from '../redux/actions';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert } from "mdbreact";

  class Register extends React.Component {
    constructor() {
		super()
		this.state = {
            name: '',
            email: '',
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

        const { name, email, username, password } = this.state;
        const payload = {
            "name": name,
            "email": email,
            "username": username,
            "password": password,
        }

        this.props.register(payload)
            .then(() => {
                this.props.login(payload)
                .then(() => {
                    this.props.history.push("/trips")
                })
            })
            .catch((err) => {
                console.error(err)
            })
	}

	render() {
		const { name, email, username, password } = this.state
        const { registerError, registerLoading } = this.props
        const loggedIn = localStorage.getItem('token') !== null;
        
        return (
            <MDBRow center>
                <MDBCol md="6">
                    { loggedIn ? <div>
                    <p>You are already logged in.</p>
                    <MDBBtn onClick={this.logout}>Log out</MDBBtn></div> :
                    
                    <form onSubmit={this.handleSubmit}>
                    <h3 className="text-center mb-4">Create an account</h3>
                    <div className="grey-text">
                    {registerError &&
                        <MDBAlert color="danger">
                            {registerError}
                        </MDBAlert>
                    }
                    <MDBInput
                        label="Full Name"
                        group
                        type="text"
                        name="name"
                        value={name}
                        validate
                        onChange={this.handleChange}
                        required
                        />
                        <MDBInput
                        label="Email"
                        group
                        type="email"
                        name="email"
                        value={email}
                        validate
                        onChange={this.handleChange}
                        required
                        />
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
                    {registerLoading
					? <p>Registering...</p>
                    : <MDBBtn type="submit">
                    Register Now!
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
    registerLoading: state.registerLoading,
    registerError: state.registerError,
    registerResponse: state.registerResponse,
})

const mapDispatchToProps = {
    register,
    login,
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(Register)
)