import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

const PromptCard = ({ post, handleTagClick,handleEdit,handleDelete }) => {
  const [copied,setCopied]=useState("");
  const pathName=usePathname()
const {data:session}=useSession()
  const handleCopy=()=>{
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(()=>setCopied(""),3000)
  }
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Image
            src={post.creator?.image}  // Use optional chaining here
            width={40}
            height={40}
            className="rounded-full object-contain"
          />

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">paccy</h3>
            <p className="text-sm font-inter text-gray-500">abayisengaaimepacifique@gmail.com</p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image 
          src={copied === post.prompt ?
          '/assets/icons/tick.svg':
           '/assets/icons/copy.svg'}
          width={12}
          height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi tex-sm text-gray-700 ">{post.prompt}</p>
      <p className=" font-inter text-sm blue_gradient  cursor-pointer"
      onClick={()=>handleTagClick && handleTagClick(post.tag)}
      >{post.tag}</p>

      {session?.user.id ===post.creator._id &&
       pathName==="/profile" &&(
        <div className=" mt-5 flex-center  gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
          >Edit</p>
          <p className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}
          >Delete</p>
        </div>
       )
      }
       <div className="copy_btn" onClick={handleCopy}>
          <Image 
          src={copied === post.prompt ?
          '/assets/icons/tick.svg':
           '/assets/icons/copy.svg'}
          width={12}
          height={12}
          />
        </div>
    </div>
  );
};

export default PromptCard;
