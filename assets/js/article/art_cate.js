$(function () {
  var layer = layui.layer
  var form = layui.form

  initArtCateList()

  // Get a list of article categories
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // Bind click event to add category button
  var indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: 'Add Article Category',
      content: $('#dialog-add').html()
    })
  })

  // Binding the submit event
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('Failed to add category!')
        }
        initArtCateList()
        layer.msg('Successfully added a category!')

        layer.close(indexAdd)
      }
    })
  })


  var indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {
    //modify article category layer
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: 'Modify Article Category',
      content: $('#dialog-edit').html()
    })

    var id = $(this).attr('data-id')
    // GET REQUEST
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('Failed to update classification!')
        }
        layer.msg('Successfully updated the classification！')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })


  $('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id')

    layer.confirm('confirm deletion?', { icon: 3, title: 'Warning' }, function (index) {
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('Failed to delete category!')
          }
          layer.msg('Delete category successfully!')
          layer.close(index)
          initArtCateList()
        }
      })
    })
  })
})
