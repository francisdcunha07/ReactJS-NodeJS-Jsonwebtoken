import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { Button, Navbar, Container } from 'react-bootstrap';
import EmployeeDetails from '../EmployeeDetails/EmployeeDetails';


const Layout = (props) => {
    const [employeeDetails, setEmployeeDetails] = useState([]);
    const { checkAuthenticated, logOut } = useContext(AuthContext);
    useEffect(() => {
        if (checkAuthenticated()) {
            axios.get('/api/getemployeedetails', { headers: { "authorization": "Bearer " + localStorage.getItem('access_token') } }).then(result => {
                setEmployeeDetails([...result.data])
            })
        }
    }, [])

    const signOut = () => {
        logOut();
        props.history.push('/login')
    }

    return (
    <React.Fragment>
         <Navbar className=" justify-content-between space">
         <Navbar.Brand className="logoColor">Employee Details</Navbar.Brand>
            <Button onClick={signOut}> Log Out</Button>
        </Navbar>
        {checkAuthenticated() ? (employeeDetails && employeeDetails !== null ?
            <EmployeeDetails details={employeeDetails} /> : 'No access') :

            <Redirect to={{ pathname: "/login" }} />}
       <Container ><p> Data Source : Fake Data, The Json token will expire in 2 minutes and the employee will no longer be available to the user.</p></Container>
    </React.Fragment>);
}

export default Layout;