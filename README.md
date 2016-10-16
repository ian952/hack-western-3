Choose Chews is a web application that lets you and your friends to vote on where to eat, anonymously and fairly, and generates a list of recommended restaurants, with equal consideration to everyone's choices. 

In opening the app on your own device, you can create a group or join a friend's. When everyone has joined, the app will prompt you to select your preferences regarding: cost, distance, rating, flavour, type/ethnicity, and any dietary considerations. Based on what you selected, it uses Yelp's API to generate a list of restaurants that best match your group, as well as provide more information on each establishment. 

We used React.js for the front-end client, and Node.js for the back-end. This allowed us to create a universal Javascript application so members could easily transition from both sides to support each other. We utilized PostgresSQL to store data from users when creating room, and web sockets to connect multiple users to the same voting page.
