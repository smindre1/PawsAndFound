import { Link } from 'react-router-dom';
import {useQuery} from '@apollo/client'
import { GET_LOST, GET_FOUND } from '../../utils/queries';
import { useState } from 'react';

const Home = () => {
    const [loadPosts, setPosts] = useState([]);
    const { loading: wait1, error, data: lostPosts} = useQuery(GET_LOST);
    const { loading: wait2, data: foundPosts} = useQuery(GET_FOUND);

    const lostPets = () => {   
        const posts = lostPosts?.lostPets || [];
        setPosts(posts);
    };

    const foundPets = () => {
        const posts = foundPosts?.foundPets || [];
        setPosts(posts);
    };

    const goToPost = (e) => {
        //Depending on what is clicked it will grab the <div>'s postid
        const id = e.target.parentElement.getAttribute("postid") || e.target.getAttribute("postid");
        //Redirect to the clicked post's page
        window.location.replace(`/post/${id}`);
    }

    return(
        <div>
            <div>
                <button onClick={() => lostPets()}>Lost</button>
                <button onClick={() => foundPets()}>Found</button>
            </div>
            {wait1 || wait2 ? <h2>Loading...</h2> : null}
            {loadPosts.length
            ? `Viewing ${loadPosts.length} pet ${loadPosts.length === 1 ? 'post' : 'posts'}:`
            : 'There are no pet posts available!'}
            {loadPosts.map((post) => {
                return (
                <div key={post._id} postid={post._id} onClick={goToPost}>
<<<<<<< HEAD
                    <h1>Pet's Name: {post.pet?.name || "No name"}</h1>
                    <h2>Location: {post?.location || "none"}</h2>
                    <p>Message: {post?.message || "none"}</p>
                    <p>Species/LastSeen/Status: {post?.pet.species || "none"}, {post.pet?.lastseen || "none"}, {post.pet?.type || "none"}</p>
                    {/* <img>{post.pet?.img || "none"}</img> */}
=======
                    <h1> {post.pet?.name || ""}</h1>
                    <h2> {post?.location || "none"}</h2>
                    <p> {post?.message || "none"}</p>
                    <p> {post?.pet.species || "none"}, {post.pet?.lastseen || "none"}, {post.pet?.type || "none"}</p>
                    <img src={post?.pet.img || "no image"} alt="Description of animal" width="300" height="200"></img>
>>>>>>> b6d14eb56fd8c5af3ef5908188ab6b88f27fe5a2
                </div>
                );
            })}

        </div>
    );

};

export default Home;