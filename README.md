# A music player w/electron
![Screenshot (4)](https://user-images.githubusercontent.com/108736691/233554710-f17df9e1-55f2-4787-a632-40cafa2033e4.png)

A-music player made with electronjs as the renderer, and nodejs, and yt-dlp in the backend. With yt-dlp and ffmpeg, songs can be downloaded off of youtube. The audio visualizer adds a magical touch to the ui, and grabs everyone's attention. The username and email are stored via local storage, for the moment. With the fs module of nodejs, we can display all files in the audio directory, recursively going through subfolders, and displaying them in the explorer pane. The central widget marks the time stamp, and the logout and refresh buttons are on the sidebar title-bar.

## Setup
### Dependencies
- yarn
- git
- nodejs
### Windows
- Execute: `cd Desktop` 
  `git clone https://github.com/partially-nerd/aMusing.git aMusing`
  `cd aMusing`
  `yarn global add electron` (npm fails to install electron properly. it is a large package)
  `npm i youtube-search-api`
  `npm run-script run`
### Unix / Linux
- Execute: `cd ~/; git clone https://github.com/partially-nerd/aMusing.git aMusing; cd aMusing; yarn global add electron; npm i youtube-search-api`
- Now, comment out the script.js import, and uncomment the scriptUnix.js import from the index.html file
- Execute: `npm run-script runUnix`