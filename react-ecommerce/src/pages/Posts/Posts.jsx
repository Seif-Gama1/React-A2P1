import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { AiFillLike,AiFillDislike } from "react-icons/ai";
import useApiCallInitilaRender from "../../hooks/useApiCall";

const scrollTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Media query helper function (consider using a library like react-device-detect)
function useWindowSize() {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return size;
}

//use get all posts api and add pages feature
export default function Posts(){
  const [posts,setPosts] = useState([]);
  const [somePosts, setSomePosts] = useState([]);
  const [startIndex,setStartIndex] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(16);
  
  const windowSize = useWindowSize();
  
  useApiCallInitilaRender("posts?limit=0", (data) => {
    setPosts(data.posts);
    setSomePosts(data.posts.slice(startIndex,startIndex+postsPerPage))
  });

  const handleInc = () => {
    if(startIndex < (251-postsPerPage)){
      setStartIndex(startIndex + postsPerPage);
    }
  }
  const handleDec = () => {
    if(startIndex >= postsPerPage){
      setStartIndex(startIndex - postsPerPage);
    }
  }
  
  useEffect(() => {
    document.title = "Posts";
    return () => {
      document.title = "Default Title";
    };
  }, []);

  useEffect(() => {
    setSomePosts(posts.slice(startIndex,startIndex+postsPerPage))
    scrollTop();
  }, [startIndex]);
  
  useEffect(() => {
    // Update postsPerPage based on window size
    if (windowSize[0] <= 768) { // Adjust breakpoints as needed
      setPostsPerPage(8);
    } else if (windowSize[0] <= 1024) {
      setPostsPerPage(12);
    } else {
      setPostsPerPage(16);
    }
  }, [windowSize]);

  return (
  <>  
    {/* Next & Back buttons */}
    <div className="flex justify-center mb-[4%] mt-[22%] md:mt-[14%] lg:mt-[11%] gap-4">
      <button type="button" className="text-xl bg-[#3e5067] border-2 border-[#3e5067] text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#3e5067]" onClick={handleDec}>Previous</button>
      <p className="mt-2 text-xl">{Math.floor(startIndex/postsPerPage + 1)} | {Math.ceil(251/postsPerPage)}</p>
      <button type="button" className="text-xl bg-[#3e5067] border-2 border-[#3e5067] text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#3e5067]" onClick={handleInc}>Next</button>
    </div>

    <div className=" flex flex-wrap mt-8 w-[94%] mx-auto gap-4 mb-5">
      {somePosts.map((post,index) => (
        <div className="relative h-[480px] w-[48.2%] md:w-[31.8%] lg:w-[23.7%] border shadow">
          <div className="w-[90%] mx-auto mt-10">
            
            <h1 className="text-xl font-semibold text-[#3e5067]">{ post.title.endsWith('.') ? `${post.title}` : `${post.title}.`}</h1>
            
            <p className="mt-4 h-[246px] overflow-y-auto">{post.body}</p>
            
            <div className="flex absolute top-[75%] mt-5">
              {post.tags.map((tag,index) => {
                return <p key={index} className="bg-gray-400 rounded border-2 text-sm border-gray-700 text-gray-700 me-1 px-2 py-[2px]">{tag}</p>
              })}
            </div>

            <div className="flex absolute top-[85%]">

              <div className="flex mt-5">
                <FaEye className="mt-[2px] text-[#3e5067]" size={22}/>
                <p className="ms-1">{post.views}</p>
              </div>

              <div className="flex mt-5 ms-2">
                <AiFillLike className="text-[#3e5067]" size={22}/>
                <p className="ms-1">{post.reactions.likes}</p>
              </div>

              <div className="flex mt-5 ms-2">
                <AiFillDislike className="mt-[2px] text-[#3e5067]" size={22}/> 
                <p className="ms-1">{post.reactions.dislikes}</p>
              </div>

            </div>

          </div>
        </div>
      ))
      }
    </div>

    {/* Next & Back buttons */}
    <div className="flex justify-center mb-[4%] mt-[2%] gap-4">
      <button type="button" className="text-xl bg-[#3e5067] border-2 border-[#3e5067] text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#3e5067]" onClick={handleDec}>Previous</button>
      <p className="mt-2 text-xl">{Math.floor(startIndex/postsPerPage + 1)} | {Math.ceil(251/postsPerPage)}</p>
      <button type="button" className="text-xl bg-[#3e5067] border-2 border-[#3e5067] text-white px-6 py-2 rounded-md hover:bg-white hover:text-[#3e5067]" onClick={handleInc}>Next</button>
    </div>

  </>
  )
}