function showNav() {
    document.getElementById("menuicon").style.display = "none";
    document.getElementById("headerText").style.display = "none";
    document.getElementById("navigation").style.animation = "fade 1s ease-in-out forwards";
    document.getElementById("navigation").style.display = "block"; //displays the navigation menu
    document.getElementById("header").style.animationPlayState = "paused"; //pauses the color changing animation on the header
    document.body.classList.add("stop-scrolling"); //adds class to the body that prevents it from scrolling
}

function hideNav() {
    //reverting to initial setup
    document.getElementById("navigation").style.display = "none";
    document.getElementById("menuicon").style.display = "block";
    document.getElementById("headerText").style.display = "block";
    document.getElementById("header").style.animationPlayState = "running";
    document.body.classList.remove("stop-scrolling"); 
}