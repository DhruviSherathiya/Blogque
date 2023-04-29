import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateBlog() {
  const navigate = useNavigate()
  const tokenstr = localStorage.getItem("usertoken")
  const str = tokenstr.split("/")
  const token = str[0]
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    imageURL: "",
    publishDate: "",
    category: "",
    authorId: ""
  })

  //code for geeting blogid
  const path = window.location.pathname
  const array = path.split("/")
  const id = array[2]

  const setValue = ({ currentTarget: input }) => {
    setBlog({ ...blog, [input.name]: input.value })
  };

  const getData = async () => {
    try {
      const res = await axios.get(`https://localhost:7228/api/BlogPosts/${id}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      setBlog(res.data);
      console.log("Blog to be updated")
      console.log(res.data)
      console.log(blog)
    } catch (error) {
      console.error(error);
    }
  };

  console.log("================================================")
  const updateBlog = async () => {
    try {
      const res = await axios.put(`https://localhost:7228/api/BlogPosts/${id}`, blog, {
        withCredentials: true,
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      });
      console.log(res.data);
      toast.success('Blog updated successfully!');
      navigate('/')
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <form class="container" onSubmit={updateBlog}>
        <h3 className='card-title'>Update a Blog</h3> <br />
        <div className="mb-3">
          <label>Blog Title</label>
          <input type="text"
            className="form-control"
            name="title"
            onChange={setValue}
            value={blog.title} 
            />
        </div>
        <div className="mb-3">
          <label>Blog Category</label>
          <input type="text"
            className="form-control"
            onChange={setValue}
            name="category"
            value={blog.category} />
        </div>
        <div className="mb-3">
          <label>Tell your story ... </label>
          <input type="textarea"
            className="form-control"
            onChange={setValue}
            name="content"
            value={blog.content} />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default UpdateBlog
