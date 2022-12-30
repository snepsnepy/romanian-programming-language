// deno-lint-ignore-file no-empty-interface
export type NodeType = 
//? Statements
| "Program"
| "VarDeclaration"
| "PrintExpr"

//? Expressions
| "AssignmentExpr"
| "NumericLiteral"
| "Identifier" 
| "BinaryExpr"

export interface Stmt {
    kind: NodeType;
}

export interface Program extends Stmt {
    kind: "Program";
    body: Stmt[];
}

export interface VarDeclaration extends Stmt {
    kind: "VarDeclaration";
    identifier: string;
    constant: boolean;
    value?: Expr;
}

export interface Expr extends Stmt {}

export interface BinaryExpr extends Expr {
    kind: "BinaryExpr";
    left: Expr;
    right: Expr;
    operator: string;
}

export interface Identifier extends Expr {
    kind: "Identifier";
    symbol: string;
}

export interface AssignmentExpr extends Expr {
    kind: "AssignmentExpr",
    assigne: Expr,
    value: Expr
}

export interface NumericLiteral extends Expr {
    kind: "NumericLiteral";
    value: number;
}

export interface PrintExpr extends Expr {
    kind: "PrintExpr";
    value: string;
}