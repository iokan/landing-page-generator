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