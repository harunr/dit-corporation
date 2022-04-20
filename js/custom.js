var a = 0;

if ($('.fixme').length > 0) {
  var fixmeTop = $('.fixme').offset().top;
}
function socialMessagehide() {
  if ($('.social_icon_fixed').length > 0) {
    var scrollTop = $('.social_icon_fixed').offset().top;
  }
  if ($('.floating_contact').length > 0) {
    var scb = scrollTop + $('.social_icon_fixed').outerHeight();
    elementOffset = $('.floating_contact').offset().top;
    var distance = (elementOffset - scb);
    if (distance < 80) {
      $('.fixme').removeClass('animated messageIn');
      $('.fixme').addClass('animated messageOut');
    }
    else {
      $('.fixme').removeClass('animated messageOut');
      $('.fixme').addClass('animated messageIn');
    }
  }
}
$(window).scroll(function () {
  //fixed social icon
  var currentScroll = $(window).scrollTop() + 100;
  if (currentScroll >= fixmeTop) {
    $('.fixme').addClass('fixed');
    $('.fixme').css({
      position: 'fixed',
      top: '100'
    });
  } else {
    $('.fixme').removeClass('fixed');
    $('.fixme').css({
      position: 'absolute'
    });
  }
  $('.socialshow').each(function () {
    $(this).on('inview', function (event, isInView) {
      if (isInView) {
        //  console.log(isInView);
        $(this).addClass('inviewbanner');
        $('.fixed-csr-btn').removeClass('animated fadeIn');
        $('.fixed-csr-btn').addClass('animated fadeOut');
      } else {
        $(this).removeClass('inviewbanner');
        $('.fixme').removeClass('fadeOut');
        $('.fixme').addClass('animated fadeIn');
        $('.fixed-csr-btn').removeClass('animated fadeOut');
        $('.fixed-csr-btn').addClass('animated fadeIn');

      }
    });
  });

  $('.summary-inview').on('inview', function (event, isInView) {
    if (isInView) {
      $(this).addClass('summary-view-in')
      $(this).removeClass('summary-view-out')
    } else {
      $(this).addClass('summary-view-out')
      $(this).removeClass('summary-view-in')
    }
  });
  socialMessagehide();
  if ($('.inviewbanner').length > 0) {
    $('.inviewbanner').each(function () {
      if ($('.social_icon_fixed').length > 0) {
        var scrollTop = $('.social_icon_fixed').offset().top;
      }
      var scb = scrollTop + $('.social_icon_fixed').outerHeight();
      elementOffset = $(this).offset().top;
      distance = (elementOffset - scb);
      if (distance < 144) {
        $('.fixme').removeClass('fadeIn');
        $('.fixme').addClass('animated fadeOut');
      }
      else {
        $('.fixme').removeClass('fadeOut');
        $('.fixme').addClass('animated fadeIn');

      }
    });
  }
  if ($('#scrollCountholder').length) {
    var oTop = $('#scrollCountholder').offset().top - window.innerHeight;
    if (a == 0 && $(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        },

          {

            duration: 2000,
            easing: 'swing',
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
              //alert('finished');
            }

          });
      });
      a = 1;
    }
  }
});

