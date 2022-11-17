import { simplex_handler } from "./simplex.js";
import { standarization } from "./standarization.js";
import { dom_element } from "./dom.js";
import { board_handler } from "./board_operations.js";

const matrix = () => {
    const aux_variables = standarization().hol.concat(standarization().art);
    
    const aux_contribution = aux_variables_contribution(aux_variables).contribution;
    const aux_type = aux_variables_type(aux_variables).type;
    const var_coeficients = variables_coeficient().variable_matrix;
    const aux_res_contribution = aux_restriction_contribution(aux_variables).stand_variables_matrix;

    const matrix = {
        aux_contribution,
        aux_type,
        var_coeficients,
        aux_res_contribution
    }

    board_handler(matrix);
}


const aux_variables_contribution = (aux_variables) => {

    const contribution = [];

    for(let i = 0; i < aux_variables.length; i++) {
        if(aux_variables[i].res_value != null) {
            contribution.push(aux_variables[i].contribution);
        }
    }

    return { contribution }
}


const aux_variables_type = (aux_variables) => {

    const type = [];

    for(let i = 0; i < aux_variables.length; i++) {
        if(aux_variables[i].res_value != null) {
            if(aux_variables[i].type == 'hol') {
                type.push(`S${i}`);
            } else {
                type.push(`A${i}`);
            }
        }
    }

    return { type }
}

const variables_coeficient = () => {
    const variables_number = dom_element().variables_number.value;
    const restrictions_coeficients = simplex_handler().restrictions_coeficients;
    const variable_matrix = [];


    for(let i = 0; i < variables_number; i++) {
        variable_matrix.push([]);
    }

    for(let i = 0; i < restrictions_coeficients.length; i++) {
        for(let j = 0; j < variables_number; j++) {
            variable_matrix[j].push(parseFloat(restrictions_coeficients[i][j]));
        }
    }
  
    return { variable_matrix }
}

const aux_restriction_contribution = (aux_variables) => {
    const aux_res_contribution = aux_variables.filter(variable => variable.res_contribution != null);
    const stand_variables_matrix = [];
    const restrictions_number = dom_element().restrictions_number.value;


    for(let i = 0; i < aux_res_contribution.length; i++) {
        stand_variables_matrix.push([]);
    }

    let i = 0;
    let j = -1;

    while(i < aux_res_contribution.length) {
        j++;
        while(j < stand_variables_matrix.length) {
            for(let k = 0; k < restrictions_number; k++) {
                if(i == k) {
                    stand_variables_matrix[j][k] = aux_res_contribution[i].res_contribution;
                } else {
                    stand_variables_matrix[j][k] = 0;
                }
            }

            i++;
            break;
        }
    }

    return { stand_variables_matrix }
}



export {
    matrix
}