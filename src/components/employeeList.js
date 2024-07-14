import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import { fetchAllEmployeeByDepartment } from '../services/employeeServices'
import { fetchAllDepartment } from '../services/departmentService'

const EmployeeList = () => {

    const {id} = useParams()
    const [employeeList, setEmployeeList] = useState([])
    const [departmentList, setDepartmentList] = useState([])

    var department = departmentList.find((depart)=> depart.id === id)

    const fetchDepartments = async () => {
        try {
            const { data } = await fetchAllDepartment()
            setDepartmentList(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    const filterEmployees = async() => {
        if(!id){
            console.log('No department has been selected!')
            return
        }
        try {
            const {data} = await fetchAllEmployeeByDepartment(id)
            console.log(data)
            setEmployeeList(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=>{
        fetchDepartments()
        filterEmployees()
    },[])

  return (
    <div>
        <h2 className='title'>List of Employees</h2>
        <div className='e-board'>
            <Link to={'/'}>Home page</Link>
            
            <div className='d-title'>Department: {department ? department.name : ""}</div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Employee name</th>
                        <th>Date of birth</th>
                        <th>Gender</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeList && employeeList.length>0 && 
                    employeeList.map((e)=>(
                        <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.name}</td>
                        <td>{e.dob}</td>
                        <td>{e.gender}</td>
                        <td>{e.position}</td>
                    </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    </div>
  )
}

export default EmployeeList