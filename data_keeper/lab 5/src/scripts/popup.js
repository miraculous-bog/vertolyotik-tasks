const popupsRefs = {
    teacherInfoCart: document.querySelector('#Teacher-info-cart'),
    formCart: document.querySelector('#Form-cart'),
    modal: document.querySelectorAll('.modal'),
}





const handlerPopup = (e) => {
    const element = e.target;
    console.log(e.target);
    if (element.className === 'modal' || element.className === 'close') {
        console.log("yoou");
        popupsRefs.teacherInfoCart.style.display = 'none';
        popupsRefs.formCart.style.display = 'none';
    }
}







popupsRefs.modal.forEach(item => {
    item.addEventListener('click', handlerPopup);
});










