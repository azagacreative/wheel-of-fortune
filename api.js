let _GAME_DEVELOPEMENT_MODE = false;
let _API_URL;

if (_GAME_DEVELOPEMENT_MODE === true) {
    _API_URL = 'http://localhost:3000';
} else {
    _API_URL = 'https://app.azagatechnology.com';
}

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
$(document).ready(function () {
    $("#btnSkipLogin").click(function () {
        Swal.fire({
            icon: 'question',
            title: 'Are you sure Play as Guest?',
            html: '<div id="recaptcha"></div>',
            didOpen: () => {
                grecaptcha.render('recaptcha', {
                    'sitekey': '6LfFNrgeAAAAAKWIGZuhsn91zFR4WL5QDhdLdpgT'
                })
            },
            preConfirm: function () {
                if (grecaptcha.getResponse().length === 0) {
                    Swal.showValidationMessage(`Please verify that you're not a robot`)
                } else {
                    $('#login-form').hide();
                    $('#game-container').show();
                }
            }
        })
    })
});
if (
  localStorage.getItem("ACTGames_nickname") === null ||
  localStorage.getItem("ACTGames_nickname") === "Guest"
) {
  $("#login-form").show();
  $("#game-container").hide();
  localStorage.setItem("ACTGames_nickname", "Guest");
} else {
  $.ajax({
    type: "POST",
    url: _API_URL + "/api/login",
    data: JSON.stringify({
      nickname: localStorage.getItem("ACTGames_nickname"),
      pin_code: localStorage.getItem("ACTGames_pin_code"),
    }),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
        $("#login-form").hide();
        //console.log('Login hidden!')
        $("#game-container").show();
        //console.log('Game shown!')
      console.log(`%cAzagaCreativeAPIService:`, "color:#00FF00;", data);
    },
    error: function (errMsg) {
      console.log(errMsg);
    },
  });
} 
$(document).ready(function () {
    $('#btn-register').click(function () {
        let nickname = $("#act-game-nickname-register").val();
        if (nickname != '') {
            Swal.fire({
                icon: 'question',
                title: 'Are you sure?',
                html: '<div id="recaptcha"></div>',
                didOpen: () => {
                    grecaptcha.render('recaptcha', {
                        'sitekey': '6LfFNrgeAAAAAKWIGZuhsn91zFR4WL5QDhdLdpgT'
                    })
                },
                preConfirm: function () {
                    if (grecaptcha.getResponse().length === 0) {
                        Swal.showValidationMessage(`Please verify that you're not a robot`)
                    }else {
                        $.ajax({
                            type: "POST",
                            url: _API_URL + "/api/register",
                            data: JSON.stringify({ nickname: nickname }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                if (data.status === 200) {
                                    console.log(`AzagaCreativeAPIService:`, data);
                                    localStorage.setItem('ACTGames_uid', data.uid);
                                    localStorage.setItem('ACTGames_nickname', nickname);
                                    localStorage.setItem('ACTGames_pin_code', data.pin_code);
                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Success',
                                        html: 'You\'re registered!<br>Your nickname is: <b>' + nickname + '</b><br>Your pin code is: <b>' + data.pin_code + '</b>',
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            location.reload();
                                        }
                                    })
                                } else {
                                    Swal.fire(
                                        'Oops...',
                                        'User is exist! <br>Please choose another nickname or Login.',
                                        'warning'
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            location.reload();
                                        }
                                    })
                                }
                            },
                            error: function () {
                                Swal.fire(
                                  "Oops...",
                                  "Something wrong, server is not responding!",
                                  "warning"
                                ).then((result) => {
                                  if (result.isConfirmed) {
                                    location.reload();
                                  }
                                });
                            }
                        })
                    }
                }
            })
        }else {
            Swal.fire(
                'Oops...',
                'Please enter the field!',
                'error'
            )
        }
    });
});
$(document).ready(function () {
    $('#btn-login').click(function () {
        let nickname = $("#act-game-nickname").val();
        let pin_code = $("#act-game-pin-code").val();
        if (nickname != '' && pin_code != '') {
            Swal.fire({
                icon: 'question',
                title: 'Are you sure?',
                html: '<div id="recaptcha"></div>',
                didOpen: () => {
                    grecaptcha.render('recaptcha', {
                        'sitekey': '6LfFNrgeAAAAAKWIGZuhsn91zFR4WL5QDhdLdpgT'
                    })
                },
                preConfirm: function () {
                    if (grecaptcha.getResponse().length === 0) {
                        Swal.showValidationMessage(`Please verify that you're not a robot`)
                    } else {
                        $.ajax({
                            type: "POST",
                            url: _API_URL + "/api/login",
                            data: JSON.stringify({ nickname: nickname, pin_code: pin_code }),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: function (data) {
                                if (data.status == 200) {
                                    localStorage.setItem('ACTGames_nickname', nickname);
                                    localStorage.setItem('ACTGames_pin_code', pin_code);
                                    localStorage.setItem('ACTGames_uid', data.uid);
                                    console.log(`%cAzagaCreativeAPIService:`, 'color:#00FF00;', data);
                                    //$("#login-form").hide();
                                    //$("#game-container").show();
                                    location.reload();
                                } else {
                                    Swal.fire(
                                        'Oops...',
                                        'Wrong nickname or pin code!',
                                        'warning'
                                    ).then((result) => {
                                        if (result.isConfirmed) {
                                            location.reload();
                                        }
                                    })
                                    console.log(`%cAzagaCreativeAPIService:`, 'color:#FF0000;', data);
                                }
                            },
                            error: function () {
                                Swal.fire(
                                  "Oops...",
                                  "Something wrong, server is not responding!",
                                  "warning"
                                ).then((result) => {
                                  if (result.isConfirmed) {
                                    location.reload();
                                  }
                                });
                            }
                        })
                    }
                }
            })
        } else {
            Swal.fire(
                'Oops...',
                'Please enter completed your nickname and pin code!',
                'error'
            )
        }
    });
});

