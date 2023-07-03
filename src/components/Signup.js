import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
export default function Signup() {

  const [credentials,setCredentials]=useState({name:"",email:"",password:""})
  let navigate=useNavigate();
  const handleSubmit=async (e)=>{
      e.preventDefault();
      const response=await fetch('http://localhost:5000/api/auth/createuser',{
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
        });
        const json= await response.json();
        console.log(json)
        if(json.auth_token){
              //save the auth token and redirect
              localStorage.setItem('token',json.auth_token);
              navigate('/')
              console.log("signed");
        }
        else{
              alert("invalid credentials")
        }
  }

  const onchange=(e)=>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}
  return (
    <>
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credentials.name}aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email}aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password}name='password' onChange={onchange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="confirm-password" value={credentials.password} name='confirm-password' onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>

    </>
  )
}
