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