import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import { ADD_REPLY } from "../../utils/mutations";
import { GET_POST } from "../../utils/queries";
import Auth from "../../utils/auth";

const SpecificPost = () => {
  const { postId } = useParams();
  const [mainPost, setMainPost] = useState(null);
  const { loading, data } = useQuery(GET_POST, {
    variables: { postId: postId },
  });
  const [petData, setPetData] = useState({
    type: "",
    name: "",
    img: "",
    lastSeen: "",
    species: "",
  });
  //For replies
  const [replies, setReplies] = useState(null);
  const [message, setMessage] = useState("");
  const [addReply, {error}] = useMutation(ADD_REPLY);
  const [replyKey, setReplyKey] =useState(0);
  

//This will run every time the loading or data values change
  useEffect(() => {
    if (!loading && data) {
      setMainPost(data?.post || {});
      setPetData({
        type: data?.post.pet.type,
        name: data?.post.pet.name,
        img: data?.post.pet.img,
        lastSeen: data?.post.pet.lastSeen,
        species: data?.post.pet.species,
      })
      console.log("Data: ", data?.post.replies);
      setReplies(data?.post.replies);
    }
  }, [loading, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // const replyListKey = () => {
  //   const count = replyKey + 1;
  //   setReplyKey(count);
  // }
  
  const handleSubmit = async (e) => {
    const user = Auth.getProfile()
    try {
      await addReply({
        variables: {
          postId: postId,
          message: message,
          username: user.data.username
        }
      });
      // Reset form after successful submission
      setMessage("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }

  };

  return (
    <div>
      <div  className='postLayout'>
        <h2 className='alignText'>Pet's Name: {petData.name || "No name"}</h2>
        <h2 className='alignText'>Location: {mainPost?.location || "none"}</h2>
        <p className='alignText'>Message: {mainPost?.message || "none"}</p>
        <p className='alignText'>Species/LastSeen/Status: {petData.species || "none"}, {petData.lastseen || "none"}, {petData.type || "none"}</p>
        {/* <img className='alignText' src={post?.pet.img || "no image"} alt="Description of animal" width="300" height="200"></img> */}
      </div>
      <div>{replies ? (
    replies.map((item) => {
      return (
      <div key={replyKey}>
        <p>{item.username}</p>
        <p>{item.message}</p>
      </div>
    )})
  ) : (
    <p>No replies available</p>)}
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Add your reply here:</h2>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)}></input>
        <button type="submit">Add Reply</button>
      </form>
    </div>
  );
};

export default SpecificPost;
