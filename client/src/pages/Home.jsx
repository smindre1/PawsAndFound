import { Link } from 'react-router-dom';
import {useQuery} from '@apollo/client'
import { GET_LOST, GET_FOUND } from '../../utils/queries';
import { useState } from 'react';
import "../../src/index.css";

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
        <div className='center'>
            <div className='lostfound'>
                <button className='lostfoundBtns' onClick={() => lostPets()}>Lost</button>
                <button className='lostfoundBtns' onClick={() => foundPets()}>Found</button>
            </div>
            {wait1 || wait2 ? <h2>Loading...</h2> : null}
            {loadPosts.length
            ? <h2 className='alignText'>Viewing {loadPosts.length} pet {loadPosts.length === 1 ? 'post' : 'posts'}:</h2>
            : <h2 className='alignText'>There are no pet posts available!</h2>}
            {loadPosts.map((post) => {
                return (
                <div className='postLayout' key={post._id} postid={post._id} onClick={goToPost}>
                    <h1 className='alignText'>Pet's Name: {post.pet?.name || "No name"}</h1>
                    <h2 className='alignText'>Location: {post?.location || "none"}</h2>
                    <p className='alignText'>Message: {post?.message || "none"}</p>
                    <p className='alignText'>Species/LastSeen/Status: {post?.pet.species || "none"}, {post.pet?.lastseen || "none"}, {post.pet?.type || "none"}</p>
                    <img className='alignImage' src={post?.pet.img || "no image"} alt="Description of animal" width="300" height="200"></img>
                </div>
                );
            })}

        </div>
    );

};

export default Home;