import React from 'react';

const AboutUs = () => {
  // Company information
  const yearFounded = 2024;
  const aboutText = 
  ` We aim to create a widespread communication in order to locate any lost pets in the area, and get them home.
  
  When challenged to develop a MERN Stack Single-Page Application, we had brainstormed for hours, contemplating deeply and thoroughly about all we could achieve. With the natural creativity of our team and the months of dedicated education from the Columbia Engineering Bootcamp, there were many options we could fully embrace. All this to say, we decided there was no better way to showcase the culmination of months of difficult work than this application. This website was designed to assist those who have lost one of the most precious things in the world, and reuinite them once again. 
  
  This website was created to bring hope. `;

  const teamMembers = [
    { id: 1, name: 'Brandon Rivera',},
    { id: 2, name: 'Shane Mindreau',},
    { id: 3, name: 'Natalie Rodriguez',},
  ];

  return (
    <div className="about-us">
      <h1>About Paws and Found</h1>
      <h2>Our Story</h2>
      <p>{aboutText}</p>

      <h2>Our Team</h2>
      <ul>
        {teamMembers.map((member) => (
          <li key={member.id}>
            {member.name}
          </li>
        ))}
      </ul>

      <h2>Our Values</h2>
      <p>
        Here at Paws and Found, our goal is to provide top insight as to where your pet might be located.
        We believe nothing is truly lost, just waiting to be found.
      </p>

      <h2>Founded In</h2>
      <p>{companyName} was founded in {yearFounded}.</p>
    </div>
  );
};

export default AboutUs;
