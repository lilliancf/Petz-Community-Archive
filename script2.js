loadData();

function loadData() {
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    console.log(id);

    /*
    let n; 
    for (let i = 0; i < data.length; i++) {
        if (data[i].title === name) {
            n = data[i];
            i = data.length; 
        }
    }*/

    var dlbody = "";
    for (let dl in data[id].downloadLinks) {
        if(data[id].downloadLinks[dl]) {
            console.log(dl);
            dlbody += `<a class="link" href=${data[id].downloadLinks[dl]}>${dl}</a>`
        }
    }

    let body = `
        <img src="${data[id].imgLarge ? data[id].imgLarge : data[id].imgSmall}">
        <div>${data[id].title} by 
        ${data[id].url ? '<a class="link" href="' + data[id].url + '">' : ''}
        ${data[id].creator ? data[id].creator : 'Unknown'}
        ${data[id].url ? '</a>' : ''}</div>
        <div>${data[id].desc}</div>
        <div class="link-box">
            ${dlbody}
        </div>
    `

    
    document.getElementById('file-info').innerHTML = body;
}
