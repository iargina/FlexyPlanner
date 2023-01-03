export const toggleList = () => {
    const items = document.querySelectorAll('.howitworks__item');
    const checkBoxList = document.querySelectorAll('.howitworks-checkbox__list')
    const arrowIcons = document.querySelectorAll('.howitworks__arrow-icon')

    if(window.innerWidth >= 1440) {
        checkBoxList[0].classList.remove('visually-hidden')
    } else {
        checkBoxList[0].classList.add('visually-hidden')
    }

    items.forEach((item, i) => {
        item.addEventListener('click', function() {
            if(this) {
               checkBoxList[i].classList.toggle('visually-hidden')
               arrowIcons[i].classList.toggle('rotate')
            }
        })
    })
}

window.addEventListener("resize", toggleList);
toggleList();