// import { Redirect, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { useMutation } from "@apollo/client";
import { DEL_POST } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Profile = () => {
  const { loading, data } = useQuery(GET_ME);
  const user = data?.me || {};

  // If not logged in redirects to homepage
  // !Auth.loggedIn() ? <Redirect to="/" /> : alert("Please login");

  if (loading) {
    return <div>Loading...</div>;
  }
  const [delPost, { error }] = useMutation(DEL_POST);


  const deletePost = async (postId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    // if (!token) {
    //   return <Redirect to="/" />;
    // }
    
    try {
      const { data } = await delPost({
        variables: { postId },
      });
      } catch (err) {
        console.error(err);
      }
  }

  return (
    <div>
      <div>
        <h2>
          Viewing {user.username ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div>
          {user.post.map((post) => {
            return (
              <Link to={`/post/${post._id}`}>
                <div>
                  <h2> {post.pet?.name || "No Pet Name Available"}</h2>
                  <p> {post?.message || "none"}</p>
                  <ul>{post.location || "unknown"}</ul>
                  <p> {post?.pet.species || "unknown"}, {post.pet?.lastseen || "unknown"}, {post.pet?.type || "unknown"}</p>
                  <img>{post.pet?.img || "no image"}</img>
                  <button onClick={() => deletePost(post._id)}>Delete This Post</button>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
