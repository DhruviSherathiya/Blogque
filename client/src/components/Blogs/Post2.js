import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

function Post2(props) {
	const [blog,setBlog] = useState("");
	const [author,setAuthor] = useState("");
	const id = props.id;
	 
	const getBlogDetails = () => {
		axios.get(`https://localhost:7228/api/BlogPosts/${id}`)
		.then((response) => {
		  setBlog(response.data);
		})
		.catch((err) =>{
		  console.log(err);
		})
	}
    
	const pdate = moment(blog.publishDate).format('MMM D, YYYY');

	const aid = blog.authorId;
	const getAuthor = () => {
		axios.get(`https://localhost:7228/api/Users/${aid}`)
		.then((response) => {
		  setAuthor(response.data.username);
		  console.log("Author id success")
		  console.log(response.data.username)
		})
		.catch((err) =>{
		  console.log("Author id error")
		  console.log(err);
		})
	}

	if(blog.authorId !== undefined){
		console.log(`Author Id ${aid}`)
		getAuthor();
	}

	useEffect(() => {
		getBlogDetails();
	  }, [])

  return (
    <div>
      <div class="card">
			<div class="card-block">
				<h2 class="card-title">{blog.title}</h2>
				{blog.content && <h4 class="card-text">{blog.content.split(" ").slice(0, 10).join(" ")}</h4>}
				<div class="metafooter">
					<div class="wrapfooter">
						<span class="meta-footer-thumb">
							<a href="author.html"><img class="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
						</span>
						<span class="author-meta">
							<span class="post-name"><a href="author.html">{author}</a></span><br/>
							<span class="post-date">{pdate}</span>
						</span>
						<span class="post-read-more"><Link to={`/blog/${blog.id}`} className="btn" style={{marginLeft:"1rem"}}>Read More</Link></span>
						{/* <span class="post-read-more"><a href="post.html" title="Read Story"><svg class="svgIcon-use" width="25" height="25" viewbox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path></svg></a></span> */}
					</div>
				</div>
			</div>
		</div>
    </div>
  )
}

export default Post2
