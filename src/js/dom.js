const dom_element = () => {
    const first_form = document.querySelector('[data-first-form]');
    const second_form = document.querySelector('[data-second-form]');
    const variables_number = document.querySelector('[data-num-variables]');
    const restrictions_number = document.querySelector('[data-num-restrictions]');
    const function_container = document.querySelector('[data-objective-function]');
    const restrictions_container = document.querySelector('[data-restrictions]');
    const solve_btn = document.querySelector('[data-solve-btn]');
    const edit_btn = document.querySelector('[data-edit-btn]');
    const clean_btn = document.querySelector('[data-clean-btn]');
    const objective_value = document.querySelector('[data-objective]');
    const result_container = document.querySelector('[data-result-container]');
    const result_variables = document.querySelector('[data-result-variables]');
    const edit_result_btn = document.querySelector('[data-edit-result]');



    return {
        first_form,
        second_form,
        variables_number,
        restrictions_number,
        function_container,
        restrictions_container,
        solve_btn,
        edit_btn,
        clean_btn,
        objective_value,
        result_container,
        result_variables,
        edit_result_btn,
    }
}


export {dom_element}