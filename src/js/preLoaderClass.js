class PreLoader {
  constructor() {
    this.preLoaderRef = document.querySelector('.preloader');
  }

  start() {
    this.preLoaderRef.classList.add('loader-is-hidden');
  }

  finish() {
    this.preLoaderRef.classList.remove('loader-is-hidden');
  }
}

export const preloader = new PreLoader();
