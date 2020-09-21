import { Grid, Toolbar } from "@material-ui/core";
import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { AppBar } from '@material-ui/core'
import { ToolBar } from '@material-ui/core'

const Header =() => {
  
  const styleLinkNavbar={
    color: "black",
    textDecoration: "none"
  }

  const [user, setUser] = useContext(UserContext)
  const handleLogout = () =>{
    setUser(null)
    localStorage.removeItem("user")
  }

  return(
    <AppBar position="static">
      <Toolbar>
        <Grid justify="space-between" container spacing={24}>
          <Grid Item>
            <button color="inherit">
              <Link style={styleLinkNavbar} to="/"> Home </Link>
            </button>
            {
                  user !== null && (
                    <>
                      <button color="inherit">
                        <Link style={styleLinkNavbar} to="/movies"> Movies </Link>
                      </button>
                      <button color="inherit">
                        <Link style={styleLinkNavbar} to="/games"> Games </Link>
                      </button>
                  </>
                  )
              }
          </Grid>
          <Grid Item>
            <div>
              {
                  user === null && (
                    <>
                      <button color="inherit">
                        <Link style={styleLinkNavbar} to="/login"> Login </Link>
                      </button>
                      <button color="inherit">
                        <Link style={styleLinkNavbar} to="/register"> Register </Link>
                      </button>
                  </>
                  )
              }

              {
                  user !== null && (
                    <>
                      <button color="inherit">
                        {/* {user.name}  */} Ya
                      </button>
                      <button color="inherit">
                        <Link style={styleLinkNavbar} onClick={handleLogout} to="/logout"> Logout </Link>
                        
                      </button>
                  </>
                  )
              }
            </div>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header