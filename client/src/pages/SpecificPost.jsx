import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { useQuery } from "@apollo/client";

import { ADD_REPLY } from "../../utils/mutations";
import { GET_POST } from "../../utils/queries";

const SpecificPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const { loading, data } = useQuery(GET_POST, {
    variables: { postId: postId },
  });

  useEffect(() => {
    if (!loading && data) {
      setPost(data?.post || {});
    }
  }, [loading, data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {post.postUser} <br />
        <span style={{ fontSize: "1rem" }}> reported about this pet on: {post.createdAt}</span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: "1.5rem",
            fontStyle: "italic",
            border: "2px dotted #1a1a1a",
            lineHeight: "1.5",
          }}
        >
          {post.postText}
        </blockquote>
      </div>

      <div className="my-5">
        <ReplyList reply={post.reply} />
      </div>
      <div className="m-3 p-4" style={{ border: "1px dotted #1a1a1a" }}>
        <ReplyForm postId={post._id} />
      </div>
    </div>
  );
};

const ReplyForm = ({ postId }) => {
  const [replyText, setReplyText] = useState("");
  const [addReply] = useMutation(ADD_REPLY);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReply({
        variables: {
          postId: postId,
          message: replyText,
        },
        refetchQueries: [{ query: GET_POST, variables: { postId: postId } }],
      });
      setReplyText("");
    } catch (error) {
      console.error("Error adding reply:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={replyText} onChange={(e) => setReplyText(e.target.value)} placeholder="Write your reply..." rows={4} cols={50} required />
      <button type="submit">Add Reply</button>
    </form>
  );
};

export default SpecificPost;
