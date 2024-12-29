/*
TODO Ideas:

Search function
Order by options
Species Filter

*/
import { vpzResearchCenter_data } from './files/vpzResearchCenter.js'

var dataList = {
    vpzResearchCenter_data
}


console.log(data);

var gameList = [
    "Dogz 1",
    "Catz 1",
    "Petz II", 
    "Petz 3", 
    "Petz 4", 
    "Petz 5"]
var filetypeList = [
    "Catz Breedfile",
    "Dogz Breedfile",
    "Toyz",
    "Clothez",
    "Playscenez",
    "Texturez",
    "Catz Petfile",
    "Dogz Petfile",
    "Misc"]
var creatorList = new Set(); // auto generated from data in database

var filetypeChecked ={};
var gameChecked = {};
var creatorChecked = {};

loadProjects();

function loadProjects() {
    //clear data inside card box
    document.getElementById('card-box').innerHTML = "";

    console.log(vpzResearchCenter_data)

    //iterate through the data file and build the clickable card for each entry
	for (let i = 0; i < data.length; i++) {
		let box = `
        
            <div class="content-card ${data[i].subtype}" id="${i}">
            <a href="petpage.html?id=${i}">
            <img src="${data[i].imgSmall ? data[i].imgSmall : data[i].imgLarge}">
            <div>${data[i].title} by 
            ${data[i].url ? '<a class="link" href="' + data[i].url + '">' : ''}
            ${data[i].creator ? data[i].creator : 'Unknown'}
            ${data[i].url ? '</a>' : ''}</div>
            </a>
            </div>
        `
	    document.getElementById('card-box').innerHTML += box;     
        creatorList.add(data[i].creator ? data[i].creator : 'Unknown');
        
	} 
    loadFilters();
}

function loadFilters() {
    document.getElementById('filetype-filters').innerHTML = "";
    document.getElementById('game-filters').innerHTML = "";
    document.getElementById('creator-filters').innerHTML = "";

    for (let ft in filetypeList) {
        let cleanTag = filetypeList[ft].replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase();
		filetypeChecked[cleanTag] = false;
		var block = `
		<div class="filetype-filter-button">
			<input type="checkbox" id="${cleanTag}" name="${cleanTag}" value="${cleanTag}" onClick="filterFileType(this)">
			<label for="${cleanTag}">${filetypeList[ft]}</label>
		</div>`

        document.getElementById('filetype-filters').innerHTML += block;
    }
    for (let g in gameList) {
        let cleanTag = gameList[g].replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase();
		gameChecked[cleanTag] = false;
		var block = `
		<div class="game-filter-button">
			<input type="checkbox" id="${cleanTag}" name="${cleanTag}" value="${cleanTag}" onClick="filterGame(this)">
			<label for="${cleanTag}">${gameList[g]}</label>
		</div>`

        document.getElementById('game-filters').innerHTML += block;
    }
    for (let c of creatorList) {
        let cleanTag = c.replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase();
		creatorChecked[cleanTag] = false;
		var block = `
		<div class="creator-filter-button">
			<input type="checkbox" id="${cleanTag}" name="${cleanTag}" value="${cleanTag}" onClick="filterCreator(this)">
			<label for="${cleanTag}">${c}</label>
		</div>`

        document.getElementById('creator-filters').innerHTML += block;
    }

}

function filterFileType(checkbox) {
    filetypeChecked[checkbox.id] = checkbox.checked;
    console.log(filetypeList);

    if (isSomethingChecked(filetypeChecked)) {
        for (let i = 0; i < data.length; i++) {
            let fileType = (data[i].subtype ? data[i].subtype : "") + data[i].filetype;
            if (!cleanIncludes(filetypeList,fileType)) {
                fileType="misc";
            }
            if (filetypeChecked[fileType]) {
                document.getElementById(i).classList.remove("filetype-hide");
            }
            else {
                document.getElementById(i).classList.add("filetype-hide");
            }
        }
    } 
    else {
        for (let i = 0; i < data.length; i++) {
            document.getElementById(i).classList.remove("filetype-hide");
        } 
    }   
}

function filterGame(checkbox) {
    gameChecked[checkbox.id] = checkbox.checked;

    if (isSomethingChecked(gameChecked)) {
        for (let i = 0; i < data.length; i++) {

            let gametypes = new Set(); 
            for (let gt in data[i].downloadLinks) {
                if (data[i].downloadLinks[gt]) {
                    let cleanGT = gt.replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase();
                    if  (cleanGT.slice(-2) === "ow") {
                        cleanGT = cleanGT.slice(0, -2);
                    }
                    if (cleanGT === "unibreed") {
                        gametypes.add("petz3");
                        gametypes.add("petz4");
                        gametypes.add("petz5");
                    }
                    else if (cleanGT !== "other") {
                        gametypes.add(cleanGT);
                    }
                }
            }

            let shouldBeVisible = false;
            for (let game of gametypes) {
                if (gameChecked[game]) {
                    shouldBeVisible = true;
                }
            }

            if (shouldBeVisible) {
                document.getElementById(i).classList.remove("game-hide");
            }
            else {
                document.getElementById(i).classList.add("game-hide");
            }

       }
    } 
    else {
        for (let i = 0; i < data.length; i++) {
            document.getElementById(i).classList.remove("game-hide");
        } 
    }   
}

function filterCreator(checkbox) {
    creatorChecked[checkbox.id] = checkbox.checked;

    if (isSomethingChecked(creatorChecked)) {
        for (let i = 0; i < data.length; i++) {
            let creator = "unknown";
            if (data[i].creator) {
                creator = data[i].creator.replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase() 
            }
            
            if (creatorChecked[creator]) {
                document.getElementById(i).classList.remove("creator-hide");
            }
            else {
                document.getElementById(i).classList.add("creator-hide");
            }
        }
    } 
    else {
        for (let i = 0; i < data.length; i++) {
            document.getElementById(i).classList.remove("creator-hide");
        } 
    }   
}

function isSomethingChecked(checkedList) {
    for (let item in checkedList) {
        if (checkedList[item]) {
            return true;
        }
    }
    return false; 
}

function cleanIncludes(list, value) {
    for(let x in list) {
        if (list[x].replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase() === value.replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase()) {
            return true;
        }
    }
    return false;
}

function setContainsLowercaseIgnoreSpaces(set, value) {
    cleanValue = value.replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase()
    for(let item of set) {
        if (item.replace(/[^0-9a-zA-Z]/g, '').toLocaleLowerCase() === cleanValue) {
            return true;
        }
    }
    return false;
}

window.filterFileType = filterFileType; 
window.filterGame = filterGame; 
window.filterCreator = filterCreator; 