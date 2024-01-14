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
//Check the frontend queries
//delete resolvers. etc.. for individual and multiple user searches
