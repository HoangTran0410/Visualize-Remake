var api_v2Link = `https://api-v2.soundcloud.com/charts?kind= &genre= &client_id=.`;
var kindSC = ["top", "trending"];
var genreSC = ["soundcloud:genres:all-music","soundcloud:genres:all-audio","soundcloud:genres:alternativerock","soundcloud:genres:ambient","soundcloud:genres:classical","soundcloud:genres:country","soundcloud:genres:danceedm","soundcloud:genres:dancehall","soundcloud:genres:deephouse","soundcloud:genres:disco","soundcloud:genres:drumbass","soundcloud:genres:dubstep","soundcloud:genres:electronic","soundcloud:genres:folksingersongwriter","soundcloud:genres:hiphoprap","soundcloud:genres:house","soundcloud:genres:indie","soundcloud:genres:jazzblues","soundcloud:genres:latin","soundcloud:genres:metal","soundcloud:genres:piano","soundcloud:genres:pop","soundcloud:genres:rbsoul","soundcloud:genres:reggae","soundcloud:genres:reggaeton","soundcloud:genres:rock","soundcloud:genres:soundtrack","soundcloud:genres:techno","soundcloud:genres:trance","soundcloud:genres:trap","soundcloud:genres:triphop","soundcloud:genres:world","soundcloud:genres:audiobooks","soundcloud:genres:business","soundcloud:genres:comedy","soundcloud:genres:entertainment","soundcloud:genres:learning","soundcloud:genres:newspolitics","soundcloud:genres:religionspirituality","soundcloud:genres:science","soundcloud:genres:sports","soundcloud:genres:storytelling","soundcloud:genres:technology"];

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
                		getData_UserSC(track.user_id);
                	}
                    break;
            }
        },

        function(error) {
            console.log(error);
        }
    );
}

function getLinkSC_v2(kind, genre, limit) {
	var fullUrl = `https://api-v2.soundcloud.com/charts?kind=`+kind+`&genre=`+genre+`&client_id=`+idSoundCloud+`&limit=`+limit+`&linked_partitioning=1`;

	loadJSON(fullUrl,
		function(data) {
			console.log(data);
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