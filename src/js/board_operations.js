import { matrix } from "./boards.js"
import { simplex_handler } from "./simplex.js";


const board_handler = (matrix) => {
    // RESULT
    const cb = matrix.aux_contribution;
    const conditions = simplex_handler().restriction_conditions;

    let result = 0;
    for(let i = 0; i < cb.length; i++) {
        result += cb[i] * conditions[i];
    }

    // fj - cj




}

export { board_handler }