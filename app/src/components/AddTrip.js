import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addTrip } from '../redux/actions';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert } from "mdbreact";

  class AddTrip extends React.Component {
    constructor() {
		super()
		this.state = {
            name: '',
            date: '',
		}
	}

    checkLogin = () => {
        return (
            (localStorage.getItem('token') !== null)
            ? null //console.log("I'm logged in")
            : this.props.history.push("/login")
        )
    }

    componentDidMount() {
        this.checkLogin();
    }

    handleChange = (evt) => {
		evt.preventDefault()

		this.setState({
			[evt.target.name]: evt.target.value,
        })
    }

    capitalFirstLetter = string => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    handleSubmit = (evt) => {
		evt.preventDefault()

        const { name, date } = this.state;
        const payload = {
            "name": this.capitalFirstLetter(name),
            "date": date,
            "user_id": localStorage.getItem('userID'),
        }

        this.props.addTrip(payload)
            .then(() => {
                this.props.history.push("/trips")
            })
            .catch((err) => {
                console.error(err)
            })
	}

	render() {
        const { name, date } = this.state;
        const { addTripLoading, addTripError } = this.props;
        
        return (
            <MDBRow center>
                <MDBCol md="6">
                    <form onSubmit={this.handleSubmit}>
                    <h3 className="text-center mb-4">Add a New Trip</h3>
                    <div className="grey-text">
                    {addTripError &&
                        <MDBAlert color="danger">
                            {addTripError}
                        </MDBAlert>
                    }
                    <MDBInput
                        label="Name"
                        group
                        name="name"
                        value={name}
                        validate
                        onChange={this.handleChange}
                        required
                        />
                        <MDBInput
                        label="Date"
                        group
                        type="date"
                        name="date"
                        value={date}
                        validate
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                    <div className="text-center">
                    {addTripLoading
                    ? <p>adding...</p>
                    : <MDBBtn type="submit">
                    Add Trip
                    </MDBBtn>}
                    </div>
                    </form>
                </MDBCol>
            </MDBRow>
        );
    }
}

const mapStateToProps = (state) => ({
    addTripLoading: state.addTripLoading,
    addTripError: state.addTripError,
    addTripResponse: state.addTripResponse,
})

const mapDispatchToProps = {
	addTrip,
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(AddTrip)
)