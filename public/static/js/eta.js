let eta = document.querySelector(".eta");
let delay = localStorage.getItem("delay");

//Calculate Eta

function getEta(val, num5) {
  delay = localStorage.getItem("delay");

  if (val == "default") {
    eta.innerHTML = `ETA:${(number.value * (defaultDelay / 1000)).toFixed(2)} Sec`;
  } else if (val == "random") {

    eta.innerHTML = `ETA:${(number.value * (randomarr[Math.floor(randomarr.length / 2)] / 1000)).toFixed(2)} Sec <span class="dinfo">(Random Delay)</span>`;
  } else if (val == "menual") {
    eta.innerHTML = `ETA:${(number.value * (delay / 1000)).toFixed(2)} Sec <span class="dinfo">(Custom Delay)</span>`;
  }
}

if (storedValue) {
  number.value = storedValue;
}

if (localStorage.getItem("delaycat") == "random") {
  eta.innerHTML = `ETA:${(number.value * (randomarr[Math.floor(randomarr.length / 2)] / 1000)).toFixed(2)} Sec <span class="dinfo">(Random Delay)</span>`;
} else if (localStorage.getItem("delaycat") == "menual") {
  eta.innerHTML = `ETA:${(number.value * (delay / 1000)).toFixed(2)} Sec <span class="dinfo">(Custom Delay)</span>`;
} else {
  eta.innerHTML = `ETA:${(number.value * (defaultDelay / 1000)).toFixed(2)} Sec`;
}
