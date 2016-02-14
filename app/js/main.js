window.addEventListener('load', function () {

    window.addEventListener('mousemove', function (e) {
        var pix = document.getElementsByClassName('pixel')[0];
        if (pix) {
            var heightEye = $('.book__eye').height();
            var widthEye = $('.book__eye').width();
            var stepY = document.documentElement.clientHeight / heightEye;
            var newPosY = (e.clientY / stepY) - (heightEye / 2);
            var stepX = document.documentElement.clientWidth / widthEye;
            var newPosX = (e.clientX / stepX) - (widthEye / 2);
            $('.book__eye .pixel').css({top: newPosY, left: newPosX});
        }
    })
})

