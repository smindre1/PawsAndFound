# Pet-Lost-And-Found
A lost and found pet blog.

## Model Plans

	user{ 
        id
        username
        email
        password
        post{}
    }

	post{
        postId
        petId
        message
        location(city) 
        [Post]
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

