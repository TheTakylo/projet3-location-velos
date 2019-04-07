import Step1 from "./Component/Step1";
import Step2 from "./Component/Step2";
import $ from 'jquery';

require('../css/app.css');

let Step = $('#step');

let component = new Step1();

component.render(Step);

component.destroy();

component = new Step2();

component.render(Step);

component.destroy();