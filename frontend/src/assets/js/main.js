$(document).ready(function () {
    $(".banner-slick").slick({
      slidesToShow: 1,
      autoplay: true,
      infinite: false,
      // speed: 5000,
      // autoplaySpeed: 0,
      swipeToSlide: true,
      centerMode: false,
      // cssEase: "linear",
      dots: false,
      focusOnSelect: true,
      mobileFirst: true,
      slidesToScroll: 1,
      prevArrow: false,
      nextArrow: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 390,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    });
  });