const setData = require("../data/setData");
const themeData = require("../data/themeData");

var sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            setData.forEach(element => {
                let t_sets;
                let result = themeData.find((theme) => {
                    return theme.id === element.theme_id;
                });
                t_sets = element;
                t_sets.theme = result.name;
                sets.push(t_sets);
            });
            resolve(); 
        } catch (error) {
            reject(error); 
        }
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        try {
            resolve(sets); 
        } catch (error) {
            reject(error);
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        try {
            const result = sets.find((set) => set.set_num === setNum);
            if (result) {
                resolve(result); 
            } else {
                reject("Unable to find requested set"); 
            }
        } catch (error) {
            reject(error);
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try {
            const themeLower = theme.toLowerCase();
            const matchingSets = sets.filter((set) => set.theme.toLowerCase().includes(themeLower));
            if (matchingSets.length > 0) {
                resolve(matchingSets); 
            } else {
                resolve([]);
            }
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };
