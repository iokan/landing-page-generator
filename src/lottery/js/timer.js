$('.countdown').downCount({
    date: '03/01/2020 12:00:00',
    offset: +10
}, function () {
    alert('Розыгрыш завершён!');
});