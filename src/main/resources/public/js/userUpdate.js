var checkUse = 0

function check(){
    /* 아이디 유효성 검사 */
    if(myform.person_id.value.length === 0){
        alert("아이디를 입력해주세요.");
        myform.person_id.focus();
        return false;
    }

    if(myform.person_id.value.length <5 || myform.person_id.value.length > 12){
        alert("아이디는 5자 이상, 12자 이하로 입력 가능합니다.");
        myform.person_id.focus();
        return false;
    }

    if(!checkEngNumber(myform.person_id.value)){
        alert("아이디는 영어 대소문자, 숫자로만 입력 가능합니다.");
        myform.person_id.focus();
        return false;
    }

    /* 닉네임 유효성 검사 */
    if(myform.nick_name.value.length === 0){
        alert("닉네임을 입력해주세요.");
        myform.nick_name.focus();
        return false;
    }

    if(myform.nick_name.value.length < 2 || myform.nick_name.value.length > 10){
        alert("닉네임은 2자 이상, 10자 이하로 입력이 가능합니다. ");
        myform.nick_name.focus();
        return false;
    }


    /* 비밀번호 및 비밀번호 확인 유효성 검사 */
    if(myform.passwd.value.length === 0){
        alert("비밀번호를 입력해주세요.");
        myform.passwd.focus();
        return false;
    }

    if(myform.passwd.value.length < 8 || !checkEngNumSpeChar(myform.passwd.value)){
        alert("비밀번호는 영문,숫자,특수문자 포함 8자이상 입력해야 합니다.");
        myform.passwd.select();
        return false;
    }

    if(myform.passwd2.value.length === 0){
        alert("비밀번호 확인을 입력해주세요.");
        myform.passwd2.focus();
        return false;
    }

    if(myform.passwd.value !== myform.passwd2.value){
        alert("비밀번호를 재확인하세요.");
        myform.passwd2.select();
        return false;
    }


    /* 전화번호 유효성 검사 */
    if(myform.phone_num.value.length === 0){
        alert("전화번호를 입력해주세요.");
        myform.phone_num.focus();
        return false;
    }


    if(isNaN(myform.phone_num.value) || myform.phone_num.value.length !== 11){
        alert("전화번호는 형식에 맞춰 숫자로만 입력해주세요.");
        myform.phone_num.focus();
        return false;
    }


    /* 나이 유효성 검사 */
    if(myform.old.value.length !== 8) {
        alert("생년월일을 입력해주세요.");
        myform.old.focus();
        return false
    }

    if(isNaN(myform.old.value)){
        alert("숫자만 입력가능합니다.");
        myform.old.focus();
        return false;
    }


    // 문자열이 영어, 숫자인지 확인하는 메서드
    function checkEngNumber(value) {
        return /^[a-zA-Z0-9]+$/.test(value);
    }

    // 문자열이 영어, 숫자, 특수문자인지 확인하는 메서드
    function checkEngNumSpeChar(value) {
        var regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?\/\\~-])/;
        return regex.test(value);
    }

    // 유효성 검사 통과
    return true;


}




// 닉네임 중복 체크

var checkNick = 0

function checkNickProceed() {
    {

        // 보낼 JSON 데이터 생성
        var jsonData = {
            "nick_name": document.querySelector("#nick_name").value,
            "id" : document.querySelector("#id").value
        };

        // Ajax 요청
        $.ajax({
            type: "POST",
            url: "/bangbang/check/nickname/update",  // Spring Boot 어플리케이션의 URL로 변경
            data:  $.param(jsonData), // @RequestParam으로 받기
            contentType: "application/x-www-form-urlencoded",
            success: function (response) {
                if (response === true) {

                    document.getElementById("textNickCheck").style.color = "#01DF74";
                    document.getElementById("textNickCheck").textContent = "사용 가능한 닉네임 입니다. "
                    checkNick = 1

                } else {
                    document.getElementById("textNickCheck").style.color = "red";
                    document.getElementById("textNickCheck").textContent = "중복된 닉네임 입니다. "
                }
            },
            error: function (error) {

            }
        });


        // 실시간 중복 체크
        var userNickInput = document.querySelector("#textNick");


        userNickInput.addEventListener("input", function() {

            // 보낼 JSON 데이터 생성
            var jsonData2 = {
                "nick_name": document.querySelector("#textNick").value,
                "id" : document.querySelector("#id2").value
            };

            $.ajax({
                type: "POST",
                url: "/bangbang/check/nickname/update",  // Spring Boot 어플리케이션의 URL로 변경
                data:  $.param(jsonData2), // @RequestParam으로 받기
                contentType: "application/x-www-form-urlencoded",
                success: function (response) {
                    if (response === true) {

                        document.getElementById("textNickCheck").style.color = "#01DF74";
                        document.getElementById("textNickCheck").textContent = "사용 가능한 닉네임 입니다. "
                        checkNick = 1

                    } else {
                        document.getElementById("textNickCheck").style.color = "red";
                        document.getElementById("textNickCheck").textContent = "중복된 닉네임 입니다. "
                        checkNick = 0
                    }

                },
                error: function (error) {

                }
            });

        });


    }
}


// 닉네임 중복 체크 버튼
document.getElementById("modal_opne_btn2").onclick = function() {

    checkNickProceed()

    document.querySelector("#textNick").value = document.querySelector("#nick_name").value;

    document.getElementById("modal2").style.display="block";

}

document.getElementById("modal_close_btn2").onclick = function() {
    document.getElementById("modal2").style.display="none";
}

document.getElementById("modal_OK_btn2").addEventListener("click", function() {
    if (checkNick === 1) {
        document.getElementById("modal2").style.display = "none";
        document.querySelector("#nick_name").value = document.querySelector("#textNick").value
        document.querySelector("#nick_name").readOnly  = true
        document.querySelector("#nick_name").style.backgroundColor = "#EEEEEE";
    } else {
        alert("중복된 닉네임 입니다. ")
    }
});




// 중복 체크 구현
const checkBtn = document.querySelector("#check")

checkBtn.addEventListener("click", function (event) {

    if(!check()) {
        event.preventDefault()
    }

    if(checkNick === 0){
        alert("닉네임 중복을 체크해 주세요")
        event.preventDefault()
    }

})




