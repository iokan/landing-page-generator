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

//шаг выбор вход/рестрация
$(".btn-step-choiсe").click(function () {
    if ($(this).hasClass('btn-sigh-up')) {
        $(".step-choiсe").addClass('hidden');
        $(".step-sigh-up").removeClass('hidden');
        $(".step-back").removeClass('hidden');
    }
    else if ($(this).hasClass('btn-sigh-in')){
        $(".step-choiсe").addClass('hidden');
        $(".step-sigh-in").removeClass('hidden');
        $(".step-back").removeClass('hidden');
    }
});

//шаг регистрация

//шаг вход

//шаг назад
$(".step-back").click(function () {
    $(this).addClass('hidden');
    $(".step-choiсe").removeClass('hidden');
    $(".step-sigh-up").addClass('hidden');
    $(".step-sigh-in").addClass('hidden');
});