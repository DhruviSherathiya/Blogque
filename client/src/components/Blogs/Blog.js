import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './Blog.css';
import moment from 'moment';

function Blog() {
  //code for geeting blogid
  const path = window.location.pathname
  const array = path.split("/")
  const id = array[2]
  const [blog, setBlog] = useState("");
  const [author, setAuthor] = useState("");

  const aid = blog.authorId;
  const getAuthor = () => {
    axios.get(`https://localhost:7228/api/Users/${aid}`)
      .then((response) => {
        setAuthor(response.data.username);
        console.log("Author id success")
        console.log(response.data.username)
      })
      .catch((err) => {
        console.log("Author id error")
        console.log(err);
      })
  }

  if (blog.authorId !== undefined) {
    console.log(`Author Id ${aid}`)
    getAuthor();
  }

  const pdate = moment(blog.publishDate).format('MMM D, YYYY');

  const getBlogDetails = () => {
    axios.get(`https://localhost:7228/api/BlogPosts/${id}`)
      .then((response) => {
        setBlog(response.data);
        console.log("Blog details");
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getBlogDetails();
  }, [])


  return (
    <div className="blog-page-container">
      <h1 className="blog-title">{blog.title}</h1>
      <img
        className="banner-image"
        src={blog.imageURL}
        alt="Banner Image"
      />
      <div className="blog-content">
        <p> {blog.content}</p>
      </div>
      {/* <div className="author-container">
        <p className="author-name">Published By <span>{author} on {pdate}</span></p>
      </div> */}
      <div class="footer container">
        <p class="pull-left"> Published by <a target="_blank" href="">{author}</a> </p>
        <p class="pull-right"> {pdate} </p>
      </div>
    </div>
  )
}

export default Blog
