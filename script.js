const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");
const currentProgress = document.getElementById("current-progress");
const progressContainer = document.getElementById("progress-container");
const likeButton = document.getElementById("like");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");

const vienna = {
    songName: "Vienna",
    artist: "Billy Joel", 
    file: "Billy Joel - Vienna",
    liked: false
};

const youCouldBeMine = {
    songName: "You Could Be Mine",
    artist: "Guns N Roses",
    file: "Guns N Roses  - You Could Be Mine",
    liked: false
};

const sobreExaltado = {
    songName: "Sobre-Exaltado",
    artist: "Comunidade Católica Shalom",
    file: "Shalom - Sobre-Exaltdo",
    liked: false
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = JSON.parse(localStorage.getItem("playlist")) ?? [vienna, youCouldBeMine, sobreExaltado];
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
    likeButtonRender();
}

let updateProgress = () => {
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty("--progress", `${barWidth}%`);
    updateCurrentTime();
}

let jumpTo = (event) => {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;
}

let likeMusic = () => {
    likeButton.querySelector(".bi").classList.remove("bi-heart");
    likeButton.querySelector(".bi").classList.add("bi-heart-fill");
    likeButton.classList.add("button-active");
}

let disLikeMusic = () => {
    likeButton.querySelector(".bi").classList.remove("bi-heart-fill");
    likeButton.querySelector(".bi").classList.add("bi-heart");
    likeButton.classList.remove("button-active");
}

let likeButtonRender = () => {
    if (sortedPlaylist[index].liked === false){
        disLikeMusic();
    }
    else{
        likeMusic();
    }
}

let likeButtonClicked = () => {
    if(sortedPlaylist[index].liked === false){
        sortedPlaylist[index].liked = true;
    }
    else{
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem("playlist", JSON.stringify(originalPlaylist));
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
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add("button-active");
    }
    else{
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove("button-active");
    }
}

let repeatButtonClicked = () => {
    if (repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add("button-active");
        nextOrRepeat();
    }
    else {
        repeatOn = false;
        repeatButton.classList.remove("button-active");
    }
}

let nextOrRepeat = () => {
    if (repeatOn === false){
        nextMusic();
    }
    else{
        playMusic();
    }
}

let formatTime = (originalNumber) => {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - 3600 * hours) / 60)
    let seg = Math.floor(originalNumber - 3600 * hours - 60 * min)
    return `${hours.toString().padStart(2, "0")}:${min.toString().padStart(2, "0")}:${seg.toString().padStart(2, "0")}`
}

let updateCurrentTime = () => {
    songTime.innerText = formatTime(song.currentTime);
}

let updateTotalTime = () => {
    totalTime.innerText = formatTime(song.duration);
}

loadSong();

play.addEventListener("click", playPauseDecider);
next.addEventListener("click", nextMusic);
previous.addEventListener("click", previousMusic);
song.addEventListener("timeupdate", updateProgress);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
progressContainer.addEventListener("click", jumpTo);
likeButton.addEventListener("click", likeButtonClicked);
shuffleButton.addEventListener("click", shuffleButtonClicked);
repeatButton.addEventListener("click", repeatButtonClicked);