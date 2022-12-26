import { RuntimeVal, NumberVal } from "./values.ts"
import { Stmt, BinaryExpr, Program, Identifier, VarDeclaration, NumericLiteral, AssignmentExpr } from "../frontend/AST.ts"
import Environment from "./environment.ts";
import { evalAssignment, evalIdentifier,evaluateBinaryExpression } from "./eval/expressions.ts";
import { evaluateProgram,evaluateVarDeclaration } from "./eval/statements.ts";

// * Used this function to evaluate the astNodes and translating them into values;
export function evaluate(astNode: Stmt, env: Environment): RuntimeVal {
    switch (astNode.kind) {
        case "NumericLiteral": 
        return {
            value: ((astNode as NumericLiteral).value),
            type: "number",
          } as NumberVal;

        case "Identifier":
            return evalIdentifier(astNode as Identifier, env);
        
        case "AssignmentExpr":
            return evalAssignment(astNode as AssignmentExpr, env);

        case "BinaryExpr": 
            return evaluateBinaryExpression(astNode as BinaryExpr, env);

        case "Program":
            return evaluateProgram(astNode as Program, env);

        case "VarDeclaration":
            return evaluateVarDeclaration(astNode as VarDeclaration, env);

        default: 
            console.error("This AST node has not yet been set up for interpretation.", astNode);
            Deno.exit(0);
        }
}


