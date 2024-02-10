const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play");
const next = document.getElementById("next");
const previous = document.getElementById("previous");

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
const playlist = [vienna, youCouldBeMine, sobreExaltado];
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
    if (index === playlist.length - 1){
        index = 0;
    }
    else{
        index += 1;
    }
    loadSong()
    playMusic()
}

let previousMusic = () => {
    if (index === 0){
        index = playlist.length - 1;
    }
    else{
        index -= 1;
    }
    loadSong()
    playMusic()
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
    cover.src = `Images/${playlist[index].file}.jpg`;
    song.src = `Songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

loadSong();

play.addEventListener("click", playPauseDecider);
next.addEventListener("click", nextMusic)
previous.addEventListener("click", previousMusic)