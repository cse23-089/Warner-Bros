const myslide = document.querySelectorAll('.myslider'), dot = document.querySelectorAll('.dot');

let counter = 1;
slidefun(counter);

let timer = setInterval(autoslide, 8000);
function autoslide() {
    counter += 1;
    slidefun(counter);
}
function plusSlides(n) {
    counter += n;
    slidefun(counter);
    resetTimer();
}
function currentSlide(n) {
    counter = n;
    slidefun(counter);
    resetTimer();
}
function resetTimer() {
    clearInterval(timer);
    timer = setInterval(autoslide, 8000);
}

function slidefun(n) {
    let i;
    for(i = 0;i<myslide.length;i++){
        myslide[i].style.display = "none";
    }
    for(i = 0;i<dot.length;i++){
        dot[i].classList.remove('active');
    }
    if(n > myslide.length){
        counter = 1;
    }
    if(n < 1){
        counter = myslide.length;
    }

    myslide[counter - 1].style.display = "block";
    dot[counter - 1].classList.add('active');
}

const arrows = document.querySelectorAll(".arrow");
const movieLists = document.querySelectorAll(".movie-list");

arrows.forEach((arrow, i) => {
    const itemNumber = movieLists[i].querySelectorAll("img").length;
    let clickCounter = 0
    arrow.addEventListener("click", () =>{
        const ratio = Math.floor(window.innerWidth / 270);
        clickCounter++;
        if (itemNumber - (4 + clickCounter) + (4 - ratio) >= 0){
            movieLists[i].style.transform = `translateX(${
                movieLists[i].computedStyleMap().get("transform")[0].x.value
                -300}px)`;
        } else {
            movieLists[i].style.transform = "translateX(0)";
            clickCounter = 0;
        }
    });
    console.log(Math.floor(window.innerWidth / 270));
});        

const arrow = document.querySelectorAll(".arrow");
const movielists = document.querySelectorAll(".sec2");

arrow.forEach((aarow, i) => {
    const itemnumber = movielists[i].querySelectorAll("img").length;
    let counter = 0
    aarow.addEventListener("click", () =>{
        const rratio = Math.floor(window.innerWidth / 270);
        counter++;
        if (itemnumber - (4 + counter) + (4 - rratio) >= 0){
            movielists[i].style.transform = `translateX(${
                movielists[i].computedStyleMap().get("transform")[0].x.value
                -300}px)`;
        } else {
            movielists[i].style.transform = "translateX(0)";
            counter = 0;
        }
    });
    console.log(Math.floor(window.innerWidth / 270));
});        