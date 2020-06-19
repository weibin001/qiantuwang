$(window).scroll(function () {
  headerfix();
});

//轮播
(function () {
  let swiper = new $.swiper('#swiper', '.img-container', '.img-box');//实例化对象
  swiper.startplay();//调用对象方法
  let roll = [];
  $('.box-topic').each((index, data) => {
    roll[index] = new $.roll(data);			//实例化对象
    roll[index].bind();						//调用对象方法
  })
})();


//显示搜索结果
(function () {
  //载入页面时判断顶部导航栏状态
  headerfix();
  //顶部导航栏	
  $('.qt-header .search-wrap input').focus(function () {
    $('.qt-header .search-wrap').addClass('focus');
  });

  //搜索栏
  $('.qt-content .search-wrap input').focus(function () {
    $('.qt-content .search-wrap').addClass('focus');
  });
  //全局dom绑定鼠标抬起事件监听是否失去焦点
  $(document).on('mouseup', function (e) {
    if ($(e.target).is('.qt-header .search-wrap input')) {
      $('.qt-content .search-wrap').removeClass('focus');
    }
    else if ($(e.target).is('.qt-content .search-wrap input')) {
      $('.qt-header .search-wrap').removeClass('focus');
    } else {
      $('.qt-content .search-wrap').removeClass('focus');
      $('.qt-header .search-wrap').removeClass('focus');
    }
  })

  //搜索结果绑定点击事件
  $('.search-result').on('click', 'dl', function () {
    console.log($(this).html())
  })
})();



/*******设置顶部导航栏*******/
function headerfix() {
  if ($(window).scrollTop() > 180) {
    $(".qt-header").addClass('qt-header-fixed');
    $(".qt-header .qt-nav>.qt-nav-wrap:gt(1)").css({
      'display': 'none'
    });
  } else {
    if ($(".qt-header").hasClass('qt-header-fixed')) {
      $(".qt-header").removeClass('qt-header-fixed');
      $(".qt-header .qt-nav>.qt-nav-wrap:gt(1)").css({
        'display': 'inline-block'
      });
    }
  }
}
