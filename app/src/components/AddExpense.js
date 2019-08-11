import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addExpense } from '../redux/actions';
import { MDBRow, MDBCol, MDBInput, MDBBtn, MDBAlert } from "mdbreact";

  class AddExpense extends React.Component {
    constructor() {
		super()
		this.state = {
            name: '',
            amount: '',
            paid: '',
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

        const { name, amount, paid } = this.state;
        const tripID = this.props.match.params.id;
        const payload = {
            "expense_name": this.capitalFirstLetter(name),
            "total_expense_price": amount,
            "primary_paid": this.capitalFirstLetter(paid),
            "trip_id": tripID,
        }

        this.props.addExpense(payload)
            .then(() => {
                this.props.history.push(`/trip/${tripID}`)
            })
            .catch((err) => {
                console.error(err)
            })
	}

	render() {
        const { name, amount, paid } = this.state;
        const { addExpenseLoading, addExpenseError } = this.props;
        
        return (
            <MDBRow center>
                <MDBCol md="6">
                    <form onSubmit={this.handleSubmit}>
                    <h3 className="text-center mb-4">Create a new expense</h3>
                    <div className="grey-text">
                    {addExpenseError &&
                        <MDBAlert color="danger">
                            {addExpenseError}
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
                        label="Amount"
                        group
                        type="number"
                        name="amount"
                        value={amount}
                        validate
                        onChange={this.handleChange}
                        required
                        />
                    <MDBInput
                        label="Paid By"
                        group
                        name="paid"
                        value={paid}
                        validate
                        onChange={this.handleChange}
                        required
                        />
                    </div>
                    <div className="text-center">
                    {addExpenseLoading
                    ? <p>adding...</p>
                    : <MDBBtn type="submit">
                    Add Expense
                    </MDBBtn>}
                    </div>
                    </form>
                </MDBCol>
            </MDBRow>
        );
    }
}

const mapStateToProps = (state) => ({
    addExpenseLoading: state.addExpenseLoading,
    addExpenseError: state.addExpenseError,
    addExpenseResponse: state.addExpenseResponse,
})

const mapDispatchToProps = {
	addExpense,
}

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps,
	)(AddExpense)
)