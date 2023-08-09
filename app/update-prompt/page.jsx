'use client'

import { useState,useEffect } from "react"

import Form from "@/components/Form"

import { useRouter,useSearchParams } from "next/navigation"
const EditPrompt = () => {
    const [post,setPost]=useState({
   prompt:"",
   tag:""
    })
    const [isSubmitting,setIsSubmitting]=useState(false);


    const router=useRouter();
    const searchParams=useSearchParams();
    const promptId=searchParams.get("id");

    useEffect(()=>{
  const getPromptDetails=async()=>{

    try{
   const response=await fetch(`/api/prompt/${promptId}`);
   
   const data=await response.json();

   setPost({
    prompt:data.prompt,
    tag:data.tag
   })
    }
    catch(error){

    }
  }

if(promptId) getPromptDetails();
    },[promptId])


    const editPrompt=async(e)=>{
        e.preventDefault();
        setIsSubmitting(true)

        if(!promptId) alert("PromptId not Found")
        try{
        const response=await fetch(`/api/prompt/${promptId}`,{
          method:"PATCH",
          body:JSON.stringify({
            prompt:post.prompt,
          
            tag:post.tag
    
          })
        })
        if(response.ok){
         router.push('/'); 
        }
        }
        catch(err){
          console.log(err);
        }
        finally{
          setIsSubmitting(false);
        }
        }
  return (
   <Form
   type="Create"

   post={post}
   setPost={setPost}
   submitting={isSubmitting}
   handleSubmit={editPrompt}
   />
  )
}

export default EditPrompt
