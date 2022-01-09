
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../index.css';
import { Col, Row } from 'react-bootstrap';
const Landing = () => {

    const [event1Data, setevent1Data] = useState()
    useEffect(() => {

        axios.get(`https://attendance-backend-3my2gtpqya-ew.a.run.app`).then((res) => setevent1Data(res.data))


    }, [])
    
    
    
    
    return (

        <div>
            <Row className='mb' >
                <Col>
                    <div className='bg mt-5 pt-5' style={{ height: 1000 }}>
                        <div className='con mt-5 pt-5'><h1 className="text-center" > Welcome To Attendance Tracker</h1></div>

                    </div>
                </Col>

            </Row>
        </div >







    )
}

export default Landing
