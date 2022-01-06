import React from 'react'


import { Row, Col } from 'react-bootstrap';
import DashBoardCom from "../components/DashBoardCom";




const Dashboard = () => {

    return (
        <div >
            <div>
                <div className="App">

                    <Row className="mb-4">
                        <Col ><DashBoardCom /></Col>

                        <Col>
                            <div className='bg' style={{ height: 1000 }}>
                                <div className='con mt-5'><h1 className="text-center" > Attendance Tracker</h1></div>

                            </div>
                        </Col>
                    </Row>
                </div>



            </div>
        </div>










    )
}

export default Dashboard

