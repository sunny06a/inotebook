import React, { useState } from 'react'
// import { useHistory } from 'react-router';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials,setCredentials]=useState({email:"",password:""})
    let navigate=useNavigate();
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const response=await fetch('http://localhost:5000/api/auth/login',{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json= await response.json();
          console.log(json)
          if(json.auth_token){
                //save the auth token and redirect
                localStorage.setItem('token',json.auth_token);
                navigate('/')
                console.log("logged in");
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
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email}aria-describedby="emailHelp" onChange={onchange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" value={credentials.password}name='password' onChange={onchange}/>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
 </>
  )
}