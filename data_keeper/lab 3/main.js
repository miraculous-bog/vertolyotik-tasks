import { randomUserMock, additionalUsers } from './data.js';
const bgColor = ['#FFFF99', '#FFCCCC', '#996699', '#9999FF', '#99FFFF', '#99FF99', '#99FF66', '#CCCC66', '#CCCCCC', '#FF9933'];
const course = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry',
    'Law', 'Art', 'Medicine', 'Statistics'];
const getId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const randomInteger = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}
const getFavorite = () => {
    const caseFav = randomInteger(0, 100);
    if (caseFav < 101 && caseFav > 85) {
        return true;
    } else return false;
}

// const deepEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);
// 1

const transformRightDataFirst = randomUserMock.map(item => {
    return {
        id: getId(),
        course: course[randomInteger(0, 10)],
        bg_color: bgColor[randomInteger(0, 8)],
        favorite: getFavorite(),
        gender: item.gender,
        title: item.name.title,
        full_name: item.name.first + item.name.last,
        city: item.location.state,
        state: item.location.state,
        country: item.location.country,
        postcode: item.location.postcode,
        coordinates: {
            latitude: item.location.coordinates.latitude,
            longitude: item.location.coordinates.longitude,
        },
        timezone: {
            offset: item.location.timezone.offset,
            description: item.location.timezone.description,
        },
        email: item.email,
        b_date: item.dob.date,
        age: item.dob.age,
        phone: item.phone,
        picture_large: item.picture.large,
        picture_thumbnail: item.picture.thumbnail,
        note: 'Lorem Ipsum',
    };
});

const transformRightDataSecond = additionalUsers.map(item => {

    return {
        id: item.id,
        course: item.course,
        bg_color: item.bg_color,
        favorite: item.favorite,
        gender: item.gender ? item.gender : null,
        title: item.title ? item.title : null,
        full_name: item.full_name,
        city: item.city ? item.city : null,
        state: item.state ? item.state : null,
        country: item.country ? item.country : null,
        postcode: item.postcode ? item.postcode : null,
        coordinates: {
            latitude: item.coordinates ? item.coordinates.latitude : null,
            longitude: item.coordinates ? item.coordinates.longitude : null,
        },
        timezone: {
            offset: item.timezone ? item.timezone.offset : null,
            description: item.timezone ? item.timezone.description : null,
        },
        email: item.email ? item.email : null,
        b_date: item.b_day ? item.b_day : null,
        age: item.age ? item.age : null,
        phone: item.phone ? item.phone : null,
        picture_large: item.picture_large ? item.picture_large : null,
        picture_thumbnail: item.thumbnail ? item.thumbnail : null,
        note: item.note ? item.note : null,
    };
});

// console.log(transformRightDataFirst);
// console.log(transformRightDataSecond);

const data = transformRightDataFirst.concat(transformRightDataSecond);

// 2
const validationStr = (str) => {
    let result = '';
    if (str === undefined || str === null) {
        result += `Поле відсутнє|||${str}\n`;
        return result;
    }
    if (typeof str !== 'string') {
        result += `Поле не є рядком|||${str}\n`;
        return result;
    }
    if (str[0] === undefined || !str[0].toUpperCase() == str[0]) {
        result += 'Перша літера не є великою'
    }
    if (result === '') return false
    else return result;

}

const validationDataOb = (full_name, gender, note, state, city, country, age, phone, email) => {
    let result = "";
    const isFull_name = validationStr(full_name);
    if (isFull_name) result += 'Full_name: ' + isFull_name;
    const isGender = validationStr(gender);
    if (isGender) result += 'Gender: ' + isGender;
    const isNote = validationStr(note);
    if (isNote) result += 'Note: ' + isNote;
    const isState = validationStr(state);
    if (isState) result += 'State: ' + isState;
    const isCity = validationStr(city);
    if (isCity) result += 'City: ' + isCity;
    const isCountry = validationStr(country);
    if (isCountry) result += 'Country: ' + isCountry;
    // validationStr(full_name)?result+=`full_name: `;
    if (age === undefined || age === null || !Number.isInteger(age)) result += 'Age: ' + `Неправильний формат числа для віку викладача|||| ${age}\n`;
    if (email === undefined || email === null || !email.includes('@')) result += 'Email: ' + `Рядок не є форматом електронної пошти||||${email}\n`;

    if (result === '') return false
    else return result;
}

const validationData = data.map(item => {
    const dataVal = validationDataOb(item.full_name, item.gender, item.note, item.state, item.city, item.country, item.age, item.phone, item.email);
    if (dataVal) {
        return `id item: ${item.id}\n ${dataVal}`;
    } else {
        return `id викладача: ${item.id}\n - Вся інформація коректна!`
    }
});

// console.log(data);
// console.log(validationData);
//3

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
