/**
 * Switch to login page
 */
$('#toLogin').click(function (e) {
    e.preventDefault();
    $('#registerContainer').hide();
    $('#loginContainer').show();
})

/**
 * Switch to registration page
 */
$('#toRegistration').click(function (e) {
    e.preventDefault();
    $('#loginContainer').hide();
    $('#registerContainer').show();
})

let loadMainContainer = () => {
    $('#registerContainer').hide();
    $('#loginContainer').hide();
    $('#mainContainer').show();
}

let loadMainRegistrationContainer = () => {
    $('#registerContainer').hide();
    $('#loginContainer').hide();
    $('#mainAuthenticationContainer').hide();
    $('#mainRegistrationContainer').show();
}

let loadMainAuthenticationContainer = () => {
    $('#registerContainer').hide();
    $('#loginContainer').hide();
    $('#mainRegistrationContainer').hide();
    $('#mainAuthenticationContainer').show();
}

$('#registrationToLogout').click(() => {
    fetch('/logout', { credentials: 'include' });
    $('#registerContainer').hide();
    $('#mainRegistrationContainer').hide();
    $('#mainAuthenticationContainer').hide();
    $('#loginContainer').show();
})

$('#loginToLogout').click(() => {
    fetch('/logout', { credentials: 'include' });
    $('#registerContainer').hide();
    $('#mainRegistrationContainer').hide();
    $('#mainAuthenticationContainer').hide();
    $('#loginContainer').show();
})