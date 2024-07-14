import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProjectList from './components/projectList';
import "./App.css"
import EmployeeList from './components/employeeList';
import AddProject from './components/addProject';

function App() {
  return (
    <Router>
    <Routes>
      <Route path='/' element={<ProjectList/>} />
      <Route path='/departments/:id/employees' element={<EmployeeList/>} />
      <Route path='/projects/add' element={<AddProject/>} />
    </Routes>
    </Router>
  );
}

export default App;
