function createPlayer(container) {
    const video = container.querySelector("video");
    const timeline = container.querySelector("[data-js-timeline]");
    const play = container.querySelector("[data-js-play]");
    const time = container.querySelector("[data-js-time]");
    const duration = container.querySelector("[data-js-duration]");
    const progress = container.querySelector("[data-js-progress]");

}

createPlayer(document.querySelector("[data-js-player]"));
