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
        post_id
        pet_id
        message
        location(city) 
    }

    pets{
        id
        type{lost: {name}, found, shelter}
        img
        last_seen
        species
    }

    shelters{
    pets_list{pet_id}}

