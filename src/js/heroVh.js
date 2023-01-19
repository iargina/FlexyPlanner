const heroSec = document.querySelector('.hero');

function centeredHero() {
  let userwidth = window.screen.height;
  const padding = userwidth - heroSec.offsetHeight;
  console.log(padding);
  if (padding > 0) {
    heroSec.style.paddingTop = `${padding / 2}px`;
    heroSec.style.paddingBottom = `${padding / 2}px`;
  }
}
centeredHero();
// window.addEventListener('resize', appendHero, true);