require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.min.js');

import Slider from "./class/Slider/Slider";
import AppComponent from "./Component/AppComponent";

new Slider($('#slider'));

new AppComponent().run();