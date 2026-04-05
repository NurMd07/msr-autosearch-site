//search random words

async function multipleSearch() {
  if (number.value < 1 || number.value > 100) {
    alert("Search Value should be between 1 to 100");
    return;
  }

  if (!isdefault) {
    let v1 = number.value.toString();

    localStorage.setItem("sv", v1);
  }
  if (localStorage.getItem("sv") !== null) {
    defaultz.style.display = "inline-block";
  }

  let length = parseInt(number.value);

  let array = [];
  let err;
  let num1 = length;
  if (localStorage.getItem("alldata") != null) {
    let alldata = JSON.parse(localStorage.getItem("alldata"));

    if (num1 > 0 && num1 <= 100) {
      while (num1 > 0) {
        let random = Math.floor(Math.random() * alldata.length);
        array.push(alldata[random]);
        num1--;
      }
    }
  } else {
    await fetch(`data/words.json`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong");
        }
      })
      .then((data) => {
        let arr0 = JSON.stringify(data);
        localStorage.setItem("alldata", arr0);
      })
      .catch((error) => {
        console.log(error);
        err = true;
      });
    if (err) {
      let body = document.querySelector("body");
      body.insertAdjacentHTML(
        "beforeend",
        `<div class="alert alert-warning alert-dismissible fade show mt-5 err1" role="alert">
       <strong>Error!</strong> Something Went wrong.
       <button title="close error msg" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
     </div>`
      );
      return;
    }
    let alldata = JSON.parse(localStorage.getItem("alldata"));
    if (num1 > 0 && num1 <= 100) {
      while (num1 > 0) {
        let random = Math.floor(Math.random() * alldata.length);
        array.push(alldata[random]);
        num1--;
      }
    }
  }

  let dcount = 1;
  let isfailed = false;
  if (localStorage.getItem("delaycat") == "menual") {
    delay = localStorage.getItem("delay");
  }
 
  let isRandom = false;
  if (localStorage.getItem("delaycat") == "random") {
    isRandom = true;
  }
  for (let i = 0; i < array.length; i++) {
    if (isRandom) {

      let random = Math.floor(Math.random() * randomarr.length);
      delay = randomarr[random];
    }
    setTimeout(() => {
      let tab = window.open(
        `https://www.bing.com/search?q=${array[i]}&setmkt=en-US&PC=EMMX01&form=LBT003&scope=web`,
        "_blank"
      );

      if (!tab || tab.closed || typeof tab.closed == "undefined") {
        if (dcount == 1) {
          bt4.click();
        }
        isfailed = true;
        dcount++;
      }
      setTimeout(() => {
        if (!isfailed) {
          tab.close();
        }
      }, delay / 1.1);
      console.log(delay)
    }, i * delay);
  }

  setTimeout(() => {
    if (!isfailed) {
      bt2.click();
    }
  }, array.length * delay);

  // if (isdefault) {
  //   setTimeout(() => {
  //     if (count >= 2) {
  //       number.value = 5;
  //       eta.innerHTML = `ETA:${(
  //         5 * (delay / 1000) +
  //         (delay / 1000) * 4
  //       ).toFixed(2)} Sec`;
  //     } else {
  //       number.value = 10;
  //       eta.innerHTML = `ETA:${(
  //         10 * (delay / 1000) +
  //         (delay / 1000) * 4
  //       ).toFixed(2)} Sec`;
  //     }
  //   }, 5000);
  // }
  // count++;
}
