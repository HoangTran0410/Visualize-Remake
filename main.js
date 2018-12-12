
var myAudio; // biến toàn cục, lưu trữ nhạc hiện tại

function setup() {
	// createCanvas(windowWidth, windowHeight).position(0, 0);

	myAudio = new MyAudio();
	myAudio.control(true);

	getLink_SoundCloud('https://soundcloud.com/jaydan-nguyen-24418349/sets/phan-manh-quynh');
	getLink_SoundCloud('https://soundcloud.com/onionn');
	getLink_SoundCloud('https://soundcloud.com/volethong/tri-ky-phan-manh-quynh');
	getLink_SoundCloud('https://soundcloud.com/nguy-n-tu-n-480457176/co-mot-noi-nhu-the-phan-manh-quynh');
	getLink_SoundCloud('https://soundcloud.com/c-h-m-957259045/con-tim-tan-vo-phan-manh-quynh');
	
}

function draw() {
	// clear();

	// fill(30);
	// ellipse(mouseX, mouseY, 30);
}