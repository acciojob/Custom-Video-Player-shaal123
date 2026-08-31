const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipButtons = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

// Play / Pause
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

// Update play button
function updateButton() {
  if (video.paused) {
    toggle.textContent = "►";
  } else {
    toggle.textContent = "❚ ❚";
  }
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.flexBasis = `${percent}%`;
}

// Change volume and playback speed
function handleRangeUpdate() {
  if (this.name === "volume") {
    video.volume = this.value;
  }

  if (this.name === "playbackRate") {
    video.playbackRate = this.value;
  }
}

// Skip forward/backward
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Click on progress bar to seek
function scrub(event) {
  const scrubTime =
    (event.offsetX / progress.offsetWidth) * video.duration;

  video.currentTime = scrubTime;
}

// Event listeners
video.addEventListener("click", togglePlay);

toggle.addEventListener("click", togglePlay);

video.addEventListener("play", updateButton);

video.addEventListener("pause", updateButton);

video.addEventListener("timeupdate", handleProgress);

skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});

ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("mousemove", handleRangeUpdate);
});

progress.addEventListener("click", scrub);

// Handle video loading error
video.addEventListener("error", () => {
  progressBar.style.width = "0%";
  progressBar.style.flexBasis = "0%";

  toggle.textContent = "⚠";

  toggle.title = "Video failed to load";
});