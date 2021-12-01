# KoolVidz
UCLA CS 35L Project

Team Members: Riley McNair, Evan Chen, Leon Zhang, Maxwell Liu, Orrin Zhong

Our team plans to implement a video sharing service to provide information and entertainment to users. 
This includes a search bar, like/dislike system, and a view counter.

## Features

 - Display Dynamic Data to the User

   - The website will display video titles, videos, and comments based on user
selection.

 - Upload data from Client to Back-end

   - Users will be able to upload videos and associated information which will be stored on the server.
  
 - Meaningfully search through server-side data

   - Users will be able to search for video titles using a search bar.
  
   - Searches will sort by most relevant first.
  
 - Unique Feature #1: View Counter
 
   - The number of times a video has been viewed will be displayed, allowing
     users to determine the popularity of a video.
     
 - Unique Feature #2: Video Rating System (Like/Dislike)
 
   - Users will be able to like and dislike videos.
   
   - A composite rating calculated by # likes - # dislikes will be displayed on videos.
   
 - Unique Feature #3: Comments Section
 
   - Users will submit comments which will be stored on the server database.
   
   - Comments will be associated with and displayed under a video.
  
## Setup

 1. Install PostgreSQL from [here](https://www.postgresql.org/download/). Remember the password used during setup and keep the default port (5432)
 2. Clone or download this repository
 3. Add the database password to ```backend/database.js``` in CONFIG.password
 4. Open a terminal
 5. ```cd backend```
 6. ```npm install```
 7. ```npm run start```
 8. ```GET https://localhost:6000/onboard``` to create the database
 9. Open another terminal
 10. ```cd frontend```
 11. ```npm install```
 12. ```npm run start```