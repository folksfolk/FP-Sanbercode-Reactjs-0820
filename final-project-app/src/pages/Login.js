import React, { useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext";

const Login = () => {
  
  const [user, setUser] =  useContext(UserContext)
  const [input, setInput]  =  useState({
    email: "",
    password: ""
  })

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()
    axios.post(`https://backendexample.sanbersy.com/api/user-login`, 
    {
      email: input.email,
      password: input.password,
    }, {headers: {"Authorization" : `Bearer ${user.token}`}})
    .then((res)=>{
      var user = res.data.user
      var token = res.data.token
      var currentUser = {name: user.name, email: user.email, token}
      setUser(currentUser)
      localStorage.setItem("user", JSON.stringify(currentUser))
    }).catch((err)=>{
      alert(err)
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name

    switch (name){
      case "email":
      {
        setInput({...input, email: value});
        break
      }
      case "password":
      {
        setInput({...input, password: value});
        break
      }
    default:
      {break;}
    }
  }

  return(
    <>
      {/* Form */}
      <h1>Login Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Email:
          </label>
          <input style={{float: "right"}} type="email" name="email" value={input.email} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Password:
          </label>
          <textarea style={{float: "right"}} type="password" name="password" value={input.password} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <button>Login</button>
      </form>
    </>
  )
}

export default Login