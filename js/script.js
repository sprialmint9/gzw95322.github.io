$(function () {
  var scrolling = false;
  $(window).scroll(function () {
    if (!scrolling) {
      var sd = $(window).scrollTop();
      if (sd > 240) {
        $("#backtotop").removeClass('pullback').addClass('pullTop');
        $("#header").removeClass('pullTop').addClass('static-top pullTop');
        $("#article").css({ 'margin-top': 220 });
      } else {
        $("#backtotop").addClass('pullback').removeClass('pullTop');
        $("#header").removeClass('static-top pullTop');
        $("#header nav").removeClass('n-show');
        $("#article").css({ 'margin-top': 0 });
      }
    }
  });
  setTimeout(function () {
    return;
    $(".header-bg").addClass("active");
  }, 1000);
  $('#backtotop').click(function () {
    scrolling = true;
    $('html, body').animate({
      scrollTop: 0
    }, 500, function () {
      scrolling = false;
      $('#backtotop').addClass('pullback').removeClass('pullTop');
      $("#header").removeClass('static-top pullTop');
      $("#article").css({ 'margin-top': 0 });
    });
  });
  var nav_toggle = true;
  $('.nav-toggle').click(function () {
    var nav = $('.static-top nav');
    if (nav_toggle) {
      nav.addClass('n-show');
    } else {
      nav.removeClass('n-show');
    }
    nav_toggle = !nav_toggle;
  });
  var items = document.querySelectorAll('section');
  show(0);
  function show(index) {
    if (index >= items.length) {
      return;
    }
    setTimeout(function () {
      items[index].classList.add('active');
      show(index + 1);
    }, 100);
  }


  if (window.location.pathname == '/life/') {
    var waterfall = $('#waterfall');
    var itemss;
    // 数据加载
    axios.get('./data2.json')
      .then(function (response) {
        // console.log(response.data);
        var tpl = "";
        for (var k in response.data) {
          tpl += '<a class="item" href="' +
            response.data[k].url + '" data-fancybox="gallery" data-caption="Caption for single image"><img src="' +
            response.data[k].url + '"><div class="item-time">' +
            response.data[k].content + '<br />' + moment(response.data[k].time).format('MMM Do YY') + '</div></a>';
        }

        waterfall.html(tpl);
        itemss = $('.item');
        showss(0);
        itemss.click(function(e) {
          itemss.fancybox({});
        });
        function showss(index) {
          if (index >= itemss.length) {
            return;
          }
          setTimeout(function () {
            itemss.eq(index).addClass('active');
            showss(index + 1);
          }, 100);
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
});