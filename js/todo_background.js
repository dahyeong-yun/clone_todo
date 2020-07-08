const UNSPLASH_API_KEY = "b491e86a6957b396f44f1e15e41d3d242e17aa982607f161b95defd195c7f4dd";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

init();

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
            // body.style.backgoundImage = ``;
            // locationContainer.innerHTML = `${},${}`
        }
    }
}

function get_background() {
    fetch(UNSPLASH_URL)
        .then(response => response.json())
        .then(json => {
            const img = json;
            if(img.urls && img.urls.full && img.location) {
                const full_url = img.urls.full;
                const location = img.location;
                const city = location.city;
                const country = location.country;
                const name = location.name;
                save_backgroud(full_url, city, country, name);
            } else {
                get_background(); // 재시도?
            }
        });
    return;
}
