$().ready(function () {
    $(document).on('click', '.link__book', function (e) {
        e.preventDefault();
        $('.page__index').hide();
        $('.page__book').show();

    })

    $('.book__cover').mousemove(function (e) {
        var area = 330;
        var posPixelY = $('.book__eye').position().top + ($('.book__eye').height() / 2) + 360;
        var posPixelX = $('.book__eye').position().left + ($('.book__eye').width() / 2) + 420;
        var topVal = (-1) * ((posPixelY - e.pageY) / (area / 100));
        var leftVal = (-1) * ((posPixelX - e.pageX) / (area / 100));
        $('.book__eye .pixel').css({top: topVal, left: leftVal});
    })
})