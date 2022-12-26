//* A TokenType will contain different types of tokens.
export enum TokenType {
    //? Literal Types
    Number,
    Identifier,
    // String,

    //? Keywords
    Let,
    Const,
    //? Grouping * Operators
    BinaryOperator,
    Equals,
    Semicolon,
    OpenParen,
    CloseParen,
    EOF // End of file
}

//* A dictionary for the reserved keywords
const KEYWORDS: Record<string, TokenType> = {
    variabila: TokenType.Let,
    constanta: TokenType.Const
}

export interface Token {
    value: string,
    type: TokenType,
}

//* A function that creates a token based on the value/type fields
function token(value = "", type: TokenType): Token {
    return {value, type};
}

function isAlpha(src: string) {
    return src.toUpperCase() != src.toLowerCase();
}

function isSkippable(src: string) {
    return src == ' ' || src == '\n' || src == '\t';
}

function isInt(str: string) {
    const c = str.charCodeAt(0);
    const bounds = ['0'.charCodeAt(0), '9'.charCodeAt(0)]

    return (c >= bounds[0] && c <= bounds[1])
}

//* A function that takes the sourceCode as a parameter and returns an array of tokens.
//* Used to tokenize a string.
export function Tokenize(sourceCode: string): Token[] {
    const tokens = new Array<Token>();
    const src = sourceCode.split("");

    //? Build each token until EOF
    //? We want to extract the token and then remove it. 'Shift' method used.
    while(src.length > 0) {
       
        if (src[0] == '(') {
            tokens.push(token(src.shift(), TokenType.OpenParen));
        } else if (src[0] == ')') {
            tokens.push(token(src.shift(), TokenType.CloseParen));
        } else if (src[0] == '+' || src[0] == '-' || src[0] == '*' || src[0] == '/' || src[0] == '%') {
            tokens.push(token(src.shift(), TokenType.BinaryOperator));
        } else if (src[0] == '=') {
            tokens.push(token(src.shift(), TokenType.Equals));
        } else if (src[0] == ';') {
            tokens.push(token(src.shift(), TokenType.Semicolon));
        } else {
            //? Handle multicharacter tokens ('<=' for example)

            //? Build number token
            if (isInt(src[0])) {
                let num = "";
                while (src.length > 0 && isInt(src[0])) {
                    num += src.shift();
                } 

                tokens.push(token(num, TokenType.Number));
            } else if (isAlpha(src[0])) {
                let ident = "";
                while (src.length > 0 && isAlpha(src[0])) {
                    ident += src.shift();
                } 

                //? check for reserved keywords
                const reserved = KEYWORDS[ident];

                if (typeof reserved == "number") { 
                    tokens.push(token(ident, reserved));
                } else {
                    tokens.push(token(ident, TokenType.Identifier));
                }
                
            } else if (isSkippable(src[0])) {
                src.shift(); //? Skip the current character
            } else {
                console.log("Caracter nerecunoscut: ", src[0]);
                Deno.exit(1);
            }
        }
    }

    tokens.push({type: TokenType.EOF, value: "EndOfFile"})
    return tokens;
}
