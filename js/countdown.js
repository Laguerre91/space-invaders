class CountdownTimer {
    constructor(durationInSeconds, onTimerTick, onTimerEnd) {
        this.durationInSeconds = durationInSeconds;
        this.currentTime = durationInSeconds;
        this.onTimerTick = onTimerTick;
        this.onTimerEnd = onTimerEnd;
        this.startTime = null;

        this.animate = this.animate.bind(this);
        this.start();
    }

    start() {
        this.startTime = performance.now();
        requestAnimationFrame(this.animate);
    }

    animate(timestamp) {
        const elapsedMilliseconds = timestamp - this.startTime;
        const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
        const remainingTime = Math.max(0, this.durationInSeconds - elapsedSeconds);

        if (remainingTime !== this.currentTime) {
            this.currentTime = remainingTime;
            this.onTimerTick(this.currentTime);

            if (this.currentTime === 0) {
                this.onTimerEnd();
            }
        }

        if (remainingTime > 0) {
            requestAnimationFrame(this.animate);
        }
    }
}
