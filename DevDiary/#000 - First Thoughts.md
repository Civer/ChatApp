#17.09.2019

##First thoughts

###Main challenges:

- Handling of username and password

As the frontend password needs to be carried safly to the backend we need to take extra care of this.
First idea:

_Entering username and password_
_Hashing password with a global salt_
_Sending REST request to backend with username and hash_
_Check username and passwordhash and compare it with internaly hashed password ("user specific salt" (unique) for extra security)_
_Returning validity and create session token_
_Put session token to browser cache (maybe local storage? **Further reading about actual best practices necessary!**)_
_Check session token with every request to the backend_

Remarks:

_For sake of this showcase I will maybe skip auto logout and session token when the time is not enough!_

- E-Mail verification

As the email needs to be validated we need an extra table for storing Mail verification tokens and add a column for verified state in the users table.
Checking which library is good for sending out mails with Node.js

Maybe Nodemailer?

- How to store the chats in the database

Right now the best fit seems to be something like ChatId|UserId1|UserId2|...|...
This would mean we would have to iterate twice over the Chats table when we want to know which chats a user has (looking him up as first and second user)...
This seems to be really inefficient. If the time is available I would like to **remodel** this.
Keep in mind!

###Remarks:

- As real time update of chat is not necessary socket.io or similiar stuff seems to be not necessary
- It makes sense to store chat and chat messages within a NoSQL database and users and tokens in a SQL database
- It would make sense to make it mandatory to read up this notes before every coding sessions or transfer critical tasks to a **task tracker** or something similar

#Next Todos:

- Setting up Toggl
- Setting up some Task Tracker (Maybe Trello?)
- Read into actual state of ReactJS ASAP!
- Setting up MySQL database (maybe it makes sense to use a hosted one for this)
- Setting up a dev server (Node.js would make sense as of now)
- Deciding on languages and frameworks
- Setting up NoSQL database (maybe Mongo?)
- Deciding upon Foundation vs Bootstrap
- Defining actual order of module creation and tasks
- Get started with the frontend and backend
