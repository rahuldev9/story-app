import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
function Nav() {
  const navigate=useNavigate()
  const [color,setcolor]=useState('')
  const current=(id)=>{
    setcolor(id)
  }
  const auth=localStorage.getItem('user');
  // const logout=()=>{
  //   localStorage.clear()
  //   navigate('/signup')
  // }
  return (
    <>
    <div style={{display:'flex',background:'black',flexDirection:'column',justifyContent:'space-evenly',alignContent:'center',alignItems:'center',position:'fixed',bottom:'0px',width:'100%',zIndex: "9999"}}>
      { auth ? <div style={{display:'flex',flexDirection:'row'}}>
        <h4><Link to='/home'><i class="fa-solid fa-house" onClick={()=>current(1)} style={{color:color===1?'green':'white'}}></i></Link></h4>
        <h4><Link to='/products'><i class="fa-solid fa-list" onClick={()=>current(2)} style={{color:color===2?'green':'white'}}></i></Link></h4>
        <h4><Link to='/add'><i class="fa-regular fa-square-plus" onClick={()=>current(3)} style={{color:color===3?'green':'white'}}></i></Link></h4>
        {/* <h4><Link to='/update'>update products</Link></h4> */}
        <h4><Link to='/profile'><i class="fa-solid fa-user" onClick={()=>current(4)} style={{color:color===4?'green':'white'}}></i></Link></h4>
        {/* <h4><Link onClick={logout} to='/sigup'>Logout({JSON.parse(auth).name})</Link></h4> */}
        </div>
        :
        <div style={{display:'flex',flexDirection:'row'}}>
          
          <h4 ><Link to='/signup' style={{color:'white'}}>Signup</Link></h4>
          <h4 ><Link to='/login' style={{color:'white'}}>Login</Link></h4>
        </div>
      }
      
    </div>
    </>
  )
}

export default Nav



