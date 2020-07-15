/**
 * Global Variable
 */
const UNSPLASH_API_KEY = "b491e86a6957b396f44f1e15e41d3d242e17aa982607f161b95defd195c7f4dd"; // 이 key 를 발급 받는 절차
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body");
const location_container = document.querySelector(".js-location");

/**
 * Functions
 */

/**
 * 시작 함수
 */
function init() {
    load_background();
    return;
}

/**
 * 시작 함수에서 호출하는 백그라운드 로드용 함수
 * 로드 함수는 localStorage에서 저장된 이미지가 있는지 여부를 체크
 */
function load_background() {
    const saved_img = localStorage.getItem("bg");
    if(saved_img === null) {
        get_background();
    } else {
        const parsed_img = JSON.parse(saved_img);
        const today = new Date();
        if(today > parsed_img.expiresOn) {
            get_background();
        } else {
            body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${
                parsed_img.url
            })`;
            // locationContainer.innerHTML = `${parsed_img.name}, ${
            //     parsed_img.city
            // }, ${parsed_img.country}`;
        }
    }
    return;
}

function get_background() {
    fetch(UNSPLASH_URL, {method: "GET"}) // 403
        .then(response => response.json())
        .then(json => {
            const img = json;
            if(img.urls && img.urls.full && img.location) {
                const full_url = img.urls.full;
                // const location = img.location;
                // const city = location.city;
                // const country = location.country;
                // const name = location.name;
                // save_backgroud(full_url, city, country, name);
                save_backgroud(full_url);
            } else {
                get_background(); // 재시도?
            }
        });
    return;
}

// function save_backgroud(img_url, city, country, name) {
function save_backgroud(img_url) {
    const saved_img = localStorage.getItem("bg");
    if(saved_img !== null) {
        localStorage.removeItem("bg");
    }

    const expiration_date = new Date();
    expiration_date.setDate(expiration_date.getDate() + 1);
    const img_obj = {
        url : img_url,
        expiresOn : expiration_date,
        // city : city,
        // country : country,
        // name : name
    };

    localStorage.setItem("bg", JSON.stringify(img_obj));
    load_background();
    return;
}

/**
 * 
 */
init();