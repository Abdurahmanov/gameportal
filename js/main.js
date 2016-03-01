$(document).ready(function() {

  $("#owl-carousel").owlCarousel({

      navigation : true, // Show next and prev buttons
      slideSpeed : 1000,
      paginationSpeed : 1000,
      singleItem:true,
      autoPlay: 6000,

      // "singleItem:true" is a shortcut for:
      // items : 1,
      // itemsDesktop : false,
      // itemsDesktopSmall : false,
      // itemsTablet: false,
      // itemsMobile : false
      afterMove: function(){
          $('.carousel__choice_item').removeClass('carousel__choice_item_active');
          $('.carousel__choice_item:eq(' + this.currentItem + ')').addClass('carousel__choice_item_active');
      }

  });

    $('.carousel__choice_item').on('click', function(event){
        event.preventDefault();
        owl = $('#owl-carousel').data('owlCarousel')
        owl.goTo($(this).index());
    })

    $(".modalbox").fancybox();
    $('.fun-container').wookmark({
        align: "left",
        offset: 32,
    });


    $("#modal-login__form").validate({
        rules:{
             modal_email:{
                 required: true,
                 email: true,
             },
            modal_password:{
                required: true,
                minlength: 5
             },

        },

        messages:{
            modal_email:{
                 required: "Это поле обязательно для заполнения",
             },
            modal_password:{
                 required: "Это поле обязательно для заполнения",
             },

        },
        submitHandler: function(){
            return false;
        }
    });

    $("#comment-form").validate({
        rules:{
             comment_field:{
                 required: true,
             },

        },

        messages:{
            comment_field:{
                 required: "Это поле обязательно для заполнения",
             },

        },
        submitHandler: function(){
            return false;
        }
    });

    $("#modal-forgot-password__form").validate({
        rules:{
             modal_email:{
                 required: true,
                 email: true,
             },

        },

        messages:{
            modal_email:{
                 required: "Это поле обязательно для заполнения",
             },

        },
        submitHandler: function(){
            return false;
        }
    });

    $("#modal-reg__form").validate({
        rules:{
             modal_email:{
                 required: true,
                 email: true,
             },
            modal_password:{
                required: true,
                minlength: 5
             },
            modal_password_again:{
                equalTo: "#modal_password"
             },

        },

        messages:{
            modal_email:{
                 required: "Это поле обязательно для заполнения",
             },
            modal_password:{
                 required: "Это поле обязательно для заполнения",
             },

        },
        submitHandler: function(){
            return false;
        }
    });

    $("#modal-feedback__form").validate({
        rules:{
             modal_email:{
                 required: true,
                 email: true,
             },
            modal_name:{
                 required: true,
             },
            modal_textarea:{
                 required: true,
             },

        },

        messages:{
            modal_email:{
                 required: "Это поле обязательно для заполнения",
             },
            modal_name:{
                 required: "Это поле обязательно для заполнения",
             },
            modal_textarea:{
                 required: "Это поле обязательно для заполнения",
             },

        },
        submitHandler: function(){
            return false;
        }
    });

});
