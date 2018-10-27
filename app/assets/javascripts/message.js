$(function () {
    function buildHTML(message) {
        
        var insertImage = '';
        if (message.image.url) {
            insertImage = `<img src="${message.image.url}">`;
        }
        var html =
            `<div class="message" data-id="${message.id}">
                <div class="upper-message">
                    <div class="upper-message__user-name">
                        ${ message.name}
                    </div>
                    <div class="upper-message__date">
                        ${ message.date}
                    </div>
                </div>
                <div class="lower-meesage">
                    <p class="lower-message__content">
                        ${ message.content}
                    </p>
                    ${insertImage}
                </div>
            </div>`;
        return html;
    }
    function scroll_view() {
        $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight }, 500);
    }
    function form_reset() {
        $('#new_message')[0].reset();
    }

    var updateTime = 3000;
    setInterval(autoUpdate, updateTime);

    function autoUpdate() {
        var data = $('.message').last().data('id')
        var user_url = document.location.pathname;
        if (user_url.match(/messages/)) {
            $.ajax({
                type: 'GET',
                url: user_url,
                dataType: 'json',
                data: { data: data }
            })
            .done(function (json) {
                var insertHTML = '';
                if (json.messages.length !== 0) {
                    json.messages.forEach(function(message) {
                        insertHTML += buildHTML(message);                     
                    });
                }    
                $('.messages').append(insertHTML);
                form_reset();                     
                scroll_view();
            })
            
            .fail(function () {
                alert('自動更新に失敗しました');
            });
        }
    };

    $('#new_message').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        var url = $(this).attr("action");
        $.ajax({
            url: url,
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })

        .done(function (data) {
            var html = buildHTML(data);
            $('.messages').append(html);
            form_reset();
            scroll_view();
            $('#message_content').val("");
            $('.form__textfield').val('');
            $('.form__submit').prop('disabled', false);
            
        })
        .fail(function () {
            alert('error');
        });
    })
});