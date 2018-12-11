var myAudio; // biến toàn cục, lưu trữ nhạc hiện tại

function setup() {
	createCanvas(windowWidth, windowHeight).position(0, 0);

	myAudio = new MyAudio('http://mp3-s1-zmp3.zadn.vn/585277ff0cbbe5e5bcaa/3304886682469868040?authen=exp=1544626086~acl=/585277ff0cbbe5e5bcaa/*~hmac=9e490a682dd08d50bb96f6553bab9540');
	myAudio.control(true);
}

function draw() {
	clear();

	fill(30);
	ellipse(mouseX, mouseY, 30);
}