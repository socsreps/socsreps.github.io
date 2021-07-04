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

// Src: https://stackoverflow.com/a/53929685
// Updates a query param on the page without reloading the page. 
function insertUrlParam(key, value) {
    if (history.pushState) {
        let searchParams = new URLSearchParams(window.location.search);
        if (value === null) {
            searchParams.delete(key);
        } else {
            searchParams.set(key, value);
        }
        let newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        if (searchParams.toString()) {
            newurl +=  '?' + searchParams.toString();
        }
        window.history.replaceState({path: newurl}, '', newurl);
    }
}

function handleTabSwitch(tabElement) {
    const tabContainerId = tabElement.getAttribute("data-tab-container")
    const tabTargetId = tabElement.getAttribute("data-tab-target")
    const container = document.getElementById(tabContainerId);
    insertUrlParam("tab_id", tabTargetId);
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

    document.querySelectorAll(".collapsible-container").forEach(node => {
        let content = node.querySelector(".collapsible-content");
        content.addEventListener("click", e => {
            e.stopPropagation();
        })
        node.addEventListener("click", e => {
            handleCollapse(node, !node.classList.contains("expanded"), false);
        })
    })

    function handleCollapse(collapse, expand, group) {
        let content = collapse.querySelector(".collapsible-content");
        if (expand) {
            collapse.classList.add("expanded")
            content.style.maxHeight = content.scrollHeight + "px";
            insertUrlParam("collapse_id", collapse.id || null);

            let collapseGroup = collapse.getAttribute("data-collapse-group");
            if (collapseGroup) {
                let groupMembers = document.querySelectorAll("[data-collapse-group=\"" + collapseGroup + "\"]");
                groupMembers.forEach(groupMember => {
                    if (groupMember !== collapse) {
                        handleCollapse(groupMember, false, true);
                    }
                })
            }
        } else {
            collapse.classList.remove("expanded")
            content.style.maxHeight = null;

            if (!group) {
                insertUrlParam("collapse_id", null);
            }

        }
    }

    let queryParams = new URLSearchParams(window.location.search);

    if (queryParams.get("tab_id")) {
        let tabSection = document.querySelector("*[data-tab-container][data-tab-target=" + queryParams.get("tab_id") + "]")
        if (tabSection) {
            handleTabSwitch(tabSection)
        }
    }

    if (queryParams.get("collapse_id")) {
        let collapse = document.querySelector("#" + queryParams.get("collapse_id") + ".collapsible-container");
        if (collapse) {
            handleCollapse(collapse, true, false)
        }
    }

})();