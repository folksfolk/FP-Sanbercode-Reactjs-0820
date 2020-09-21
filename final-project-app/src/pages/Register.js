import React, { useState, useContext } from "react"
import { UserContext } from "../context/UserContext"
import axios from "axios"

const Register = () => {
  
  const [user, setUser] =  useContext(UserContext)
  const [input, setInput]  =  useState({
    name: "",
    email: "",
    password: ""
  })

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()
    axios.post(`https://backendexample.sanbersy.com/api/register`, 
    {
      name: input.name,
      email: input.email,
      password: input.password,
    }).then((res)=>{
      var user = res.data.user
      var token = res.data.token
      var currentUser = {name: user.name, email: user.email, token}
      setUser(currentUser)
      localStorage.setItem("user", JSON.stringify(currentUser))
    }).catch((error)=>{
      alert(error)
    })
  }

  const handleChange = (event) =>{
    let value = event.target.value
    let name = event.target.name

    switch (name){
      case "name":
      {
        setInput({...input, name: value});
        break
      }
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
      <h1>Register Form</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label style={{float: "left"}}>
            Name:
          </label>
          <input style={{float: "right"}} type="text" name="name" value={input.name} onChange={handleChange}/>
          <br/>
          <br/>
        </div>  
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
        <button>Register</button>
      </form>
    </>
  )
}

export default Register