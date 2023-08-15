const slider = document.querySelector('.slider')
const slides = slider.querySelectorAll('.slider__slide')
const totalSlides = slides.length

const dots = document.querySelectorAll(".pagination__dot")
let currentIndex = 0
let slideWidth = slider.clientWidth


function switchSlide(direction, paginationIdx) {
    if (isAnimating) return;
    isAnimating = true;

    let currentSlide = slides[currentIndex];
    let newIndex;
    let directionMultiplier = (direction === "right") ? 1 : -1;

    if (paginationIdx === undefined) {
        newIndex = currentIndex + directionMultiplier;
        if (newIndex >= totalSlides) {
            newIndex = 0;
        } else if (newIndex < 0) {
            newIndex = totalSlides - 1;
        }
    } else {
        newIndex = paginationIdx;
    }

    let newSlide = slides[newIndex];
    let position = 0;
    let newPosition = slideWidth * directionMultiplier;

    newSlide.style.left = newPosition + 'px';
    newSlide.style.display = 'block';

    const interval = setInterval(() => {
        position -= 5 * directionMultiplier;
        newPosition -= 5 * directionMultiplier;

        currentSlide.style.left = position + "px";
        newSlide.style.left = newPosition + "px";

        if ((directionMultiplier === 1 && newPosition <= 0) || (directionMultiplier === -1 && newPosition >= 0)) {
            clearInterval(interval);
            if (directionMultiplier === -1) {
                currentSlide.style.display = 'none';
            }
            isAnimating = false;
        }
    }, 16.67);

    currentIndex = newIndex;
    dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
            dot.classList.add('pagination__dot_active');
        } else {
            dot.classList.remove('pagination__dot_active');
        }
    });
}



// function nextSlide(paginationIdx) {
//     if (isAnimating) return;
//     isAnimating = true;
//     let currentSlide = slides[currentIndex];
//     let newIndex
//     if (paginationIdx === undefined) {
//         newIndex = currentIndex + 1;
//         if (newIndex >= totalSlides) {
//             newIndex = 0;
//         }
//         if (newIndex < 0) {
//             newIndex = totalSlides - 1;
//         }
//     } else {
//         newIndex = paginationIdx
//     }
//     let nextSlide = slides[newIndex];
//
//     nextSlide.style.left = slideWidth + 'px';
//     nextSlide.style.display = 'block';
//
//     let position = 0;
//     let nextPosition = slideWidth;
//
//
//     const interval = setInterval(function () {
//         position -= 5;
//         nextPosition -= 5;
//
//         currentSlide.style.left = position + "px";
//         nextSlide.style.left = nextPosition + "px";
//
//         if (nextPosition <= 0) {
//             clearInterval(interval);
//             isAnimating = false;
//         }
//     }, 16.67);
//
//     currentIndex = newIndex;
//     dots.forEach((dot, idx) => {
//         if (idx === currentIndex) {
//             dot.classList.add('pagination__dot_active')
//         } else {
//             dot.classList.remove('pagination__dot_active')
//         }
//     })
//
// }
//
// function prevSlide(paginationIdx) {
//     if (isAnimating) return;
//     isAnimating = true;
//     let currentSlide = slides[currentIndex];
//     let newIndex
//     console.log(paginationIdx)
//     if (paginationIdx === undefined) {
//         newIndex = currentIndex - 1;
//         if (newIndex < 0) {
//             newIndex = totalSlides - 1;
//         }
//
//     } else {
//         newIndex = paginationIdx
//     }
//
//     let prevSlide = slides[newIndex];
//
//     prevSlide.style.left = -slideWidth + 'px';
//     prevSlide.style.display = 'block';
//
//     let position = 0;
//     let prevPosition = -slideWidth;
//
//     const interval = setInterval(function () {
//         position += 5;
//         prevPosition += 5;
//
//         currentSlide.style.left = position + "px";
//         prevSlide.style.left = prevPosition + "px";
//
//         if (prevPosition >= 0) {
//             clearInterval(interval);
//             currentSlide.style.display = 'none';
//             isAnimating = false;
//         }
//     }, 16);
//
//     currentIndex = newIndex;
//     dots.forEach((dot, idx) => {
//         if (idx === currentIndex) {
//             dot.classList.add('pagination__dot_active')
//         } else {
//             dot.classList.remove('pagination__dot_active')
//         }
//     })
// }

dots.forEach((dot, i) => {
    dot.addEventListener('click', function () {
        if (i > currentIndex) {
            nextSlide(i);
        } else if (i < currentIndex) {
            prevSlide(i);
        }
    });
})

window.addEventListener('resize', () => {
    slideWidth = slider.clientWidth;

    slides.forEach((slide, index) => {
        if (index === currentIndex) {
            slide.style.left = '0px';
        } else if (index < currentIndex) {
            slide.style.left = -slideWidth + 'px';
        } else {
            slide.style.left = slideWidth + 'px';
        }
    });
});

let isAnimating = false

document.getElementById('next').addEventListener('click', () => {
    switchSlide('right')
})
document.getElementById('prev').addEventListener('click', () => {
    switchSlide('left')
})
