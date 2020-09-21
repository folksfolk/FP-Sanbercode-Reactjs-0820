import React, {useState, useEffect, useContext} from "react"
import axios from "axios"
import { UserContext } from "../context/UserContext"
import "./Games.css"

const Games = () => {
  
  const [game, setGame] =  useState(null)
  const [input, setInput]  =  useState({
    name: "",
    genre: "",
    singlePlayer: false,
    multiPlayer: 0,
    platform: "",
    release: 2020
  })
  const [selectedId, setSelectedId]  =  useState(0)
  const [statusForm, setStatusForm]  =  useState("create")
  const [search, setSearch] = useState("")
  const [user, setUser] =  useContext(UserContext)

  useEffect( () => {
    if (game === null){
      axios.get(`https://backendexample.sanbersy.com/api/data-game`)
      .then(res => {
          setGame(res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            genre: el.genre,
            singlePlayer: el.singlePlayer,
            multiPlayer: el.multiPlayer,
            platform: el.platform,
            release: el.release,
            image_url: el.image_url
          }
        }))
      })
    }
  }, [game])
  
  const handleChange = (event) =>{
    let typeOfInput = event.target.name

    switch (typeOfInput){
      case "name":
      {
        setInput({...input, title: event.target.value});
        break
      }
      case "genre":
      {
        setInput({...input, genre: event.target.value});
        break
      }
      case "singlePlayer":
      {
        setInput({...input, singlePlayer: event.target.value});
          break
      }
      case "multiPlayer":
      {
        setInput({...input, multiPlayer: event.target.value});
          break
      }
      case "platform":
        {
          setInput({...input, platform: event.target.value});
            break
        }
      case "release":
        {
          setInput({...input, release: event.target.value});
            break
        }
      case "image_url":
        {
          setInput({...input, image_url: event.target.value});
            break
        }
    default:
      {break;}
    }
  }

  const handleSubmit = (event) =>{
    // menahan submit
    event.preventDefault()

    let title = input.title
    console.log(input)

    if (title.replace(/\s/g,'') !== ""){      
      if (statusForm === "create"){        
        axios.post(`https://backendexample.sanbersy.com/api/data-game`, {
          name: input.name,
          genre: input.genre,
          singlePlayer: input.singlePlayer,
          multiPlayer: parseInt(input.multiPlayer),
          platform: input.platform,
          release: input.release
        }, {headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(res => {
            setGame([...game, {id: res.data.id, ...input}])
        })
      }else if(statusForm === "edit"){
        axios.put(`https://backendexample.sanbersy.com/api/data-game/${selectedId}`, {
            name: input.name,
            genre: input.genre,
            singlePlayer: input.singlePlayer,
            multiPlayer: parseInt(input.multiPlayer),
            platform: input.platform,
            release: input.release
        }, {headers: {"Authorization" : `Bearer ${user.token}`}})
        .then(res => {
            let singleGame = game.find(el=> el.id === selectedId)
            singleGame.name = input.name
            singleGame.genre = input.genre
            singleGame.singlePlayer = input.singlePlayer
            singleGame.multiPlayer = input.multiPlayer
            singleGame.platform = input.platform
            singleGame.release = input.release
            setGame([...game])
        })
      }
      
      setStatusForm("create")
      setSelectedId(0)
      setInput({
        name: "",
        genre: "",
        singlePlayer: false,
        multiPlayer: 0,
        platform: "",
        release: 2020,
        image_url: ""
      })
    }

  }

  const Action = ({itemId}) =>{
    const handleDelete = () => {  
      let newGames = game.filter(el => el.id !== itemId)
  
      axios.delete(`https://backendexample.sanbersy.com/api/data-game/${itemId}`)
      .then(res => {
        console.log(res)
      })
            
      setGame([...newGames])
      
    }
    
    const handleEdit = () =>{
      let singleGame = game.find(x=> x.id === itemId)
      setInput({
        name: singleGame.name,
        genre: singleGame.genre,
        singlePlayer: singleGame.singlePlayer,
        multiPlayer: singleGame.multiPlayer,
        platform: singleGame.platform,
        release: singleGame.release,
        image_url: singleGame.image_url
      })
      setSelectedId(itemId)
      setStatusForm("edit")
    }

    return(
      <>
        <button onClick={handleEdit}>Edit</button>
        &nbsp;
        <button onClick={handleDelete}>Delete</button>
      </>
    )
  }

//   function truncateString(str, num) {
//     if (str.length <= num) {
//       return str
//     }
//     return str.slice(0, num) + '...'
//   }
  
//   truncateString("A-tisket a-tasket A green and yellow basket", 8);

  const submitSearch = (e) =>{
    e.preventDefault()
    axios.get(`https://backendexample.sanbersy.com/api/data-game`)
    .then(res => {
      let resGames = res.data.map(el=>{ return {
            id: el.id, 
            name: el.name, 
            genre: el.genre,
            singlePlayer: el.singlePlayer,
            multiPlayer: el.multiPlayer,
            platform: el.platform,
            release: el.release,
            image_url: el.image_url
        }
      })

      let filteredGames = resGames.filter(x=> x.name.toLowerCase().indexOf(search.toLowerCase()) !== -1)
      setGame([...filteredGames])
    })
 
  }

  const handleChangeSearch = (e)=>{
    setSearch(e.target.value)
  }

  return(
    <>
      <div>
        <form onSubmit={submitSearch}>
          <input type="text" value={search} onChange={handleChangeSearch} />
          <button>search</button>
        </form>
      </div>

      <h1>Daftar Game</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Name</th>
            <th>Genre</th>
            <th>Single Player</th>
            <th>Multi Player</th>
            <th>Platform</th>
            <th>Release</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>

            {
              game !== null && game.map((item, index)=>{
                return(                    
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.genre}</td>
                    <td>{item.singlePlayer}</td>
                    <td>{item.multiPlayer}</td>
                    <td>{item.platform}</td>
                    <td>{item.release}</td>
                    <td>
                      <Action itemId={item.id} />

                    </td>
                  </tr>
                )
              })
            }
        </tbody>
      </table>
      {/* Form */}
      <h1>Games Form</h1>
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
            Genre:
          </label>
          <textarea style={{float: "right"}} type="text" name="genre" value={input.genre} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Single Player:
          </label>
          <select style={{float: "right"}} name="player" name="singlePlayer" value={input.singlePlayer} onChange={handleChange}>
            <option value="None" selected>-- Select --</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
          </select>
          {/* <input style={{float: "right"}} type="number" max={10} min={0}  name="singlePlayer" value={input.singlePlayer} onChange={handleChange}/> */}
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
              Multi Player:
          </label>
          <select style={{float: "right"}} name="player" name="multiPlayer" value={input.multiPlayer} onChange={handleChange}>
            <option value="None" selected>-- Select --</option>
            <option value="1">Yes</option>
            <option value="2">No</option>
          </select>
          {/* <input style={{float: "right"}} type="number" max={10} min={0} name="multiPlayer" value={input.multiPlayer} onChange={handleChange}/> */}
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Platform:
          </label>
          <input style={{float: "right"}} type="text" name="platform" value={input.platform} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Release:
          </label>
          <input style={{float: "right"}} type="number" max={2020} min={1980} name="release" value={input.release} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <div style={{marginTop: "20px"}}>
          <label style={{float: "left"}}>
            Image Url:
          </label>
          <textarea style={{float: "right"}} cols="50" rows="3" type="text" name="image_url" value={input.image_url} onChange={handleChange}/>
          <br/>
          <br/>
        </div>
        <br/>
        <br/>
        <button>submit</button>
      </form>
    </>
  )
}

export default Games