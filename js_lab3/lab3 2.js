const circle = document.getElementById("circle");

document.addEventListener("mousemove", function (e) {
    circle.style.left = (e.clientX - 30) + "px";
    circle.style.top = (e.clientY - 30) + "px";
});