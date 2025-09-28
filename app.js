const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 3000;

//set up EJS and css static stuff and things
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

//route to display input form
app.get("/", (req, res) => {
    res.render("form");
});

//route to handle form submission and get joke from JokeAPI
app.post("/get-joke", async (req, res) => {
    const { category, type } = req.body;

    //build API URL dynamically
    let url = `https://v2.jokeapi.dev/joke/${category}?type=${type}`;

    try {
        const response = await axios.get(url);
        const jokeData = response.data;

        //send your new amazing joke to result page
        res.render("result", { joke: jokeData });
    } catch (error) {
        //if it has an error
        console.error(error.message);
        res.render("form", { message: "Failed to fetch a joke. Please try again." });
    }
});

// start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
