import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import NavbarCollapse from "react-bootstrap/esm/NavbarCollapse";
import { LinkContainer } from "react-router-bootstrap";
import React from "react";



export default function Menu(props) {

    const navbarStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: '10px',
        fontWeight: 'bolder',
      };

    return (
        <Navbar style={navbarStyle} bg="black" variant="dark" expand="lg">
            <Container >
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    <NavbarCollapse><LinkContainer to="/" ><Navbar.Brand><font color="white"><strong>HOME</strong></font></Navbar.Brand></LinkContainer></NavbarCollapse>


                    <NavbarCollapse><LinkContainer to="/cadastroProfessores"><NavDropdown.Item><strong><font color="white">PROFESSORES</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                    <NavbarCollapse><LinkContainer to="/cadastroTurmas"><NavDropdown.Item><strong><font color="white">TURMAS</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                    <NavbarCollapse><LinkContainer to="/cadastroCursos"><NavDropdown.Item><strong><font color="white">CURSOS</font></strong></NavDropdown.Item></LinkContainer></NavbarCollapse>

                    
                    <Nav>
                        <Nav.Link href="/"><strong><font color="white">VOLTAR</font></strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}