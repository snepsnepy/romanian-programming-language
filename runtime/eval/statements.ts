import { Program, VarDeclaration } from "../../frontend/AST.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { RuntimeVal,MK_NULL } from "../values.ts";

export function evaluateProgram(program: Program, env: Environment): RuntimeVal {
    //* Keep the track of the last evaluated block;
    let lastEvaluated: RuntimeVal = MK_NULL();

    //* Iterate over the program body;
    for (const statement of program.body) {
        lastEvaluated = evaluate(statement, env);
    }

    return lastEvaluated;
}

export function evaluateVarDeclaration(declaration: VarDeclaration, env: Environment): RuntimeVal {
    const value = declaration.value ? evaluate(declaration.value, env) : MK_NULL();
    
    return env.declareVar(declaration.identifier, value, declaration.constant);
}