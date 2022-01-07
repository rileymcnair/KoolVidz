# KoolVidz

Updates coming soon...

UCLA CS 35L Project

Team Members: Riley McNair, Evan Chen, Leon Zhang, Maxwell Liu, Orrin Zhong

KoolVidz is a video sharing service that provides information and entertainment to users. 
It features video streaming, search bar, like/dislike system, comments, and a view counter.

## Features

 - Display dynamic data to the user

   - The website displays videos, the video's metadata, and the video's comments based on the user's selection.

 - Upload data from client to Back-end

   - Users are able to upload videos with metadata that is stored on the server.
  
 - Meaningfully search through server-side data

   - Users are able to search for video titles using the search bar at the top of the page
  
   - Search results are sorted by relevance
  
 - Unique Feature #1: View Counter
 
   - The website tracks and displays the number of times a video has been viewed, allowing users to determine the popularity of a video.
     
 - Unique Feature #2: Video Rating System (Like/Dislike)
 
   - Users are able to like and dislike videos.
   
   - The website displays a composite rating for videos calculated by # of likes - # of dislikes.
   
 - Unique Feature #3: Comments
 
   - Users are able to submit comments, which are displayed below the video they belong to.
  
## Setup

 1. Install PostgreSQL from [here](https://www.postgresql.org/download/). Remember the password used during setup and keep the default port (5432)
 2. Clone or download this repository
 3. Add the database password to ```backend/database.js``` in CONFIG.password
 4. Open a terminal
 5. ```cd backend```
 6. ```npm install```
 7. ```npm run start```
 8. ```GET https://localhost:5050/api/onboard``` to create the database
 9. Open another terminal
 10. ```cd frontend```
 11. ```npm install```
 12. ```npm run start```
