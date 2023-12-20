let slideIndex = 1;
showSlidesPhone(slideIndex);
showSlidesTablet(slideIndex);

// Next/previous controls
function plusSlidesPhone(n) {
    showSlidesPhone(slideIndex += n);
}

function plusSlidesTablet(n) {
    showSlidesTablet(slideIndex += n);
}

// Thumbnail image controls
function currentSlidePhone(n) {
    showSlidesPhone(slideIndex = n);

}

function currentSlideTablet(n) {
    showSlidesTablet(slideIndex = n);

}

function showSlidesPhone(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides_phone");
    let dots = document.getElementsByClassName("dot_phone");
    let captionText = document.getElementsByClassName("caption_phone");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText[slideIndex-1].style.display = "block";
}

function showSlidesTablet(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides_tablet");
    let dots = document.getElementsByClassName("dot_tablet");
    let captionText = document.getElementsByClassName("caption_tablet");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
    captionText[slideIndex-1].style.display = "block";
}

// document.addEventListener("DOMContentLoaded", function() {
//     let slideIndex = 1;
//     showSlides(slideIndex);
//
//     // Other JavaScript code
// });