import {dom_element} from './dom.js';


const simplex_handler = () => {
    const objective_value = get_objective().objective_value;
    const variables_coeficients = get_variable_coeficients().variables_coeficients;
    const restrictions_coeficients = get_restriction_coeficients().restrictions_coeficients;
    const restriction_operators = get_operators().restriction_operators;
    const restriction_conditions = get_conditions().restriction_conditions;




    return {
        objective_value,
        variables_coeficients,
        restrictions_coeficients,
        restriction_operators,
        restriction_conditions
    }
}

const get_objective = () => {
    const objective_value = dom_element().objective_value.value;

    return {
        objective_value,
    }
}

const get_variable_coeficients = () => {
    const function_values = Array.from(document.querySelectorAll('[data-objective-function] input'));
    const variables_coeficients = function_values.map(input => input.value);

    return {
        variables_coeficients
    }
}

const get_restriction_coeficients = () => {
    const restrictions_coeficients = [];
    const num_restrictions = Array.from(document.querySelectorAll('[data-restrictions] [data-restriction-container]'));
    const restrictions_values = Array.from(document.querySelectorAll('[data-rCoeficient]'));
    const variables_number = dom_element().variables_number.value;
    let iteration = 0;

    num_restrictions.forEach(restriction => restrictions_coeficients.push([]));

    for(let i = 0; i < restrictions_coeficients.length; i++) {
        for(let j = iteration; j < restrictions_values.length / restrictions_coeficients.length + iteration; j++ ) {
            restrictions_coeficients[i].push(restrictions_values[j].value);
        }

        iteration = iteration + restrictions_values.length / restrictions_coeficients.length;
    }

    return {
        restrictions_coeficients,
    }
}


const get_operators = () => {
    const operators_containers = Array.from(document.querySelectorAll('[data-rOperator]'));
    const restriction_operators = operators_containers.map(operator => operator.value);

    return {
        restriction_operators
    }
}

const get_conditions = () => {
    const condition_containers = Array.from(document.querySelectorAll('[data-condition]'));
    const restriction_conditions = condition_containers.map(condition => condition.value);

    return {
        restriction_conditions,
    }
}





export {
    simplex_handler
}

