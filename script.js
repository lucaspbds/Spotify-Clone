const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const like = document.getElementById("like");
const shuffleButton = document.getElementById("shuffle");

const vienna = {
    songName: "Vienna",
    artist: "Billy Joel", 
    file: "Billy Joel - Vienna"
};

const youCouldBeMine = {
    songName: "You Could Be Mine",
    artist: "Guns N Roses",
    file: "Guns N Roses  - You Could Be Mine"
};

const sobreExaltado = {
    songName: "Sobre-Exaltado",
    artist: "Comunidade Católica Shalom",
    file: "Shalom - Sobre-Exaltdo"
};

let isPlaying = false;
let isenjoying = false;
let isShuffled = false;
const originalPlaylist = [vienna, youCouldBeMine, sobreExaltado];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

let playMusic = () => {
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play();
    isPlaying = true;
}

let pauseMusic = () => {
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    play.querySelector(".bi").classList.add("bi-play-circle-fill");
    song.pause();
    isPlaying = false;
}

let nextMusic = () => {
    if (index === sortedPlaylist.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    loadSong();
    playMusic();
}

let previousMusic = () => {
    if (index === 0){
        index = sortedPlaylist.length - 1;
    }
    else{
        index -= 1;
    }
    loadSong();
    playMusic();
}

let playPauseDecider = () => {
    if (isPlaying === true) {
        pauseMusic();
    }
    else{
        playMusic();
    }
}

let loadSong = () => {
    cover.src = `Images/${sortedPlaylist[index].file}.jpg`;
    song.src = `Songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}

let updateProgressBar = () => {
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

let jumpTo = (event) => {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX
    const jumpToTime = (clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;
}

let likeMusic = () => {
    like.querySelector(".bi").classList.remove("bi-heart");
    like.querySelector(".bi").classList.add("bi-heart-fill") ;
    isenjoying = true;
}

let disLikeMusic = () => {
    like.querySelector(".bi").classList.remove("bi-heart-fill");
    like.querySelector(".bi").classList.add("bi-heart");
    isenjoying = false;
}

let likeDislikeDecider = () => {
    if (isenjoying === false){
        likeMusic();
    }
    else{
        disLikeMusic();
    }

}

let shuffleArray = (preShuffleArray) => {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

let shuffleButtonClicked = () => {
    if(isShuffled === false){
        isShuffled = true
        shuffleArray(sortedPlaylist)
        shuffleButton.classList.add("button-active")
    }
    else{
        isShuffled = false
        sortedPlaylist = [...originalPlaylist]
        shuffleButton.classList.remove("button-active")
    }
}

loadSong();

play.addEventListener("click", playPauseDecider);
next.addEventListener("click", nextMusic);
previous.addEventListener("click", previousMusic);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);
like.addEventListener("click", likeDislikeDecider)
shuffleButton.addEventListener("click", shuffleButtonClicked)
