;
(function() {
    console.log('login js')
    $('.submit').on('click', function() {
        $.ajax({
            type: "POST",
            url: "/api/user/signin.json",
            data: {
                name: $('[name="userName"]').val(),
                password: $('[name="password"]').val()
            },
            success: function(data) {
                console.log(data)
                if (data.success) {
                    window.location.href = '/home'
                    window.sessionStorage.setItem('user', JSON.stringify(data.data))
                }
            },
            error: function() { //请求失败
                console.log('请求失败');
            },
        });
    })
})()