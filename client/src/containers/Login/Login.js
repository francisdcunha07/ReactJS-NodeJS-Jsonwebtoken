import React, { useState,  useContext } from 'react';
import { Container, Button, Form, Navbar } from 'react-bootstrap';
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showErrorAlertMsg, setShowErrorAlertMsg] = useState(false);
  const { checkAuthenticated, logOut } = useContext(AuthContext);

  

  const submitHandler = async (e) => {
    e.preventDefault();
    axios.post('/api/login', { email, password }).then(res => {
      setEmail('');
      setpassword('');
      localStorage.setItem('access_token', res.data.access_token);
     // setTimeout(()=> {
     //   logOut();
     //   props.history.push({ pathname: '/login' })
    //  }, 10000)
    setShowErrorAlertMsg('')
      props.history.push({ pathname: '/' })
    }).catch(err => {
      setShowErrorAlert(true)
      setShowErrorAlertMsg('')
      if(err.message.includes(403)){
        setShowErrorAlertMsg('Please enter the correct credentials ')
      }else{
        setShowErrorAlertMsg('Unauthorized User ')
      }
    //  console.log(err.message)
    })
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
        checkAuthenticated() ? <Redirect to={{ pathname: "/" }} />  : <Container className="loginContainer  ">
        <div className="dim">
        <Form onSubmit={submitHandler}  className="col-lg-8 mx-auto mt-5" >
          {showErrorAlert ? alertErr : ''}
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required onChange={(e) => setEmail(e.target.value)} />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
         </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required onChange={(e) => setpassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit" >
            Submit
         </Button>
         <div style={{paddingTop:'1vw'}}> <a href="/registration"   role="button">Register</a></div>
        </Form>
        
        </div>
       
      </Container>

      }
 </React.Fragment>
  );
}

export default Login;