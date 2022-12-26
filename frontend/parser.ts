import { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier, VarDeclaration, AssignmentExpr } from "./AST.ts";
import { Tokenize, Token, TokenType } from "./lexer.ts";

export default class Parser {
    private tokens: Token[] = [];

    private notEof(): boolean {
        return this.tokens[0].type != TokenType.EOF;
    }

    private at() {
        return this.tokens[0] as Token;
    }

    private eat() {
        const prev = this.tokens.shift() as Token;
        return prev;
    }

    private expect(type: TokenType, err: any) {
        const prev = this.tokens.shift() as Token;
        if (!prev || prev.type != type) {
            console.error("Parser Error:\n", err, prev, "Expecting: ", type);
            Deno.exit(1);
        }

        return prev;
    } 

    //* produceAST - We use this function to produce an AST of type Program where each element in the body will be an array of statements
    public produceAST(src: string): Program {
        this.tokens = Tokenize(src);
        const program: Program = {
            kind: "Program",
            body: [],
        }

        //? Parse until EOF
        //? Append to the body every statement we find
        while (this.notEof()) {
             program.body.push(this.parseStmt())
        }

        return program
    }

    private parseStmt(): Stmt {
        //skip to parse expr
        switch (this.at().type) {
            
            case TokenType.Let:
            case TokenType.Const:
                return this.parseVarDeclaration();

            default:
                return this.parseExpr();
        }
    }

    //* Structure of a variable declaration:
    //* CONST x;
    //* ( CONST | LET ) IDENTIFIER ( = | ; ) EXPR
    parseVarDeclaration(): Stmt {
        const isConstant = this.eat().type == TokenType.Const;
        const identifier = this.expect(
            TokenType.Identifier, 
            "Expected identifier name following let | const keywords"
        ).value;
        
        if (this.at().type == TokenType.Semicolon) {
            this.eat(); //Expect semicolon

            //? If the variable is not a constant and we have a semicolon after the identifier
            //? then we can return the variable. (else block);
            if (isConstant) {
                throw "Must assign value to constant expression. No value provided."
            } 

            return { 
                kind: "VarDeclaration", 
                identifier,
                constant: false 
            } as VarDeclaration;
        }

        this.expect(
            TokenType.Equals, 
            "Expected equals token following identifier in var declaration."
        )

        const declaration = { 
            kind: "VarDeclaration", 
            value: this.parseExpr(), 
            identifier,
            constant: isConstant 
        } as VarDeclaration;

        this.expect(
            TokenType.Semicolon, 
            "Variable declaration statement must end with semicolon."
        )

        return declaration;
    }

    private parseExpr(): Expr {
        return this.parseAssignmentExpr();
    }

    private parseAssignmentExpr(): Expr {
        const left = this.parseAdditiveExpr(); //Switch this out with objectExpr

        if (this.at().type == TokenType.Equals) {
            this.eat(); // Advance past equals
            const value = this.parseAssignmentExpr();

            return {
                kind: "AssignmentExpr",
                assigne: left,
                value,    
            } as AssignmentExpr;
        }

        return left;
    }

    // (10 + 5) - 5
    private parseAdditiveExpr(): Expr {
        let left = this.parseMultiplicativeExpr();

        //? I use this loop to parse the operator itself
        while ( this.at().value == "+" ||  this.at().value == "-") {
            const operator = this.eat().value;
            const right = this.parseMultiplicativeExpr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr;
        }

        return left;
    }

    private parseMultiplicativeExpr(): Expr {
        let left = this.parsePrimaryExpr();

        //? I use this loop to parse the operator itself
        while ( this.at().value == "/" ||  this.at().value == "*" ||  this.at().value == "%") {
            const operator = this.eat().value;
            const right = this.parsePrimaryExpr();
            left = {
                kind: "BinaryExpr",
                left,
                right,
                operator,
            } as BinaryExpr;
        }

        return left;
    }

    private parsePrimaryExpr(): Expr {
        const tk = this.at().type;

        switch (tk) {
            case TokenType.Identifier:
                return { 
                    kind: "Identifier", 
                    symbol: this.eat().value 
                } as Identifier;

            case TokenType.Number:
                return { 
                    kind: "NumericLiteral", 
                    value: parseFloat(this.eat().value) 
                } as NumericLiteral;

            case TokenType.OpenParen: {
                this.eat();
                const value = this.parseExpr();
                this.expect(TokenType.CloseParen, "Element invalid gasit in interiorul expresiei dintre paranteze. Astept inchiderea parantezei...");
                return value;
            }

            default: 
                console.error("Element invalid gasit in timpul analizarii!", this.at());
                Deno.exit(1);
        }
    }

    //Handle Orders of Prescidence
    // AssignmentExpr
    // AdditiveExpr
    // MultiplicativeExpr
    // PrimaryExpr
}

