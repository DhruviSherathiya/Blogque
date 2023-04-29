import { Link, useNavigate } from "react-router-dom";
import React from 'react';

function NavBar() {
  const token = localStorage.getItem("usertoken")
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('usertoken');
    navigate('/')
  };
  return (
    <div>
      <nav class="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation">
        <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container">
			    <Link class="navbar-brand" to="/"> <img src={process.env.PUBLIC_URL + '/img/banner.png'} alt="Logo" /> </Link>
	        <div class="collapse navbar-collapse" id="navbarsExampleDefault">
		    <ul class="navbar-nav ml-auto">
			    <li class="nav-item active"> <Link class="nav-link" to="/">Home</Link></li>
			    {token && <li class="nav-item"><Link class="nav-link" to="create">Create New</Link></li>}
          {token && <li class="nav-item"> <Link class="nav-link" to="profile">Profile</Link></li>} 
				  {!token && <li class="nav-item"><Link class="nav-link" to="login">Login</Link></li> }
          {!token && <li class="nav-item"><Link class="nav-link" to="signup">Signup</Link></li> }
          {token && <li class="nav-item"><button class="nav-link" onClick={handleLogout}>Logout</button></li> }
		    </ul>
		    <form class="form-inline my-2 my-lg-0">
			    <input class="form-control mr-sm-2" type="text" placeholder="Search" />
			    <span class="search-icon"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path></svg></span>
		    </form>
		    </div>
        </div>
    </nav>
    </div>
  )
}

export default NavBar
