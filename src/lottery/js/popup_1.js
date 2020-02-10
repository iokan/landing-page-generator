$( document ).ready(function() {
    $("body").css("overflow", "hidden");
    $('.popup_1').addClass('visible');
});

$(".continue").click(function () {
    event.preventDefault()
    $("body").css("overflow", "auto");
    $('.popup_1').removeClass('visible');
    $('.nav_2').addClass('visible')
});

$(".ava-block").click(function () {
    if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $('.select-ava').removeClass('visible')
    }

    else {
        $(this).addClass('active');
        $('.select-ava').addClass('visible')
    }
});

$(".select-ava").find('img').click(function () {
    var srcImg = $(this).attr('src');
    $('.ava').attr('src', srcImg);
});
