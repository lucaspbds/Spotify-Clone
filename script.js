const songName = document.getElementById("song-name");
const bandName = document.getElementById("band-name");
const song = document.getElementById("audio");
const play = document.getElementById("play")

songName.innerText = "Sobre-Exaltado";
bandName.innerText = "Comunidade Católica Shalom";

let playMusic = () => {
    song.play();
}

play.addEventListener("click", playMusic);