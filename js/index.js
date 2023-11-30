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

// 흠.... 맴버열람 관련 쓸 수도 있음 안 쓰면 삭제
document.getElementById('members').addEventListener('click', () => {
    renderUserInformation();
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


// 로그인한 사람의 이름으로 변경
function showWelcomeMessage(username) {
    const loggedInUsername = document.getElementById('loggedInUsername');
    loggedInUsername.textContent = username;
};


