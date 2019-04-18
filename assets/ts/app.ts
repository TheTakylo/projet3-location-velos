require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap/dist/js/bootstrap.min.js');

import Slider from "./class/Slider/Slider";
import Services from "./Services/StoreService";

new Slider($('#slider'));

Services.app.render();