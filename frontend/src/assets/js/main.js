

  $(".navbar-toggler").click(function () {
    if ($(this).hasClass("collapsed")) {
      $(".navbar").removeClass("navbar-active");
    } else {
      $(".navbar").addClass("navbar-active");
    }
  });


  $(document).scroll(function () {
    if ($(document).scrollTop() >= 50) {
      $(".navbar").addClass("navbar-active");
    } else {
      $(".navbar").removeClass("navbar-active");
    }
  
    if (checkScreenSize() == true) {
      if ($(".navbar-collapse").hasClass("show")) {
        $(".navbar").addClass("navbar-active");
      }
    }
  });
  
  function checkScreenSize() {
    var newWindowWidth = $(window).width();
    if (newWindowWidth < 481) {
      return true;
    } else {
      return false;
    }
  }

  AOS.init();