// Footer Set Clock hand Function
function tick(currentHour, currentMin) {
  const date = new Date();

  // seconds
  let seconds = date.getSeconds();
  const seconds_Deg = (seconds / 60) * 360 + 90;
  $('.hand.second').css({ "transform": `translateY(-50%) rotate(${seconds_Deg}deg)` });

  // minutes
  let minutes = currentMin;
  const minute_Deg = (minutes / 60) * 360 + (seconds / 60) * 6 + 90;
  $('.hand.minute').css({ "transform": `translateY(-50%) rotate(${minute_Deg}deg)` });

  // minutes
  let hours = currentHour;
  const hour_Deg = (hours / 12) * 360 + (hours / 60) * 30 + 90;
  $('.hand.hour').css({ "transform": `translateY(-50%) rotate(${hour_Deg}deg)` });
}
//Text Fade function
function textFade() {
  var textHeight = ($('.text_fade').height());
  var textHeighthalf = textHeight / 2;
  if ($('.text_fade').length > 0) {
    var wheight = $('.text_fade').offset().top - textHeighthalf;
    $('.text_fade').scrollFadeOut(textHeight, wheight);
  }
}
//contact tab slick slider
function runSlickTabContent() {
  var tabContent = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    asNavFor: '.contact_tabs ul',
    mobileFirst: 'true',
    fade: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 767,
        settings: 'unslick'
      }
    ]
  };
  $('.tab-content-contact').not('.slick-initialized').slick(tabContent);
}
function runSlickTab() {
  var contact_tab = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: 0,
    variableWidth: true,
    mobileFirst: 'true',
    asNavFor: '.tab-content-contact',
    responsive: [
      {
        breakpoint: 767,
        settings: 'unslick'
      }
    ]
  };
  $('.contact_tabs ul').not('.slick-initialized').slick(contact_tab);
}
//header width
function headerWidth() {
  var minWidth = $(window).width();
  if (minWidth > 767) {
    if ($('.service-page').length > 0) {
      $('.service-page').addClass('header-white header-white-bg');
      $('.service-page .header_content').addClass('white_header_content');
      //header_content white_header_content
    }
  }
  else {
    if ($('.service-page').length > 0) {
      $('.service-page').removeClass('header-white header-white-bg');
      $('.service-page .header_content').removeClass('white_header_content');
      //header_content white_header_content
    }
  }
}
// srHeroText
function srHeroText() {
  var stnu = 16;
  if ($('.service_hero_short_text').length > 0) {
    console.log("ff");
    stnu = 20;
  }
  var hText = $('.srv-hero-text').width() - stnu;
  var hTextInner = $('.service_hero h1').width();
  //console.log(hText);
  $('.textWrap').css('width', hText);
  $('.textSplit').css('width', hTextInner);

}
//parallax effect
function parallaxEffect() {
  var width = $(window).width();
  if (width < 767) {
    if ($('.jarallax').length > 0) {
      $('.jarallax').jarallax({
        imgPosition: 'auto'

      });
    }
  }
}
//ol li count 
function lineCount() {
  var num_cols = 2,
    container = $('.what-we-do ol'),
    listItem = 'li',
    listClass = 'col-wrap ';

  container.each(function () {
    var items_per_col = new Array(),
      items = $(this).find(listItem),
      min_items_per_col = Math.floor(items.length / num_cols),
      difference = items.length - (min_items_per_col * num_cols);
    for (var i = 0; i < num_cols; i++) {
      if (i < difference) {
        items_per_col[i] = min_items_per_col + 1;
      } else {
        items_per_col[i] = min_items_per_col;
      }
    }
    for (var i = 0; i < num_cols; i++) {
      $('.col-wrap .col-wrap').parent('.col-wrap').remove();
      $(this).append($('<ol class="col-sm-12 col-md-6"></ol>').addClass(listClass));
      for (var j = 0; j < items_per_col[i]; j++) {
        var pointer = 0;
        for (var k = 0; k < i; k++) {
          pointer += items_per_col[k];
        }

        $(this).find('.' + listClass).last().append(items[j + pointer]);

      }
    }
    for (var j = 1; j <= items.length; j++) {
      var zero;
      if (j <= 9) {
        zero = 0;
      }
      else {
        zero = '';
      }
      $(items[j - 1]).prepend($('<span class="counter">' + zero + j + '</span>'));
    }

  });

  $('.goal_settings.what-we-do').find('.col-wrap li').unwrap();
};

