const mainControl = document.getElementById("main-control");
const pauseControl = document.getElementById("pause-control");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const albumImg = document.getElementById("album-img");
const title = document.getElementById("title");
const progressBar = document.getElementById("progressbar");
const bar = document.getElementById("bar");
const fullTime = document.querySelector(".fulltime");
const startTime = document.querySelector(".start");
const barWrapper = document.querySelector(".bar-wrapper");

const modal = document.querySelector(".modal");
const signin = document.querySelector(".signin");
const submitBtn = document.querySelector(".submit");
const username = document.querySelector("input[name='username']");
const password = document.querySelector("input[name='password']");
// audio.src = songs[index].src;

const songs = [
  {
    group: "SchoolboyQ",
    name: "CrasH",
    src: "./assets/CrasH.mp3",
    album: "./assets/imgAlb.jpg",
  },
  {
    group: "Lia Lee",
    name: "Abyuzer",
    src: "./assets/Abyuzer.mp3",
    album: "./assets/AbyuzerAlb.jpeg",
  },
  {
    group: "Zvery",
    name: "Rayon's",
    src: "./assets/zvery.mp3",
    album: "./assets/zveryAlb.jpeg",
  },
];

window.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("authdata"));
  data ? (signin.innerText = data.name) : (signin.innerText = "Sign In");

  const audio = new Audio();
  let index = 0;

  audio.src = songs[index].src;
  title.innerText = songs[index].name;
  albumImg.src = songs[index].album;

  audio.addEventListener("loadedmetadata", () => {
    fullTime.innerText = getTime(audio.duration);
  });

  setInterval(() => {
    startTime.innerText = getTime(audio.currentTime);
    bar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    // localStorage.setItem('current', audio.currentTime);
  }, 1000);

  barWrapper.addEventListener("click", (e) => {
    const timeLine = window.getComputedStyle(barWrapper).width;
    const timeToSeek = (e.offsetX / parseInt(timeLine)) * audio.duration;
    audio.currentTime = timeToSeek;
  });

  function getTime(duration) {
    let sec = Math.floor(duration);
    let min = Math.floor(sec / 60);
    sec -= min * 60;
    return ` ${min}:${String(sec % 60).padStart(2, 0)}`;
  }

  function changeDisplayValue(main, pause) {
    mainControl.style.display = main;
    pauseControl.style.display = pause;
  }

  mainControl.addEventListener("click", () => {
    audio.play();
    changeDisplayValue("none", "block");
  });

  pauseControl.addEventListener("click", () => {
    audio.pause();
    changeDisplayValue("block", "none");
  });

  function playSongByIndex(songIndex) {
    audio.src = songs[songIndex].src;
    albumImg.src = songs[songIndex].album;
    title.innerText = songs[songIndex].name;
    audio.play();
    changeDisplayValue("none", "block");
  }

  // if (index === 0){
  //   previous.style.color = "grey";
  // }

  next.addEventListener("click", () => {
    index += 1;
    if (index < songs.length) {
      playSongByIndex(index);
    } else if (index >= songs.length) {
      playSongByIndex(0);
      index = 0;
    }
  });

  previous.addEventListener("click", () => {
    index > 0 ? (index -= 1) : index;
    if (index < songs.length) {
      playSongByIndex(index);
    }
  });

  // function updateProgressBar(e) {
  //   const { duration, currentTime } = e.srcElement;
  //   const progressPercent = (currentTime / duration) * 100;
  //   bar.style.width = `${progressPercent}%`;
  // }
  // audio.addEventListener("timeupdate", updateProgressBar);

  // function setProgressBar(e) {
  //   const width = this.clientWidth;
  //   const clickX = e.offsetX;
  //   const duration = audio.duration;

  //   audio.currentTime = (clickX / width) * duration;
  // }

  // progressBar.addEventListener("click", setProgressBar);

  audio.addEventListener("ended", () => {
    audio.src = songs[index + 1].src;
    albumImg.src = songs[index + 1].album;
    title.innerText = songs[index + 1].name;
    audio.play();
    index += 1;
  });

  signin.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  submitBtn.addEventListener("click", () => {
    localStorage.setItem(
      "authdata",
      JSON.stringify({
        name: username.value,
        pass: password.value,
      })
    );
    modal.style.display = "none";
  });
});


//добавит кнопку выхода при нажатии на которую удаляется локал сторэдл
//римумайтем
//
