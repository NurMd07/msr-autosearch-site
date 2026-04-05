let micro1 = document.querySelector(".micro1");
let p1 = document.querySelector(".p1");
let p2 = document.querySelector(".p2");
let p3 = document.querySelector(".p3");
let default1 = document.querySelector(".default");
let random = document.querySelector(".random");
let menual = document.querySelector(".menual");
let hide1 = document.querySelector(".hide1");
let show1 = document.querySelector(".show1");
let delaydiv = document.querySelector(".delaydiv");
let msave = document.querySelector(".msave");
let minput = document.querySelector(".minput");
let firstcheck = true;
let t1 = document.querySelector(".t1");
let delayinfo = document.querySelector(".delayinfo");
let bt6 = document.querySelector("#bt6");

let bt2 = document.querySelector("#bt2");
let bt4 = document.querySelector("#bt4");
let number = document.querySelector("#number");

let defaultz = document.querySelector(".defaultz");
let defaultDelay = 4 * 1000;
 let randomarr = [
    15100, 16200, 17000, 18600, 19400, 20100, 21000
  ];

delayinfo.addEventListener("click", () => {
  bt6.click();
});
t1.classList.add("hidden-element");
delaydiv.classList.add("hidden-element");
delaydiv.classList.remove("visible-element");
show1.style.display = "block";

default1.style.display = "none";
random.style.display = "none";
menual.style.display = "none";

// delay div

if (localStorage.getItem("d1") == "hide") {
  delaydiv.classList.add("hidden-element");
  delaydiv.classList.remove("visible-element");
  show1.style.display = "block";
  hide1.classList.add("d-none");
} else if (localStorage.getItem("d1") == "show") {
  if (localStorage.getItem("delaycat") != "default") {
    delaydiv.classList.remove("hidden-element");
    delaydiv.classList.add("visible-element");
    show1.style.display = "none";
    hide1.classList.remove("d-none");

  }
  delaydiv.classList.add("delaydiv1");
}
hide1.addEventListener("click", () => {
 
  delaydiv.classList.add("hidden-element");
  delaydiv.classList.remove("visible-element");
  show1.style.display = "block";
  localStorage.setItem("d1", "hide");
  hide1.classList.add("d-none");
});
show1.addEventListener("click", () => {
 
  show1.style.display = "none";
  delaydiv.classList.remove("hidden-element");
  delaydiv.classList.add("visible-element");
  localStorage.setItem("d1", "show");
  delaydiv.classList.add("delaydiv1");
  hide1.classList.remove("d-none");
});
p1.addEventListener("click", () => {
  default1.style.display = "block";
  random.style.display = "none";
  menual.style.display = "none";
  localStorage.setItem("delaycat", "default");
  localStorage.setItem("delay",defaultDelay);
  if (firstcheck) {
    firstcheck = false;
  } else {
    getEta("default");
  }
});
p2.addEventListener("click", () => {
  default1.style.display = "none";
  random.style.display = "block";
  menual.style.display = "none";
  localStorage.setItem("delaycat", "random");
  if (firstcheck) {
    firstcheck = false;
  } else {
    getEta("random");
  }
});
let m1 = 0;
p3.addEventListener("click", () => {
  default1.style.display = "none";
  random.style.display = "none";
  menual.style.display = "block";
});
function outfocus() {
  let tempElement = document.createElement("input");
  tempElement.classList.add("visually-hidden");
  document.body.appendChild(tempElement);
  tempElement.focus();

  default1.style.display = "none";
  random.style.display = "none";
  menual.style.display = "none";
}
if (localStorage.getItem("delaycat") == null) {
  localStorage.setItem("delaycat", "default");
  localStorage.setItem("delay", defaultDelay);
}
if (localStorage.getItem("delaycat") == "default") {
  p1.click();
  outfocus();
} else if (localStorage.getItem("delaycat") == "random") {
  p2.click();
  outfocus();
} else if (localStorage.getItem("delaycat") == "menual") {
  p3.click();
  outfocus();
} else {
  p1.click();
  outfocus();
}

msave.addEventListener("click", () => {
  let mvalue = parseFloat(minput.value);

  if (mvalue == null || isNaN(mvalue)) {
    alert("Please Enter a Value");
    return;
  } else if (mvalue > 20 || mvalue < 1) {
    alert("Please Enter a Value Between 1.0-20");
    return;
  }
  localStorage.setItem("delaycat", "menual");
  localStorage.setItem("delay", minput.value * 1000);
  getEta("menual");
  t1.classList.remove("hidden-element");
  t1.classList.add("visible-element");
  setTimeout(() => {
    t1.classList.add("hidden-element");
    t1.classList.remove("visible-element");
  }, 2000);
});
if (localStorage.getItem("delaycat") == "menual") {
  minput.value = localStorage.getItem("delay") / 1000;
} else {
  minput.value = 1.0;
}
