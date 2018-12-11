class GetLinkTool {
	constructor() {
		this.idSoundCloud = '587aa2d384f7333a886010d5f52f302a';
	}

	getLink_SoundCloud(url) {
		var fullUrl = 'https://api.soundcloud.com/resolve.json?url=' + url + '&client_id=' + this.idSoundCloud;

		loadJSON(fullUrl, 
			function(data) {
				VisualyzeDesign.ScData = data;
			}, 

			function(error) {
				console.log(error);
			}
		);
	}

	getLink_ZingMp3(idSong) {

	}


}