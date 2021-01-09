let baseUrl = 'http://localhost:3000'
$(document).ready(function(){
    $('#form-login').show()
    $('#form-register').hide()
    $('#navbar').hide()

    $('#signup').click(function(){
        $('#form-login').hide()
        $('#form-register').fadeIn()
        $('#navbar').hide()
    })

    $('#signin').click(function(){
        $('#form-login').fadeIn()
        $('#form-register').hide()
        $('#navbar').hide()
 
    })

    if(localStorage.access_token){
        $('#form-login').hide()
        $('#form-register').hide()
        $('#navbar').show()
    }else{
        $('#form-login').show()
        $('#form-register').hide()
        $('#navbar').hide()
    }
});


/*================LOGOUT================*/

  $('#logout').click(function(event){
    event.preventDefault()
    localStorage.clear()
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
    $('#form-login').show()
    $('#form-register').hide()
    $('#navbar').hide()
  })


/*================REGISTER================*/
$('#register-btn').click(function(event){
    event.preventDefault()
    var email = $('#email-register').val()
    var password = $('#password-register').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/register`,
        data:{
            email,
            password
        }
    })
    .done(response=>{
        $('#form-register').hide(2000)
        $('#form-login').fadeIn()
        $('#navbar').hide()
    })
    .fail(err=>{
        console.log(err, '=> error')
    })
    .always(()=>{
        $('#email-register').val('')
        $('#password-register').val('')
    })
})


/*================LOGIN================*/

$('#login-btn').click(function(event){
    event.preventDefault()
    var email = $('#email').val()
    var password = $('#password').val()

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login`,
        data:{
            email,
            password
        }
    })
    .done(response=>{
      console.log(response)
        localStorage.setItem('access_token', response.access_token)
        $('#form-login').hide()
        $('#navbar').show()
    })
    .fail(err=>{
        console.log(err, '=> error')
    })
    .always(()=>{
        $('#email').val('')
        $('#password').val('')
    })
})

/*================SIGNIN GOOGLE================*/
function onSignIn(googleUser) {
    // var profile = googleUser.getBasicProfile();
    // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    // console.log('Name: ' + profile.getName());
    // console.log('Image URL: ' + profile.getImageUrl());
    // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    const id_token = googleUser.getAuthResponse().id_token

    $.ajax({
        method: 'POST',
        url: `${baseUrl}/login/google`,
        data:{id_token}
    })
    .done(response=>{
        localStorage.setItem('access_token', response.access_token)
        $('#form-login').hide()
        $('#navbar').show()
    })
    .fail((xhr, status )=>{

    })
    .always(()=>{
        $('#email').val('')
        $('#password').val('')
    })
}

