document.getElementById('main_logo').addEventListener('click',() => {
    location.href = "#main_img_area"
});

document.addEventListener('DOMContentLoaded', function () {
    // 부드러운 스크롤을 적용할 링크 선택자
    const scrollLinks = document.querySelectorAll('.scroll-link');

    // 링크에 클릭 이벤트 추가
    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // 부드러운 스크롤 적용
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

/**
 * localStorage userInformation을 화면에 출력하기
 *  - userInformation -> tr
 *  - 일시 : millis -> Date -> mm/dd hh:mi
 *  - 회원가입을 진행한 후 테이블이 화면에 표시되어야 함.
 */
const renderUserInformation = () => {
    // localStorage에서 guestbooks 읽어오기
    const userInformation = JSON.parse(localStorage.getItem("userInformation")) || [];

    // tr태그로 변환하기 -> tbody 추가하기
    const tbody = document.querySelector('table#tb-users tbody');
    tbody.innerHTML = ''; // 초기화
    userInformation.forEach((userInformation, index) => {
        const {name, username, password, phone, email, address, createdAt} = userInformation;
        console.log(name, username, password, phone, email, address, createdAt);
        const tr = `
        <tr>
            <td>${name}</td>
            <td>${username}</td>
            <td>${password}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td>${address}</td>
            <td>${convertToDatTime(createdAt)}</td>
        </tr>`;
        tbody.innerHTML += tr;
    });
};

const f = (n) => n < 10 ? '0' + n : n;
const convertToDatTime = (millis) => {
    const d = new Date(millis);
    const mm = f(d.getMonth() + 1);
    const dd = f(d.getDate());
    const hh = f(d.getHours());
    const mi = f(d.getMinutes());
    return `${mm}/${dd} ${hh}:${mi}`
};

// span 태그쪽에 로그인한 사용이름 넣기
document.addEventListener('DOMContentLoaded', function () {
    // span 태그쪽에 로그인한 사용자 이름 넣기
    const loggedInUsername = document.getElementById('loggedInUsername');
    
    // localStorage에서 로그인한 사용자 정보 가져오기
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
        // 로그인한 사용자가 있는 경우 사용자 이름을 표시
        loggedInUsername.innerHTML = loggedInUser.username;
    }
});

document.getElementById('members').addEventListener('click', () => {
    // localStorage에서 로그인한 사용자 정보 가져오기
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    // 로그인한 사용자 name(아이디)이 "woojin1"일 때만 회원 목록 열람 가능
    if (loggedInUser && loggedInUser.name === "woojin1") {
        // 호출코드가 name(아이디)이 "woojin1"일 경우에만 열림
        renderUserInformation();
    } else {
        alert('회원 목록을 열람할 수 있는 권한이 없습니다.');
        
    }
});


// 취미쪽에 jQuery라이브러리를 이용해서 사진띄우기
$('.bxslider').bxSlider({
    mode: 'fade',
    captions: true,
    slideWidth: 600
});
