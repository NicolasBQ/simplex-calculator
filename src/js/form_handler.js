import {dom_element} from './dom.js';
import { form_display } from './forms_display.js';

const first_form_handler = (first_form, second_form) => {
    const variables_number = dom_element().variables_number.value;
    const restrictions_number = dom_element().restrictions_number.value;

    if(variables_number < 2) {
        alert('El minimo de variables es 2');
    } else if(variables_number > 3) {
        alert('El numero maximo de variables es 3');
    } else if(restrictions_number < 1) {
        alert('El numero minimo de restricciones es 1');
    } else {
        form_display(first_form, second_form, variables_number, restrictions_number);
    }
}






export {first_form_handler}