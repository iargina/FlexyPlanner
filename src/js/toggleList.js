export const toggleList = () => {
    const items = document.querySelectorAll('.howitworks__item');
    const checkBoxList = document.querySelectorAll('.howitworks-checkbox__list')
    const arrowIcons = document.querySelectorAll('.howitworks__arrow-icon')

    items.forEach((item, i) => {
        item.addEventListener('click', function() {
            if(this) {
               const style = window.getComputedStyle(checkBoxList[i]).display;
               style === 'none' ? checkBoxList[i].style.display = 'flex' : checkBoxList[i].style.display = 'none';
               arrowIcons[i].classList.toggle('rotate')
            }
        })
    })
}

toggleList();