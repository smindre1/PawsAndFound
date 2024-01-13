import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';

import { ADD_POST } from '../../utils/mutations';

const NewPost = () => {

  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [petData, setPetData] = useState({
    type: '',
    name: '',
    //sesarch how to img
    img: '',
    lastSeen: '',
    species: '',
  });

  const [addPost, { error }] = useMutation(ADD_POST);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      return false;
    }

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

    if (Auth.loggedIn()) {
      return <Navigate to="/me" />;
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Post</h2>
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
        <input type="text" value={petData.type} name="type" onChange={handleInputChange} />
      </label>
      <label>
        Pet's Name (optional):
        <input type="text" value={petData.name} name="name" onChange={handleInputChange} />
      </label>
      <label>
        Image (optional):
        <input type="text" value={petData.img} name="image" onChange={handleInputChange} />
      </label>
      <label>
        Last Seen Location:
        <input type="text" value={petData.lastSeen} name="lastseen" onChange={handleInputChange} />
      </label>
      <label>
        Species:
        <input type="text" value={petData.species} name="species" onChange={handleInputChange} />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default NewPost;


