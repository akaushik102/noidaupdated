window.initMainMenu = function () {
  var mobile_nav = $(".mobile-nav");
  var desktop_nav = $(".desktop-nav");

  mobile_nav.attr("aria-expanded", "false");

  function init_classic_menu_resize() {
    $(".mobile-on .desktop-nav > ul").css(
      "max-height",
      $(window).height() - $(".main-nav").height() - 20 + "px"
    );

    if ($(window).width() <= 1024) {
      $(".main-nav").addClass("mobile-on");
      if (!mobile_nav.hasClass("active")) {
        desktop_nav.css("display", "none");
      }
    } else {
      $(".main-nav").removeClass("mobile-on");
      desktop_nav.css("display", "block");
    }
  }

  function init_classic_menu() {
    if ($(".main-nav").hasClass("transparent")) {
      $(".main-nav").addClass("js-transparent");
    } else if (!$(".main-nav").hasClass("dark")) {
      $(".main-nav").addClass("js-no-transparent-white");
    }

    $(window).off("scroll.advantage").on("scroll.advantage", function () {
      if ($(window).scrollTop() > 0) {
        $(".js-transparent").removeClass("transparent");
        $(".main-nav, .nav-logo-wrap .logo").addClass("small-height");
        $(".light-after-scroll").removeClass("dark");
        $(".main-nav").addClass("body-scrolled");
      } else {
        $(".js-transparent").addClass("transparent");
        $(".main-nav, .nav-logo-wrap .logo").removeClass("small-height");
        $(".light-after-scroll").addClass("dark");
        $(".main-nav").removeClass("body-scrolled");
      }
    });

    // Mobile menu toggle
    mobile_nav.off().on("click", function () {
      if (desktop_nav.hasClass("js-opened")) {
        desktop_nav.slideUp("slow").removeClass("js-opened");
        $(this).removeClass("active");
        $(this).attr("aria-expanded", "false");
      } else {
        desktop_nav.slideDown("slow").addClass("js-opened");
        $(this).addClass("active");
        $(this).attr("aria-expanded", "true");
      }
    });

    // Close when clicking outside
    $(document).off("click.advantage").on("click.advantage", function (event) {
      if ($(window).width() <= 1024) {
        var trigger = $(".main-nav");
        if (
          trigger[0] !== event.target &&
          !trigger.has(event.target).length
        ) {
          desktop_nav.slideUp("slow").removeClass("js-opened");
          mobile_nav.removeClass("active");
          mobile_nav.attr("aria-expanded", "false");
        }
      }
    });
  }

  init_classic_menu();
  init_classic_menu_resize();
  $(window).off("resize.advantage").on("resize.advantage", init_classic_menu_resize);
};

window.destroyMainMenu = function () {
  $(window).off(".advantage");
  $(document).off(".advantage");
};
