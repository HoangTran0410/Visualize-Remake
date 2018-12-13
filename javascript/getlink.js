var idSoundCloud = '587aa2d384f7333a886010d5f52f302a';

function searchSC(dataSearch, override) {
    if(override) document.getElementById('track').innerHTML = '';

    SC.get('/tracks', dataSearch).then(function (tracks) {
        console.log(tracks);
        for (var track of tracks) {
            SC.get('/tracks/' + track.id).then(function (data) {
                document.getElementById('track').innerHTML += createDivTrackSC(data);
            });
        }
    }).catch(function (error) {
        alert('Error: ' + error.message);
    });
}

// ======================== Zing Mp3 ================================
function getLink_ZingMp3(idSong) {

}