//Плавный скролл по якорям
$("body").on('click', '[href*="#"]', function (e) {
    var fixed_offset = 0;
    $('html,body').stop().animate({scrollTop: $(this.hash).offset().top - fixed_offset}, 500);
    e.preventDefault();
});

//при перезагрузки страницы переместить в самый верх
$(document).ready(function(){
    setTimeout(function(){
        window.scrollTo(0, 0);
    });
});

//добавление классов при скроле
$(window).scroll(function () {
    var winTarget = ($(window).height())/3,
        position = $(window).scrollTop() + winTarget,
        anchor1 = $('#menu1').offset().top,
        anchor2 = $('#menu2').offset().top ,
        anchor3 = $('#menu3').offset().top,
        anchor4 = $('#menu4').offset().top,
        anchor5 = $('.header-end').offset().top,
        anchor6 = $('#our-houxs').offset().top,
        positionNav = $(window).scrollTop(),
        positionBottom = $(window).scrollTop() + ($(window).height());

    if (position >= anchor1 && position < anchor2) {
        $('.target-1').addClass('active');
    } else {
        $('.target-1').removeClass('active');
    }

    if (position > anchor2 && position < anchor3) {
        $('.target-2').addClass('active');
        $('.completed').addClass('seal');
    } else {
        $('.target-2').removeClass('active');
    }

    if (position > anchor3 && position < anchor4) {
        $('.target-3').addClass('active');
    } else {
        $('.target-3').removeClass('active');
    }

    if (position > anchor4 && positionBottom < anchor6) {
        $('.target-4').addClass('active');
    } else {
        $('.target-4').removeClass('active');
    }

    if (positionNav >= anchor5) {
        $('.nav_2').addClass('right');
    } else {
        $('.nav_2').removeClass('right');
    }
});