const frm = document.signupFrm;
const name = frm.name;
const username = frm.username;
const password = frm.password;
const checkPassword = frm['checkPassword'];
const phone = frm.tel1 + '-' + frm.tel2 + '-' + frm.tel3;
const email = frm.email1 +'@'+ frm.email2; 
const address = frm.address;

document.signupFrm.onsubmit = (e) => {
    
    // 유효성검사

    // 1. 이름 유효성검사
    // 한글2글자 이상만 허용.
    const regExp0 = /^[가-힣]{2,}$/;
    if (!regExpTest(regExp0, username, "한글2글자이상 입력하세요."))
        return false;

    // 2. 아이디 유효성검사
    //첫글자는 영소문자로 이루어지고, 길이는 4~12글자, 숫자 하나이상 포함
    const regExp1 = /^[a-z][a-z\d]{3,11}$/;
    const regExp2 = /[0-9]/;
    if(!regExpTest(regExp1
                ,name
                ,"아이디는 영소문자로 시작하는 4~12글자에 숫자하나이상 포함입니다."))
        return false; // submit핸들러 기본 작동(submit)을 방지
    if(!regExpTest(regExp2
                ,name
                ,"아이디는 숫자를 하나이상 포함하세요."))
        return false;

    //3. 비밀번호 유효성검사
    const regExpArr = [/^.{8,15}$/, /\d/, /[a-zA-Z]/, /[\\*!&]/];

    for (let i = 0; i < regExpArr.length; i++) {
    if (
        !regExpTest(
            regExpArr[i],
            password,
            "비밀번호는 8~15자리 숫자/문자/특수문자를 포함해야합니다."
            )
        ) {
            return false;
        }
    }

    //4. 비밀번호일치여부
    if (!isEqualPwd()) {
        return false;
    }

    //5. 휴대폰번호 검사
    // 010-xxxx-xxxx형식으로 입력
    if (!regExpTest(/^(010)$/, tel1, "010입력")) 
        return false;
    if (!regExpTest(/^[0-9]{4}$/, tel2, "4자리 번호 입력"))
        return false;
    if (!regExpTest(/^[0-9]{4}$/, tel3, "4자리 번호 입력"))
        return false;

        window.location.href = 'index.html';

return true;

};

// 클릭시

let pwdMsg = document.getElementById("pwdMsg");

// 패스워드 클릭시 "영문자 대/소문자, 특수문자, 숫자 포함 8~32자"문자 출력
password.addEventListener('focus', () => {
    console.log(pwdMsg);
    pwdMsg.style.display="";
});

// focus에서 나갈 시 "영문자 대/소문자, 특수문자, 숫자 포함 8~32자" 문구 사라짐
password.addEventListener('blur', () => {
    pwdMsg.style.display="none";
});

// input에 관한 분기처리
let reqMsgs = document.querySelectorAll('input');
reqMsgs.forEach((input, index) => {
    input.addEventListener('click', () => {
        for(let i = 0; i < index; i++){
            console.log(index)
            if(i < 5){
                checkblur(reqMsgs[i])
            }
        }

    });
});


function checkblur(e){
    if(e.value == ""){
        e.parentElement.querySelector('.reqMsg').style.display="";
    }

};

function checkfocus(e){
    e.parentElement.querySelector('.reqMsg').style.display="none";
};

 // 폼 제출 여부
const requestSignup = () => {
    const nameValue = name.value;
    const usernameValue = username.value;
    const passwordValue = password.value;
    const checkPasswordValue = checkPassword.value;
    const phoneValue = tel1.value + '-' + tel2.value + '-' + tel3.value;
    const emailValue = email1.value + '@' + email2.value;
    const addressValue = address.value;

    console.log('회원가입 성공~ 😁');
    alert(`${usernameValue} 회원가입을 환영합니다.`);
    saveUserInformation(nameValue, usernameValue, passwordValue, checkPasswordValue, phoneValue, emailValue, addressValue);  // 수정
    frm.reset();  
};

// 비밀번호 일치 여부 함수
function isEqualPwd() {
    if (password.value === checkPassword.value) {
        return true;
    } 
    else {
        alert("비밀번호가 일치하지 않습니다.");
        password.select();
        return false;
    }
};

// 정규식 관련 함수
function regExpTest(regExp, el, msg) {
    if (regExp.test(el.value)) return true;
    //적합한 문자열이 아닌 경우
    alert(msg);
    el.focus();
    return false;
};

const saveUserInformation = (name, username, password, checkPassword, phone, email, address) => {
    // localStorage에 저장
    // userInformation에 저장된 배열이 있다면 그걸 사용. 없으면 새 배열 생성.
    const userInformation = JSON.parse(localStorage.getItem('userInformation')) || [];
    userInformation.push(new UserInformation(name, username, password, checkPassword, phone, email, address));
    console.log(userInformation);

    localStorage.setItem('userInformation', JSON.stringify(userInformation));
    frm.reset();
};

class UserInformation {
    constructor(name, username, password, checkPassword, phone, email, address, createdAt = Date.now()) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.checkPassword = checkPassword;
        this.phone = phone;
        this.email = email;
        this.address = address;
        this.createdAt = createdAt;
    }
};

