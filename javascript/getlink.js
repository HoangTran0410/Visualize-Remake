var idSoundCloud = '587aa2d384f7333a886010d5f52f302a';

function getLink_SoundCloud(url) {
    var fullUrl = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + idSoundCloud;

    loadJSON(fullUrl,
        function(data) {
            console.log(data);
            switch (data.kind) {
                case 'user':
                    document.getElementById('user').innerHTML += createDivUserSC(data);
                    break;

                case 'track':
                    document.getElementById('track').innerHTML += createDivTrackSC(data);
                    getData_UserSC(data.user_id);
                    break;

                case 'playlist':
                	for(var track of data.tracks) {
                		document.getElementById('track').innerHTML += createDivTrackSC(track);
                	}
                    break;
            }
        },

        function(error) {
            console.log(error);
        }
    );
}

function getData_UserSC(id) {
    var fullUrl = 'https://api.soundcloud.com/users/' + id + '?client_id=' + idSoundCloud;

    loadJSON(fullUrl,
        function(data) {
            document.getElementById('user').innerHTML += createDivUserSC(data)
        }
    );
}

function createDivUserSC(dataUser) {
    var address = (dataUser.city || '') + ` ` + (dataUser.country || '');
    var countryTag = (address ? `<a target="_blank" title="View on Google Map" href="https://maps.google.com/maps?q=` + address + `">` + address + `</a>` : '');

    var fullName = dataUser.full_name;
    var linkSC = dataUser.permalink_url;
    var ava = dataUser.avatar_url;
    var username = dataUser.username;
    var followers = createShortNum(dataUser.followers_count);
    var trackCount = createShortNum(dataUser.track_count);

    return `
	<div class="SCcard">
		<i class="fa fa-user SCtype" title="User"></i>
		<div class="avatar">
			<a target="_blank" title="Visit ` + fullName + `'s SoundCloud" href="` + linkSC + `">
				<img src="` + ava + `" alt="">
			</a>
		</div>
		<div class="info">
			<p class="username">` + username + `</p>
			<p class="country">` + countryTag + `</p>

			<div class="table">
				<i class="fa fa-group" title="`+dataUser.followers_count.toLocaleString()+` followers"> ` + followers + `</i>
				<i class="fa fa-music" title="`+dataUser.track_count.toLocaleString()+` tracks"> ` + trackCount + `</i>
			</div>
		</div>
	</div>`
}

function createDivTrackSC(dataTrack) {
	var id = dataTrack.id;
	var ava = dataTrack.artwork_url;
	var title = dataTrack.title;
	var favo = createShortNum(dataTrack.favoritings_count);
	var plays = createShortNum(dataTrack.playback_count);
	var comments = createShortNum(dataTrack.comment_count);

    return `
	<div class="SCcard">
		<i class="fa fa-music SCtype" title="Music"></i>
		<div class="avatar">
			<a onclick="playTrack(`+id+`)" title="Play">
				<img src="` + ava + `" alt="">
			</a>
		</div>
		<div class="info">
			<p class="trackTitle">` + title + `</p>

			<div class="table">
				<i class="fa fa-heart" title="`+dataTrack.favoritings_count.toLocaleString()+` likes"> `+favo+`</i>
				<i class="fa fa-play" title="`+dataTrack.playback_count.toLocaleString()+` plays"> `+plays+`</i>
				<i class="fa fa-comments" title="`+dataTrack.comment_count.toLocaleString()+` comments"> `+comments+`</i>
			</div>
		</div>
	</div>`
}

function createShortNum(num, max) {
	if(num > (max || 10000)) return (parseInt(num/1000) + 'k');
	return num.toLocaleString();
}

function playTrack(idTrack) {
	myAudio.changeSrc('https://api.soundcloud.com/tracks/'+idTrack+'/stream?client_id='+idSoundCloud);
	myAudio.autoPlay(true);
}


// ======================== Zing Mp3 ================================
function getLink_ZingMp3(idSong) {

}