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

// Update play/pause button
function updateButton() {
  toggle.textContent = video.paused ? "►" : "❚ ❚";
}

// Update progress bar
function handleProgress() {
  if (!video.duration || isNaN(video.duration)) {
    return;
  }

  const percent = (video.currentTime / video.duration) * 100;

  // Update both width and flex-basis
  progressBar.style.width = `${percent}%`;
  progressBar.style.flexBasis = `${percent}%`;
}

// Update volume and playback speed
function handleRangeUpdate() {
  if (this.name === "volume") {
    video.volume = parseFloat(this.value);
  }

  if (this.name === "playbackRate") {
    video.playbackRate = parseFloat(this.value);
  }
}

// Skip video
function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

// Seek using progress bar
function scrub(event) {
  if (!video.duration || isNaN(video.duration)) {
    return;
  }

  const position = event.offsetX / progress.offsetWidth;
  video.currentTime = position * video.duration;
}

// Play / pause events
video.addEventListener("play", updateButton);
video.addEventListener("pause", updateButton);

// Clicking video
video.addEventListener("click", togglePlay);

// Clicking play button
toggle.addEventListener("click", togglePlay);

// Update progress while video plays
video.addEventListener("timeupdate", handleProgress);

// Skip buttons
skipButtons.forEach((button) => {
  button.addEventListener("click", skip);
});

// Volume and playback speed
ranges.forEach((range) => {
  range.addEventListener("change", handleRangeUpdate);
  range.addEventListener("input", handleRangeUpdate);
});

// Progress bar seeking
progress.addEventListener("click", scrub);

// Video error handling
video.addEventListener("error", () => {
  progressBar.style.width = "0%";
  progressBar.style.flexBasis = "0%";
  toggle.textContent = "⚠";
  toggle.title = "Video failed to load";
});