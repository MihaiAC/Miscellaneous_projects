export class Carousel {
  constructor(carousel_id) {
    this.carousel = document.querySelector(carousel_id);
    this.carouselInner = this.carousel.firstElementChild;
    this.images = this.carouselInner.children;
    this.navdots = this.carousel.querySelector(".nav-dots").children;
    this.interval = setInterval(() => this.selectNextImage(), 5000);

    this.#addNextButtonListener();
    this.#addPrevButtonListener();
    this.#addNavDotsListeners();
  }

  #addNextButtonListener() {
    let nextBtn = this.carousel.querySelector(".next");
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.selectNextImage();
      this.resetTimer();
    });
  }

  #addPrevButtonListener() {
    let prevBtn = this.carousel.querySelector(".prev");
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.selectPreviousImage();
      this.resetTimer();
    });
  }

  #addNavDotsListeners() {
    for (let index = 0; index < this.navdots.length; index++) {
      const element = this.navdots[index];
      element.addEventListener("click", (e) => {
        e.preventDefault();
        let activeImageIdx = this.getActiveImageIdx();
        if (activeImageIdx != index) {
          this.deactivateImage(activeImageIdx);
          this.activateImage(index);
          this.resetTimer();
        }
      });
    }
  }

  getActiveImageIdx() {
    let activeImageIdx = -1;
    for (let index = 0; index < this.images.length; index++) {
      if (this.images[index].classList.contains("active")) {
        activeImageIdx = index;
        break;
      }
    }

    if (activeImageIdx < 0) {
      const error_msg =
        "Carousel contains no images or none of the images is marked as active.";
      console.error(error_msg);
      throw new Error(error_msg);
    }

    return activeImageIdx;
  }

  // Called after the user presses one of the manual controls.
  resetTimer() {
    clearInterval(this.interval);
    this.interval = setInterval(() => this.selectNextImage(), 5000);
  }

  selectNextImage() {
    let activeImageIdx = this.getActiveImageIdx();

    this.deactivateImage(activeImageIdx);

    if (activeImageIdx < this.images.length - 1) {
      activeImageIdx += 1;
    } else {
      activeImageIdx = 0;
    }

    this.activateImage(activeImageIdx);
  }

  selectPreviousImage() {
    let activeImageIdx = this.getActiveImageIdx();

    this.deactivateImage(activeImageIdx);

    if (activeImageIdx > 0) {
      activeImageIdx -= 1;
    } else {
      activeImageIdx = this.images.length - 1;
    }

    this.activateImage(activeImageIdx);
  }

  deactivateImage(idx) {
    this.images[idx].classList.remove("active");
    this.navdots[idx].classList.remove("active");
  }

  activateImage(idx) {
    this.images[idx].classList.add("active");
    this.navdots[idx].classList.add("active");
  }
}
