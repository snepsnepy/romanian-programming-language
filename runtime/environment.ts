import { RuntimeVal } from "./values.ts";

export default class Environment {
    //? Should keep track of the parent
    private parent?: Environment;
    private variables: Map<string, RuntimeVal>;
    private constants: Set<string>;

    constructor (parentENV?: Environment) {
        this.parent = parentENV;
        this.variables = new Map();
        this.constants = new Set();
    }

    public declareVar(varName: string, value: RuntimeVal, constant: boolean): RuntimeVal {
        //? Check if the variable it's already defined
        if (this.variables.has(varName)) {
            throw `Variabila ${varName} nu poate fi declarata. Este deja utilizata.`
        }

        this.variables.set(varName, value);

        if (constant) {
            this.constants.add(varName);
        }
        return value;
    }

    //* Will check if the environment contains the variable ('varName')
    //* If it exists, then will set the variable to the environment
    //* return the var value;
    public assignVar(varName: string, value: RuntimeVal): RuntimeVal {
        const env = this.resolve(varName);

        //? Cannot assign to constant;
        if (env.constants.has(varName)) {
            throw `Variabile ${varName} nu poate fi reatribuita. Aceasta este o constanta.`;
        }
        env.variables.set(varName, value);
        return value;
    }

    public lookupVar(varName: string): RuntimeVal {
        const env = this.resolve(varName);
        return env.variables.get(varName) as RuntimeVal;
    }

    //* 'Resolve' function will traverse the scope of environments to find a variable;
    //* Will check if our current scope has the variable 'varName';
    //* If we doesn't have a parent, then we will throw an error;
    //* Else it will go to the parent scope and repeat the process;
    public resolve(varName: string): Environment { 
        if (this.variables.has(varName)) 
            return this;
  
        if (this.parent == undefined) 
            throw `Variabila '${varName}' nu poate fi recunoscuta. Aceasta nu exista.`

        return this.parent.resolve(varName);
    }
}