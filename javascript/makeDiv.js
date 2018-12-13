function createDivUserSC(dataUser) {
    var address = (dataUser.city || '') + ` ` + (dataUser.country || '');
    var countryTag = (address ? `<a target="_blank" title="View on Google Map" href="https://maps.google.com/maps?q=` + address + `">` + address + `</a>` : '');

    var fullName = dataUser.full_name;
    var linkSC = dataUser.permalink_url;
    var ava = dataUser.avatar_url;
    var username = dataUser.username;
    var followers = abbreviateNumber(dataUser.followers_count);
    var trackCount = abbreviateNumber(dataUser.track_count);

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
				<i class="fa fa-group" title="` + dataUser.followers_count.toLocaleString() + ` followers"> ` + followers + `</i>
				<i class="fa fa-music" title="` + dataUser.track_count.toLocaleString() + ` tracks"> ` + trackCount + `</i>
			</div>
		</div>
	</div>`
}

function createDivTrackSC(dataTrack) {
    var id = dataTrack.id;
    var ava = dataTrack.artwork_url || `img/avatar.svg`;
    var title = dataTrack.title;
    var favo = abbreviateNumber(dataTrack.favoritings_count);
    var plays = abbreviateNumber(dataTrack.playback_count);
	var comments = abbreviateNumber(dataTrack.comment_count);
	
	var streamable = (dataTrack.streamable?``:`style="cursor: no-drop;"`);

    return `
	<div class="SCcard">
		<i class="fa fa-music SCtype" title="Music"></i>
		<div class="avatar">
			<a target="_blank" href="`+dataTrack.permalink_url+`" title="Heard on SoundCloud">
				<img src="` + ava + `" alt="">
			</a>
		</div>
		<div class="info">
			<p class="trackTitle" title="` + title + `">
			` + title + `
			</p>

			<div class="table">
				<i class="fa fa-heart" title="` + dataTrack.favoritings_count.toLocaleString() + ` likes"> 
					<p>` + favo + `</p>
				</i>
				<i class="fa fa-play" title="` + dataTrack.playback_count.toLocaleString() + ` plays" 
						`+(dataTrack.streamable?`onclick="playTrack(` + id + `, this)" `:``)+streamable+`> 
					<p>` + plays + `</p>
				</i>
				<i class="fa fa-comments" title="` + dataTrack.comment_count.toLocaleString() + ` comments"> 
					<p>` + comments + `</p>
				</i>
			</div>
		</div>
	</div>`
}

var trackPlaying; // tag i của CartMusic hiện tại

function playTrack(idTrack, playBtn) {
	var streamUrl = 'https://api.soundcloud.com/tracks/'+idTrack+'/stream?client_id='+idSoundCloud;

	if(trackPlaying == playBtn) { // nếu bấm vào bài đang phát
		if(playBtn.classList == 'fa fa-play') { // phát nếu đang dừng
			myAudio.play();
			playBtn.classList = 'fa fa-pause';
			hightlight(playBtn, true);
		
		} else { // dừng nếu đang phát
			myAudio.pause();
			playBtn.classList = 'fa fa-play';
			hightlight(playBtn, false);
		}

	} else { // bấm vào bài khác
		if(trackPlaying) { // nếu đang có bài
			trackPlaying.classList = 'fa fa-play'; // xóa 'playing' ở bài trước
			hightlight(trackPlaying, false);
		}

		playBtn.classList = 'fa fa-pause'; // tạo 'playing' ở bài này
		trackPlaying = playBtn;
		hightlight(trackPlaying, true);

		myAudio.changeSrc(streamUrl);
		myAudio.autoPlay(true);
		myAudio.loop(true);
	}
}

function hightlight(iTag, trueFalse) {
	iTag.parentElement.parentElement.parentElement.style.backgroundColor = (trueFalse?'#eee':'#fff');
}

function abbreviateNumber2(value) {
    var newValue = value;
    if (value >= 10000) {
        var suffixes = ["", "k", "m", "b", "t"];
        var suffixNum = Math.floor(("" + value).length / 3);
        var shortValue = '';
        for (var precision = 2; precision >= 1; precision--) {
            shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(precision));
            var dotLessShortValue = (shortValue + '').replace(/[^a-zA-Z 0-9]+/g, '');
            if (dotLessShortValue.length <= 2) { break; }
        }
        if (shortValue % 1 != 0) shortNum = shortValue.toFixed(1);
        newValue = shortValue + suffixes[suffixNum];
    }
    return newValue;
}

function abbreviateNumber(num, fixed) {
    if (num === null) { return null; } // terminate early
    if (num === 0) { return '0'; } // terminate early
    fixed = (!fixed || fixed < 0) ? 0 : fixed; // number of decimal places to show
    var b = (num).toPrecision(2).split("e"), // get power
        k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
        c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
        d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
        e = d + ['', 'k', 'm', 'b', 't'][k]; // append power
    return e;
}