//account landing slider 
//service slider
function mainserviceSlide() {
  if ($('.slider-2').length > 0) {
    $('.slider-2').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      asNavFor: '.slider-nav-2',
      fade: true,
      arrows: false,
    });
  }
  if ($('.slider-nav-2').length > 0) {
    $('.slider-nav-2').on('afterChange init', function (event, slick, direction) {
      slick.$slides.removeClass('prevdiv').removeClass('nextdiv');
      for (var i = 0; i < slick.$slides.length; i++) {
        var $slide = $(slick.$slides[i]);
        if ($slide.hasClass('slick-current')) {
          $slide.prev().addClass('prevdiv');
          $slide.next().addClass('nextdiv');
          break;
        }
      }
    }
    );

    $('.slider-nav-2').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      asNavFor: '.slider-2',
      arrows: false,
      dots: false,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: '100px',
      vertical: true,
      verticalSwiping: true,
      adaptiveHeight: true

    });
    $('.slider-nav-2').on('beforeChange', function (event, slick) {
      slick.$slides.removeClass('prevdiv').removeClass('nextdiv');
    });

    $('.slider-nav-2').on('setPosition', function () {
      var maxHeight = 0;
      $(this).find(".slick-slide .slide-link").each(function () {
        if ($(this).outerHeight() > maxHeight) { maxHeight = $(this).outerHeight(); }
      });
      $(this).find(".slick-slide .slide-link").height(maxHeight);
    });
  }
}
$(document).ready(function () {

  // $('.ci-image-wrapper').hover(function () {
  //   var currentEle = $(this)[0].classList[0];
  //   $('.'+currentEle + ' > img').addClass('transition');
  // }, function() {
  //     $('.'+currentEle + ' > img').removeClass('transition');
  // });

  /*********************** hover effect on floating icons */
  $('.floating_contact').hover(function () {
    $('.floating_contact').toggleClass('box-shadow')
  })
  $('.scroll_to_top').hover(function () {
    $('.scroll_to_top').toggleClass('box-shadow')
  })
  /******************************hover effect on floating icons ends here */

  //$('.select').selectize(options);
  var advSelects = document.getElementsByClassName('fp-advanced-select');
  for (var i = advSelects.length - 1; i >= 0; i--) {
    var $select = $(advSelects[i]);
    (function ($el) {
      var $label = $el.prev();
      $el.selectize({
        // implement label magic for selectize
        onFocus: function () {
          $label.addClass('fp-floating-label--focused');
        },
        onBlur: function () {
          $label.removeClass('fp-floating-label--focused');
        },
        onChange: function (value) {
          value = value.trim();
          if (value) {
            $label.addClass('fp-floating-label--valued');
          } else {
            $label.removeClass('fp-floating-label--valued');
          }
        }
      });
    })($select);
  }
  //contact tabs slider
  if ($('.contact_tabs ul').length > 0 && $('.contact_tabs ul li').length > 1) {
    runSlickTab();
  }
  if ($('.tab-content-contact').length > 0 && $('.contact_tabs ul li').length > 1) {
    runSlickTabContent();
  }

  //account landing slider
  mainserviceSlide();

  // Header var
  const body = document.body;
  const scrollUp = "scroll-up";
  const scrollDown = "scroll-down";
  let lastScroll = 0;

  // Mouse Poisition Pointer Start
  var xMousePos = 0;
  var yMousePos = 0;
  var lastScrolledLeft = 0;
  var lastScrolledTop = 0;

  if ($('.summary_content').length > 0) {
    var summaryTop = $('.summary_content').offset().top, $window = $(window);
    var summaryTopDis = summaryTop - $window.scrollTop();
  }

  $(document).mousemove(function (event) {
    captureMousePosition(event);
  });

  function captureMousePosition(event) {
    const cursor = document.querySelector('.cursor');
    var isHovered = $('.hover_ele:hover');
    if (isHovered.length) {
      xMousePos = event.pageX - 50;
      yMousePos = event.pageY - 50;
      cursor.setAttribute('style', `transform: translate(${xMousePos}px, ${yMousePos}px);`);
    }
    else {
      xMousePos = event.pageX;
      yMousePos = event.pageY;
      cursor.setAttribute('style', `transform: translate(${xMousePos}px, ${yMousePos}px);`);
      $('.cursor span').text('');
    }
  }

  // Mouse Position Pointer End

  $(window).scroll(function () {
    if (lastScrolledLeft != $(document).scrollLeft()) {
      xMousePos -= lastScrolledLeft;
      lastScrolledLeft = $(document).scrollLeft();
      xMousePos += lastScrolledLeft;
    }
    if (lastScrolledTop != $(document).scrollTop()) {
      yMousePos -= lastScrolledTop;
      lastScrolledTop = $(document).scrollTop();
      yMousePos += lastScrolledTop;
    }

    if (summaryTopDis < 100) {
      $('.summary_content_header').css({ 'position': 'fixed', 'animation': 'topanimation 1s' });
    }
    else {
      $('.summary_content_header').css({ 'position': 'static', 'animation': '' });
    }

    // Header
    const currentScroll = window.pageYOffset;
    if (currentScroll == 0) {
      body.classList.remove(scrollUp);
      body.classList.add('header-white-bg');
      return;
    }
    if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
      // down
      body.classList.remove(scrollUp);
      body.classList.add(scrollDown);
      body.classList.remove('header-white-bg');
    } else if (currentScroll < lastScroll && body.classList.contains(scrollDown)) {
      if ($('body').hasClass('summaryDetails') && currentScroll < 400) {
        // up
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
      }
      else if (!$('body').hasClass('summaryDetails')) {
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
      }
    }

    lastScroll = currentScroll;

    clearTimeout($.data(this, 'scrollTimer'));
    var scroll = $(window).scrollTop();
    $.data(this, 'scrollTimer', setTimeout(function () {
      $('.dropdown').removeClass('show');
      $('.dropdown-menu').removeClass('show')
      if (scroll > 250) {
        $(".header_content").addClass("stickyHeaderColor");
        $(".header_content").removeClass("stickyHeaderTrans");
      }
      else {
        if ($("body").hasClass("header-white")) {
          setTimeout(function () {
            $(".header_content").addClass("stickyHeaderColor");
            $(".header_content").removeClass("stickyHeaderTrans");
          }, 10);
        }
        else {
          setTimeout(function () {
            $(".header_content").removeClass("stickyHeaderColor");
            $(".header_content").addClass("stickyHeaderTrans");
          }, 10);
        }
      }
    }, 10));

    var scrollDistance = $(window).scrollTop();
    // Assign active class to nav links while scolling
    $('.common-scroll-top').each(function (i) {
      if ($(this).position().top <= scrollDistance) {
        $('.summary_list li.active-head').removeClass('active-head');
        $('.summary_list li').eq(i).addClass('active-head');
      }
    });

  });

  // Mobile Toggle
  $('.mobile_nav_icon').click(function () {
    $(this).toggleClass('close_icon');
    $('.mobile_nav').toggleClass('mobile_nav_visible');
    $('.header_content').toggleClass('header_content_mobile');
    $('body').toggleClass('bodyoverflow');
    $('body').toggleClass('main_nav_open');
  });

  // Pointer Hover
  $('.hover_ele').on("mouseenter", function (event) {
    $('.cursor').addClass('hover');
    var hovertext = $(this).attr("hovertext");
    if ($(this).hasClass('slick-custom-left')) {
      $('.cursor').addClass('slick-left-arrow');
      $('.cursor').removeClass('slick-right-arrow');
    }
    else if ($(this).hasClass('slick-custom-right')) {
      $('.cursor').removeClass('slick-left-arrow');
      $('.cursor').addClass('slick-right-arrow');
    }
    setTimeout(function () {
      $('.cursor span').text(hovertext);
    }, 100);
  }).on("mouseleave", function () {
    $('.hover_ele').css('style', 'transform: translate(0, 0);');
    $('.cursor').removeClass('hover');
    $('.cursor span').text('');
    $('.cursor').removeClass('slick-left-arrow');
    $('.cursor').removeClass('slick-right-arrow');
  });

  if ($(".home_slider, .image_slider")[0]) {
    // Home Slider 
    $('.home_slider').slick({
      draggable: true,
      arrows: false,
      dots: false,
      fade: true,
      speed: 900,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: false,
    }).slickAnimation();

    // offices Slider 
    if ($('.image_slider .image_slide').length > 1) {
      $('.image_slider').slick({
        autoplay: true,
        speed: 900,
        autoplaySpeed: 4000,
        infinite: true,
        arrows: true,
        prevArrow: $(".slick-custom-left"),
        nextArrow: $(".slick-custom-right"),
        dots: true,
      }).slickAnimation();
    }
    else {
      $('.slick-custom-left').hide();
      $('.slick-custom-right').hide();
    }
  }

  // Top To Bottom
  flag = 1
  $(".scroll_to_top, .floating_contact").click(function () {
    if (flag === 1) {
      $('html, body').animate({
        scrollTop: $("#scrollToBottom").offset().top
      }, {
        duration: 2000,
        complete: function () {
          // $('.scroll_to_top').fadeIn('1000');
        }
      });
      // $('.floating_contact').fadeOut('1000');
      // $('.copyright').fadeIn();
      // $('.copyright_right').fadeOut();
      flag = 0
    }
    else {
      $('html, body').animate({
        scrollTop: $("#scrollToTop").offset().top
      }, {
        duration: 2000,
        complete: function () {
          // $('.floating_contact').fadeIn('1000');
        }
      });
      flag = 1
      // $('.scroll_to_top').fadeOut();
      // $('.copyright').fadeOut();
      // $('.copyright_right').fadeIn();
    }
  });

  // Footer Clock
  $('.clock-center-btn').click(function () {
    var currentHour = $(this).parent().attr("hour");
    var currentMin = $(this).parent().attr("min");
    tick(currentHour, currentMin);
    var self = this
    //setTimeout(function () {
    $('.clock-center-btn').fadeIn();
    $(self).fadeOut();
    //}, 10);
    $('.wrap').removeClass('active-clock');
    $(this).parent().addClass('active-clock');
    $('.office_Add').fadeOut('1000');
    $(this).parent().next().fadeIn('1000');
  });

  // Active head summary
  // $('.summary_list li').click(function () {
  //   $('.summary_list li').removeClass('active-head');
  //   $(this).addClass('active-head-check');
  // })

  // Count Who we are
  $('.count').each(function () {
    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, {
      duration: 2000,
      easing: 'swing',
      step: function (now) {
        $(this).text(Math.ceil(now));
      }
    });
  });


  function countOnScroll() {
    $('.scrollcount').each(function () {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 2000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
  }

  $(window).scroll(function () {
    let windowPosition = $(this).scrollTop();

    // if (windowPosition > 50) {
    //   $('header .header_content').removeClass('nobg');
    // }
    // else if (windowPosition == 0) {
    //   $('header .header_content').addClass('nobg');
    // }

    if (windowPosition >= 300) {
      var step = +5;
      for (var i = 300; i >= 60; i--) {
        $("#upperdiv").stop().animate({ "marginTop": -i + "px" }, "slow");
      }
    } else if (windowPosition <= 300) {
      $("#upperdiv").stop().animate({ "marginTop": -300 + "px" }, "slow");
    }
  });

  // CTA Button Animation

  // $(".common_cta_inner").hover(function () {
  //   $(this).find('.cmn_link').toggleClass("hover_cta");
  //   var width = $(this).find('a span').width();
  //   $(this).find('.cmn_link').css({ 'width': `${width + 120 + 'px'}` });
  //   if (width < 70) {
  //     $(this).find('.cmn_link span').css('width', '75px');
  //   }
  // });

  $(".cmn-link-con").hover(function () {
    var width = $(this).find('.cta-text').width();
    $(this).find('.cta-arrow-icon').css('left', width + 25 + 'px');
  });

  $(".cmn-link-con").mouseleave(function () {
    $(this).find('.cta-arrow-icon').css('left', 1 + 'px')
  });

  // $(".common_cta_inner").mouseleave(function () {
  //   $(this).find('.cmn_link').css({ 'width': '100%' });
  //   $(this).find('.cmn_link span').css({ 'width': 'auto' });
  // });

  // country selection
  $('.dropdown-item').click(function () {
    var gettext = $(this).text();
    $(this).parent().parent().find('span').text(gettext)
    //$('#countryDropDown span').text(gettext)
  });

  //Materialize Inputs
  if ($('.contact_form').length > 0) {
    $('.contact_form').materializeInputs();
  }

  //text fade function
  textFade();

  $('.showDomain').click(function () {
    var delay = 0;
    $(this).parent().next().fadeToggle();
    $(this).parent().parent().toggleClass('active-list');
    $(this).parent().next().find('li').each(function () {
      delay = delay + .3;
      $(this).css('animation', `bottomToTop ${delay}s`);
    });
  });

  $('#load-more').click(function () {
    $.ajax({
      url: "",
      method: "GET",
      success: function (data) {
        if (data != '') {
          $('.career-content').append(data);
        }
      }
    });
  });

  //our location slider
  if ($('.slick_for').length > 0) {
    var $slider1 = $('.slick_for').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      asNavFor: '.location_tab .tab_ul,.slick_for_loaction'
    });
  }
  if ($('.location_tab .tab_ul').length > 0) {
    var $slider = $('.location_tab .tab_ul').slick({
      slidesToShow: 3,
      slidesToScroll: 3,
      asNavFor: '.slick_for,.slick_for_loaction',
      dots: false,
      arrows: false,
      focusOnSelect: true,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            centerMode: true,
            mobileFirst: true,
            infinite: true
          }
        }
      ]
    });
  }
  if ($('.slick_for_loaction').length > 0) {
    var $slider2 = $('.slick_for_loaction').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      dots: false,
      fade: true,
      asNavFor: '.location_tab .tab_ul,.slick_for'
    });
  }
  //location dropdown
  $(".dropdown_location .dropdown-menu li a").click(function () {
    $('.selectedLi').removeClass('selectedLi');
    $(this).addClass('selectedLi');
    $(this).parents(".dropdown_location").find('.btn span').html($(this).text());
    $(this).parents(".dropdown_location").find('.btn span').val($(this).data('value'));

    var tab_id = $(this).attr('data-tab');
    //$(this).removeClass('selectedLi');
    $('.slick_for').removeClass('current');
    $('.locAdd').removeClass('current');
    $(this).addClass('current');
    $("." + tab_id).addClass('current');
    $("." + tab_id).get(0).slick.setPosition();
    $("." + tab_id).find('.slick_for_loaction').get(0).slick.setPosition();
    $("." + tab_id).find('.location_tab .tab_ul').get(0).slick.setPosition();

    $slider.slick('slickGoTo', 0);
    $slider1.slick('slickGoTo', 0);
    $slider2.slick('slickGoTo', 0);

  });

  //custom tabs
  $(document).on('click', '.contact_tabs li a', function (e) {
    e.preventDefault();
  });

  $(document).on('click', '.contact_tabs li a', function () {
    var tabid = $(this).attr("href");
    $(".contact_tabs li a").removeClass("active");
    $(".tab-content-contact .tab-pane").removeClass("active show");   // removing active class from tab
    $(tabid).addClass("active show");
    $(this).addClass("active"); //  adding active class to clicked tab

  });

  //service header width
  //headerWidth();
  //service hero text width
  if ($('.srv-hero-text').length > 0) {
    srHeroText();
  }
  //vopacity
  if ($('.vopacity').length > 0) {
    $('.vopacity').vopacity(0.15, true);
  }
  //parallaxEffect
  parallaxEffect();

  //zoom effect
  if ($('.jarallax-effect').length > 0) {
    $('.jarallax-effect img').each(function () {
      $(this).on('inview', function (event, isInView) {
        if (isInView) {
          $(this).addClass('inview');
        } else {
          $(this).removeClass('inview');
        }
      });
    });
  }

  //linecount
  if ($('.what-we-do').length > 0) {
    lineCount();
  }

  $('.summary_list li a').bind('click', function (e) {
    e.preventDefault(); // prevent hard jump, the default behavior
    var target = $(this).attr("href"); // Set the target as variable
    // perform animated scrolling by getting top-position of target-element and set it as scroll target
    $('html, body').stop().animate({
      scrollTop: $(target).offset().top
    }, 600, function () {
      location.hash = target; //attach the hash (#jumptarget) to the pageurl
    });
    return false;
  });

  if ($('.summary_content_main_content').length > 0) {
    $(".summary_content_main_content > a").txtTruncate();
  }

  //csr button scroll
  $(".fixed-csr-btn span").click(function () {
    $('html,body').animate({
      scrollTop: $(".csr-page-right .contact_form").offset().top
    },
      'slow');
  });

  //Sharect config
  if ($('.texttwitterShare').length > 0) {
    Sharect.config({
      twitterUsername: 'estevanmaito',
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 478.165 478.165"><path d="M478.165 232.946c0 128.567-105.057 232.966-234.679 232.966-41.102 0-79.814-10.599-113.445-28.969L0 478.165l42.437-125.04c-21.438-35.065-33.77-76.207-33.77-120.159C8.667 104.34 113.763 0 243.485 0c129.623 0 234.68 104.34 234.68 232.946zM243.485 37.098c-108.802 0-197.422 87.803-197.422 195.868 0 42.915 13.986 82.603 37.576 114.879l-24.586 72.542 75.849-23.968c31.121 20.481 68.457 32.296 108.583 32.296 108.723 0 197.323-87.843 197.323-195.908 0-107.886-88.6-195.709-197.323-195.709zM361.931 286.62c-1.395-2.331-5.22-3.746-10.898-6.814-5.917-2.849-34.089-16.497-39.508-18.37-5.16-1.913-8.986-2.849-12.811 2.829-4.005 5.638-14.903 18.629-18.23 22.354-3.546 3.785-6.854 4.264-12.552 1.435-5.618-2.809-24.267-8.866-46.203-28.391-17.055-15.042-28.67-33.711-31.997-39.508-3.427-5.758-.398-8.826 2.471-11.635 2.69-2.59 5.778-6.734 8.627-10.041 2.969-3.287 3.905-5.638 5.798-9.424 1.913-3.905.936-7.192-.478-10.141-1.415-2.849-13.01-30.881-17.752-42.337-4.841-11.416-9.543-9.523-12.871-9.523-3.467 0-7.212-.478-11.117-.478-3.785 0-10.041 1.395-15.381 7.192-5.2 5.658-20.123 19.465-20.123 47.597 0 28.052 20.601 55.308 23.55 59.053 2.869 3.785 39.747 63.197 98.303 86.07 58.476 22.872 58.476 15.321 69.115 14.365 10.38-.956 34.069-13.867 38.811-27.096 4.66-13.45 4.66-24.766 3.246-27.137z"/></svg>',
      backgroundColor: '#1da1f2',
      facebook: false,
      selectableElements: ['.texttwitterShare']

    }).init();
  }

});

