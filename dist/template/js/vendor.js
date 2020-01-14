var comment = new Vue ({
    el: '#app',
    data: {
        title: 'hello'
    },
    methods:{

    }
});


//Плавный скролл по якорям
$("body").on('click', '[href*="#"]', function (e) {
    var fixed_offset = 50;
    $('html,body').stop().animate({scrollTop: $(this.hash).offset().top - fixed_offset}, 500);
    e.preventDefault();
});
//добавление классов при скроле
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.header').addClass('header-bg');
    } else {
        $('.header').removeClass('header-bg');
    }

    if ($(this).scrollTop() > 800) {
        $('.button-up').addClass('visible');
    } else {
        $('.button-up').removeClass('visible');
    }
});