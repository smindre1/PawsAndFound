import { Navigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';
import { GET_POSTS, GET_ME } from '../../utils/queries'; //This can be deleted

const NewPost = () => {
  
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [petData, setPetData] = useState({
    type: '',
    name: '',
    img: '',
    lastSeen: '',
    species: '',
  });

  const [addPost, { error }] = useMutation(ADD_POST, {
    // refetchQueries: [
      // GET_POSTS,
      // 'getPosts',
    //   GET_ME,
    //   'me'
    // ]
  });

  const handleTypeChange = (e) => {
    setPetData({ ...petData, type: e.target.value });
  };

  const handleNameChange = (e) => {
    setPetData({ ...petData, name: e.target.value });
  };

  const handleImgChange = (e) => {
    setPetData({ ...petData, img: e.target.value });
  };

  const handleLastSeenChange = (e) => {
    setPetData({ ...petData, lastSeen: e.target.value });
  };

  const handleSpeciesChange = (e) => {
    setPetData({ ...petData, species: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addPost({
        variables: {
          message,
          location,
          pet: petData,
        },
      });

      // Reset form after successful submission
      setMessage('');
      setLocation('');
      setPetData({
        type: '',
        name: '',
        img: '',
        lastSeen: '',
        species: '',
      });
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Message:
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <label>
        Type (lost/found):
        <input type="text" value={petData.type} onChange={handleTypeChange} />
      </label>
      <label>
        Name (optional):
        <input type="text" value={petData.name} onChange={handleNameChange} />
      </label>
      <label>
        Image (optional):
        <input type="text" value={petData.img} onChange={handleImgChange} />
      </label>
      <label>
        Last Seen Location:
        <input type="text" value={petData.lastSeen} onChange={handleLastSeenChange} />
      </label>
      <label>
        Species:
        <input type="text" value={petData.species} onChange={handleSpeciesChange} />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default NewPost;


