// This IIFE adds click event to the button and generates custom video player on the website
(function () {
    const button = document.querySelector(".button");

    //this function creates and imports a template string with html elements creating the videoplayer on the website
    function renderVideoPlayer() {
        const player = `
        <div class="edu-player__video">
            <span class="icon">
                <i class="fas fa-play" data-js-play2></i>
            </span>

            <video></video>
        </div>

        <div class="edu-player__timeline" data-js-timeline>
            <div class="edu-player__controls">
                <span class="icon">
                    <i class="fas fa-play" data-js-play></i>
                </span>
            </div>
            <div class="edu-player__controls">
                <span data-js-time>00:00</span>
                <span data-js-duration>12:53</span>
            </div>
            <div class="edu-player__progress" data-js-progress></div>
        </div>
        `;

        const div = document.createElement("div");
        div.innerHTML = player;
        document.querySelector(".container").append(div);
        div.classList.add("edu-player");
        div.setAttribute("data-js-player","");
        button.remove();
    };

    //this function adds functionality to the custom controls of the videoplayer
    function createPlayer(container, src) {
        const video = container.querySelector("video");
        const timeline = container.querySelector("[data-js-timeline]");
        const play = container.querySelector("[data-js-play]");
        const play2 = container.querySelector("[data-js-play2]");
        const time = container.querySelector("[data-js-time]");
        const duration = container.querySelector("[data-js-duration]");
        const progress = container.querySelector("[data-js-progress]");

        //function converting video's duration from seconds into mm:ss format
        function secondsToTime(seconds) {
            return [seconds / 3600, (seconds % 3600) / 60, (seconds % 3600) % 60]
                .map((v) => (v < 10 ? `0${parseInt(v, 10)}` : parseInt(v, 10)))
                .filter((i, j) => i !== "00" || j > 0)
                .join(":");
        }

        //this function adds the pause/play button functionality
        function togglePlay(e) {
            e.stopPropagation();

            if(video.paused) {
                video.play();
                play.classList.remove("fa-play");
                play.classList.add("fa-pause");
                play2.style.visibility = "hidden";
            } else {
                video.pause();
                play.classList.remove("fa-pause");
                play.classList.add("fa-play");
                play2.style.visibility = "visible";
            }
        }

        //this function changes the text contet of a span element to display the correct video's duration
        function updateDuration(e) {
            duration.textContent = secondsToTime(e.currentTarget.duration);
        }

        //this function changes the text contet of a span element to display the video's current time
        function updateTime(e) {
            time.textContent = secondsToTime(e.currentTarget.currentTime);
        }

        //this function styles progress' bar width depending on the video's current time
        function updateProgress(e) {
            progress.style.width = `${e.currentTarget.currentTime / e.currentTarget.duration * 100}%`;
        }

        //this function changes the video's current time depending on the place that had been clicked on the timeline by the user
        function setTime(e) {
            const pos = e.currentTarget.getBoundingClientRect();  //
            const left = e.pageX - pos.left; //current mouse pointer position minus the timer's left offset
            const percentage = left / pos.width;

            video.currentTime = video.duration * percentage;
        }

        play.addEventListener("click", togglePlay);
        play2.addEventListener("click", togglePlay);
        timeline.addEventListener("click", setTime);

        video.addEventListener("click", togglePlay);
        video.addEventListener("timeupdate", updateProgress);
        video.addEventListener("durationchange", updateDuration);
        video.addEventListener("timeupdate", updateTime);

        video.setAttribute("src", src);
    }

    button.addEventListener("click", () => {
        renderVideoPlayer();
        createPlayer(
            document.querySelector("[data-js-player]"),
            "https://space.eduweb.pl/files/assets/video.mp4"
        );
    });
})();

