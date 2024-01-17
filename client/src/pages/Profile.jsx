// import { Redirect, Link } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../../utils/queries';
import { DEL_POST } from '../../utils/mutations';
import Auth from '../../utils/auth';

const Profile = () => {
  const [deletePost, { error}] = useMutation(DEL_POST);
  const { loading, data } = useQuery(GET_ME);
  const user = data?.me || {};
  const username = user.username;


  // If not logged in redirects to homepage
  // !Auth.loggedIn() ? <Redirect to="/" /> : alert("Please login");

  if (loading) {
    return <div>Loading...</div>;
  }


  const handledeletePost = async (postId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    try {
      await deletePost({
        variables: {postId : postId}
      });
    } catch (err) {
      console.error(err);
    }
    window.location.replace(`/me`);
  }
  

  return (
    <div>
      <div>
        <h2>
          Viewing {user.username ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div>
          {user.post?.map((post) => {
            return (
                <div className='postLayout'  key={post._id}>
                <Link to={`/post/${post._id}`}>
                  <h2 className='alignText'> {post.pet?.name || "No Pet Name Available"}</h2>
                  <p className='alignText'> {post?.message || "none"}</p>
                  <ul className='alignText'>{post.location || "unknown"}</ul>
                  <p className='alignText'> {post?.pet.species || "unknown"}, {post.pet?.lastseen || "unknown"}, {post.pet?.type || "unknown"}</p>
                  <img className="alignImage"src={post?.pet.img || "no image"} alt="Description of animal" width="300" height="200"></img>
                  </Link>
                  <button className="alignText" onClick={() => handledeletePost(post._id)}>Delete This Post</button>
                </div>
                
            )
          })}
        </div>
      </div>
    </div>
  );
};

export default Profile;
