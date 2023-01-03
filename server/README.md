# Initial Setup

https://github.com/devansh07mehta/Zomato-clone-MERN

git clone https://github.com/devansh07mehta/Zomato-clone-MERN
cd zomato-clone
mkdir server
cd server
npm i

<!-- dependencies -->

npm install express, mongoose, dotenv

<!-- dev dependencies -->

npm i --save-dev nodemon, @babel/cli, @babel/core, @babel/preset-env and @babel/node

# API Planning

- Food (Food Items & their details)
- Restaurant (Restaurant & their details)
- Menu (Menu & their details)
- Order (Order & their details)
- Image (Storing all the imgs related to the zomato)
- Review (Storing all the list of reviews)
- User (User related details, username, email and password)


JSON Web Token(JWT):
jwt => JsonWebToken 
Session Based Appln
    >> tokens

    >> For the 1st time when we visit the appln we login or create an account
        >> at this point of time -> a new JWT token will be generated which will be stored in the user's browser's local storage.
        >> and if we revisit the appln after 1 day || 10 day || 10 months .. we don't need to pass the credentials
            instead while making a req the generated JWT token will be sent to the server.
        >> JWT will be stored in the client or enduser's browser (Cookies, LocalStorage)
        >> JWT also has expiration which depends on business perspective (1 day | 10 day | 10 years)

hash & salting

devtown123$ => @edrmtbaklshws1690* => salt(5) => agdsjas n@$%3uasqjqw12uwwajajqs  