
import { bgColor, course } from './static-data.js'
const getId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);


function daysLeft() {

    var year = parseInt(prompt('enter year (format: YYYY)'));
    var month = parseInt(prompt('enter month (format: M)'));
    var day = parseInt(prompt('enter day'));

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var nextDate = new Date([today.getFullYear(), month, day].join(','));
    if (nextDate < today) nextDate.setFullYear(today.getFullYear() + 1);

    msPerDay = 24 * 60 * 60 * 1000;
    daysLeft = Math.round((nextDate.getTime() - today.getTime()) / msPerDay);
    dayname = "";
    ds = "" + daysLeft;

    dd = parseInt(ds.substr(ds.length - 1));

    if (daysLeft > 4 && daysLeft < 21) dayname = " dnei";
    else
        if (dd == 1) dayname = " den";
        else
            if (dd == 2 || dd == 3 || dd == 4) dayname = " dnya";
            else dayname = " dnei";

    if (daysLeft == 0) { alert("Happy Bday!"); }
    else {
        if (daysLeft == 1) { alert("Zavtra u vas prazdnik!"); }
        else { alert("do vashego DR ostalos " + daysLeft + dayname + "!"); }
    }
}
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


const transformData = (data) => data.map(item => {

    return {
        id: item.id.value ? item.id.value : getId(),
        course: course[randomInteger(0, 10)],
        bg_color: bgColor[randomInteger(0, 8)],
        favorite: getFavorite(),
        gender: item.gender ? item.gender : null,
        title: item.name.title ? item.name.title : null,
        full_name: item.name.first + " " + item.name.last,
        city: item.location.city ? item.location.city : null,
        state: item.location.state ? item.location.state : null,
        country: item.location.country ? item.location.country : null,
        postcode: item.location.postcode ? item.location.postcode : null,
        coordinates: {
            latitude: item.location.coordinates.latitude ? item.location.coordinates.latitude : null,
            longitude: item.location.coordinates.longitude ? item.location.coordinates.longitude : null,
        },
        timezone: {
            offset: item.location.timezone.offset ? item.location.timezone.offset : null,
            description: item.location.timezone.description ? item.location.timezone.description : null,
        },
        email: item.email ? item.email : null,
        b_date: item.dob.date ? item.dob.date : null,
        age: item.dob.age ? item.dob.age : null,
        phone: item.phone ? item.phone : null,
        picture_large: item.picture.large ? item.picture.large : null,
        picture_thumbnail: item.picture.thumbnail ? item.picture.thumbnail : null,
        note: item.note ? item.note : null,
    };
});
// cell: "(821)-165-0623"
// dob: {date: '1966-12-13T08:48:47.833Z', age: 56}
// email: "kristin.robertson@example.com"
// gender: "female"
// id: {name: 'SSN', value: '570-28-9663'}
// location: {street: {…}, city: 'Tampa', state: 'Wisconsin', country: 'United States', postcode: 10110, …}
// login: {uuid: '8c7964ef-0ac1-4825-b782-b569dc03fdec', username: 'blackpeacock407', password: 'latin', salt: 'PXfGju7E', md5: '544096f16c0c360adfa3effe52062cc6', …}
// name: {title: 'Mrs', first: 'Kristin', last: 'Robertson'}
// nat: "US"
// phone: "(801)-989-8772"
// picture: {large: 'https://randomuser.me/api/portraits/women/83.jpg', medium: 'https://randomuser.me/api/portraits/med/women/83.jpg', thumbnail: 'https://randomuser.me/api/portraits/thumb/women/83.jpg'}
// registered: {date: '2012-05-09T21:11:40.432Z', age: 10}
const sortByStr = (data, type) => {
    const resultArr = [...data];
    return resultArr.sort((a, b) => a[`${type}`] > b[`${type}`] ? 1 : -1);
}
const sortByAge = (data) => {
    const resultArr = [...data];
    return resultArr.sort((a, b) => a.age > b.age ? 1 : -1);
}

// var text = document.querySelector('#text');

// timer();
// setInterval(timer, 1000);

function timer(text, d1, d2) {
    var now = new Date();
    var target = new Date(now.getFullYear(), Number(d1), Number(d2), 0, 0, 0);
    console.log(target);
    console.log(d1);
    console.log(d2);
    var diff = Math.ceil((target - now) / 1000);

    var days = extract(diff, 60 * 60 * 24);
    var hours = extract(days.diff, 60 * 60);
    var minutes = extract(hours.diff, 60);
    var seconds = extract(minutes.diff, 1);

    text.innerHTML = addZero(days.value) + ' '
        + addZero(hours.value)
        + ':' + addZero(minutes.value)
        + ':' + addZero(seconds.value);

}

function extract(diff, formula) {
    var value = Math.floor(diff / formula);
    var diff = diff % formula;

    return { value: value, diff: diff };
}

function addZero(num) {
    if (num <= 9) {
        num = '0' + num;
    }

    return num;
}
export { getId, randomInteger, getFavorite, transformData, sortByStr, sortByAge, daysLeft, timer };