// First Time Clock Load
$(window).on('load', function () {
  $('#new-york-clock').addClass('active-clock');
  $('.active-clock').next().fadeIn('1000');
  var currentHour = $('.active-clock').attr("hour");
  var currentMin = $('.active-clock').attr("min");
  tick(currentHour, currentMin);

  /* Home Page Logo Duration */
  var delay = 0;
  $('.CL').each(function () {
    delay = delay + 150;
    $(this).attr('data-aos-duration', delay);
  });

});

tick();
setInterval(tick, 1000);



$('.domain_pro li a').click(function () {
  setTimeout(function () { dragSlide(); }, 500);
  //$(".viewslidecon_drag_con").css("left", '0');
  //$(".viewslidecon_drag").css("left", '0');
  var currenttext = $(this).text();
  var currentRemoveNum = currenttext.replace(/\d+/g, '');
  $('.showDomain').text(currentRemoveNum);
});

function dragSlide() {

  $(".drag_slide_content").each(function () {
    var viewportWidth = $(window).width();
    var slideCount = $(this).find('.show').find('.drag_slide').length;
    var initialize = $(this).find('.viewslidecon_drag').find('.ui-draggable').length;;
    console.log(initialize)
    if (slideCount === 1 && viewportWidth > 767) {
      $(this).find(".viewslidecon_drag.ui.draggable").draggable("destroy");
    }
    else if (viewportWidth > 767) {
      var slideWidth = $(this).find('.show').find('.drag_slide').width();
      var dragSlideWidth = slideWidth * slideCount + slideCount * 130;
      $(this).find('.drag_slide_con').css('width', dragSlideWidth - 130);
      $(this).find('.viewslidecon_drag').css('width', dragSlideWidth - 130);
      var dragContainerWidth = $(this).find(".viewslidecon").innerWidth() + ($('.viewslidecon_drag').outerWidth() - $(this).find(".viewslidecon").innerWidth()) * 2;
      $(this).find(".viewslidecon_drag_con").css("width", dragContainerWidth);

      //set up position of draggable container according to view container and draggable size
      var dragContainerOffsetLeft = $(this).find(".viewslidecon").offset().left + $(this).find(".viewslidecon").outerWidth() / 2 + $(this).find(".viewslidecon").innerWidth() / 2 - $(this).find('.viewslidecon_drag').outerWidth();
      $(this).find(".viewslidecon_drag_con").offset({ left: dragContainerOffsetLeft });
      var dragleft = $(this).find('.viewslidecon_drag_con').width() - $(this).find('.viewslidecon_drag').width();
      $(this).find('.viewslidecon_drag').css('left', dragleft);

      $(this).find(".viewslidecon_drag").draggable({
        containment: $(this).find('.viewslidecon_drag_con'),
      });
    }
    else {
      if (slideCount > 1) {
        $('.drag_slide_con .tab-pane.show').not('.slick-initialized').slick({
          autoplay: false,
          speed: 900,
          infinite: false,
          arrows: true,
          dots: true,
          mobileFirst: true,
          responsive: [
            {
              breakpoint: 767,
              settings: "unslick"
            }
          ]
        });
      }
    }
  });
}

