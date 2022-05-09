import { getOption } from "./markups.js";
const form = document.querySelector(".adding-teacher-form");


const getTitle = (data, type) => {
    const result = [];
    for (let i = 0; i < data.length; i++) {
        if (!result.includes(data[i][`${type}`])) {
            result.push(data[i][`${type}`]);
        }
    }
    return result;
}


const getMarkupSelect = (data, type) => {
    const allMarkups = getTitle(data, type).map(item => {
        if (item !== null) {
            return getOption(item);
        }
    });

    return allMarkups.join("");
}


function handleSubmit(event) {
    event.preventDefault();

    const { elements } = event.currentTarget;
    console.dir(elements);

    const nameInput = elements.full_name;
    const specialityInput = elements.speciality;
    const countryInput = elements.country;
    const cityInput = elements.city;
    const emailInput = elements.email;
    const phoneInput = elements.phone;
    const dateInput = elements.date;
    const sexInput = elements.gender;
    const colorInput = elements.color;
    const noteInput = elements.note;


    const data = {
        [nameInput.name]: nameInput.value,
        [specialityInput.name]: specialityInput.value,
        [countryInput.name]: countryInput.value,
        [cityInput.name]: cityInput.value,
        [emailInput.name]: emailInput.value,
        [phoneInput.name]: phoneInput.value,
        [dateInput.name]: dateInput.value,
        [sexInput.name]: sexInput.value,
        [colorInput.name]: colorInput.value,
        [noteInput.name]: noteInput.value,

    };

    console.log(data);
}

console.log(submit);
form.addEventListener('submit', handleSubmit);
export { getMarkupSelect };