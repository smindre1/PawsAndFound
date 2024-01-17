# Pet-Lost-And-Found

 We have created a lost and found pet blog in which users can post and reply about animals they have lost or found.

# Table of Contents

- [Model Plans](#model-plans)

- [Things to Check](#things-to-check)

- [Issues](#issues)

- [Technologies](#technologies)

- [Usage](#usage)

- [Credits](#credits)

- [Deployed Application](#deployed-application)

## Model Plans

	user{ 
        id
        username
        email
        password
        posts{}
    }

	post{
        id
        petId
        message
        location(city) 
        [replies]
    }

    replies{
        id
        message
        username ref: User
        postId ref: Post
    }

    pets{
        id
        type{lost, found, shelter}
        name
        img
        lastSeen
        species
    }

    shelters{
    petsList{petId}}



## Things to Check:

//Seed file
//CSS
//README.md file
//Presentation

/Adding images


//Add dates to posts

## Issues
//If a user is in the middle of making a post and they are logged out it will reload the page/redirect page and erase progress on that user's post.

## Technologies

- React
- GraphQL
- Node.js
- Express.js
- MongoDB
- Heroku

## Usage

- `AS` A USER who has lost/found a pet:
	- `WHEN` I enter the application
	- `THEN` I am able to view posts regarding lost/found pets
	- `WHEN` I go to the navigation bar
	- `THEN` I have the option to login or sign up
	- `WHEN` I am logged in
	- `THEN` I am able to create a post `OR` reply to a post

## Credits

This application was created as the last group project for Columbia Engineering Coding Bootcamp.

Contibutors: 
- [Shane Mindreau](https://github.com/smindre1)
- [Brandon Rivera](https://github.com/BrandonERivera)
- [Nat Rodriguez](https://github.com/Nat-Rodriguez)

## Deployed Application

[Click here to view the deployed application](
