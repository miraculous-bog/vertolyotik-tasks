// import { randomUserMock, additionalUsers } from './data.js';

// import { bgColor, course } from './static-data.js'
import { getId, randomInteger, getFavorite, transformRightDataFirst, transformRightDataSecond, sortByStr, sortByAge } from './functions.js';

import { validationData } from './validation.js';
import { getTeacherNetItem, getFavoriteNetItem, getTeacherPopup, getOption, getSearchedTeacher, getTabelLine, getPaginationNum } from './markups.js';
import { getMarkupSelect, handleSubmit } from './form.js'
console.log(transformRightDataFirst);
console.log(transformRightDataSecond);
let separetedArr = [];
const refs = {
    teachersNet: document.querySelector('.teachers-net'),
    favoriteSlider: document.querySelector('.icons'),
    TeacherInfoCart: document.querySelector('#Teacher-info-cart'),
    formCart: document.querySelector('#Form-cart'),
    addingTeacherBtn: document.querySelectorAll('.button-adding-teacher'),
    countrySelect: document.querySelector(".country-select"),
    specialitySelect: document.querySelector(".speciality-select"),
    form: document.querySelector(".adding-teacher-form"),
    searchBtn: document.querySelector(".searched-filed__button"),
    pannel: document.querySelector(".searched-filed__pannel-list"),
    tabel: document.querySelector(".statistic-containter__table"),
    paginationList: document.querySelector(".statistic-containter__pagintation-list"),
    selectAge: document.querySelector("#age"),
    selectRegion: document.querySelector("#region"),
    selectGender: document.querySelector("#gender"),
    checkboxPhoto: document.querySelector("#photo"),
    checkboxFavorites: document.querySelector("#favorites"),
}
const filter = {

};
const showForm = () => refs.formCart.style.display = 'block';
refs.addingTeacherBtn.forEach(item => item.addEventListener('click', showForm));

const data = transformRightDataFirst.concat(transformRightDataSecond);


refs.countrySelect.innerHTML = getMarkupSelect(data, 'country');
refs.specialitySelect.innerHTML = getMarkupSelect(data, 'course');
console.log(getMarkupSelect(data, 'country'));
console.log(getMarkupSelect(data, 'speciality'));
refs.selectRegion.innerHTML = getMarkupSelect(data, 'country');

const getFilteredData = (country, age, gender, favorite) => {
    return data.filter(item => item.country === country && item.age === age && item.gender === gender && item.favorite === favorite);
};
// console.log(getFilteredData('Australia', 46, 'male', false));

//5
const getFindData = (name, note, age) => {
    return data.find(item => item.full_name == name && item.note == note && item.age == age);
};



const paintTeachersNet = (info) => {

    const strNet = info.map(item => getTeacherNetItem(item));

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
const paintTabel = (tabelFiled) => {
    console.log(tabelFiled);
    console.log(separetedArr);
    const allPrevFiled = document.querySelectorAll(".tabel-filed");
    console.log(allPrevFiled);
    allPrevFiled.forEach(item => item.remove());
    const strNet = tabelFiled.map(item => getTabelLine(item));

    const variable = () => strNet.join("");

    refs.tabel.insertAdjacentHTML("beforeend", variable());
}
paintTabel(data.slice(0, 10));
paintTeachersNet(data);
paintFavoriteNet();

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


        const dataForPopup = getTeacher(teacherItemClosest.dataset.id);


        element.closest(".teacher-item__icon").classList.toggle('icon-active');

        console.log(dataForPopup.favorite);
        dataForPopup.favorite ? dataForPopup.favorite = false : dataForPopup.favorite = true;
        // paintFavoriteNet();-----------------------
    }
}

const handlerPanel = (e) => {
    console.log(e.target);
    const dataForPopup = getTeacher(e.target.dataset.id);
    // console.log(dataForPopup);
    refs.TeacherInfoCart.innerHTML = '';
    refs.TeacherInfoCart.insertAdjacentHTML('afterbegin', getTeacherPopup(dataForPopup));
    refs.TeacherInfoCart.style.display = "block";
    refs.pannel.removeEventListener("click", handlerPanel);
    refs.pannel.innerHTML = '';
}
const handleSearch = () => {
    const filed = document.querySelector(".searched-filed__input").value;
    console.log(filed);
    let filtredByAgeTeachers = [];
    if (Number.isInteger(Number(filed))) {
        filtredByAgeTeachers = data.filter(item => item.age == filed);

    } else if (filed.length > 0) {
        filtredByAgeTeachers = data.filter(item => {
            if (item.note === null) {
                return item.full_name.toLowerCase().includes(filed.toLowerCase());
            } else {
                return item.full_name.toLowerCase().includes(filed.toLowerCase()) && item.note.toLowerCase().includes(filed.toLowerCase());
            }

        });


    }
    if (filtredByAgeTeachers.length === 0) {
        alert("Викладачів за данними параметрами не знайдено");
        return;
    }

    let str = '';
    filtredByAgeTeachers.forEach(item => str += getSearchedTeacher(item.id, item.full_name));
    console.log(str);
    refs.pannel.insertAdjacentHTML('afterbegin', str);
    refs.pannel.addEventListener("click", handlerPanel)

}

