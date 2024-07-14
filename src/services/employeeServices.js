import axios from "./customize-api";

const fetchEmployees = async() => {
    return await axios.get('/employees')
}

const fetchAllEmployeeByDepartment = async(departId) => {
    return await axios.get(`/employees?department=${departId}`)
}

export {
    fetchEmployees,
    fetchAllEmployeeByDepartment
}