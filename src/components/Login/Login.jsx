import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  return (
    <>
    <div className="container">
      <form>
        <h2>Logga in</h2>
        <div className="form-control">
          <input placeholder='Email' type='text'></input>
        </div>
        <div className="form-control">
          <input placeholder='Lösenord' type='password'></input>
        </div>
        <button className='Login-btn'>Logga in</button>
        <p className='bli-medlem'>Inget konto? <span className='bli-medlem-underline' onClick={() =>{
          navigate("/register")
        }}>Bli medlem!</span></p>
        <button className='abort-btn'>Avbryt</button>
      </form>
    </div>
    </>
  )
}

// https://www.google.com/