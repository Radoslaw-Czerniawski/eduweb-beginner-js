// 1. Assign mouseenter event to all forwarded elements
// 2. Upon hovering an element, get it's position on the website
// 3. Create dynamic tooltip element
// 4. Position tooltip element and import it into the website
// 5. Assign mouseleave event to all forwarded elements
// 6. After "unhovering" the element remove tooltip from the website
// 7. Package the code into a module

(function () {
    let activeTooltip = null; // global variable storing currently visible tooltip

    // function invoked in showTooltip function, dynamically creates, styles imports and positions the custom tooltip
    function createTooltip(text, options) {
        const tooltip = document.createElement("div");

        tooltip.className = "edu-tooltip hidden"; // adding css styling to the tooltip element
        tooltip.textContent = text; // forwarding currently hovered element's title attribute value as text content in the custom tooltip element

        document.body.append(tooltip);

        // positioning the custom tooltip over the center of currently hovered element
        tooltip.style.left = `${options.x + options.w / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${options.y - tooltip.offsetHeight - 10}px`;

        tooltip.classList.remove("hidden");

        activeTooltip = tooltip;
    }

    // function invoked in init function, reads currentTarget position, invokes function creating the tooltip, removes "deafult tooltip" attribute
    function showTooltip(e) {
        const pos = e.currentTarget.getBoundingClientRect();

        const options = {
            w: pos.width,
            x: pos.left,
            y: pos.top,
        };

        const text = e.currentTarget.getAttribute("title");

        // invoking function creating the custom tooltip, forwarding the currently hovered element's title attribute value and element's position
        createTooltip(text, options);

        e.currentTarget.removeAttribute("title");
    }

    // function invoked in init function, re-adds deafult title attribute to target and removes the custom tooltip
    function hideTooltip(e) {
        if (activeTooltip) {
            e.currentTarget.setAttribute("title", activeTooltip.textContent);
            activeTooltip.remove();
        }
    }

    // inital function adding events mouseenter invoking function creating the custom tooltip and mouseleave invoking function removing the custom tooltip
    function init(elems) {
        for (let elem of elems) {
            elem.addEventListener("mouseenter", showTooltip);
            elem.addEventListener("mouseleave", hideTooltip);
        }
    }

    // creating in the object window global function makeTooltip
    window.makeTooltip = init;
})();

makeTooltip(document.querySelectorAll("[title]"));
