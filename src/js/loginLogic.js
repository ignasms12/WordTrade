document.addEventListener("DOMContentLoaded", function(event) {
    // Login / Registration logic
    //@TODO TRANSFER TO REACT  'note: not as important'
    const signup = document.getElementById('signup');
    if(signup)
    signup.addEventListener("click", function(event){
        event.preventDefault();
        document.getElementById('psw-repeat-form').classList.remove('display-none');
        document.getElementById('age-form').classList.remove('display-none');
        document.getElementById('car-model-form').classList.remove('display-none');
        document.getElementById('name-form').classList.remove('display-none');
        document.getElementById('info-form').classList.remove('display-none');
        document.getElementById('login').innerHTML = "Signup";
        document.getElementById('login').setAttribute('signup', 'true');
        document.getElementById('account').classList.add('display-none');
        //document.getElementsByClassName('logo').classList.add('logo-signup');
        //document.getElementById('loginHome').classList.add('home-signup');
    });
});