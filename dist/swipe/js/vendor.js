//выезжание хедера
$(".burger").click(function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('header').removeClass('header-in');
    } else {
        $(this).addClass('active');
        $('header').addClass('header-in');
    }
});
//показ и скрытие popup окна по клику
$(".btn-entrance").click(function () {
    if ($('.popup-entrance').hasClass('active')) {
        $("body").css("overflow", "auto");
        $('.popup-entrance').removeClass('active');
    } else {
        $("body").css("overflow", "hidden");
        $('.popup-entrance').addClass('active');
    }
});

//скрытие popup окна при клике на категории
$(".nav-item").click(function () {
    $("body").css("overflow", "auto");
    $('.popup-entrance').removeClass('active');
});

//кнопка вперед
$(".close-popap").click(function () {
    $("body").css("overflow", "auto");
    $('.popup-entrance').removeClass('active');
});

//шаг выбор вход/рестрация
$(".btn-step-choiсe").click(function () {
    if ($(this).hasClass('btn-sigh-up')) {
        $(".step-sigh-up").removeClass('hidden');
    }
    else if ($(this).hasClass('btn-sigh-in')){
        $(".step-sigh-in").removeClass('hidden');
    }
    $(".step-choiсe").addClass('hidden');
    $(".step-back").removeClass('hidden');
});

//кнопка назад
$(".step-back").click(function () {
    $(this).addClass('hidden');
    $(".step-choiсe").removeClass('hidden');
    $(".step-sigh-up").addClass('hidden');
    $(".step-sigh-in").addClass('hidden');
});