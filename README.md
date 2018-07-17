# rate my looks app. It's a WIP, but a lot has been done

It uses: 

1. ReactJS
2. HapiJS
3. Node.js (obviously)
4. MySQL / Sequelize

It might use (in the future):

1. Socket.io (for easier access to the db)
2. Angular (if a use is found, and if it can work alongside react)
3. Some sort of image recognition to see if users actually put their face or body in there (maybe google vision api)

This project essentially will act as a way to get objective ratings for yourself. You shouldn't be able to see your rating until you rate 50 different users (will probably be smaller in the beginning)

It implements only a email and a password, as well as the initial information that might be interesting to see what demographics rate you the highest (race, height, gender, self ratings, and more probably)

No name will be needed, as it is supposed to be "anonymous" ratings. So, users shouldn't be able to see anything about the user except for their face and body.

Essentially, a user will get to rate the face and the body. The signin should have a way to see if someone is using a picture of their body. 

My idea for the initial recognition process is as follows: 

1. The user submits images to be checked. This emails the pictures to the checker. 
2. The checker confirms or denies each image, and then submits one of the following: great picture! (allowed), good picture! (allowed), okay picture! (allowed, but user will recieve a reminder that the picture might not yield results they want), bad picture (not allowed, it's either unrecognizable, not a set picture, or the wrong kind of picture)
3. The user recieves an email their account is ready to go.
4. a) After a set number of ratings, the user recieves an email their report is ready to go (the set number is maybe 20 ratings where they're the ratee). This email is only sent if the user has rated x amount of people
4. b) once the user rates x people (my initial want was 10, but it should probably equal the amount of ratings they need for it to be statistically relevant)

That's it. The UI will need work, and there will need to be statistical relevance done.
