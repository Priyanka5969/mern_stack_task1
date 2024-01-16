import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("/api/v1/blog/all-blog");
      if (data?.success) {
        setBlogs(data?.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = blogs.filter((blog) => 
      blog.title.toLowerCase().includes(query) || 
      blog.description.toLowerCase().includes(query)
    );
    setFilteredBlogs(filtered);
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      
      <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
        marginBottom: '20px', // Optional spacing from the top
      }}
      
      
      >

        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            
            
          }}
        />
        <button onClick={handleSearch} style={{ marginLeft: '10px', padding:'7px', backgroundColor:'cyan' }}>Search</button>
      </div>

      {(searchQuery ? filteredBlogs : blogs).map((blog) => (
        <BlogCard
          key={blog?._id}
          id={blog?._id}
          isUser={localStorage.getItem("userId") === blog?.user?._id}
          title={blog?.title}
          description={blog?.description}
          image={blog?.image}
          username={blog?.user?.username}
          time={blog.createdAt}
        />
      ))}
    </div>
  );
};

export default Blogs;
