let eta = document.querySelector(".eta");
let delay = localStorage.getItem("delay");

//Calculate Eta

function getEta(val, num5) {
  delay = localStorage.getItem("delay");
  if (val == "default") {
    eta.innerHTML = `ETA:${(number.value * 2 + 2 * 4).toFixed(2)} Sec`;
  } else if (val == "random") {
    eta.innerHTML = `ETA:${(number.value * 2 + 2 * 4).toFixed(
      2
    )} Sec <span class="dinfo">(Random Delay)</span>`;
  } else if (val == "menual") {
    eta.innerHTML = `ETA:${(
      number.value * (delay / 1000) +
      (delay / 1000) * 4
    ).toFixed(2)} Sec <span class="dinfo">(Custom Delay)</span>`;
  }
}

if (storedValue) {
  number.value = storedValue;
  eta.innerHTML = `ETA:${(
    storedValue * (delay / 1000) +
    (delay / 1000) * 4
  ).toFixed(2)} Sec`;
  if (localStorage.getItem("delaycat") == "random") {
    eta.innerHTML = `ETA:${(
      storedValue * (delay / 1000) +
      (delay / 1000) * 4
    ).toFixed(2)} Sec <span class="dinfo">(Random Delay)</span>`;
  } else if (localStorage.getItem("delaycat") == "menual") {
    eta.innerHTML = `ETA:${(storedValue * delay).toFixed(
      2
    )} Sec <span class="dinfo">(Custom Delay)</span>`;
  }
} else {
  eta.innerHTML = `ETA:${(
    number.value * (delay / 1000) +
    (delay / 1000) * 4
  ).toFixed(2)} Sec`;
  if (localStorage.getItem("delaycat") == "random") {
    eta.innerHTML = `ETA:${(
      number.value * (delay / 1000) +
      (delay / 1000) * 4
    ).toFixed(2)} Sec <span class="dinfo">(Random Delay)</span>`;
  } else if (localStorage.getItem("delaycat") == "menual") {
    eta.innerHTML = `ETA:${(
      number.value * (delay / 1000) +
      (delay / 1000) * 4
    ).toFixed(2)} Sec <span class="dinfo">(custom Delay)</span>`;
  }
}
