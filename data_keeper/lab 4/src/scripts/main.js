// import { randomUserMock, additionalUsers } from './data.js';

// import { bgColor, course } from './static-data.js'
import { getId, randomInteger, getFavorite, transformRightDataFirst, transformRightDataSecond } from './functions.js';

import { validationData } from './validation.js';
import { getTeacherNetItem, getFavoriteNetItem, getTeacherPopup, getOption } from './markups.js';
import { getMarkupSelect } from './form.js'
console.log(transformRightDataFirst);
console.log(transformRightDataSecond);

const refs = {
    teachersNet: document.querySelector('.teachers-net'),
    favoriteSlider: document.querySelector('.icons'),
    TeacherInfoCart: document.querySelector('#Teacher-info-cart'),
    formCart: document.querySelector('#Form-cart'),
    addingTeacherBtn: document.querySelectorAll('.button-adding-teacher'),
    countrySelect: document.querySelector(".country-select"),
    specialitySelect: document.querySelector(".speciality-select"),
}
const showForm = () => refs.formCart.style.display = 'block';
refs.addingTeacherBtn.forEach(item => item.addEventListener('click', showForm));

const data = transformRightDataFirst.concat(transformRightDataSecond);


refs.countrySelect.innerHTML = getMarkupSelect(data, 'country');
refs.specialitySelect.innerHTML = getMarkupSelect(data, 'course');
console.log(getMarkupSelect(data, 'country'));
console.log(getMarkupSelect(data, 'speciality'));


const getFilteredData = (country, age, gender, favorite) => {
    return data.filter(item => item.country === country && item.age === age && item.gender === gender && item.favorite === favorite);
};
// console.log(getFilteredData('Australia', 46, 'male', false));

//5
const getFindData = (name, note, age) => {
    return data.find(item => item.full_name == name && item.note == note && item.age == age);
};

// console.log(getFindData('ClaudePayne', 'Lorem Ipsum', 55));
//6
const getUsersAge = (age) => {
    const filteredUsers = data.filter(item => item.age > age);
    return filteredUsers.length / data.length * 100;
}
// console.log(getUsersAge(10));


const paintTeachersNet = () => {

    const strNet = data.map(item => getTeacherNetItem(item));

    const variable = () => strNet.join("");

    refs.teachersNet.insertAdjacentHTML("afterbegin", variable());
}

const getFavoriteTeachers = () => data.filter(teacher => teacher.favorite === true);

const paintFavoriteNet = () => {
    refs.favoriteSlider.innerHTML = '';
    const strNet = getFavoriteTeachers().map(item => getFavoriteNetItem(item));

    const variable = () => strNet.join("");

    refs.favoriteSlider.insertAdjacentHTML("afterbegin", variable());
}
paintTeachersNet();
paintFavoriteNet();
console.log(data);
const getTeacher = (id) => data.find(item => item.id === id);
const handlerClickTeacher = (e) => {
    const element = e.target;
    const teacherItemClosest = element.closest(".teacher-item");
    // console.log(element)
    if (element.closest(".teacher-item__img-container")) {
        console.log("popap");
        const dataForPopup = getTeacher(teacherItemClosest.dataset.id);
        // console.log(dataForPopup);
        refs.TeacherInfoCart.innerHTML = '';
        refs.TeacherInfoCart.insertAdjacentHTML('afterbegin', getTeacherPopup(dataForPopup));
        refs.TeacherInfoCart.style.display = "block";
    } else if (element.closest(".teacher-item__icon")) {
        console.log("favorite turn");

        const dataForPopup = getTeacher(teacherItemClosest.dataset.id);


        element.closest(".teacher-item__icon").classList.toggle('icon-active');
        console.log();
        console.log(dataForPopup.favorite);
        dataForPopup.favorite ? dataForPopup.favorite = false : dataForPopup.favorite = true;
        // paintFavoriteNet();-----------------------
    }
}







refs.teachersNet.addEventListener('click', handlerClickTeacher);
