function warning(message) {
    $(".list_errors").html(message);
    $.fancybox("#error_modal");
}

function create( template, vars, opts ){
    return $container.notify("create", template, vars, opts);
}

$(document).ready(function() {

    $container = $("#notify_container").notify();

    $('.b-search-categ__list').columnize({columns: 4});
    $(".fancybox").fancybox();

    $(".go_to_register").click(function(){
        $("[href=#sign-up]").click();
        return false;
    });

    var loginForm = $("#login");
    loginForm.validate({
        rules : {
            email : {required : true},
            password : {required : true, minlength: 5}
        },
        submitHandler: function() {
            loginForm.find("[type=submit]").prop("disabled", true);
            loginForm.ajaxSubmit(function(data){
                $(".b-modal__error, .b-modal__success").hide();
                if(data.status == "success"){
                    location.href = data.redirect;
                    //location.reload();
                }else{
                    loginForm.find(".b-modal__error").show().text("Неправильная пара логин-пароль.");
                    loginForm.find("[type=submit]").prop("disabled", false);
                }
            });
        }
    });

    var regForm = $("#signup");
    regForm.validate({
        rules : {
            email : {required : true, remote : regForm.data("validate_email")},
            password : {required : true, minlength: 5}
        },
        submitHandler: function() {
            regForm.ajaxSubmit(function(ret){
                $(".b-modal__error, .b-modal__success").hide();
                if(ret.status == "success"){
                    regForm.find(".success_mess").fadeIn(300);
                    location.href = ret.redirect;
                    //location.reload();
                }else{
                    //$("#in_form").find("[type=submit]").prop("disabled", false);
//                    if ('agreement' in ret.error) {
                        if(ret.error.agreement){
                            regForm.find(".b-modal__error").show().text("Подтвердите согласие с пользовательским соглашением.");
                        }
//                    }

                }
            });
        }
    });

    var resetForm = $("#reset_pass");
    resetForm.validate({
        submitHandler: function() {
            resetForm.find("[type=submit]").prop("disabled", true);
            resetForm.ajaxSubmit(function(data){
                $(".b-modal__error, .b-modal__success").hide();
                resetForm.find("[type=submit]").prop("disabled", false);
                resetForm.find(".success_mess").fadeIn(300);
                resetForm.find("input[type=text], textarea").val("");
                resetForm.show().text("Ссылка на восстановление пароля отправлена вам на email.");
            });
        }
    });


    var forgotForm = $("#recovery_pass");
    forgotForm.validate({
        rules : {password : {required : true, minlength: 5}},
        submitHandler: function() {
            forgotForm.find("[type=submit]").prop("disabled", true);
            forgotForm.ajaxSubmit(function(data){
                $(".b-modal__error, .b-modal__success").hide();
                forgotForm.find("[type=submit]").prop("disabled", false);
                if (data.status == 'success'){
                    forgotForm.find(".success_mess").fadeIn(300);
                    forgotForm.find("input[type=text], textarea").val("");
                    $(".b-modal__success:visible").show().text("Ссылка на восстановление пароля отправлена вам на email.");
                }else{
                    forgotForm.find(".b-modal__error").show().text("Ошибка. Пользователь не найден.");
                }
            });
        }
    });

    if($("#new_comment").length){
        var new_comment = $("#new_comment");
        new_comment.validate({
            rules : {
                content : {required : true, minlength: 2, maxlength: 1000}
            }
        });
    }

    var feedForm = $("#feedback_form");
    feedForm.validate({
        submitHandler: function() {
            feedForm.find("[type=submit]").prop("disabled", true);
            feedForm.ajaxSubmit(function(data){
                feedForm.find("[type=submit]").prop("disabled", false);
                if (data.status == 'success'){
                    create("default", { title:'Внимание!', text:"Сообщение успешно отправлено!"}, {expires: 3000})
                } else {
                    create("default", { title:'Внимание!', text:"Ошибка."}, {expires: 3000})
                }
                feedForm.find("input[type=text], textarea").val("");
            });
        }
    });


    jQuery.extend(jQuery.validator.messages, {
        required: "Это поле необходимо заполнить",
        remote: "Этот e-mail уже есть в системе",
        email: "Введите правильный email адрес",
        url: "Введите верный URL",
        date: "Введите правильную дату",
        dateISO: "Введите правильную дату",
        number: "Введите число",
        digits: "Введите только цифры",
        creditcard: "Введите правильный номер вашей кредитной карты",
        equalTo: "Повторите ввод значения еще раз",
        accept: "Пожалуйста, введите значение с правильным расширением",
        maxlength: jQuery.format("Нельзя вводить более {0} символов"),
        minlength: jQuery.format("Должно быть не менее {0} символов"),
        rangelength: jQuery.format("Введите от {0} до {1} символов"),
        range: jQuery.format("Введите число от {0} до {1}"),
        max: jQuery.format("Введите число меньше или равное {0}"),
        min: jQuery.format("Введите число больше или равное {0}")
    });

    $('input, textarea').placeholder();

    $('.js-scrollTop').on('click', function() {
        var duration = 400,
            top = $(this).scrollTop();
        ( top < 1200 ) ? duration = 500 :
            ( top < 1800 ) ? duration = 600 :
                ( top < 2500 ) ? duration = 700 : duration = 800;
        $('body, html').animate({scrollTop: 0}, duration);
        return false;
    });
});
