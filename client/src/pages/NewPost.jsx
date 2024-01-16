import { Navigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_POST } from "../../utils/mutations";
import Auth from "../../utils/auth";

const NewPost = () => {
  const [message, setMessage] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [petData, setPetData] = useState({
    type: "",
    name: "",
    //search how to img
    img: "",
    lastSeen: "",
    species: "",
  });

  const [addPost, { error }] = useMutation(ADD_POST);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPetData({ ...petData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //This assigns what the user chose in the select tag to petData
    petData.type = status;
    setPetData({...petData});

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) {
      alert("Please login.");
      return false;
    }
    const user = Auth.getProfile()

    try {
      // console.log(petData);
      const { type, name, img, lastSeen, species } = petData;
      // console.log("type: ", type, "name: ", name, "img: ", img, "lastSeen: ", lastSeen, "species: ", species);
      await addPost({
        variables: {
          username: user.data.username,
          message,
          location,
          pet: {
            type,
            name,
            img,
            lastSeen,
            species,
          },
        },
      });

      // Reset form after successful submission
      setMessage("");
      setLocation("");
      setPetData({
        type: "",
        name: "",
        img: "",
        lastSeen: "",
        species: "",
      });
      console.log("failed");
      if (Auth.loggedIn()) {
        window.location.replace('/');
      };

    } catch (error) {
      console.error("Error adding post:", error);
    }

    
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className='alignText'>New Post</h2>
      <label className='alignText'>
        Message:
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      </label>
      <br></br>
      <label className='alignText'>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <br></br>
      <label className='alignText'>
        Have you lost or found this pet:
        <select name="type" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="" disabled>-Select-</option>
          <option value="lost">Lost a Pet</option>
          <option value="found">Found a Pet</option>
        </select>
      </label>
      <br></br>
      <label className='alignText'>
        Pet's Name (optional):
        <input type="text" value={petData.name} name="name" onChange={handleInputChange} />
      </label>
      <br></br>
      <label className='alignText'>
        Image (optional):
        <input type="text" value={petData.img} name="img" onChange={handleInputChange} />
      </label>
      <br></br>
      <label className='alignText'>
        Last Seen Location:
        <input type="text" value={petData.lastSeen} name="lastSeen" onChange={handleInputChange} />
      </label>
      <br></br>
      <label className='alignText'>
        Species:
        <input type="text" value={petData.species} name="species" onChange={handleInputChange} />
      </label>
      <br></br>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default NewPost;
