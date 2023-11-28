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

