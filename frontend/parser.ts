import { Stmt, Program, Expr, BinaryExpr, NumericLiteral, Identifier, VarDeclaration, AssignmentExpr, PrintExpr } from "./AST.ts";
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
            console.error("Eroare la parsare:\n", err, prev, "Se asteapta: ", type);
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
            
            case TokenType.Print:
                return this.parsePrintExpr();
            case TokenType.Let:
            case TokenType.Const:
                return this.parseVarDeclaration();

            default:
                return this.parseExpr();
        }
    }

    private parsePrintExpr(): Stmt {
        this.eat().type == TokenType.Print;
        let printedText = "";


        this.expect(
            TokenType.OpenParen,
            "Dupa folosirea cuvantului 'afiseaza' este necesara folosirea '('"
        )

        this.expect(
            TokenType.Quotation,
            "Este necesara folosirea '\"' dupa '('"
        )
        
        if (this.at().type != TokenType.OpenParen || this.at().type != TokenType.Quotation) {
            printedText += this.at().value.toString();
            this.eat();
        }

        this.expect(
            TokenType.Quotation,
            "Este necesara folosirea '\"' dupa specificarea textului."
        )

        this.expect(
            TokenType.CloseParen,
            "Este necesara folosirea ')' la finalul printarii."   
        )

       const print = {
            kind: "PrintExpr",
            value: printedText
       } as PrintExpr

       return print;
    }

    //* Structure of a variable declaration:
    //* CONST x;
    //* ( CONST | LET ) IDENTIFIER ( = | ; ) EXPR
    parseVarDeclaration(): Stmt {
        const isConstant = this.eat().type == TokenType.Const;
        const identifier = this.expect(
            TokenType.Identifier, 
            "Un nume este necesar dupa folosirea cuvintelor 'variabila' | 'constanta'"
        ).value;
        
        if (this.at().type == TokenType.Semicolon) {
            this.eat(); //Expect semicolon

            //? If the variable is not a constant and we have a semicolon after the identifier
            //? then we can return the variable. (else block);
            if (isConstant) {
                throw "Constanta necesita atribuirea unei valori. Nu a fost detectata o valoare."
            } 

            return { 
                kind: "VarDeclaration", 
                identifier,
                constant: false 
            } as VarDeclaration;
        }

        this.expect(
            TokenType.Equals, 
            "Este necesar semnul '=' urmat de o valoare."
        )

        const declaration = { 
            kind: "VarDeclaration", 
            value: this.parseExpr(), 
            identifier,
            constant: isConstant 
        } as VarDeclaration;

        this.expect(
            TokenType.Semicolon, 
            "Declararea variabilei necesita ';' la finalul expresiei."
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

