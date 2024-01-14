import { Link } from 'react-router-dom';
import {useQuery} from '@apollo/client'
import { GET_LOST, GET_FOUND } from '../../utils/queries';
import { useState } from 'react';

const Home = () => {
    const [state, setState] = useState('Lost');

    const lostPets = () => {
        const { loading , data} = useQuery(GET_LOST);
        const posts = data?.lostPets || [];

        if (!posts.length) {
            return <h3>No Pets</h3>;
          }
        else {
            return posts;
        }
    };

    const foundPets = () => {
        const { loading , data} = useQuery(GET_FOUND);
        const posts = data?.foundPets || [];

        if (!posts.length) {
            return <h3>No Pets</h3>;
          }
        else {
            return posts;
        }     
    };

    const divFunction = (post) => {
        return (
        <Link to={`/post/${post._id}`}>
        <div>
        <h1> {post.pet?.name || ""}</h1>
        <h2> {post?.location || "none"}</h2>
        <p> {post?.message || "none"}</p>
        <p> {post?.pet.species || "none"}, {post.pet?.lastseen || "none"}, {post.pet?.type || "none"}</p>
        <img>{post.pet?.img || "none"}</img>
        </div>
        </Link>)}

    return(
        <div>
            <div>
                <button onClick={() => setState('Lost')}>Lost</button>
                <button onClick={() => setState('Found')}>Found</button>
            </div>
            {state == "Lost" ? lostPets.map((post) => {divFunction(post)}) : foundPets.map((post) => {divFunction(post)})}

        </div>
    );

};

export default Home;