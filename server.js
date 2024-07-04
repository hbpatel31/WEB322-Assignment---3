const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://api.quotable.io/random");
    const quoteData = response.data;
    res.render("home", {
      quote: quoteData.content,
      author: quoteData.author,
      page: "/",
    });
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.render("home", {
      quote: "Unable to fetch quote at this moment.",
      author: "",
      page: "/",
    });
  }
});

app.get("/about", (req, res) => {
  res.render("about", { page: "/about" });
});

app.get("/lego/sets", async (req, res) => {
  const theme = req.query.theme;
  try {
    let sets;
    if (theme) {
      sets = await legoData.getSetsByTheme(theme);
    } else {
      sets = await legoData.getAllSets();
    }

    if (sets.length > 0) {
      // res.status(200).json(sets);
      res.render("sets", {
        data: sets,
      });
    } else {
      res.status(404).send("No Lego sets found!");
    }
  } catch (error) {
    res.status(404).send("Error retrieving Lego sets: " + error.message);
  }
});

app.use((req, res) => {
  res.status(404).render("404", { page: "" });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
