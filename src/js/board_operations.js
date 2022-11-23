import { dom_element } from "./dom.js";
import { simplex_handler } from "./simplex.js";
import { result_box } from "./result_box.js";


const board_handler = (matrix) => {

    // RESULT
    const cb = matrix.aux_contribution;
    const conditions = matrix.xj;
    const restrictions_number = dom_element().restrictions_number.value;
    const problem_objective = simplex_handler().objective_value;

    // fj - cj
    const fjcj = [];
    const values_matrix = matrix.values_matrix;
    const function_coeficients = matrix.function_coeficients;


    for (let i = 0; i < values_matrix.length; i++) {
        let current_fjcj = 0;
        for (let j = 0; j < restrictions_number; j++) {
            current_fjcj += cb[j] * values_matrix[i][j];
        }
        let result = current_fjcj - function_coeficients[i];

        if (isNaN(result)) {
            result = 0;
        }

        fjcj.push(result);
    }

    // BASE CASE
    let end_condition;
    if(problem_objective === 'max') {
        end_condition = fjcj.every(element => element >= 0);
    } else {
        end_condition = fjcj.every(element => element <= 0);
    }

    if(end_condition) {
        let result = 0;
        for (let i = 0; i < restrictions_number; i++) {
            result += cb[i] * conditions[i];
        }

       result_box(matrix);

        return;
    }


    // FIND PIVOT COLUMN
    let column_value;
    let select_column;


    if (problem_objective == 'max') {
        column_value = Math.min(...fjcj);
    } else {
        column_value = Math.max(...fjcj);
    }

    for (let i = 0; i < fjcj.length; i++) {
        if (fjcj[i] === column_value) {
            select_column = i;
        }
    }

    let pivot_column = values_matrix[select_column];


    // FIND PIVOT INDEX AND VALUE
    let min_ratio = 10000000;
    let pivot_value;
    let pivot_index;
    for (let i = 0; i < pivot_column.length; i++) {
        let current_result = 0;
        if (pivot_column[i] > 0) {
            current_result = conditions[i] / pivot_column[i];

            if (current_result < min_ratio) {
                min_ratio = current_result;
                pivot_index = i;
                pivot_value = pivot_column[i];
            }
        }
    }

    // REPLACE CONTRIBUTION 
    for (let i = 0; i < cb.length; i++) {
        if (i === pivot_index) {
            cb[i] = function_coeficients[select_column];
        }
    }

    // REPLACE VARIABLE
    const type = matrix.type;
    const aux_type = matrix.aux_type;
    let new_variable;
    for(let i = 0; i < type.length; i++) {
        if(i === select_column) {
            new_variable = type[i];
        }
    }

    for(let i = 0; i < aux_type.length; i++) {
        if(i === pivot_index) {
            aux_type[i] = new_variable;
        }
    }

    // OPERATE TO GET THE 1 INTO THE PIVOT ROW
    const operate_to_zeros = [];
    for (let i = 0; i < restrictions_number - 1; i++) {
        operate_to_zeros.push({});
    }

    let i = 0;
    let j = 0;
    while (i < pivot_column.length) {

        if (i != pivot_index) {
            operate_to_zeros[j].row_value = pivot_column[i];
            operate_to_zeros[j].row_index = i;
            j++;
        }

        i++;
    }

    for (let i = 0; i < values_matrix.length; i++) {
        if(i === pivot_index) {
            conditions[i] = conditions[i] / pivot_value;
        }
        for (let j = 0; j < restrictions_number; j++) {
            if (j === pivot_index) {
                values_matrix[i][j] = values_matrix[i][j] / pivot_value;
            }
        }
    }

    // OPERATE TO GET THE ZEROS INTO THE REST OF THE ROWS
    for (let i = 0; i < operate_to_zeros.length; i++) {
        for (let j = 0; j < values_matrix.length; j++) {
            for (let k = 0; k < restrictions_number; k++) {
                if (k === operate_to_zeros[i].row_index) {
                    values_matrix[j][k] = parseFloat(values_matrix[j][k] - operate_to_zeros[i].row_value * values_matrix[j][pivot_index]);
                }
            }
        }
    }

    for(let i = 0; i < operate_to_zeros.length; i++) {
        for(let j = 0; j < conditions.length; j++) {
            if(j === operate_to_zeros[i].row_index) {
                conditions[j] = parseFloat(conditions[j] - operate_to_zeros[i].row_value * conditions[pivot_index]);
            }
        }
    }

    // RESULT OF THE MATRIX
    let result = 0;
    for (let i = 0; i < restrictions_number; i++) {
        result += cb[i] * conditions[i];
    }

    // NEW MATRIX
    let matrix_n = {
        aux_contribution: cb,
        values_matrix,
        xj: conditions,
        result,
        function_coeficients,
        type,
        aux_type
    }

    // RECURSIVE RECALL
    board_handler(matrix_n);
    return;
}





export { board_handler }

