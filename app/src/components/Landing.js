import React from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { MDBRow, MDBCol, MDBBtn } from "mdbreact";

function Landing() {
    return (
        <MDBRow center>
            <MDBCol className="text-center" md="8">
                <h2>Welcome to friendSplit</h2>
                <h4>friendSplit allows you to easily record your trips and expenses. You will be able to see exactly how much you and your friends spend on varies purchases and if someone still needs to pay someone back.</h4>
                <br />
                <h3>To get started, Register Now!</h3>
                <Link to="/register"><MDBBtn>Let's go!</MDBBtn></Link>
            </MDBCol>
        </MDBRow>
    );
}

export default withRouter(Landing);