const getPaginationController = (allInfo) => {
    let j = 1;
    separetedArr = [];
    let peaceArr = [];
    for (let i = 0; i < allInfo.length; i++) {
        peaceArr.push(allInfo[i]);
        if (j === 10 || i === allInfo.length - 1) {
            separetedArr.push(peaceArr);
            peaceArr = [];
            j = 0;
        }
        j++;
    }
    // return separetedArr;

    let strListPagination = separetedArr.map((item, i) => getPaginationNum(i + 1));

    refs.paginationList.innerHTML = '';
    refs.paginationList.insertAdjacentHTML('afterbegin', strListPagination.join(""));
}
const handlerPagination = (e) => {
    console.log(e.target);
    console.log();
    const element = e.target;
    if (!element.classList.contains("statistic-containter__pagintation-item")) return;
    const item = [...refs.paginationList.children];
    item.forEach(item => {
        if (item.classList.contains("pagination-active")) {
            item.classList.remove("pagination-active");
        }
    });
    const num = element.dataset.page;
    element.classList.add("pagination-active");
    console.log(num);
    paintTabel(separetedArr[num - 1]);
}
const handlerSort = (e) => {
    const element = e.target;
    if (element.classList.contains("title-static")) {
        let sortedData;
        if (element.dataset.type !== "age") {
            sortedData = sortByStr(data, element.dataset.type);
        } else {
            sortedData = sortByAge(data);
        }
        getPaginationController(sortedData);
        paintTabel(sortedData.slice(0, 10))
    }
}
getPaginationController(data);
refs.form.addEventListener('submit', handleSubmit);
refs.searchBtn.addEventListener('click', handleSearch);
refs.teachersNet.addEventListener('click', handlerClickTeacher);
export { data };
refs.paginationList.addEventListener("click", handlerPagination);
const tabelTitles = document.querySelector(".statistic-containter__titles");
tabelTitles.addEventListener("click", handlerSort);
const filterMenu = (data) => {
    const getTrue = (str) => {
        console.log("str", str);
        if (str === undefined || str === null) return false;
        else return true;
    }

    console.log(filter);
    let arr = [...data];
    if (getTrue(filter.age)) {
        const interval = filter.age.split("-");
        const filtredByAge = arr.filter(item => {
            return Number(item.age) > interval[0] && Number(item.age) < interval[1];
        })
        arr = [];
        arr = [...filtredByAge];
    }
    console.log(arr);
    if (getTrue(filter.gender)) {

        const filtredByGender = arr.filter(item => {
            return item.gender.toLowerCase() == filter.gender.toLowerCase();
        })
        console.log(filtredByGender)
        arr = [];
        arr = [...filtredByGender];
    }
    if (getTrue(filter.region)) {

        const filtredByRegion = arr.filter(item => {
            if (getTrue(item.country)) {
                return item.country.toLowerCase() == filter.region.toLowerCase();
            }
        })
        console.log(filtredByRegion)
        arr = [];
        arr = [...filtredByRegion];
    }
    if (filter.favorites) {

        const filtredByFavorites = arr.filter(item => {
            return item.favorite == filter.favorites;
        })
        console.log(filtredByFavorites)
        arr = [];
        arr = [...filtredByFavorites];
    }
    if (filter.photo) {

        const filtredByPhoto = arr.filter(item => {
            return item.picture_large !== null;
        })
        console.log(filtredByPhoto)
        arr = [];
        arr = [...filtredByPhoto];
    }
    refs.teachersNet.innerHTML = '';
    paintTeachersNet(arr);
}
const ght = (e) => {
    console.dir(e.target)
    const elelemt = e.target;
    if (elelemt.name === "favorites" || elelemt.name === "photo") {
        filter[`${elelemt.name}`] = elelemt.checked;

    } else {
        filter[`${elelemt.name}`] = elelemt.value;
    }
    console.log(filterMenu(data));

}
refs.selectAge.addEventListener("change", ght);
refs.selectRegion.addEventListener("change", ght);
refs.selectGender.addEventListener("change", ght);
refs.checkboxPhoto.addEventListener("change", ght);
refs.checkboxFavorites.addEventListener("change", ght);
// refs.selectRegion: document.querySelector("#region"),
// refs.selectGender: document.querySelector("#sex"),
// refs.checkboxPhoto: document.querySelector("#photo"),
// refs.checkboxFavorites: document.querySelector("#favorites"),