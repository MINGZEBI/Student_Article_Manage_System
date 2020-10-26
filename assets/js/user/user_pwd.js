$(function () {
    var form = layui.form
    form.verify({
        pwd: [/^[\S]{6,12}$/, 'The password must be 6-12 digits without spaces'],
        samePwd: function (value) {
            if (value === $('[name=oldPwd]').val()) {
                return 'The old and new passwords cannot be the same!'
            }
        },
        rePwd: function (value) {
            if (value !== $('[name=newPwd]').val()) {
                //console.log(value)
                //console.log($('[name=newPwd]').val())
                return 'The two passwords entered are inconsistent!'
            }
        }
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('Failed to Update Password! Please Try Again Later!')
                }
                layui.layer.msg('Password Updated Successfully')
                $('.layui-form')[0].reset()
            }

        })
    })
})