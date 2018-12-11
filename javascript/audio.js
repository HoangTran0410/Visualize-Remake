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

    duration() {
        return this.audio.elt.duration;
    }

    isEnded() {
        return this.audio.elt.ended;
    }

    paused() {
        return this.audio.paused;
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

    autoplay(auto) {
        this.audio.autoplay(auto);
    }

    onended(func) {
        this.audio.onended(func);
    }
}