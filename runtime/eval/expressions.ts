import { AssignmentExpr, BinaryExpr,Identifier } from "../../frontend/AST.ts";
import Environment from "../environment.ts";
import { evaluate } from "../interpreter.ts";
import { NumberVal,RuntimeVal,MK_NULL } from "../values.ts";

function evaluateNumericBinaryExpr(lhs: NumberVal, rhs: NumberVal, operator: string): NumberVal {
    let result: number;
    
    if (operator == "+") {
        result = lhs.value + rhs.value;
    } else if (operator == "-") {
        result = lhs.value - rhs.value;
    } else if (operator == "*") {
        result = lhs.value * rhs.value;
    } else if (operator == "/") {
        // TODO: Division by zero check;
        result = lhs.value / rhs.value;
    } else {
        result = lhs.value % rhs.value;
    }

    return { value: result, type: "number" }
}

//* Evaluate expressions followed the binary operation type;
export function evaluateBinaryExpression(binop: BinaryExpr, env: Environment): RuntimeVal {
    const leftHandSide = evaluate(binop.left, env);
    const rightHandSide = evaluate(binop.right, env);

    if (leftHandSide.type == "number" && rightHandSide.type == "number") {
        return evaluateNumericBinaryExpr(leftHandSide as NumberVal, rightHandSide as NumberVal, binop.operator);
    }

    return MK_NULL();
}

export function evalIdentifier(ident: Identifier, env: Environment): RuntimeVal {
    const val = env.lookupVar(ident.symbol);
    return val;
}

export function evalAssignment(node: AssignmentExpr, env: Environment): RuntimeVal {
    if (node.assigne.kind !== "Identifier") {
        throw `Element invalid in interiorul expresiei de atribuire ${JSON.stringify(node.assigne)}`
    }

    const varName = (node.assigne as Identifier).symbol;
    return env.assignVar(varName, evaluate(node.value, env));
}