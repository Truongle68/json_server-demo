import React, { useEffect, useState } from 'react'
import { Button, Table, Form, FormCheck } from 'react-bootstrap'
import { fetchAllProject, fetchProjectByDepartment } from '../services/projectService'
import { fetchAllDepartment } from '../services/departmentService'
import {Link, useNavigate} from 'react-router-dom'


const ProjectList = () => {
    const [projectList, setProjectList] = useState([])
    const [departmentList, setDepartmentList] = useState([])
    const [selectedDepartment, setSelectedDepartment] = useState("all")
    
    const navigate = useNavigate()

        const fetchProjects = async () => {
            try {
                const { data } = await fetchAllProject()
                setProjectList(data)
            } catch (error) {
                console.error(error.message)
            }
        }

    const fetchDepartments = async () => {
        try {
            const { data } = await fetchAllDepartment()
            setDepartmentList(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    const handleRadioChange = async(e) => {
        setSelectedDepartment(e.target.value)
    }    

    const filterProject = async (departId) => {
        try {
            if (departId === 'all') {
                fetchProjects()
            } else {
                setProjectList([])
                const { data } = await fetchProjectByDepartment(departId)
                setProjectList(data)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(() => {
        fetchProjects()
        fetchDepartments()
    }, [])

    useEffect(()=> {
        filterProject(selectedDepartment)
    },[selectedDepartment])


    return (
        <>
            <h2 className='title'>List of Projects</h2>
            <div className='white-board'>
                <div className='d-container'>
                    <span>Departments</span>
                    <Form >
                            <FormCheck
                                type='radio'
                                label= 'All'
                                name='department'
                                value='all'
                                checked={selectedDepartment==='all'}
                                onChange={handleRadioChange}
                            />
                        {departmentList && departmentList.length > 0 &&
                            departmentList.map((depart) => (
                              <div key={depart.id}>  
                            <Form.Check
                                type="radio"
                                label={depart.name}
                                name='department'
                                value={depart.id}
                                checked={selectedDepartment===depart.id}
                                onChange={handleRadioChange}
                            />
                            </div>
                            ))
                        }



                    </Form>
                </div>
                <div className='table-container'>
                    <Button onClick={()=>navigate('/projects/add')} variant='success'>Create new Project</Button>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Project name</th>
                                <th>Description</th>
                                <th>Start date</th>
                                <th>Type</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectList && projectList.length > 0 &&
                                projectList.map((project) => {
                                    const department = departmentList.find(depart => depart.id == project.department)
                                    return(
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.name}</td>
                                        <td>{project.description}</td>
                                        <td>{project.startDate}</td>
                                        <td>{project.type}</td>
                                        <td>{department ? <Link to={`/departments/${department.id}/employees`}>{department.name}</Link> : "Unknown"}</td>
                                    </tr>
                                    )
                            })
                            }

                        </tbody>
                    </Table>
                </div>
            </div>

        </>
    )
}

export default ProjectList