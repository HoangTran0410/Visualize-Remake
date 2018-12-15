function searchSC(type, dataSearch, func) {
    SC.get(type, dataSearch).then(function (data) {
        func(data);

    }).catch(function (error) {
        alert('Error: ' + error.message);
    });
}

function searchSC_url(url, func) {
    SC.resolve(url).then(function (data) {
        func(data);
    })
    .catch(function (error) {
        alert('Error: ' + error.message);
    });
}

function addTrack(data) {
    var div = document.getElementById('tracks');
    for(var track of data.collection) {
        div.innerHTML += `<p>`+track.title+`</p>`;
    }
}

// ======================== Zing Mp3 ================================
function getLink_ZingMp3(idSong) {

}