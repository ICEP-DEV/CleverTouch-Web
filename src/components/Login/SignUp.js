

function validateNm() {

    const name = document.getElementById("name");

    const nm = name.value;

    var vNm = document.getElementById("vNm");

    const re = /^[a-zA-Z\s]*$/;    




if(!re.test(nm)){
    
    vNm.textContent= "Invalid name!";
    name.value = "";        
}
else{
    vNm.textContent= "";
}


}

function validateSur(){

    const surname = document.getElementById("surname");
    sur = surname.value;

    var vSur = document.getElementById("vSu");

    const re = /^[a-zA-Z\s]*$/;

    if(!re.test(sur)){
       
        vSu.textContent= "Invalid surname!";
        surname.value = "";
    }
    else{
        vSu.textContent= "";
    }

}

function validateEmail(){

    const email = document.getElementById("email");
    const em = email.value;

    var vEm = document.getElementById("vEm");

    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(re.test(em))
    {
        vEm.textContent = "";
    }
    else{
        vEm.textContent = "Invalid email";
        email.value = "";
    }


}
function passLength(){
   
    const password = document.getElementById("password");
    const passL = document.getElementById("passL");

    if(password.value.length < 5){
        passL.textContent = "Password is < 5 characters"
    }
    else{
        passL.textContent = "";
    }

}
function matchPassword(){

    const password = document.getElementById("password");
    const pass = password.value;

    const password2 = document.getElementById("password2")
    const pass2 = password2.value;

    var vPass = document.getElementById("vPass");

    if(pass === pass2)
    {
        vPass.textContent = "";
    }
    else{
        vPass.textContent = "Passwords do not match";
        password.value = "";
        password2.value = "";
    }

}

function checkNull(){

    const password = document.getElementById("password");

    const password2 = document.getElementById("password2")

    const email = document.getElementById("email");

    const surname = document.getElementById("surname");

    const name = document.getElementById("name");
 

    if(name.value===""||surname.value===""||email.value===""||password.value===""||password2.value===""){
        alert("Fill in all fields");
        window.location.href = window.location.href;
    }
    else
    {
        alert("Congratulations!! Account Successfully Created");
        window.location.href = "nav/Homepage - Shortcut.lnk";

        //ADD TO DATABASE
        
    }

}
function backB(){
    window.location.href ="nav/Landing - Shortcut.lnk";

}
function refresh(){
    window.location.href = window.location.href;
}


