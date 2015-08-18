jQuery(document).ready(function($) {
    window.console && console.log(' document ready......');
    if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
        var viewportmeta = document.querySelector('meta[name="viewport"]');
        if (viewportmeta) {
            viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0, initial-scale=1.0';
            document.body.addEventListener('gesturestart', function() {
                viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
            }, false);
        }
    }


    $('.sg-nav-link').on('click', function() {

        var scrollAnchor = $(this).attr('data-scroll');
        var anchor = $('.section-anchor[data-anchor="' + scrollAnchor + '"]');

        var anchorPos = anchor.offset().top;
        var currentPos = $(".st-content").scrollTop();
        console.debug('currentPos: ' + currentPos);

        var scrollPoint = anchorPos + currentPos - 50;
        console.debug('scrollPoint: ' + scrollPoint);

        $('.st-content').animate({
            scrollTop: scrollPoint
        }, 500);

        if (($(window).width()) < '1550') {
            closeNav();
        }
        return false;

    });


    // change active state of nav on scroll
    $(".st-content").scroll(function() {

        var currentPos = $(".st-content").scrollTop();

        if (currentPos >= 50) {
            $('.section-anchor').each(function(i) {

                var thisAnchorPos = $(this).offset().top;

                if (thisAnchorPos <= 51) {
                    $('.sg-nav-link.active').removeClass('active');
                    $('.sg-nav-link').eq(i).addClass('active');
                }
            });

        } else {

            $('.sg-nav-link.active').removeClass('active');
            $('.sg-nav-link:first').addClass('active');
        }

    }).scroll();


    /* ZeroClipboard - copy to clipboard feature */



    var client = new ZeroClipboard($('.copy-button'));

    client.on('ready', function(event) {
        // console.log( 'movie is loaded' );


        client.on('copy', function(event) {
            var target = $(event.target);

            event.clipboardData.setData('text/plain', target.nextAll(".highlight").text());
        });

        client.on('aftercopy', function(event) {
            console.log('Copied text to clipboard: ' + event.data['text/plain']);
        });
    });

    client.on('error', function(event) {
        console.log('ZeroClipboard error of type "' + event.name + '": ' + event.message);
        ZeroClipboard.destroy();
    });



    // FIX HEADER
    $(function() {
        $(window).scroll(function() {
            if ($(this).scrollTop() > 55 && $(this).scrollTop() < 2400) {
                $('.fixed-header-bkgd').slideDown(300);
                $('.header-primary').addClass('fixed');
                checkOverlayPosition();
                closeMegaMenu();

            }
            else{
                $('.fixed-header-bkgd').slideUp(300);
                $('.header-primary').removeClass('fixed');

            }


        });
    });








    // // Activate Search Field

    $("#search-wrapper").on("click", function() {
        openSearch();
        $('#search-wrapper').addClass('selected');
    });

    $('#browse-main-appliances').on('mouseenter', function() {
        openFlyout();
    });

    $('#nav-btn-browse').on('click', function() {
        closeAll();
        toggleBrowse();
        $('#header-primary').css({'border-radius': '2px 2px 2px 0px'});
        openMegaMenu('browse');
    });

    $('#nav-btn-finder').on('click', function() {
        closeAll();
        toggleStoreFinder();
        openMegaMenu('finder');
    });
    $('#nav-btn-account').on('click', function() {
        closeAll();
        toggleAccount();
        openMegaMenu('account');
    });
    $('#nav-btn-cart').on('click', function() {
        closeAll();
        toggleCart();
         $('#header-primary').css({'border-radius': '2px 2px 0px 2px'});

        openMegaMenu('cart');
    });



    $('#search-icon-clear').on('click', function() {
        clearSearch();
    });
    $('#nav-searchbox').on('click', function() {
        $("#search-input").focus();
    });



    $('#list-toggle').on('click', function() {
        $('.top-row').toggle();
    });

    updateContainer();

    $(window).resize(function() {
        updateContainer();
        checkOverlayPosition();

    });


    if(Modernizr.mq('(min-width: 960px)')){
        console.debug('not mobile  - open browse menu ');
        $('#dropdown-browse').addClass('home');
        openMegaMenu('browse');
    }

});



function toggleCart(){
    $('#nav-cart-icon').toggleClass('open');
    $('#nav-btn-cart').toggleClass('selected');
}
function closeCart(){
    $('#nav-cart-icon').removeClass('open');
    $('#nav-btn-cart').removeClass('selected');
}


function toggleAccount(){
    $('#nav-account-icon').toggleClass('open');
    $('#nav-btn-account').toggleClass('selected');
}
function closeAccount(){
    $('#nav-account-icon').removeClass('open');
    $('#nav-btn-account').removeClass('selected');
}

function toggleStoreFinder(){
    $('#nav-finder-icon').toggleClass('open');
    $('#nav-btn-finder').toggleClass('selected');
}
function closeStoreFinder(){
    $('#nav-finder-icon').removeClass('open');
    $('#nav-btn-finder').removeClass('selected');
}


