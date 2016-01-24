$().ready(function () {
    console.log('123')
    $(document).on('click', '.link__book', function(e){
        e.preventDefault();
        $('.page__index').hide();
        $('.page__book').show();

    })

})