import { getOption } from "./markups.js";
import { getId } from "./functions.js";
import { validationData } from "./validation.js";
import { data } from "./main.js";
const form = document.querySelector(".adding-teacher-form");
const formCart = document.querySelector('#Form-cart');

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
const getSelect = (data, type) => {
    const allMarkups = getTitle(data, type).map(item => {
        if (item !== null) {
            return item;
        }
    });

    return allMarkups;
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
    const genderInput = elements.gender;
    const colorInput = elements.color;
    const noteInput = elements.note;


    const obj = {
        [nameInput.name]: nameInput.value,
        [specialityInput.name]: specialityInput.value,
        [countryInput.name]: countryInput.value,
        [cityInput.name]: cityInput.value,
        [emailInput.name]: emailInput.value,
        [phoneInput.name]: phoneInput.value,
        [dateInput.name]: Number(dateInput.value),
        gender: genderInput.value,
        bg_color: colorInput.value,
        [noteInput.name]: noteInput.value,
        id: getId(),

        favorite: false,

        title: 'Mr/Ms',
        state: countryInput.value,


        postcode: null,
        coordinates: {
            latitude: null,
            longitude: null,
        },
        timezone: {
            offset: null,
            description: null,
        },

        age: 20,
        picture_large: null,
        picture_thumbnail: null,
    };

    console.log(obj);
    const resultValidation = validationData(obj);
    if (resultValidation === true) {
        formCart.style.display = "none";
        fetch('http://localhost:4040/data', {
            method: 'POST',
            body: JSON.stringify(obj),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
            .then(response => response.json())
            .then(post => console.log(post))
            .catch(error => console.log(error));

        alert("Викладач доданий успішно");
        data.push(obj);
        console.log(data);
    } else {
        alert(resultValidation);
    }
}

// console.log(submit);
// form.addEventListener('submit', handleSubmit);
export { getMarkupSelect, handleSubmit, getSelect };