function summaryHeader() {
  var viewportWidth = $(window).width();
  if (viewportWidth <= 767) {
    $('.summary_list').not('.slick-initialized').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: false,
      dots: false,
      arrows: false,
      mobileFirst: true,
      centerMode: true,
      focusOnSelect: true,
      centerPadding: 0,
      variableWidth: true,
      responsive: [
        {
          breakpoint: 767,
          settings: "unslick"
        }
      ]
    });
    setTimeout(function () { $('.summary_list').slick('refresh'); }, 200);
  }
}

if ($(".viewslidecon, .summary_list")[0]) {
  dragSlide();
  summaryHeader();
}
$(window).on('resize', function () {
  if ($(".viewslidecon, .summary_list")[0]) {
    dragSlide();
    summaryHeader();
  }
});

//resize
$(window).resize(function () {
  //text fade function
  textFade();
  //contact tabs slider
  var width = $(window).width();
  if (width < 767) {
    if ($('.contact_tabs ul').length > 0 && $('.contact_tabs ul li').length > 1) {
      runSlickTab();
    }
    if ($('.tab-content-contact').length > 0 && $('.contact_tabs ul li').length > 1) {
      runSlickTabContent();
    }
  }
  //service header width
  //headerWidth();
  //service hero text width
  if ($('.srv-hero-text').length > 0) {
    srHeroText();
  }
  parallaxEffect();
  if ($('.slider-2').length > 0) {
    //$('.slider-2').get(0).slick.setPosition();
    $('.slider-2')[0].slick.refresh();
  }
  if ($('.slider-nav-2').length > 0) {
    // $('.slider-nav-2').get(0).slick.setPosition();
    $('.slider-nav-2')[0].slick.refresh();
  }
});

