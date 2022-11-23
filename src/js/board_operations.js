import { dom_element } from "./dom.js";
import { simplex_handler } from "./simplex.js";


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

    console.log(fjcj);
    console.log(function_coeficients);
    console.log(cb);
    console.log(values_matrix);


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

    let end_condition;
    if(problem_objective === 'max') {
        end_condition = fjcj.every(element => element >= 0);
    } else {
        end_condition = fjcj.every(element => element <= 0);
    }

    if(end_condition) {
        console.log(matrix)
        let result = 0;
        for (let i = 0; i < restrictions_number; i++) {
            result += cb[i] * conditions[i];
        }

        console.log(result);

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

    console.log(fjcj);
    console.log(column_value);
    for (let i = 0; i < fjcj.length; i++) {
        if (fjcj[i] === column_value) {
            select_column = i;
        }
    }

    let pivot_column = values_matrix[select_column];

    console.log(pivot_column);


    // FIND PIVOT
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

    console.log(pivot_value);
    console.log(pivot_index);

    // Replace the contribution 
    for (let i = 0; i < cb.length; i++) {
        if (i === pivot_index) {
            cb[i] = function_coeficients[select_column];
        }
    }

    // Operate to get the 1 into the pivot row 
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

    // Operate to get the zeros into the rest of the rows
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

    let result = 0;
    for (let i = 0; i < restrictions_number; i++) {
        result += cb[i] * conditions[i];
    }

    console.log(cb)
    console.log(values_matrix);
    console.log(conditions);
    console.log(result);
    console.log(function_coeficients);;

    let matrix_2 = {
        aux_contribution: cb,
        values_matrix,
        xj: conditions,
        result,
        function_coeficients
    }

    board_handler(matrix_2);
    return;
    // board_handler(matrix_2, 3);
}





export { board_handler }

