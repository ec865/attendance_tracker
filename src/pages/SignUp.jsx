import React from 'react'
import SignUpForm from '../components/SignUPForm'
import { Row, Col } from 'react-bootstrap'


const SignUp = () => {
    return (
        <div>
            <div className="App">

                <Row className="mb-4">
                    <Col ><SignUpForm /></Col>

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

export default SignUp
