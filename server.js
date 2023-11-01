/********************************************************************************
 * WEB322 – Assignment 04
 *
 * I declare that this assignment is my own work in accordance with Seneca's
 * Academic Integrity Policy:
 *
 * https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
 *
 * Name: Ashwin Pandey  Student ID: 156027211  Date: 11th October, 2023
 *
 * Published URL: https://worried-fawn-tux.cyclic.app
 *
 ********************************************************************************/

const legoData = require("./modules/legoSets");
const express = require("express");

legoData.initialize();
const path = require("path");
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.set("view engine", "ejs");
app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/lego/sets", async (req, res) => {
  try {
    const selectedFilter = req.query.theme || "All"; // Default to 'All' if no filter is provided
    console.log(selectedFilter);
    const sets = await legoData.getSetsByTheme(selectedFilter);

    if (sets.length === 0) {
      // No matching sets, display all sets
      const allSets = await legoData.getAllSets();
      res.render("sets", { sets: allSets, selectedFilter });
    } else {
      // Display sets filtered by the selected theme
      res.render("sets", { sets, selectedFilter });
    }
  } catch (error) {
    res
      .status(404)
      .render("404", { message: "No Sets found for a matching theme" });
  }
});

async function fetchRandomQuote() {
  try {
    const response = await fetch("https://quotable.io/random");
    if (!response.ok) {
      throw new Error(
        `Failed to fetch a random quote (HTTP ${response.status})`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch a random quote:", error);
    return null; // Handle the error by returning null or some default value
  }
}

app.get("/lego/sets/:setID", async (req, res) => {
  try {
    const set = await legoData.getSetByNum(req.params.setID);
    // Fetch a random quote using an AJAX request
    //const fetch = require('node-fetch'); // Node.js fetch library
    const quoteData = await fetchRandomQuote();

    res.render("set", { set: set, quote: quoteData });
  } catch (error) {
    res
      .status(404)
      .render("404", { message: "No Sets found for a matching ID" });
  }
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/404", (req, res) => {
  res.render("404");
});

app.use((req, res, next) => {
  res
    .status(404)
    .render("404", {
      message: "We're unable to find what you're looking for.",
    });
});
