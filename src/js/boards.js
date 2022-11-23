import { simplex_handler } from "./simplex.js";
import { standarization } from "./standarization.js";
import { dom_element } from "./dom.js";
import { board_handler } from "./board_operations.js";

const matrix = () => {
    const aux_variables = standarization().hol; 
    const base_contribution = standarization().hol.map(base => base.base_contribution);
    const var_coeficients = variables_coeficient().variable_matrix;
    const aux_res_contribution = aux_restriction_contribution(aux_variables).stand_variables_matrix;
    const restrictions_number = dom_element().restrictions_number.value;

    const aux_contribution = aux_variables_contribution(aux_variables).contribution;
    const type = aux_variables_type(aux_variables).type
    const aux_type = aux_variables_type(aux_variables).aux_type;
    const values_matrix = var_coeficients.concat(aux_res_contribution);
    const xj = simplex_handler().restriction_conditions;
    const function_coeficients = simplex_handler().variables_coeficients.concat(base_contribution);



    let result = 0;
    for (let i = 0; i < restrictions_number; i++) {
        result += aux_contribution[i] * xj[i];
    }

    const matrix = {
        aux_contribution,
        // aux_type,
        values_matrix,
        xj,
        result,
        function_coeficients,
        type,
        aux_type
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
    const var_type = [];
    const aux_type = [];
    const variables_number = dom_element().variables_number.value;

    for(let i = 0; i < variables_number; i++) {
        var_type.push(`X${i + 1}`);
    }

    for(let i = 0; i < aux_variables.length; i++) {
        if(aux_variables[i].res_value != null) {
            if(aux_variables[i].type == 'hol') {
                aux_type.push(`S${i + 1}`);
            } else {
                aux_type.push(`A${i + 1}`);
            }
        }
    }

    const type = var_type.concat(aux_type);

    console.log(type, aux_type);

    return { type, aux_type }
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
            variable_matrix[j].push(restrictions_coeficients[i][j]);
        }
    }
  
    return { variable_matrix }
}

const aux_restriction_contribution = (aux_variables) => {
    const hol_arr = [];
    const restrictions_number = dom_element().restrictions_number.value;

    let k = 0;
    let z = -1;


    for(let i = 0; i < standarization().hol.length; i++) {
        hol_arr.push([]);
    }


    while(k < standarization().hol.length) {
        z++;
        while(z < hol_arr.length) {
            for(let q = 0; q < restrictions_number; q++) {
                if(k === q) {
                    hol_arr[z][q] = standarization().hol[q].res_contribution;
                } else {
                    hol_arr[z][q] = 0;
                }
            }

            k++;
            break;
        }
    }

    const stand_variables_matrix = hol_arr;



    return { stand_variables_matrix }
}






export {
    matrix
}