'use client'

import { useState } from "react"

import Form from "@/components/Form"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
const CreatePrompt = () => {
    const [post,setPost]=useState({
   prompt:"",
   tag:""
    })
    const [isSubmitting,setIsSubmitting]=useState(false);

    const {data:session}=useSession();
    const router=useRouter();
    const createPrompt=async(e)=>{
    e.preventDefault();
    setIsSubmitting(true)
    try{
    const response=await fetch("/api/prompt/new",{
      method:"POST",
      body:JSON.stringify({
        prompt:post.prompt,
        userId:session?.user.id,
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
   handleSubmit={createPrompt}
   />
  )
}

export default CreatePrompt
