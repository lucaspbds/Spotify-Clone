const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const cover = document.getElementById("cover");
const song = document.getElementById("audio");
const play = document.getElementById("play");

const vienna = {
    songName: "Vienna",
    artist: "Billy Joel", 
    file: "Billy Joel - Vienna.mp3"
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

let playPauseDecider = () => {
    if (isPlaying === true) {
        pauseMusic();
    }
    else{
        playMusic();
    }
}

let loadSong = () => {
    cover.src = `Images/${playlist[index].file}.jpg`
    song.src = `Songs/${playlist[index].file}.mp3`
    songName.src = playlist[index].songName
    bandName.src = playlist[index].bandName
}

play.addEventListener("click", playPauseDecider);