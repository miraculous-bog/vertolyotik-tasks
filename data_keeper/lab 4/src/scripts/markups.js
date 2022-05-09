const getTeacherNetItem = (data) => {
    const name = data.full_name.split(" ");
    let favorite;
    let img;
    data.favorite ? favorite = 'teacher-item__icon icon-active' : favorite = 'teacher-item__icon';

    data.picture_large === null ? img = `<h2 class="teacher-item__plug">${name[0][0]}.${name[1][0]}</h2>` : img = `<img class="teacher-item__img" src="${data.picture_large}" alt="teacher">`;

    return `<div class="teacher-item" data-id="${data.id}">
    <svg class="${favorite}" version="1.0" xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1280.000000 1216.000000" preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,1216.000000) scale(0.100000,-0.100000)" stroke="none">
            <path d="M5890 10598 c-332 -755 -736 -1674 -898 -2043 -161 -368 -295 -671
-297 -673 -2 -2 -308 -25 -682 -52 -373 -27 -1054 -76 -1513 -109 -459 -34
-1087 -79 -1395 -101 -308 -22 -585 -43 -615 -46 l-54 -6 49 -47 c28 -25 336
-300 684 -611 349 -311 806 -718 1016 -905 1267 -1130 1560 -1391 1572 -1400
17 -13 74 228 -542 -2265 -256 -1036 -464 -1887 -463 -1890 2 -4 869 499 1928
1117 1058 618 1931 1122 1940 1120 8 -2 398 -242 865 -532 468 -291 1165 -724
1550 -963 385 -239 811 -504 947 -588 135 -85 249 -154 253 -154 4 0 4 17 0
38 -6 34 -411 1897 -776 3568 -87 402 -159 738 -159 747 0 13 649 563 2997
2542 258 217 261 220 230 227 -18 4 -1011 104 -2207 223 -1196 119 -2184 220
-2196 225 -15 6 -62 111 -199 446 -98 242 -412 1013 -697 1714 -285 701 -564
1388 -620 1525 -56 138 -104 253 -108 258 -3 4 -278 -610 -610 -1365z" />
        </g>
    </svg>
    <div class="teacher-item__img-container">

        ${img}
    </div>
    <h2 class="teacher-item__name">${name[0]}<br>${name[1]}</h2>
    <p class="teacher-item__subject">${data.course}</p>
    <p class="teacher-item__location">${data.country}</p>
</div>`
}

const getFavoriteNetItem = (data) => {
    const name = data.full_name.split(" ");
    let img;

    data.picture_large === null ? img = `<h2 class="teacher-item__plug">${name[0][0]}.${name[1][0]}</h2>` : img = `<img class="teacher-item__img" src="${data.picture_large}" alt="teacher">`;
    return `<div class="slide" data-id="${data.id}">
 <div class="teacher-item">
     <div class="teacher-item__img-container"> ${img}</div>
     <h2 class="teacher-item__name">${name[0]}<br>${name[1]}</h2>
     <p class="teacher-item__subject">${data.course}</p>
     <p class="teacher-item__location">${data.country}</p>
 </div>
</div>`;
}

const getTeacherPopup = (data) => {
    const name = data.full_name.split(" ");
    let img;
    data.picture_large === null ? img = `<h2 class="modal-body__img modal-body__h2">${name[0][0]}.${name[1][0]}</h2>` : img = `<img class="modal-body__img" src="${data.picture_large}" alt="teachr-details">`;


    return `<div class="modal-content">
    <div class="modal-content__line">
        <h3>Teacher info</h3>
        <span class="close">&times;</span>
    </div>
    <div class="modal-body">
        ${img}
        <div class="modal-body__info">
            <h2 class="modal-body__info-name">${data.full_name}</h2>
            <p class="modal-body__info-subject">${data.course}</p>
            <p class="modal-body__info-loaction">${data.city},${data.country}</p>
            <p class="modal-body__info-person">${data.age},${data.gender}</p>
            <a class="modal-body__info-mail" href="#">${data.email}</a>
            <p class="modal-body__info-phone">${data.phone}</p>
        </div>
        <div class="clear"></div>
        <div class="modal-body__text-info">
            <p class="modal-body__text-info-add">${data.note}</p>
            <a class="modal-body__text-info-map" href="#">toggle map</a>
        </div>

    </div>
</div>`;
}


const getOption = (item) => {
    return `<option value="${item}">${item}</option>`;
}
// {
//     id: getId(),
//     course: course[randomInteger(0, 10)],
//     bg_color: bgColor[randomInteger(0, 8)],
//     favorite: getFavorite(),
//     gender: item.gender,
//     title: item.name.title,
//     full_name: item.name.first + ' ' + item.name.last,
//     city: item.location.state,
//     state: item.location.state,
//     country: item.location.country,
//     postcode: item.location.postcode,
//     coordinates: {
//         latitude: item.location.coordinates.latitude,
//         longitude: item.location.coordinates.longitude,
//     },
//     timezone: {
//         offset: item.location.timezone.offset,
//         description: item.location.timezone.description,
//     },
//     email: item.email,
//     b_date: item.dob.date,
//     age: item.dob.age,
//     phone: item.phone,
//     picture_large: item.picture.large,
//     picture_thumbnail: item.picture.thumbnail,
//     note: 'Lorem Ipsum',
// }

export { getTeacherNetItem, getFavoriteNetItem, getTeacherPopup, getOption };