import React from 'react';
import { connect } from 'react-redux';
import { getTripExpenses } from '../redux/actions';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol, MDBDataTable  } from "mdbreact";

class Trip extends React.Component {
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
        this.props.getTripExpenses(this.props.match.params.id);
    }

    formatDate = date => {
        const myDate = new Date(date);
        const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const myDateF = month[myDate.getMonth()]+" "+myDate.getDate()+" "+myDate.getFullYear();
        return myDateF;
    }

    render() {
        const userID = parseInt(localStorage.getItem('userID'));
        const { tripData, tripExpenses, tripLoading } = this.props;
        const filteredExpenses = tripExpenses.filter(expense => expense.trip_id === parseInt(this.props.match.params.id));
        const myTrip = tripData.user_id === userID;
        filteredExpenses.forEach(expense => {
            delete expense['trip_id'];
            delete expense['created_at'];
            delete expense['updated_at'];
            delete expense['id'];
        });
        const tripTotal = filteredExpenses.reduce((total, expense) => total += expense.total_expense_price, 0);
        const myPeople = [];

        filteredExpenses.forEach(expense => {
            if(myPeople.includes(expense.primary_paid)) {
                // do nothing
            } else {
                // add them
                myPeople.push(expense.primary_paid)
            }
        });
        
        const paymentArray = {};
        for(var i = 0; i < filteredExpenses.length; i++) {
            if(!paymentArray.hasOwnProperty(filteredExpenses[i].primary_paid)) {
                paymentArray[filteredExpenses[i].primary_paid] = 0
            }
            paymentArray[filteredExpenses[i].primary_paid] += filteredExpenses[i].total_expense_price
        }

        const roundAmount = amount => {
            return amount.toFixed(2);
        }
    
        const data = {
            columns: [
              {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Amount',
                field: 'total_expense_price',
                sort: 'asc',
                width: 100
              },
              {
                label: 'Paid By',
                field: 'primary_paid',
                sort: 'asc',
                width: 100
              }
            ],
            rows: [...filteredExpenses ]
        }

        const eachPays = tripTotal/myPeople.length;

        if (!myTrip || tripLoading) {
            return (
                <MDBRow center>
                    <MDBCol md="12">
                        <p>Trip details Loading...</p>
                    </MDBCol>
                </MDBRow>
            )
        } else {
            if(myTrip) {
                return (
                    <MDBRow center>
                        <MDBCol md="12">
                            <h3>{tripData.name}</h3>
                            <h5>{this.formatDate(tripData.date)}</h5>
                            <br />
                        </MDBCol>
                        <MDBCol md="6">
                            <h4>Expenses:</h4>
                            {
                                (filteredExpenses.length === 0)
                                ? <Link to={`/trip/${tripData.id}/add`}>Add your first expense</Link>
                                : <>
                                <Link to={`/trip/${tripData.id}/add`}>Add an expense</Link>
                                <br /><br />
                                <MDBDataTable
                                    striped
                                    bordered
                                    hover
                                    data={data}
                                />
                                </>
                            }
                        </MDBCol>
                        <MDBCol md="6">
                            <h4>Trip Summary</h4>
                            <p>Total paid</p>
                            <ul>
                            {myPeople.map((person, index) => {
                                    return (
                                    <li key={index}>
                                    {person} : ${paymentArray[person]}
                                    </li>
                                    )
                                })}
                            </ul>
                            <p>Total: <b>${roundAmount(tripTotal)}</b></p>
                            <p>Each person needs to pay ${roundAmount(eachPays)}.<br />
                            The following are how much each still owes:</p>
                            <ul>
                            {myPeople.map((person, index) => {
                                    return (
                                    <li key={index}>
                                    {person} : {roundAmount(eachPays - paymentArray[person])} dollars
                                    </li>
                                    )
                                })}
                            </ul>
                        </MDBCol>
                    </MDBRow>
                );
            } else {
                return (
                    <h3>The trip is not found!</h3>
                );
            }
        }
    }
}

const mapStateToProps = (state) => {
	return {
		tripLoading: state.tripsLoading,
        tripError: state.tripsError,
        tripData: state.tripData,
        tripExpenses: state.tripExpenses,
	}
}

export default connect(mapStateToProps, { getTripExpenses })(Trip);