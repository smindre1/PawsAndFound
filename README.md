# Pet-Lost-And-Found
A lost and found pet blog.

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