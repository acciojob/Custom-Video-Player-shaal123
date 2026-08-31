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

// Update Play/Pause button
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// Update progress bar
function handleProgress() {
  if (!video.duration || !isFinite(video.duration)) {
    return;
  }

  const percent = (video.currentTime / video.duration) * 100;

  progressBar.style.width = percent + "%";
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

// Skip video
function skip() {
  video.currentTime += Number(this.dataset.skip);
}

// Seek video using progress bar
function scrub(event) {
  if (!video.duration || !isFinite(video.duration)) {
    return;
  }

  const scrubPosition = event.offsetX / progress.offsetWidth;

  video.currentTime = scrubPosition * video.duration;
}

// --------------------
// Event Listeners
// --------------------

// Play / pause button
toggle.addEventListener("click", togglePlay);

// Click video to play/pause
video.addEventListener("click", togglePlay);

// Update button when video starts playing
video.addEventListener("play", updateButton);

// Update button when video pauses
video.addEventListener("pause", updateButton);

// Update progress bar continuously
video.addEventListener("timeupdate", handleProgress);

// Also update when metadata becomes available
video.addEventListener("loadedmetadata", handleProgress);

// Skip buttons
skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});

// Volume and playback speed controls
ranges.forEach((range) => {
  range.addEventListener("input", handleRangeUpdate);
});

// Click progress bar to seek
progress.addEventListener("click", scrub);

// Video error handling
video.addEventListener("error", () => {
  progressBar.style.width = "0%";

  toggle.textContent = "⚠";
  toggle.title = "Video failed to load";
});