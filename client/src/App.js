import { Routes, Route } from "react-router-dom"
import CreateBlog from './components/Blogs/CreateBlog';
import Posts from './components/Blogs/Posts';
import Login from './components/Authentication/Login';
import Signup from "./components/Authentication/Signup";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Blog from "./components/Blogs/Blog";
import Profile from "./components/Profile/Profile";
import UpdateBlog from "./components/Profile/UpdateBlog";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={ <Posts/> } />
        <Route path="create" element={ <CreateBlog/> } />
        <Route path="login" element={ <Login/> } />
        <Route path="signup" element={ <Signup/> } />
        <Route path="blog" element={ <Blog/> } />
        <Route path="profile" element={ <Profile/> } />
        <Route path='/updateBlog/:id' element={<UpdateBlog />} />
        <Route path='/blog/:id' element={<Blog />} />  
      </Routes>
      <Footer />
    </>
  );
}

export default App;
