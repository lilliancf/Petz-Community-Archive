var dataFiles = [
    "files/vpzResearchCenter.js",
    "data.js",
    "script.js"
]

injectData();

function injectData() {
    for (let i = 0; i < dataFiles.length; i++) {
        document.getElementById("body").innerHTML += `<script src="${dataFiles[i]}"></script>`
        console.log(dataFiles[i]);
    }
}
