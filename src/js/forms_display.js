import {dom_element} from './dom.js';


const form_display = (first_form, second_form, variables_number, restrictions_number) => {
    first_form.classList.add('d-none');
    second_form.classList.remove('d-none');
    second_form.classList.add('d-flex');

    const function_container = dom_element().function_container;
    const restrictions_container = dom_element().restrictions_container;

    

    for(let i = 0; i < variables_number; i++) {
        function_container.innerHTML += `
        <input type="number" class="form-control" style="width: 100px;" id="variable_${i}/>
        <label class="form-label" for="variable_${i}"><b> + X${i + 1}</b></label>`
    }

    for(let i = 0; i < restrictions_number; i++) {
        restrictions_container.innerHTML += `
        <div class="d-flex my-3">
            ${objetive_function_generator(variables_number)}
            <select name="operator" id="operator" class="form-select mx-2" style="width: 100px;">
            <option value=">="> >= </option>
            <option value="<="> <= </option>
            </select>
            <input type="number" class="form-control mx-2" style="width: 100px;" />
        </div>
        `     
    }
}

const objetive_function_generator = (n) => {
    const function_container = document.createElement('div');
    function_container.classList.add('d-flex', 'justify-content-between', 'align-items-center');
    function_container.style.width = '100%';

    for(let i = 0; i < n; i++) {
        function_container.innerHTML += `
        <input type="number" class="form-control" style="width: 100px;" id="variable_${i}/>
        <label class="form-label" for="variable_${i}"><b> + X${i + 1}</b></label>
       `
    }

    const main_container = document.createElement('div');

    main_container.appendChild(function_container);

    return main_container.innerHTML;
}


const edit_first_form = (first_form, second_form) => {
    second_form.classList.remove('d-flex');
    second_form.classList.add('d-none');

    first_form.classList.remove('d-none');
    first_form.classList.add('d-flex');
}

const clean_data = (second_form) => {
    const second_form_inputs = document.querySelectorAll('[data-second-form] input');

    const input_arr = Array.from(second_form_inputs);

    input_arr.forEach(input => input.value = " ");

}



export {
    form_display,
    edit_first_form,
    clean_data
}