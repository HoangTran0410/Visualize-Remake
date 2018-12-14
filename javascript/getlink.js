var idSoundCloud = '587aa2d384f7333a886010d5f52f302a';

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

// ======================== Zing Mp3 ================================
function getLink_ZingMp3(idSong) {

}