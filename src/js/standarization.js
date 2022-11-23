import { simplex_handler } from "./simplex.js";

const standarization = () => {
    const operators = simplex_handler().restriction_operators;
    const conditions = simplex_handler().restriction_conditions;
    const coeficient = simplex_handler().variables_coeficients;
    const objective = simplex_handler().objective_value;

    const hol = [];
    const hol_values = [];

    for(let i = 0; i < operators.length; i++) {
        hol.push({});
    }

    for(let i = 0; i < operators.length; i++) {
        if(operators[i] == '<=') {
           hol[i].res_value = conditions[i];
           hol[i].contribution = 0;
           hol[i].base_contribution = 0;
           hol[i].res_contribution = 1;
           hol[i].type = 'hol';

        } else {
            hol[i].res_value = conditions[i];
            hol[i].contribution = objective == 'max' ? coeficient[0] * -1000 : coeficient[0] * 1000;
            hol[i].base_contribution = 0;
            hol[i].res_contribution = -1;
            hol[i].type = 'art';            
        }
    }

    for(let i = 0; i < hol.length; i++) {
        hol_values.push(hol[i].res_value);
    }


    return {
        hol, 
    }
}


export {standarization}