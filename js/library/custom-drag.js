$(document).ready(function () {

    //set up width and height of draggable container according to view container and draggable size
    var dragContainerWidth = $("#viewContainer").innerWidth() + ($('#draggable').outerWidth() - $("#viewContainer").innerWidth()) * 2;
    var dragContainerHeight = $("#viewContainer").innerHeight() + ($('#draggable').outerHeight() - $("#viewContainer").innerHeight()) * 2;
    $("#draggableContainer").css("width",dragContainerWidth);
    $("#draggableContainer").css("height",dragContainerHeight);

    //set up position of draggable container according to view container and draggable size

    var dragContainerOffsetLeft = $("#viewContainer").offset().left + $("#viewContainer").outerWidth()/2 + $("#viewContainer").innerWidth()/2 - $('#draggable').outerWidth();
    var dragContainerOffsetTop = $("#viewContainer").offset().top + $("#viewContainer").outerHeight()/2 + $("#viewContainer").innerHeight()/2 - $('#draggable').outerHeight();
    $("#draggableContainer").offset({ left: dragContainerOffsetLeft, top: dragContainerOffsetTop });
    var dragleft = $('#draggableContainer').width() - $('#draggable').width();
    $('#draggable').css('left', dragleft)
  
    /* Click Event */
    let currentSlide = ''
    let currentImage = ''

    $('.team_mem_con').click(function () {
        var delay = 0;
        var slideno = $(this).attr('data-slide');
        currentSlide = slideno
        currentImage = $(this).find('img').attr('src');
        $(this).parent().find('.team_mem_con').find('.currentImage').each(function (index, element) {
            console.log(index, element)
            delay = delay + 5;
            $(this).css('animation', `imageOnebyOne ${delay}s`);
        });

    });

    $('#draggable').bind('click', function(){
        if ($(this).data('dragging')) return;
        showTeamInfo(currentSlide, currentImage);
    });

    $("#draggable").draggable({
        containment : '#draggableContainer',
        start: function(e, ui) {
            $('body').addClass("team_moving_start");
            $('body').removeClass("team_moving_stop");
            $('.cursor').removeClass("hover");
            $('.cursor span').text('');
            $(this).data('dragging', true);
        },
        stop: function (e, ui) {
            $('body').removeClass("team_moving_start");
            $('body').addClass("team_moving_stop");
            setTimeout(function(){
            $(e.target).data('dragging', false);
            }, 1);
        }
    });


$('.team_info_content').slick({
    draggable: true,
    arrows: true,
    dots: false,
    fade: true,
    speed: 900,
    prevArrow: $('.team_next'),
    nextArrow: $('.team_pre'),
}).slickAnimation();

function nextAnimation() {
    // $('.team_modal_left').stop().delay(500).animate({
    //     opacity: '0', top: '100px'
    // });
    // $('.team_modal_right_img').css({ width: '1px', opacity: '0' });
    // $('.slick-active .team_modal_left').stop().animate({
    //     opacity: '1', top: '0'
    // });
    // setTimeout(function(){
    //     $('.slick-active .team_modal_right_img').css({width: '100%', opacity: '1'});
    // }, 1000);
}

// var currentPosValue = null;
// function currentLeftPos(value) {
//     currentPosValue = value 
// }

function closeTeamBios() {
    $('.close_team').fadeOut();
    $('.team_modal_right_img').css({ width: '100%', opacity: '0' });
    $('.team_info_content').removeClass('team-bios-open');
    $('.team_modal_left').stop().delay(500).animate({
        opacity: '0', top: '100px'
    }, "100");
    setTimeout(function(){
        $('.team_info').fadeOut();
        $('.team_mem').removeClass('imageReplaced');
        $('.currentImage').remove();
        $('.white_opa').fadeOut();
        $('team_modal_left').mCustomScrollbar('destroy');
        // $(".ui-draggable").css("left", currentPosValue);
    }, 1000);
}

$('.team_info_content').on('afterChange', function(){
    nextAnimation();
    var nextimage = $('.slick-active .team_modal_right_img img.ci-image-loaded').attr('src');
    $('.currentImage').attr('src',nextimage)
});

$('.close_team').click(function () {
    closeTeamBios();
});

function showTeamInfo(currentSlide, currentImage) {

    // var left = $(".ui-draggable").css("left");
    // currentLeftPos(left)
    //$(".ui-draggable").css("left", '110px')
      
    setTimeout(function(){
        $('.white_opa').fadeIn();
        $('.team_mem').prepend(`<img class="currentImage" src="${currentImage}" />`);
        $('.team_mem').addClass('imageReplaced');
    }, 500);
      
    setTimeout(function(){
        $('.team_info').fadeIn();
        $('.team_info_content').slick('refresh');
        $('.team_modal_left').stop().delay(500).animate({
            opacity: '1', top: '0'
        }, "2000");
        $('.team_modal_right_img').css({ width: '1px'});
    }, 500);

    setTimeout(function () {
        $('.team_modal_right_img').css({ width: '100%', opacity: '1' });
        $('.close_team').fadeIn();
        $('.team_modal_left').mCustomScrollbar({
            theme:"dark-3"
        });
    }, 1500);

    $('.team_info_content').slick('slickGoTo', currentSlide - 1);

    setTimeout(function(){
        $('.team_info_content').addClass('team-bios-open');
    }, 3000);
      
}  

});