//Case study slider JS Starts
if ($(window).width() > 767 && $('#caseSlider').length > 0) {
  ScrollOut({
    cssProps: {
      visibleY: true,
      viewportY: true
    }
  });
  Splitting({ target: '.heading' });
  $("a[href^='#']").bind('click', function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $('html, body').stop().animate({
      scrollTop: $(target).offset().top
    }, 600, function () {
      location.hash = target;
    });
    return false;
  });
  $(window).scroll(function () {
    if ($("#caseSlider")[0]) {
      var scrollDistance = $(window).scrollTop();
      var windowHeight = $(window).innerHeight();
      $('.slides-repeater').each(function (i) {
        if ($(this).position().top <= scrollDistance) {
          $('.pagination ul li a.active').removeClass('active');
          $('.pagination ul li a').eq(i).addClass('active');
        }
      });
      // $('.exp-slide').each(function (i) {
      //   if ($(this).position().top <= scrollDistance - 500) {
      //     $('.pagination ul li a.active').removeClass('active');
      //     $('.pagination ul li a').eq(i).addClass('active');
      //   }
      // });
      var topDistance = $('#caseSlider').offset().top - 100;
      var sliderHeight = $('#caseSlider').innerHeight();
      var pagingOff = (topDistance + sliderHeight) - windowHeight + 300;
      if (scrollDistance > topDistance && scrollDistance < pagingOff) {
        $('.pagination').fadeIn();
      }
      else {
        $('.pagination').fadeOut();
      }
    }
  }).scroll();
}
else {
  $('.slides-repeater')
    .addClass('mobile-slide')
    .attr('data-aos', 'fade-up')
    .attr('data-aos-duration', '10');
  $(".mobile-slide > div").removeAttr("data-aos");
}

