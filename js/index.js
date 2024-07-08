$(document).ready(function () {
    
    $('.logo').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        return false;
      });

    /* 모바일 메뉴 버튼*/
    $('.mobile-menu-bar').on('click', function() {
        $(this).toggleClass('active');
    });


    /* 스킬 탭버튼 */
    $('#toggle-on').on('click', tabmenu1);
    function tabmenu1() {
        $('.languages').show();
        $('.tools').hide();
    }

    $('#toggle-off').on('click', tabmenu2);
    function tabmenu2() {
        $('.languages').hide();
        $('.tools').show();
    }


    /* 스킬 툴팁 */
    $('.skill-icon').mouseenter(function () {
        const toolname = $(this).data('name');
        const widthPercentage = $(this).data('width');
        const text = $(this).data('text');
        const tooltip = $('.tooltip');
    
        tooltip.show();
        
        $('.toolname').text(toolname);
    
        $('.loading-bar').css('width', '0%').animate({
          width: widthPercentage + '%'
        }, {
          duration: 200,
          easing: 'linear',
          step: function(now) {
            $('.per-text').text(Math.round(now) + '%');
          }
        });
    
        $('.tool-text').text(text);
      }).mouseleave(function() {
        const tooltip = $('.tooltip');
        tooltip.hide();
        $('.loading-bar').stop().css('width', '0%');
        $('.per-text').text('0%');
      });

});
