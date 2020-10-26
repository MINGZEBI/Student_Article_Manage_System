$(function () {
    getUserInfo()

    $('#btnLogout').on('click', function () {
        layer.confirm('Are you sure you want to quit?', { icon: 3, title: 'Warning' },
            function (index) {
                //clear token
                //back to login
                localStorage.removeItem('token')
                location.href = '/login.html'
                //close
                layer.close(index);
            });
    })
})


function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        //headers: {
        //    Authorization: localStorage.getItem('token') || ''
        //},
        success: function (res) {
            if (res.status !== 0) {
                console.log(res.status)
                return layui.layer.msg('Failed to obtain user information', { icon: 2 })
            }
            renderAvatar(res.data)
        }
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.
        //         message === '身份认证失败！') {
        //         //console.log(res.responseJSON.status)
        //         //console.log(res.responseJSON.message)
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }

    })
}

function renderAvatar(user) {
    var name = user.nickname || user.username
    $('#welcome').html('Hi!&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}