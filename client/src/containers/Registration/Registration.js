import React, { useState, useContext } from 'react';
import { Container, Button, Form, Navbar } from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Registration = (props) => {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmpassword] = useState('');
    const { checkAuthenticated, logOut } = useContext(AuthContext);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [submitDisable, setSubmitDisable] = useState(true);
    const [showErrorAlertMsg, setShowErrorAlertMsg] = useState(false);

    const handleValidation = () => {
        setShowErrorAlertMsg('')
        let enableBtn = true;
        if (password && password.length <= 2 ) {
            setShowErrorAlertMsg("Password length should be greater than 2")
            enableBtn = false;
        }

        if ( confirmPassword !== password) {
            setShowErrorAlertMsg("Passwords do not match")
            enableBtn = false;
        }

        return enableBtn
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            axios.post('/api/registration', { email, password }).then(res => {
                setEmail('');
                setShowErrorAlert(false)
                setpassword('');
                setConfirmpassword('');
                setShowErrorAlertMsg('')
                props.history.push({ pathname: '/login' })
            }).catch(err => {
                setShowErrorAlert(true)
                setShowErrorAlertMsg('')
                if (err.message.includes(409)) {
                    setShowErrorAlertMsg('The user already exists ')
                }
             })
        }else{
            setShowErrorAlert(true)
        }
    }
    const alertErr =
        (<div class="alert alert-warning alert-dismissible fade show" role="alert">
            {showErrorAlertMsg}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close" onClick={(e) => setShowErrorAlert(false)} >
                <span aria-hidden="true">&times;</span>
            </button>
        </div>);

    return (
        <React.Fragment>
            <Navbar className=" justify-content-between space">
                <Navbar.Brand className="logoColor">Employee Portal</Navbar.Brand>

            </Navbar>
            {
                checkAuthenticated() ? <Redirect to={{ pathname: "/" }} /> : <Container className="loginContainer  ">
                    <div className="dim">
                        <Form onSubmit={submitHandler} className="col-lg-8 mx-auto mt-5" >
                            {showErrorAlert ? alertErr : ''}
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
                                <Form.Text className="text-muted">

                                </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" required onChange={(e) => setpassword(e.target.value)} />
                            </Form.Group>
                            <Form.Group controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm Password" required onChange={(e) => setConfirmpassword(e.target.value)} />
                            </Form.Group>
                            <Button variant="primary" type="submit"  >
                                Register
         </Button>
         <div style={{paddingTop:'1vw'}}> <a href="/login"  className="testgit"  role="button">Login</a></div>
                        </Form>
                       
                    </div>
                </Container>

            }
        </React.Fragment>
    );
}

export default Registration;