const $slider = $("#slider-wrapper");
$slider.on('mouseenter', () => {
  mouseWheel($slider);
}).slick({
  //dots: true,
  vertical: true,
  infinite: true,
  arrows: false,
});

function mouseWheel($slider) {
  $(window).on('wheel', { $slider: $slider }, mouseWheelHandler);
}
function mouseWheelHandler(event) {
  const $slider = event.data.$slider;
  const delta = event.originalEvent.deltaY;
  if (delta < 0) {
    $slider.slick('slickPrev');
  } else {
    $slider.slick('slickNext');
  }

}

// function isScrolledIntoView(el) {
//   var rect = el.getBoundingClientRect();
//   var elemTop = rect.top;
//   var elemBottom = rect.bottom;

//   // Only completely visible elements return true:
//   var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
//   // Partially visible elements return true:
//   //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
//   return isVisible;
// }

function isOnScreen(elem) {
  if (elem.length == 0) {
    return;
  }
  var $window = jQuery(window)
  var viewport_top = $window.scrollTop()
  var viewport_height = $window.height()
  var viewport_bottom = viewport_top + viewport_height
  var $elem = jQuery(elem)
  var top = $elem.offset().top
  var height = $elem.height()
  var bottom = top + height
  return (top >= viewport_top && top < viewport_bottom) ||
    (bottom > viewport_top && bottom <= viewport_bottom) ||
    (height > viewport_height && top <= viewport_top && bottom >= viewport_bottom)
}

