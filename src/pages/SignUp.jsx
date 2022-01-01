import React from 'react'
import SignUpForm from '../components/SignUPForm'
import { Row, Col } from 'react-bootstrap'
import { Image } from "react-bootstrap";

const SignUp = () => {
    return (
        <div>
            <div className="App">

                <Row className="landing">
                    <Col ><SignUpForm /></Col>

                    <Col>
                        <Image src="./img/bg.jpg" thumbnail style={{ border: "none" }} />
                    </Col>


                </Row>
            </div>

        </div>
    )
}

export default SignUp
