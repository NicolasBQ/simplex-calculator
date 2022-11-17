import {dom_element} from './dom.js';
import { first_form_handler } from './form_handler.js';
import { edit_first_form, clean_data } from './forms_display.js';
import { standarization } from './standarization.js';
import { matrix } from './boards.js';
import { board_handler } from './board_operations.js';


const app_init = () => {
    const first_form = dom_element().first_form;
    const second_form = dom_element().second_form;
    const solve_btn = dom_element().solve_btn;
    const edit_btn = dom_element().edit_btn;
    const clean_btn = dom_element().clean_btn;

    first_form.addEventListener('submit', (e) => {
        e.preventDefault();
        first_form_handler(first_form, second_form);
    });

    solve_btn.addEventListener('click', () => {
        standarization();
        matrix();
    });

    edit_btn.addEventListener('click', () => {
        edit_first_form(first_form, second_form);
    })

    clean_btn.addEventListener('click', () => {
        clean_data();
    })

}

document.addEventListener('DOMContentLoaded', app_init);

