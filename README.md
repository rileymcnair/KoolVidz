# KoolVidz

# TRY IT OUT: https://koolvidz.herokuapp.com/ (this is an open internet project)

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
  
## Development Setup

 1. Install PostgreSQL from [here](https://www.postgresql.org/download/). Remember the password used during setup and keep the default port (5432)
 2. Clone or download this repository
 3. Add the database password to ```database.js``` under ```DB_PASSWORD```
 4. Open a terminal with working directory: ```KoolVidz```
 5. ```npm install```
 6. ```npm run start```
 6. ```GET https://localhost:5050/api/onboard``` to create the database
 7. Open another terminal with working directory: ```KoolVidz```
 8. ```cd frontend```
 9. ```npm install```
 10. ```cd ..```
 11. ```npm run dev```
