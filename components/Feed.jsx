 'use client'

 import { useState,useEffect } from "react"
import PromptCard from "./PromptCard"
const Feed = () => {

  const handleChangeText=(e)=>{
  e.preventDefault();
  }
  const [searchText,setSearchText]=useState('');
  const [posts,setPosts]=useState([]);
  const PromptCardList=({data,handleTagClick})=>{
    return(
      <div className=" mt-16 prompt_layout">
      {data?.map((post)=>(
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
  
        />
      ))}
      </div>
    )
   
}

  useEffect(()=>{
    const fetchPosts= async()=>{
      const response= await fetch("/api/prompt");
      const data= await response.json();

      setPosts(data);
    }
    fetchPosts();
  })
  console.log(posts);
  return (
    <section className="feed">
  <form className="relative w-full flex-center">
    <input type="text"
    placeholder="Search for a tag or a username"
    value={searchText}
    onChange={handleChangeText}
    required
    className="search_input peer"
    />
  </form>

  <PromptCardList
   data={posts}
   handlePromptClick={()=>{}}
  />
    </section>
  )
}

export default Feed
