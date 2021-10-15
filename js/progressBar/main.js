// 1. Create a scrollbar element and import it into the site
// 2. Assing scroll event to the window object
// 3. Calculate scrollbar's progress
// 4. Set scrollbar's width based on the calculated progress

const html = document.documentElement;
const progress = document.createElement("div");
const progressInner = document.createElement("div");

progress.className = "edu-progress";
progressInner.className = "edu-progress__inner";

progress.append(progressInner);
document.body.prepend(progress);

window.addEventListener("scroll", () => {
    const height = html.scrollHeight - window.innerHeight;
    const scrolled = html.scrollTop / height * 100;

    progressInner.style.width = `${scrolled}%`;
})
