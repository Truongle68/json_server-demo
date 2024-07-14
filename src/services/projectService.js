import axios from "./customize-api";

const fetchAllProject = async() => {
    return await axios.get('/projects')
}

const fetchProjectByDepartment = async(departId) => {
    return await axios.get(`/projects?department=${departId}`)
}

const postNewProject = async(projectData) => {
    return await axios.post('/projects',projectData)
}

export {
    fetchAllProject,
    fetchProjectByDepartment,
    postNewProject
}