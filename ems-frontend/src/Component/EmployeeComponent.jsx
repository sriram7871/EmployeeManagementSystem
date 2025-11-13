import React , {useEffect, useState} from 'react'
import { createEmployee, updateEmployee } from '../Services/EmployeeService'
import { useNavigate  , useParams} from 'react-router-dom'
import { getEmployee } from '../Services/EmployeeService'

const AddEmployee = () => {


    const[firstName , setFirstName] = useState('')
    const[lastName , setLastName] = useState('')
    const[email , setEmail] = useState('')

    const {id} = useParams();

    const[errors,setErrors] = useState({
        firstName : '',
        lastName : '',
        email : ''
    })

    const navigator = useNavigate();

    useEffect(() =>{
        if(id){
            getEmployee(id).then((response)=> {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    },[id])


    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){

        const employee = {firstName , lastName , email}
        console.log(employee);

        if(id){
            updateEmployee(id,employee).then((response) =>{
                console.log(response.data)
                navigator('/employees');
            }).catch(error => {
                console.error(error);
            })
        }

        createEmployee(employee).then((response) => {
            console.log(response.data)
            navigator('/employees')
        })
    }
}


    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

        if(firstName.trim()){
            errorsCopy.firstName = '';
        }else{
            errorsCopy.firstName = "First Name is required"
            valid =false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }else{
            errorsCopy.lastName = "last Name is required"
            valid = false;
        }

          if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = "email is required"
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
             return <h2 className='text-center'>Update Employee</h2>
        }else{
             return <h2 className='text-center'> Add Employee</h2>
        }
    }
  return (
    <div>
        <div className='container'>
            <br /> <br />
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>firstName</label>
                                <input type="text"
                                placeholder='Enter Employee First Name'
                                name = 'firstName'
                                value={firstName}
                                className={`form-control ${errors.firstName ? 'is-invalid' : '' }`}
                                onChange={(e) =>{setFirstName(e.target.value);}}
                                ></input>
                                {errors.firstName && <div className = 'invalid-feedback'> {errors.firstName} </div>}

                            </div>


                             <div className='form-group mb-2'>
                                <label className='form-label'>lastName</label>
                                <input type="text"
                                placeholder='Enter Employee last Name'
                                name = 'lastName'
                                value={lastName}
                                className={`form-control ${errors.lastName ? 'is-invalid' : '' }`}
                                onChange={(e) =>{setLastName(e.target.value);}}
                                ></input>
                                {errors.lastName && <div className = 'invalid-feedback'> {errors.lastName} </div>}

                            </div>


                            <div className='form-group mb-2'>
                                <label className='form-label'>Email</label>
                                <input type="text"
                                placeholder='Enter Employee Email id'
                                name = 'email'
                                value={email}
                                className={`form-control ${errors.lastName ? 'is-invalid' : '' }`}
                                onChange={ (e) =>{ setEmail(e.target.value)}}
                                ></input>
                                {errors.email && <div className = 'invalid-feedback'> {errors.email} </div>}

                            </div>

                    <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                        </form>
                    </div>

                </div>

            </div>

        </div>
    </div>
  )
}

export default AddEmployee