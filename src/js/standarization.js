import { simplex_handler } from "./simplex.js";

const standarization = () => {
    const operators = simplex_handler().restriction_operators;
    const conditions = simplex_handler().restriction_conditions;
    const coeficient = simplex_handler().variables_coeficients;
    const objective = simplex_handler().objective_value;

    const hol = [];
    const art = [];
    const variables_solution = [];
    const hol_values = [];
    const art_values = [];

    for(let i = 0; i < operators.length; i++) {
        hol.push({});
        art.push({});
    }

    for(let i = 0; i < operators.length; i++) {
        if(operators[i] == '<=') {
           hol[i].res_value = conditions[i];
           hol[i].contribution = 0;

           art[i].res_value = null;
           art[i].contribution = 0;

        } else {
            hol[i].res_value = null;
            hol[i].contribution = 0;

            art[i].res_value = conditions[i];
            art[i].contribution = objective == 'max' ? coeficient[0] * 1000 : coeficient[0] * -1000;                
        }
    }

    for(let i = 0; i < operators.length; i++) {
        variables_solution.push(0);
    }

    for(let i = 0; i < hol.length; i++) {
        hol_values.push(hol[i].res_value);
        art_values.push(art[i].res_value);
    }

    const basic_solution = (variables_solution.concat(hol_values.concat(art_values))).filter(item => item != null);

    console.log(basic_solution);


    return {
        hol, 
        art,
        basic_solution
    }
}


export {standarization}