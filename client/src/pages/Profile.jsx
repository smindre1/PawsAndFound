//Do we use user Params?????????
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_USER, GET_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? GET_USER : GET_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  // if (!user?.username) {
  //   return (
  //     <h4>
  //       Sorry! You must be logged in to access. Use the navigation to sign up or log in!
  //     </h4>
  //   );
  // }

  return (
    <div>
      <div>
        <h2>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        <div>
          <PostList
            posts={user.posts}
            title={`${user.username}'s posts...`}
            showTitle={false}
            showUsername={false}
          />
        </div>
        {!userParam && (
          <div>
            <PostForm />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
