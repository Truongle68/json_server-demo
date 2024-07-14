import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { fetchAllProject, postNewProject } from '../services/projectService'
import Button from '@mui/material'


const AddProject = () => {

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [date, setDate] = useState("")
    const [type, setType] = useState("")
    const [department, setDepartment] = useState(1)
    const [projectList, setProjectList] = useState([])

    const getProjects = async() => {
        try {
            const {data} = await fetchAllProject()
            setProjectList(data)
        } catch (error) {
            console.error(error.message)
        }
    }

    useEffect(()=> {
        getProjects()
    },[])

    const navigate = useNavigate()

    const handleBlur = () => {
        if (!name) {
          window.alert('Please enter the form fields that are required');
        }
      };

    const handleSubmit = async(e) => {
        e.preventDefault()

        const formatDate = (d) => {
            const date = new Date(d)
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
          };

        const projectData = {
            id: `${projectList.length + 1}`,
            name, description,
            startDate: formatDate(date),
            type,
            department: parseInt(department)
        }

        try {
            const {data} = await postNewProject(projectData)
            console.log(data)
            if(data){
                window.alert('Create success')
                navigate('/')
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <div>
            <h2 className='title'>Add a new Project</h2>
            <div className='e-board'>
                <Link  to={'/'}>Home page</Link>
                <Form>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Project name<span style={{color:"red"}}>*</span></Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e)=>setName(e.target.value)}
                            onBlur={handleBlur}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            as="textarea"
                            rows={4}
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Start date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e)=>setDate(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                            type="text"
                            value={type}
                            onChange={(e)=>setType(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formName">
                        <Form.Label>Department</Form.Label>
                        <Form.Select
                            value={department}
                            onChange={(e)=>setDepartment(e.target.value)}
                        >
                            <option value={1}>Integrated System</option>
                            <option value={2}>Software</option>
                            <option value={3}>Information Assurance</option>
                        </Form.Select>
                    </Form.Group>

                    <Button onClick={handleSubmit} variant='primary'>Create</Button>
                </Form>
            </div>
        </div>
    )
}

export default AddProject