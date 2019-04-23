require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.min.js');

import Slider from "./class/Slider/Slider";
import Services from "./Services/StoreService";
import SimpleScroll from "./class/SimpleScroll/SimpleScroll";

$("#slider .slide .slider-content #goto-map, #navbar #navbarSupportedContent .navbar-nav a").click(function(e) {
    e.preventDefault();
    SimpleScroll.scrollTo($(this).attr('href'));
});

new Slider($('#slider'));

Services.$app.render();