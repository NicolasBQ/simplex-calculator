import { dom_element } from "./dom.js";


const result_box = (matrix) => {
    const result_container = dom_element().result_container;
    const second_form = dom_element().second_form;
    second_form.classList.remove('d-flex');
    second_form.classList.add('d-none');
    result_container.parentElement.classList.remove('d-none');
    result_container.parentElement.classList.add('d-flex');
    result_container.innerHTML =  `<h4 class="text-success">${matrix.result}</h4>` ;

    const result_variables = dom_element().result_variables;

    console.log(matrix)

    const variables_coeficient = matrix.xj;
    const variables_type = matrix.aux_type;

    for(let i = 0; i < variables_coeficient.length; i++) {
        result_variables.innerHTML += `
            <h4>${variables_type[i]} =  ${variables_coeficient[i]} </h4>
        `
    }
}

const edit_operations = (second_form) => {
    second_form.classList.remove('d-none');
    second_form.classList.add('d-flex');
    const result_container = dom_element().result_container;
    const result_variables = dom_element().result_variables;
    result_container.parentElement.classList.remove('d-flex');
    result_container.parentElement.classList.add('d-none');

    result_container.innerHTML = '';
    result_variables.innerHTML = '';
    
}




export { result_box, edit_operations } 