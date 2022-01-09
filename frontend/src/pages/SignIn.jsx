import React from 'react'
import { Row, Col } from 'react-bootstrap';
import SignInForm from "../components/SignInForm";


const SignIn = () => {
    return (
        <div>
            <div className="App">

                <Row className="mb">
                    <Col ><SignInForm /></Col>

                    <Col>
                        <div className='bg' style={{ height: 1000 }}>
                            <div className='con mt-5'><h1 className="text-center" > Attendance Tracker</h1></div>

                        </div>
                    </Col>
                </Row>
            </div>



        </div>
    )
}

export default SignIn
