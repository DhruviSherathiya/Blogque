import React, {useState} from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  })

  const setValue = ({currentTarget: input}) => {
    setUser({...user, [input.name]:input.value})
  }

  const userRegister = async e =>{
    e.preventDefault();
    console.log(user)
    try {
      const response = await axios.post("https://localhost:7228/api/Auth/Register", user);
      console.log(response.data);
      toast.success('You are registered!');
    } catch (error) {
      console.error(error);
      toast.error('Username already taken!');
    }
  }

  return (
    <div>
      <form class="container" onSubmit={userRegister}>
        <h3 class="form-heading">Sign Up</h3>
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
            SignUp
          </button>
        </div>
        <br></br>
        <p className="text-center">
          Already have an account? <Link class="nav-link" to="/login">SignIn</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  )
}

export default Signup
