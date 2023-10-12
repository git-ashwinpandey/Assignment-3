const setData = require("../data/setData");
const themeData = require("../data/themeData");

var sets = [];

function initialize() {
    setData.forEach(element => {
        let t_sets;
        let result = themeData.find((theme) => {
            return theme.id === element.theme_id; 
        });
        t_sets = element;
        t_sets.theme = result.name;
        sets.push(t_sets);
    });
}

function getAllSets() {
    return sets;
}

function getSetByNum(setNum) {
    result = [];
    result.push(sets.find((set) => {
        return set.set_num === setNum;
    }));
    return result;
}

function getSetsByTheme(theme) {
    const themeLower = theme.toLowerCase();
    return sets.filter((set) => set.theme.toLowerCase().includes(themeLower));
}


initialize();
//console.log(sets);
//console.log(getSetByNum("001-1"));
//console.log(getSetsByTheme("tech"));