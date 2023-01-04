/* export const toggleModal = (triggerBtn, closeBtn, backdrop) => {
    const openModalBtn = document.querySelector(triggerBtn),
          closeModalBtn = document.querySelector(closeBtn),
          backdropSection = document.querySelector(backdrop)

    openModalBtn.addEventListener('click', () => {
        backdropSection.classList.toggle('visually-hidden')
    })

    closeModalBtn.addEventListener('click', () => {
        backdropSection.classList.toggle('visually-hidden')
    })

    closeOnBackdrop.addEventListener('click', (e) => {
        if(e.target === backdropSection) {
            backdropSection.classList.toggle('visually-hidden')
        }
    })
}

toggleModal('', '.modalFeedBack__icon', '.modalFeedBack') */