function openSearch() {
            closeAll();

    $('.clear-btn').addClass('close');
    if(Modernizr.mq('(min-width: 960px)')){
        $('#nav-search-icon').fadeOut(100);
        $("#search-input").fadeIn(300).focus();
    }
    else{
        $("#search-drop-input").fadeIn(300).focus();
    }
    $("#search-label").hide();
    $('#nav-search-icon-on').addClass("move");
    openMegaMenu('search');


}
function clearSearch() {
    $("#search-input").focus().val('');
    $("#search-label").show();
}

function closeSearch() {
    $('#nav-search-icon-on').removeClass("move");
    $('.clear-btn').removeClass('close');
    $('#nav-search-icon').fadeIn(300);
    $("#search-input").fadeOut(300);
    $("#search-label").fadeIn(300);
    $('#search-wrapper').removeClass('selected');

};

function closeMegaMenu() {
    console.debug('close menu');
    $('.nav-btn').removeClass('selected');
    
    $('.nav-dropdown.open').slideUp(300).removeClass("open");
    $('.overlay').slideUp(300);
}

function checkOverlayPosition(){
    var scrollTop = $(window).scrollTop(),
    elementOffset = $('#header-primary').offset().top,
    distance = (elementOffset - scrollTop)-5;
    $('.overlay').css({ top: distance });
}
function setDropdownWidth(){
    var headwidth = $(".header-primary").width();
    console.debug('headwidth: '+headwidth);
    $('.nav-dropdown').css({ 'min-width': headwidth });
}

function openMegaMenu(menuid) {
    console.debug('open menu' + menuid);

    var showMenu = 'dropdown-' + menuid;

    var thisMenustate = $('#' + showMenu).hasClass("open");
    var allMenustate = $('.nav-dropdown').hasClass("open");



    if (!thisMenustate) {

        // close any open menus
        if (allMenustate) {
            $('.nav-dropdown.open').slideUp(300).removeClass("open");
        }
        else{
            if($('.nav-dropdown').hasClass('home')){
                console.debug('leaving overlay off - on homepage');
            }
            else{
                $('.overlay').slideDown(300);
                checkOverlayPosition();
            }
            
        }
        $('#' + showMenu).slideDown(300).addClass("open");
    }
    else {
        closeMegaMenu();
        closeAll();
    }

}



function openFlyout(){
    var $browseMainMenu = $('#dropdown-browse');
    var $browseFlyoutMenu = $('.browse-flyout');
    var isOpen = $browseMainMenu.hasClass('flyout');
     

    if(!isOpen && Modernizr.mq('(min-width: 960px)')){
        console.debug('open flyout...');
        var mySequence = [
            { e: $browseMainMenu ,p: { width: 850 }, o: { easing: "easeOutExpo", duration: 500  } },
            { e: $browseFlyoutMenu ,p: 'fadeIn', o: { duration: 500 } }
        ];
        $.Velocity.RunSequence(mySequence);

        $('#dropdown-browse').addClass("flyout");
    }
    
}

function closeFlyout(){
    $('.browse-flyout').velocity({ opacity: 0 }, { display: "none" });
    $('#dropdown-browse').velocity({width: 269}, 100);
    $('#dropdown-browse').removeClass("flyout");
}

function toggleBrowse() {
    $('#dropdown-browse').removeClass('home');
    $('.lines-button').toggleClass('close');
    //$('#nav-btn-browse').toggleClass("selected");
}

function closeBrowse() {
    $('#dropdown-browse').removeClass('home');
    $('.lines-button').removeClass('close');
    $('#nav-btn-browse').removeClass("selected");
    closeFlyout();
}

function closeAll(){
    closeStoreFinder();
    closeAccount();
    closeSearch();
    closeBrowse();
    closeCart();
}

function moveDropdowns(){
    $('#dropdown-browse').insertBefore('#nav-btn-browse');
    $('#dropdown-search').insertBefore('#search-wrapper');
    $('#dropdown-finder').insertBefore('#nav-btn-finder');
    $('#dropdown-account').insertBefore('#nav-btn-account');
    $('#dropdown-cart').insertBefore('#nav-btn-cart');
}
function movebackDropdowns(){
    $('#dropdown-browse').insertAfter('#placeholder-browse');
    $('#dropdown-search').insertAfter('#placeholder-search');
    $('#dropdown-finder').insertAfter('#placeholder-finder');
    $('#dropdown-account').insertAfter('#placeholder-account');
    $('#dropdown-cart').insertAfter('#placeholder-cart');
}


function updateContainer() {
    var headwidth = $(".header-primary").width();
    var screenHt = $(window).height();

    console.debug('screenHt: '+screenHt);
    

        // re-order footer
        if (Modernizr.mq('(max-width: 960px)')) {
           $('.nav-dropdown').css({ 'min-width': headwidth +2});
           $('.nav-dropdown').css({ 'max-height': screenHt });
           $('.nav-dropdown').css({ 'position': 'absolute' });
          // $('.helpnumber').insertAfter('.nortonlogo');
          // $('.footer-lists').insertBefore('.copyright-text');
           moveDropdowns();
       }
       else{
        $('.nav-dropdown').css({ 'min-width': 0 });
       // $('.helpnumber').insertAfter('.tagline');
       // $('.footer-lists').insertAfter('.copyright-text');
           movebackDropdowns();
        }

        if(Modernizr.mq('(max-width: 960px)')){
            $('#search-box').hide();
       }
       else{
            $('#search-box').show();
       }
       


}