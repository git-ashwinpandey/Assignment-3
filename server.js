/********************************************************************************
* WEB322 – Assignment 03
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
const express = require('express'); 

legoData.initialize();
const path = require('path');
const app = express(); 
const HTTP_PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.listen(HTTP_PORT, () => console.log(`server listening on: ${HTTP_PORT}`));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/home.html'));
});

app.get('/lego/sets', async (req, res) => {
    try {
        var sets = {};
        if (req.query.theme) {
            console.log(req.query.theme);
            sets = await legoData.getSetsByTheme(req.query.theme);
            if (sets.length === 0) {
                sets = await legoData.getAllSets();
            }
        } else {
            console.log(req.query.theme);
            sets = await legoData.getAllSets();
        }
        res.json(sets);
    } catch (error) {
        res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
    }
});

app.get('/lego/sets/:setID', async (req, res) => {
    try {
        const set = await legoData.getSetByNum(req.params.setID);
        res.json(set);
    } catch (error) {
        //throw new Error("404")
        res.status(404).sendFile(path.join(__dirname, '/views/404.html'));
    }
});

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/about.html'));
});

app.get("/404", (req,res)=>{
    res.sendFile(path.join(__dirname, '/views/404.html'));
});
