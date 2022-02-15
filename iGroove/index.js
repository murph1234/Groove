/*jshint esversion: 6 */
var img = document.querySelector("img");
var music = document.querySelector("audio");
var play = document.getElementById("play");
var artist = document.getElementById("artist");
var title = document.getElementById("title");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
let progress = document.getElementById("progress");
let total_duration = document.getElementById("duration");
let current_time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");
let volume_slider = document.querySelector('.volume_slider');
var songs = [{
  name: "1",
  title: "PEHLI MOHABBAT",
  artist: "Darshan Raval",
},
{
  name: "2",
  title: "JANNAT VE",
  artist: "Darshan Raval",
},
{
  name: "3",
  title: "Do DIN",
  artist: "Darshan Raval",
},
{
  name: "4",
  title: "CHOGADA",
  artist: "Darshan Raval",
},
{
  name: "5",
  title: "MERE NISHAAN",
  artist: "Darshan Raval",
},
{
  name: "6",
  title: "EK LADKI KO DEKHA TO AISA LAGA",
  artist: "Darshan Raval",
},
{
    name: "7",
    title: "KEHNA HI KYA",
    artist: "K.S Chitra,A.R Rahman",
  },
  {
    name: "8",
    title: "O RE PIYA",
    artist: "Rahat Fateh Ali Khan",
  },
];
var isPlaying = false;

// play function
var playMusic = function(){
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play","fa-pause");
  img.classList.add("anime");
};

// pause function
var pauseMusic =function(){
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause","fa-play");
  img.classList.remove("anime");
};

play.addEventListener('click',function(){
  if(isPlaying){
    pauseMusic();
  }else{
    playMusic();
  }
});

// change the track
var loadSong = function(songs){
  title.textContent = songs.title;
  artist.textContent = songs.artist;
  music.src = "songs/"+songs.name+".mp3";
  img.src = "covers/"+songs.name+".jpg";

};
songIndex = 0;

var nextSong = function(){
  songIndex = (songIndex+1)%songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

var prevSong = function(){
  songIndex = (songIndex-1+songs.length)%songs.length;
  loadSong(songs[songIndex]);
  playMusic();
};

// progress bar
music.addEventListener('timeupdate',function(event){
  var {currentTime,duration}= event.srcElement;

  let progress_time = (currentTime/duration)*100;
  progress.style.width = `${progress_time}%`;
  // music duration
  let min_duration = Math.floor(duration/60);
  let sec_duration = Math.floor(duration%60);

  let tot_duration = `${min_duration}:${sec_duration}`;
  if(duration){
    total_duration.textContent = `${tot_duration}`;
  }

  // current duration
  let min_currentTime = Math.floor(currentTime/60);
  let sec_currentTime = Math.floor(currentTime%60);
  if(sec_currentTime<10){
    sec_currentTime = `0${sec_currentTime}`;
  }
  let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
  current_time.textContent = `${tot_currentTime}`;

});

progress_div.addEventListener('click',function(event){
  const {duration} = music;
  let move_progress = (event.offsetX/event.srcElement.clientWidth)*duration;
  music.currentTime = move_progress;
});
function setVolume(){
    music.volume = volume_slider.value / 100;
}
music.addEventListener('ended',nextSong());
next.addEventListener('click',nextSong);
prev.addEventListener('click',prevSong);
 
