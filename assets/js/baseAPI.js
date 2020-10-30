//Call this function to get the basic API interface url
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //set headers request
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.
            message === 'Failed') {
            //console.log(res.responseJSON.status)
            //console.log(res.responseJSON.message)
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})

