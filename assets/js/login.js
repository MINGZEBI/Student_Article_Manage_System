//API: address: https://www.showdoc.cc/escook?page_id=3707158761215217
$(function () {
    //click to sign up
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //click to sign in
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //get form object from Layui
    var form = layui.form
    var layer = layui.layer
    // form.verify() supported by layui
    form.verify({
        pwd: [/^[\S]{6,12}$/, 'The password must be 6-12 digits without spaces'],
        // judge whether the passwords are same
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()

            //console.log(pwd)
            if (pwd !== value) {
                return 'The two passwords entered are inconsistent!'
            }
        }
    })

    //Monitor the submission event of the registration form 
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg('Sorry, this username is already taken', { icon: 7 })
            }
            layer.msg('Registration Success! Login Now', { icon: 6 })
            //automatically jump
            $('#link_login').click()
        })
    })
    //Monitor the submission event of the login form 
    $('#form_login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('Login failed', { icon: 2 })
                }
                layer.msg('login successful', { icon: 1 })
                //console.log(res.token)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})