jQuery(document).ready(function () {
  // window.addEventListener('scroll', function (e) {
  //   if (isOnScreen(jQuery('.passedMe'))) {
  //     $('#fixme').fadeOut();
  //   }
  //   else {
  //     $('#fixme').fadeIn();
  //   }
  // });
});
(function experienceSliderFunc() {
  if ($(window).width() < 767) {
    $('.expirence_slider').slick({
      dots: true,
      infinite: false,
      arrows: false,
      speed: 1000,
      slidesToShow: 1,
      adaptiveHeight: true
    });
  }
})();

$(document).ready(function () {
  if ($(window).width() > 767 && $('.sidebar').length > 0) {
    var $window = $(window);
    var $sidebar = $(".sidebar");
    var $sidebarHeight = $sidebar.innerHeight();
    var $footerOffsetTop = $(".sticky-footer").offset().top;
    var $sidebarOffset = $sidebar.offset();

    $window.scroll(function () {
      if ($window.scrollTop() > $sidebarOffset.top) {
        $sidebar.addClass("fixed");
      } else {
        $sidebar.removeClass("fixed");
      }
      if ($window.scrollTop() + $sidebarHeight > $footerOffsetTop) {
        $sidebar.css({ "top": -($window.scrollTop() + $sidebarHeight - $footerOffsetTop) });
      } else {
        $sidebar.css({ "top": "0", });
      }
    });
  }
  if ($('.awardsSection').length > 0) {
    var controller = new ScrollMagic.Controller();
    // build tween
    var tween = TweenMax.staggerFromTo(".awardsSection .container", 2, { right: -100 + '%' }, { left: 0, ease: Back.easeOut }, 0.15);
    // build scene
    var scene = new ScrollMagic.Scene({ triggerElement: ".awardsSection", duration: 300 }).setTween(tween).addTo(controller);
  }
  if ($('.clientholder_detail').length > 0) {
    var controller = new ScrollMagic.Controller();
    var scene = new ScrollMagic.Scene({ triggerElement: "", duration: 220 }).setPin("#pin1").addTo(controller);
  }
  ///blog slider start here
  if ($('.blog-carousel-inner').length > 0) {
    $('.blog-carousel-inner').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: false,
      infinite: false,
      autoplaySpeed: 2000,
      touchThreshold: 100,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: false
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }

      ]
    })
      .on('setPosition', function (event, slick) {
        slick.$slides.css('height', slick.$slideTrack.height() + 'px');
      });
  }

  //os code
  if (navigator.platform.toUpperCase().indexOf('MAC') >= 0) {
    jQuery('body').addClass('mac-os');
  }
});

jQuery(function ($) {
  // Dotnav Follower 'tm-dotnav-follower'
  $('[data-nav-liquid-dot]').each(function () {
    var ele = $(this),
      follower = $('<div class="liquid-dot"></div>').prependTo(this),
      nav = ele.find('ul:first'),
      children = nav.children();
    var ids = [],
      links = ele.find("a[href^='#']").each(function () { if (this.getAttribute("href").trim() !== '#') ids.push(this.getAttribute("href")); }),
      targets = $(ids.join(',')),
      inviews;
    $(window).on('scroll', function () {
      inviews = [];
      for (var i = 0; i < targets.length; i++) {
        if (UIkit.Utils.isInView(targets.eq(i), { topoffset: -600 })) {
          inviews.push(children.eq(i));
        }
      }
      if (inviews.length > 0) {
        follower.css({
          top: inviews[0].position().top,
          left: inviews[0].position().left,
          height: inviews.length * inviews[0].outerHeight(true) - parseInt(inviews[0].css('margin-top'))
        });
      }
    });
  });
});

$('document').ready(function () {
  //case study

  if ($('#slide-2').length > 0) {
    var caseDistance = $('.slides-repeater').last().offset().top, $window = $(window);
    var caseheight = $('.slides-repeater').last().height() + caseDistance;
  }

  $(window).scroll(function () {
    var caseTopDis = caseDistance - $window.scrollTop();
    if ($(window).scrollTop() > caseheight - 150) {
      $('#slide-2').addClass("fadout");
    } else {
      $('#slide-2').removeClass("fadout");
    }
  })


  // Footer Offset
  if ($('.footer_content').length > 0) {
    var footerDistance = $('.footer_content').offset().top, $window = $(window);
  }

  $(window).scroll(function () {
    var footerTopDis = footerDistance - $window.scrollTop()
    if (footerTopDis < 500) {
      $('.floating_contact').fadeOut();
      var minWidth = $(window).width();
      if (minWidth <= 767) {
        $('.scroll_to_top').css({ 'position': 'fixed', 'animation': 'imageMovementPhone 1s linear infinite' });
      }
      else {
        $('.scroll_to_top').css({ 'position': 'fixed', 'animation': 'imageMovement 1s linear infinite' });
      }
      $('.scroll_to_top').fadeIn();
      flag = 0;
    }
    else {
      $('.floating_contact').css({ display: 'block' });
      $('.floating_contact').fadeIn();
      $('.scroll_to_top').fadeOut();
      $('.scroll_to_top').css('position', 'absolute');
      flag = 1
    }
  });
});



