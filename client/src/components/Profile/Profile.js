import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Post3 from './Post3';

function Profile() {
  const tokenstr = localStorage.getItem("usertoken")
  const array = tokenstr.split("/")
  const token = array[0]
  const uid = array[1]
  
  const [ fblogs, setBlogs ] = useState([]);
  
  const getFeaturedBlgs = async () => {
    try {
      const res = await axios.get(`https://localhost:7228/blog/${uid}`, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `bearer ${token}`
        }
      });
      setBlogs(res.data);
      // console.log(res.data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getFeaturedBlgs();
  }, [])

  return(
    <div>
      <section class="recent-posts container">
	    <div class="section-title">
		    <h2><span>Your Blogs</span></h2>
	    </div>
	    <div class="card-columns listrecent">
          {fblogs && fblogs.map((i) => {
            return (
            <Post3 id={i.id} key={i.id} />
            );
          })}
        </div>
      </section>
    </div>
  )
}

export default Profile
