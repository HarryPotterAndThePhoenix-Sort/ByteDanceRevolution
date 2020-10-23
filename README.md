 
# ByteDance Revolution 
_ByteDance Revolution is an interactive dance web application._

<img src="https://github.com/googlecreativelab/posenet-sketchbook/blob/master/sketches/basic/assets/moving.gif?raw=true" width="400" height="400">
 
## How to Use this application 
To use this application, the user first either logs in or signs up using their email and password, or by using their Google account. The app consists of five distinct pages: Home, Play, My Account, My Saved Videos and High Scores. The Home page has a list of songs, each with a preset dance routine. You can listen to the song and decide which one you want to dance to. The user can migrate over to the main dance page either by clicking on the Dance button or the Play button in the nav bar. The Play page is the main page on the app, where the user can dance to a routine, view their score, save their video to My Saved Videos page and download to their local computer. Upon selecting a song to dance and pressing the start button, the user gets a countdown and needs to position themself to the overlaid images and start dancing. Once the routine is complete, the score is printed on the screen and the user gets options to save or download the video. Videos are stored in .webm format and can be played in any web browser. The My Account page consists of the user account details, and options to reset email and password. The My Saved Videos page comprises all the dance videos saved by the user. The High Scores page lists the scores of users per dance routine and has live updates as players play.
 
## Try the App!!
You can try the app live [here](https://bytedancerev.web.app/). 

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Setup
Fork and/or clone this repository to create your own local copy and run the following in the project directory

### Installation
Install dependencies for the project with

```
npm install 
```

Runs the app in the development mode with

```
npm run start 
```

Open http://localhost:3000 to view it in the browser.
The page will reload if you make edits.
You will also see any lint errors in the console.

## Deployment 
ByteDance Revolution is deployed using Firebase Hosting Services.
Run the following command to build the app for production.

```
npm run build
```

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
To deploy to your site, run the following command from the root of your local project directory

```
firebase deploy --only hosting
```
Your App is now deployed!!

## Built With
Technology | Description
------------ | -------------
[React](https://reactjs.org/) | Used to build main components
[Node.js](https://www.npmjs.com/) | Runtime environment and npm package manager
[Firebase](https://firebase.google.com/) | Realtime database and Storage
[TensorFlow](https://www.tensorflow.org/) | Open source Machine Learning Library
[PoseNet](https://www.tensorflow.org/lite/models/pose_estimation/overview) | Tensorflow model for pose estimation and detection

## Authors
[Winston Chiang](https://github.com/WinstonChiang), [Praveena Persaud](https://github.com/fullstack-2008), [Namratha Pashupathy Manjula Devi](https://github.com/namrathapmd), [Pawan Benjamin](https://github.com/pawanbenjamin).
