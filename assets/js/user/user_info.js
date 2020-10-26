$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                //console.log(value.length)
                return 'Nickname Length Must between 1~6 digit!'
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('Failed to obtain User Information!')
                }
                //console.log(res)
                form.val('formUserInfo', res.data)
            }
        })
    }


    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('faild to update user information!')
                }
                layer.msg('Successfully updated user information!')
                //update user information of HI! Call index.js
                window.parent.getUserInfo()
            }
        })
    })

})