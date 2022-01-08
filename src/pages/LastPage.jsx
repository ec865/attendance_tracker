import React from 'react'
import '../index.css';
import { Col, Row } from 'react-bootstrap';



export const LastPage = () => {
    return (
        <div >
            <Row className='mb' >
                <Col>
                    <div className='bg' style={{ height: 1000 }}>
                        <div className='con mt-5 pt-5 pb-5'><h1 className="text-center" > CONGRATULATIONS!!!</h1></div>
                        <div className='lp mt-5'><p className="text-center" > Attendance Sucessfully Submitted!!!</p></div>

                    </div>
                </Col>

            </Row>
        </div>
    )
}
export default LastPage





