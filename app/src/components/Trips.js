import React from 'react';
import { connect } from 'react-redux';
import { getTrips } from '../redux/actions';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardTitle, MDBCardBody, MDBCardText } from "mdbreact";

class Trips extends React.Component {
    constructor() {
		super()
		this.state = {
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
        this.props.getTrips();
    }

    formatDate = date => {
        const myDate = new Date(date);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const myDateF = month[myDate.getMonth()]+" "+myDate.getDate()+" "+myDate.getFullYear();
        return myDateF;
    }

	render() {
        const userID = parseInt(localStorage.getItem('userID'));

        const { trips, tripsLoading } = this.props;

        const usersTrips = trips.filter(trip => trip.user_id === userID);

        if (tripsLoading) {
            return (
                <MDBRow center>
                    <MDBCol md="12">
                        <p>Trips Loading...</p>
                    </MDBCol>
                </MDBRow>
            )
        }

        return (
            <MDBRow center>
                <MDBCol md="12">
                    <h3>My Trips</h3>
                    <Link to="/trips/add">Add a Trip</Link><br /><br />
                </MDBCol>
                        {usersTrips.map((trip, index) => {
                            return (
                                <MDBCol md="6" key={trip.id}>
                                    <MDBCard>
                                        <MDBCardBody>
                                            <MDBCardTitle>{trip.name}</MDBCardTitle>
                                            <MDBCardText>
                                                Date: {this.formatDate(trip.date)}<br />
                                            </MDBCardText>
                                        <Link to={`/trip/${trip.id}`}><MDBBtn color="primary">More Details</MDBBtn></Link>
                                    </MDBCardBody>
                                    </MDBCard>
                                    <br />
                                </MDBCol>
                            )
                        })}
            </MDBRow>
        );
    }
}

const mapStateToProps = (state) => {
	return {
		tripsLoading: state.tripsLoading,
        tripsError: state.tripsError,
        trips: state.trips,
	}
}

export default connect(mapStateToProps, { getTrips })(Trips);