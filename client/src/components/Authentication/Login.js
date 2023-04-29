import React, {useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {

  const navigate = useNavigate()

  const [user, setUser] = useState({
      username: "",
      password: ""
  })

  const setValue = ({currentTarget: input}) => {
    setUser({...user, [input.name]:input.value})
  }

  const userLogin = async e =>{
    e.preventDefault();
    console.log(user)
    try {
      if(user.username === "" || user.password === ""){
        toast.error("Fill required field!", {
          position: 'top-center'
        });
      }
      else {
        const response = await axios.post("https://localhost:7228/api/Auth/Login", user);
        console.log(response.data);
        if(response.data.status == 200){
          localStorage.setItem('usertoken', response.data.token)
          navigate('/')
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('Incorrect Username or password!');
    }
  }
  return (
    <div>
      <form class="container" onSubmit={userLogin}>
        <h3 class="form-heading">Sign In</h3>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" 
                className="form-control" 
                placeholder="Enter username"
                name="username"
							  onChange={setValue}
							  value={user.username} />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" 
                className="form-control" 
                placeholder="Enter password"
                name="password"
							  onChange={setValue}
							  value={user.password} />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        <br></br>
        <p className="text-center">
          <Link class="nav-link" to="/signup">Create New Account</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Login
