import React from 'react';
import { Table, Container } from 'react-bootstrap'
import './EmployeeDetails.css'

const EmployeeDetails = (props) => {
    const {details} =props;
    
    return (
        <Container>
            <Table striped bordered hover responsive  >
                <thead>
                    <tr>
                        <th>#</th>
                        <th> Name</th>
                        <th>Salary</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    { details.length ? details.map ( (employee, i) => {
                     return (  <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.employee_name}</td>
                        <td>{employee.employee_salary}</td>
                        <td>{employee.employee_age}</td>
                    </tr>)
                    }) : <tr><td colspan="4">The token has expired</td></tr>}
                    
                  
                </tbody>
            </Table>
        </Container>

    );
}

export default EmployeeDetails;