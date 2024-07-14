import axios from "./customize-api";

const fetchAllDepartment = async() => {
    return await axios.get('/departments')
}

export {
    fetchAllDepartment
}