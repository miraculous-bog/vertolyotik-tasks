import { randomUserMock, additionalUsers } from './data.js';

import { bgColor, course } from './static-data.js'
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

const transformRightDataFirst = randomUserMock.map(item => {
    return {
        id: getId(),
        course: course[randomInteger(0, 10)],
        bg_color: bgColor[randomInteger(0, 8)],
        favorite: getFavorite(),
        gender: item.gender,
        title: item.name.title,
        full_name: item.name.first + ' ' + item.name.last,
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

const sortByStr = (data, type) => {
    const resultArr = [...data];
    return resultArr.sort((a, b) => a[`${type}`] > b[`${type}`] ? 1 : -1);
}
const sortByAge = (data) => {
    const resultArr = [...data];
    return resultArr.sort((a, b) => a.age > b.age ? 1 : -1);
}
export { getId, randomInteger, getFavorite, transformRightDataFirst, transformRightDataSecond, sortByStr, sortByAge };