const express = require("express");
const app = express();
const axios = require("axios");
const useragent = require("express-useragent");
const data = require("./public/data/words.json");

app.disable("x-powered-by");

app.use(express.urlencoded({ extended: false }));

app.use(express.static("public", { maxAge: "3d" }));

app.set("view engine", "ejs");
app.set("trust proxy", true);

app.get("/", async (req, res) => {
  res.set("Content-Type", "text/html");

  let source = req.headers["user-agent"];
  let ua, isMobile;
  try {
    ua = useragent.parse(source);
    isMobile = ua.isMobile;
    if (isMobile == undefined) {
      throw new Error("oops");
    }
  } catch (e) {
    console.log(e);
    isMobile = false;
  }

  // check if ip is local or remote
  let ip;
  if (req.ip.length >= 6 && !req.ip.includes("192.168")) {
    ip = req.ip;
  } else {
    ip = "1.1.1.1";
  }
  //get location using ip-api
  try {
    let ipinfo = await axios.get(
      `http://ip-api.com/json/${ip}?fields=countryCode`
    );

    if (!ipinfo.data || !ipinfo.data.hasOwnProperty("countryCode")) {
      res.render("home", { country_code: "unavailable", isMobile: isMobile });
      throw new Error("ipinfo error");
    }

    let country_code = ipinfo.data.countryCode;

    res.render("home", { country_code: country_code, isMobile: isMobile });
  } catch (err) {
    res.render("home", { country_code: "Error", isMobile: isMobile });
    console.log(err);

    return;
  }
});

app.get("/word", (req, res) => {
  try {
    if (req.query.hasOwnProperty("number") && !isNaN(req.query.number)) {
      let number = Math.floor(Math.abs(req.query.number));
      let array = [];

      if (number > 0 && number <= 100) {
        while (number > 0) {
          let random = Math.floor(Math.random() * data.length);
          array.push(data[random]);
          number--;
        }
        res.status(200).json(array);
      } else {
        res.status(400).json("number is not in range");
      }
    } else {
      res.status(400).json("400 Bad Request");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("500 Internal Server Error");
  }
});

app.use((req, res) => {
  res.status(404).render("404");
});

const PORT = 9011;

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(`Server is started. \nPort : ${PORT}`);
});
