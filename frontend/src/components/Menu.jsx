import React from "react";
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { removeAccessToken } from '../utils';

const Menu = () => {
    const history = useHistory();
    const handleSignOut = ()=>{ history.push("/signout");removeAccessToken() }
    return (

        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/">AttendanceTracker </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                           
                        </Nav>
                        <Nav>
                            <Nav.Link href="/SignUp">SIGN UP</Nav.Link>
                            <Nav.Link href="/SignIn">SIGN IN</Nav.Link>
                            <Button onClick={handleSignOut} variant="secondary">Sign Out</Button>
                            {/* <Nav.Link href="/">SIGN OUT</Nav.Link> */}


                        </Nav>
                    </Navbar.Collapse>
                </Container>


            </Navbar>

        </div>
    )
}
export default Menu