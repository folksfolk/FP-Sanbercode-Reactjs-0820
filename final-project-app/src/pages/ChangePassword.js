import React, { useState, useContext } from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext";

const ChangePassword = () => {
  
  const [user, setUser] =  useContext(UserContext)
  const [input, setInput]  =  useState({
    current_password: "",
    new_password: "",
    new_confirm_password: ""
  })

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()
    axios.post(`https://backendexample.sanbersy.com/api/change-password`, 
    {
      current_password: input.current_password,
      new_password: input.new_password,
      new_confirm_password: input.new_confirm_password
    }, {headers: {"Authorization" : `Bearer ${user.token}`}})
    .then((res)=>{
      var user = res.data.user
      var token = res.data.token
      var currentUser = {
        current_password: user.current_password, 
        new_password: user.new_password, 
        new_confirm_password: user.new_confirm_password, 
        token}
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
      case "current_password":
      {
        setInput({...input, current_password: value});
        break
      }
      case "new_password":
      {
        setInput({...input, new_password: value});
        break
      }
      case "new_confirm_password":
      {
        setInput({...input, new_confirm_password: value});
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
            Cureent Password:
          </label>
          <input style={{float: "right"}} type="password" name="current_password" value={input.current_password} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            New Password:
          </label>
          <textarea style={{float: "right"}} type="password" name="new_password" value={input.new_password} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div>
          <label style={{float: "left"}}>
            Confirm New Password:
          </label>
          <textarea style={{float: "right"}} type="password" name="new_confirm_password" value={input.new_confirm_password} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <button>Login</button>
      </form>
    </>
  )
}

export default ChangePassword