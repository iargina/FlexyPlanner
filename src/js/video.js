const videoMob  = document.querySelector(".video_mob")
const videoWeb  = document.querySelector(".video_web")

if (window.innerWidth >= 768) {
    videoMob.style.display = 'none';
  }
  if (window.innerWidth < 768) {
    videoWeb.style.display = 'none';
  }