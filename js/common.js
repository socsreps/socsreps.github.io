function showVerticalNav() {
    document.getElementById("vertical-nav").classList.toggle("hidden");
}

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