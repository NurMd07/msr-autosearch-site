let searchInProgress = false;
const delayWorkerUrl = new URL("delay-worker.js", document.currentScript.src);
let delayWorker;
let nextDelayId = 0;
const pendingDelayWaits = new Map();

function wait(milliseconds) {
  return new Promise((resolve) => {
    let timerId;
    let delayId;

    const finish = () => {
      clearTimeout(timerId);
      if (delayId !== undefined) {
        pendingDelayWaits.delete(delayId);
      }
      resolve();
    };

    timerId = setTimeout(finish, milliseconds + 2000);

    try {
      if (typeof Worker === "undefined") {
        setTimeout(finish, milliseconds);
        return;
      }

      if (!delayWorker) {
        delayWorker = new Worker(delayWorkerUrl);
        delayWorker.addEventListener("message", ({ data }) => {
          const resolveWait = pendingDelayWaits.get(data.id);
          if (resolveWait) {
            pendingDelayWaits.delete(data.id);
            resolveWait();
          }
        });
        delayWorker.addEventListener("error", (error) => {
          console.error("Search delay worker failed:", error);
          delayWorker.terminate();
          delayWorker = null;
        });
      }

      delayId = nextDelayId++;
      pendingDelayWaits.set(delayId, finish);
      delayWorker.postMessage({ id: delayId, milliseconds });
    } catch (error) {
      console.error("Could not start search delay worker:", error);
      setTimeout(finish, milliseconds);
    }
  });
}

function getSearchDelay() {
  const delayCategory = localStorage.getItem("delaycat");

  if (delayCategory === "random") {
    return randomarr[Math.floor(Math.random() * randomarr.length)];
  }

  if (delayCategory === "menual") {
    const manualDelay = Number(localStorage.getItem("delay"));
    if (!Number.isFinite(manualDelay) || manualDelay < 1000 || manualDelay > 20000) {
      throw new Error("Manual delay must be between 1 and 20 seconds.");
    }
    return manualDelay;
  }

  return defaultDelay;
}

async function multipleSearch() {
  if (searchInProgress) {
    return;
  }

  const searchCount = Number(number.value);
  if (!Number.isInteger(searchCount) || searchCount < 1 || searchCount > 100) {
    alert("Search Value should be between 1 to 100");
    return;
  }

  searchInProgress = true;
  const startButton = document.querySelector(".bt1");
  const startButtonLabel = startButton.textContent;
  startButton.disabled = true;
  startButton.textContent = "Running";
  startButton.classList.add("is-running");

  try {
    if (!isdefault) {
      localStorage.setItem("sv", searchCount.toString());
    }
    if (localStorage.getItem("sv") !== null) {
      defaultz.style.display = "inline-block";
    }

    let searchTerms;
    try {
      const cachedTerms = localStorage.getItem("alldata");
      if (cachedTerms !== null) {
        searchTerms = JSON.parse(cachedTerms);
      } else {
        const response = await fetch("data/words.json");
        if (!response.ok) {
          throw new Error("Could not load search terms.");
        }
        searchTerms = await response.json();
        localStorage.setItem("alldata", JSON.stringify(searchTerms));
      }

      if (!Array.isArray(searchTerms) || searchTerms.length === 0) {
        throw new Error("The search terms list is empty or invalid.");
      }
    } catch (error) {
      console.error("Failed to load search terms:", error);
      document.querySelector("body").insertAdjacentHTML(
        "beforeend",
        `<div class="alert alert-warning alert-dismissible fade show mt-5 err1" role="alert">
          <strong>Error!</strong> Could not load search terms.
          <button title="close error msg" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
      );
      return;
    }

    const searches = Array.from({ length: searchCount }, () => {
      const index = Math.floor(Math.random() * searchTerms.length);
      return searchTerms[index];
    });

    for (const searchTerm of searches) {
      let delay;
      try {
        delay = getSearchDelay();
      } catch (error) {
        console.error("Invalid search delay:", error);
        alert(error.message);
        return;
      }

      const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}&setmkt=en-US&PC=EMMX01&form=LBT003&scope=web`;
      const tab = window.open(searchUrl, "_blank");

      if (!tab || tab.closed || typeof tab.closed === "undefined") {
        bt4.click();
        return;
      }

      await wait(delay);
      tab.close();
    }

    bt2.click();
  } finally {
    searchInProgress = false;
    startButton.disabled = false;
    startButton.textContent = startButtonLabel;
    startButton.classList.remove("is-running");
  }
}
