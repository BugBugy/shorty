
$('.btn-shorten').on('click', function () {

    var longUrl = $('#url-box').val();
    if (isValidUrl(longUrl)) {
        $.ajax({
            url: '/api/shorten',
            type: 'POST',
            dataType: 'JSON',
            data: { url: $('#url-box').val() },
            success: function (data) {
                var resultHTML = '<a target="_blank" href="' + data.shortUrl + '">'
                    + data.shortUrl + '</a>';
                $('#short').html(resultHTML);
                $('#short').hide().fadeIn('slow');
            },
            error: function (xhr, ajaxOptions, thrownError) {
                alert(thrownError);
            }
        });
    }
    else
        alert('Please enter a valid url');
});

function isValidUrl(url) {
    var regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regexp.test(url);
}