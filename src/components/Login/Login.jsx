import e from 'express'
import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'


export default function Login() {
  const [token, setToken] = useOutletContext()
  // states för användarnamn och lösenord

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
  };
  const userData = {
    email,
    password
  };

  try{
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(userData)
    })
  } catch{

  }

  return (
    <>
    <div className="container">
      <form>
        <h2>Logga in</h2>
        <div className="form-control">
          <input placeholder='Email' type='text' onChange={setEmail(e.target.value)}></input>
        </div>
        <div className="form-control">
          <input placeholder='Lösenord' type='password' onChange={setPassword(e.target.value)}></input>
        </div>
        <button className='Login-btn' onClick={handleSubmit}>Logga in</button>
        <p className='bli-medlem'>Inget konto? <span className='bli-medlem-underline' onClick={() =>{
          navigate("/register")
        }}>Bli medlem!</span></p>
        <button className='abort-btn'>Avbryt</button>
      </form>
    </div>
    </>
  )
}

