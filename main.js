var myAudio; // biến toàn cục, lưu trữ nhạc hiện tại

function setup() {
    // createCanvas(windowWidth, windowHeight).position(0, 0);
    SC.initialize({
        client_id: '587aa2d384f7333a886010d5f52f302a'
    });

    myAudio = new MyAudio();
    myAudio.control(true);
}

function draw() {}