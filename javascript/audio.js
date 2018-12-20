class MyAudio {
    constructor(link) {
        this.audio = createAudio(link);
        this.audio.connect(p5.soundOut);
    }

    play() {
        this.audio.play();
    }

    pause() {
        this.audio.pause();
    }

    playPause() {
        if (this.paused() && this.duration() > 0)
            this.play();
        else this.pause();  
    }

    jump(s) {
        if (!this.paused()) {
            var c = this.currentTime();
            var newTime = c + s;
            if(newTime < 0) newTime = 0;
            if(newTime > this.duration()) newTime = this.duration();

            this.audio.play().time(newTime);
        }
    }

    //  ============= get ==============
    currentTime() {
        return this.audio.elt.currentTime;
    }

    duration(minute) {
        return (minute?prettyTime(this.audio.elt.duration):this.audio.elt.duration);
    }

    isEnded() {
        return this.audio.elt.ended;
    }

    paused() {
        return this.audio.paused;
    }

    src() {
        return this.audio.elt.src;
    }
    // ============= set ===================
    changeSrc(link) {
        this.audio.src = link;
    }

    control(show) {
        this.audio.elt.controls = show;
    }

    loop(lp) {
        this.audio.elt.loop = lp;
    }

    autoPlay(auto) {
        this.audio.autoplay(auto);
    }

    onEnded(func) {
        this.audio.onended(func);
    }
}

function playTrack(idTrack) {
    myAudio.changeSrc('https://api.soundcloud.com/tracks/'+idTrack+'/stream?client_id='+idSoundCloud);
    myAudio.autoPlay(true);
}

function prettyTime(s) {
    s = s || 0;

    var seconds = (s % 60) | 0;
    var minutes = (s / 60 % 60) | 0;
    var hours = (s / 3600) | 0;

    if (hours) return hours + ':' + ('0' + minutes).substr(-2) + ':' + ('0' + seconds).substr(-2);
    else return minutes + ':' + ('0' + seconds).substr(-2);
}

function prettyTime_Millis(millis) {
    var seconds = floor(millis / 1000);
    return prettyTime(seconds);
}