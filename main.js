var myAudio; // biến toàn cục, lưu trữ nhạc hiện tại

function setup() {
    // createCanvas(windowWidth, windowHeight).position(0, 0);
    SC.initialize({
        client_id: '587aa2d384f7333a886010d5f52f302a'
    });

    // SC.get('/playlists/2050462').then(function(playlist) {
    //     playlist.tracks.forEach(function(track) {
    //         console.log(track);
    //     });
    // });

    // var track_url = 'https://soundcloud.com/jaydan-nguyen-24418349/sets/phan-manh-quynh';
    // // https://soundcloud.com/nocopyrightsounds/deaf-kev-invincible-ncs-release

    // SC.resolve(track_url).then(function(data){
    // 	console.log(data);
    // 	document.getElementById('track').innerHTML += createDivTrackSC(data)
    // })

    myAudio = new MyAudio();
    myAudio.control(true);
}
``

function draw() {}