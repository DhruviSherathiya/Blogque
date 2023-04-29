import React, {useState} from 'react'
import axios from 'axios';
import {useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreateBlog() {
  const tokenstr = localStorage.getItem("usertoken")
  const array = tokenstr.split("/")
  const token = array[0]
  const uid = array[1]

  const [pictureUrl, setPictureUrl] = useState("");

  const onChangePicture = (event) => {
    setPictureUrl(event.target.value);
  };

  const navigate = useNavigate()
  const date = new Date();
  const [blog, setBlog] = useState({
    Title : "",
    Content : "",
    imageURL : pictureUrl,
    PublishDate : date,
    Category : "",
    AuthorId : uid
  })

  const setValue = ({currentTarget: input}) => {
    setBlog({...blog, [input.name]:input.value})
  }

  const addBlog = async e =>{
    e.preventDefault();
    console.log(blog)
    try {
      const response = await axios.post("https://localhost:7228/api/BlogPosts", 
      blog, {
        withCredentials: true,
        headers: {
          'accept': 'text/plain',
          'Content-Type': 'application/json',
          'Authorization': `bearer ${token}`
        }
      });
      console.log(response.data);
      toast.success('Blog added successfully!');
      navigate('/')
    } catch (error) {
      console.error(error);
      toast.error('Action Failed!');
    }
  }

  return (
    <div>
      <form class="container" onSubmit={addBlog}>
        <h3 className='card-title'>Create a new Blog</h3> <br />
        { pictureUrl && <img alt="Blog Banner" src={pictureUrl} />}    
        <div className="mb-3">
          <label>Blog Title</label>
          <input type="text" 
              className="form-control"
              name="Title"
							onChange={setValue}
							value={blog.Title} />
        </div>
        <div className="mb-3">
          <label>Banner Image URL</label>
          <input type="text" 
                className="form-control" 
                placeholder="Blog Banner URL"
                name="imageURL"
							  onChange={(e) => {
                  onChangePicture(e);
                  setValue(e);
                }}
							  value={blog.pictureUrl} />
        </div>
        <div className="mb-3">
          <label>Blog Category</label>
          <input type="text"  
              className="form-control" 
              onChange={setValue}
              name="Category"
              value={blog.Category} />
        </div>
        <div className="mb-3">
          <label>Tell your story ... </label>
          <input type="textarea"  
              className="form-control" 
              onChange={setValue}
              name="Content"
              value={blog.Content} />
        </div>
        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default CreateBlog
