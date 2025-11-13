import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { HelloWorld } from './HelloWorld'
import { ListOfEmployeesComponent } from './Component/ListOfEmployeesComponent'
import HeaderComponent from './Component/HeaderComponent'
import { FooterComponent } from './Component/FooterComponent'
import EmployeeComponent from './Component/EmployeeComponent'
import{ BrowserRouter , Routes , Route} from 'react-router-dom'

function App() {
  return (
    <>
  <BrowserRouter>
  <HeaderComponent/>
  
  <Routes>
    // http://localhost:3002
    <Route path ='/' element = {<ListOfEmployeesComponent />}></Route>

    //http://localhost:3002/employees
    <Route path='/employees' element = {<ListOfEmployeesComponent />} ></Route>

    //http:localhost:3002/add-employee
    <Route path ='/add-employee' element ={<EmployeeComponent />}></Route>
    //http :localhost:3002/update-employee/id
    <Route path = '/update-employee/:id' element = {<EmployeeComponent />} ></Route>
     </Routes>
  <FooterComponent/>
 
  </BrowserRouter>
  </>
)
}

export default App
