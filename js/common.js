function showVerticalNav() {
    document.getElementById("vertical-nav").classList.toggle("hidden");
}

// Src: https://www.javascripttutorial.net/javascript-dom/javascript-siblings/
function getSiblings(e) {
    // for collecting siblings
    let siblings = [];
    // if no parent, return no sibling
    if (!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling = e.parentNode.firstChild;

    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

function handleTabSwitch(tabElement) {
    const tabContainerId = tabElement.getAttribute("data-tab-container")
    const tabTargetId = tabElement.getAttribute("data-tab-target")
    const container = document.getElementById(tabContainerId);
    window.history.replaceState({}, '', "#" + tabTargetId)
    tabElement.classList.replace("inactive-tab", "active-tab")
    getSiblings(tabElement).forEach(sibling => sibling.classList.replace("active-tab", "inactive-tab"))
    if (container) {
        for (let index = 0; index < container.children.length; index++) {
            const targetElement = container.children[index];
            if (targetElement.id === tabTargetId) {
                targetElement.classList.remove("hidden")
            } else {
                targetElement.classList.add("hidden")
            }
        }
    }
}

(function () {
    document.querySelectorAll("*[data-tooltip]").forEach(node => {
        const el = document.createElement("span")
        el.innerText = node.getAttribute('data-tooltip');
        el.classList = "tooltip"
        node.appendChild(el)
        node.addEventListener('mouseenter', (e) => {
            e.target.classList.add('tooltip-open')
        })
        node.addEventListener('mouseleave', (e) => {
            e.target.classList.remove('tooltip-open')
        })
    })

    document.querySelectorAll("*[data-tab-container][data-tab-target]").forEach(node => {
        node.addEventListener("click", (e) => {
            handleTabSwitch(e.target)
        })
    })

    document.querySelectorAll(".collapsible .collapsible-heading").forEach(node => {
        node.addEventListener("click", e => {
            e.target.parentNode.classList.toggle("active");
            var content = e.target.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        })
    })

    if (window.location.hash) {
        let tabSection = document.querySelector("*[data-tab-container][data-tab-target=" + window.location.hash.slice(1) + "]")
        if (tabSection) {
            handleTabSwitch(tabSection)
        }
    }
})();