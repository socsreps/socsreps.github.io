function showVerticalNav() {
    document.getElementById("vertical-nav").classList.toggle("hidden");
}

// Src: https://www.javascripttutorial.net/javascript-dom/javascript-siblings/
function getSiblings(e) {
    // for collecting siblings
    let siblings = []; 
    // if no parent, return no sibling
    if(!e.parentNode) {
        return siblings;
    }
    // first child of the parent node
    let sibling  = e.parentNode.firstChild;
    
    // collecting siblings
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== e) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

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
    const tabContainerId = node.getAttribute("data-tab-container")
    const tabTargetId = node.getAttribute("data-tab-target")
    node.addEventListener("click", (e) => {
        console.log(tabContainerId, tabTargetId)
        const container = document.getElementById(tabContainerId);
        e.target.classList.replace("inactive-tab", "active-tab")
        getSiblings(e.target).forEach(sibling => sibling.classList.replace("active-tab", "inactive-tab"))
        if (container) {
            Array.from(container.children).forEach((targetElement) => {
                if (targetElement.id === tabTargetId) {
                    targetElement.classList.remove("hidden")
                } else {
                    targetElement.classList.add("hidden")
                }
            })
        }
    })
})