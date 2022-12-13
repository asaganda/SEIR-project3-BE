= = = = = = = = = LINK = = = = = = = = = = = =
https://social-media-app-back-end-ba.herokuapp.com/posts
https://social-media-app-back-end-ba.herokuapp.com/users

= = = = = = = = TECHs USED = = = = = = = = = =
For the back-end:
  - express;
  - mongoose;
  - mongo Atlas;
  - cors;

= = = = = = = = APPROACH = = = = = = = = = = =
For the hole project we started with back-end, having some basic routes for the CRUD functions and testing them with postman. After this the back-end was mostly done and only a few routes were added based on needs from the front-end, such as the deletes for comments, posts, followers/following, etc.

= = = = = = = USER STORIES = = = = = = = = = =
In our app, has the following interactions with the DB (only showing moments where front-back communicate):
  - Full CRUD for USERS;
  - Full CRUD for POSTS;
  - Remove user "presence" in the app when user is deleted (comments on other users posts, all the following/followers, likes, etc.).

= = = = = = UNSOLVED PROBLEMs = = = = = = = = =
There aren't any unsolved problems but there are a few missed opportunities. There are some functionalities missing that would use the same routes (for example, commenting and liking posts can be done with the update route) and there are a few routes that could be created instead of done by the fornt-end (search route and user profiles are some of the examples)
