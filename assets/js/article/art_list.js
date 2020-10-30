$(function () {

    var form = layui.form
    var laypage = layui.laypage;
    //control time format
    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    //define a object
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }
    initTable()
    initCate()
    //obtain list data
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('Failed to get article list!')
                }
                //console.log(res)
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }


    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('Failed to obtain classification data!')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name=cate_id]').html(htmlStr)
                form.render()

            }
        })
    }

    $('#form_search').on('submit', function () {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',
            count: total,
            limit: q.pagesize,
            curr: q.pagenum,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 8, 10],
            jump: function (obj, first) {
                //console.log(obj.curr)
                //console.log(first)
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        })
    }

    $('tbody').on('click', '.btn-delete', function () {
        //console.log('ok')
        var len = $('.btn-delete').length
        var id = $(this).attr('data-id')

        layer.confirm('Are you sure you want to delete it?', { icon: 3, title: 'Warning' }, function (index) {

            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    //console.log(res)
                    if (res.status !== 0) {
                        return layui.layer.msg('failed to delete!')
                    }
                    layui.layer.msg('successfully deleted!')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }


                    initTable()
                }
            })
            layer.close(index);
        });
    })

    function getArticleInfo(a) {
        $.ajax({
            method: 'GET',
            url: '/my/article/' + a,
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('Faild to Load Article Infomation')
                }
                console.log(res)
            }
        })
    }

    $('tbody').on('click', '.btn-edit', function () {
        console.log('ok')
        var id = $(this).attr('data-id')
        console.log(id)
        getArticleInfo(id)
        location.href = '../../article/art_pub.html'
    })

})