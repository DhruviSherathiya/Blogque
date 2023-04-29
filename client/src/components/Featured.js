import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post2 from './Blogs/Post2';

function Featured() {

  const [ fblogs, setBlogs ] = useState([]);

  const getFeaturedBlgs = () => {
    axios.get('https://localhost:7079/api/BlogPosts')
    .then((response) => {
      console.log(response.data);
      setBlogs(response.data);
      console.log("Dhr");
      console.log(fblogs);
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  useEffect(() => {
    getFeaturedBlgs();
  }, [])

  return (
    <div>
      <section class="featured-posts container">
	    <div class="section-title">
		    <h2><span>Featured</span></h2>
	    </div>
	    <div class="card-columns listfeaturedtag">
        {fblogs && fblogs.map((i) => {
          return (
            <Post2 id={i.id} key={i.id} />
          );
        })}
        </div>
	</section>
    </div>
  )
}

export default Featured
