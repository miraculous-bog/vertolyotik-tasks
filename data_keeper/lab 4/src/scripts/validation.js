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

const validationData = (data) => {
    return data.map(item => {
        const dataVal = validationDataOb(item.full_name, item.gender, item.note, item.state, item.city, item.country, item.age, item.phone, item.email);
        if (dataVal) {
            return `id item: ${item.id}\n ${dataVal}`;
        } else {
            return `id викладача: ${item.id}\n - Вся інформація коректна!`
        }
    })
};

export { validationData };