import { Link } from 'react-router-dom';
import {useQuery} from '@apollo/client'
import { GET_LOST, GET_FOUND } from '../../utils/queries';
import { useState } from 'react';

const Home = () => {
    const [state, setState] = useState('Lost');
    const [loadPosts, setPosts] = useState([]);


    const lostPets = () => {
        const { loading , data} = useQuery(GET_LOST);
        const posts = data?.lostPets || [];
        
        console.log("lost pets post running");
        setPosts(posts);
    };


    const foundPets = () => {
        const { loading , data} = useQuery(GET_FOUND);
        const posts = data?.foundPets || [];
  
        console.log("found pets post running");
        setPosts(posts);
    };

    return(
        <div>
            <div>
                <button onClick={() => lostPets}>Lost</button>
                <button onClick={() => foundPets}>Found</button>
            </div>
            {loadPosts.length
            ? `Viewing ${loadPosts.length} pet ${loadPosts.length === 1 ? 'post' : 'posts'}:`
            : 'There are no pet posts available!'}
            {loadPosts.map((post) => {
                return (
                    <div>
                <h1> {post.pet?.name || ""}</h1>
                <h2> {post?.location || "none"}</h2>
                <p> {post?.message || "none"}</p>
                <p> {post?.pet.species || "none"}, {post.pet?.lastseen || "none"}, {post.pet?.type || "none"}</p>
                <img>{post.pet?.img || "none"}</img>
            </div>
                );
            })}

        </div>
    );

};

export default Home;