# Romanian Programming Language 
<p align="center">
    <img width="500" height="500" src="https://user-images.githubusercontent.com/78075261/209578509-783d7844-a329-49cf-b7f3-a7a3d4176585.png">
</p>

[![ro](https://img.shields.io/badge/lang-ro-yellow.svg)](https://github.com/snepsnepy/romanian-programming-language/blob/main/README.ro.md)

### Starting as a personal project, RPL wants to become a programming language that allows the user to write code in the Romanian language in a fun and interactive way.

##### Table of Contents  
[How to use](#headers)  
[Language Specifications](#langspec)   
[Binary Operations](#binaryop)
 
<a name="headers"/>
<h2>How to use</h2>

1. In order to run the project, Deno is required. See how to install Deno here: https://deno.land/manual@v1.29.1/getting_started/installation
2. Clone the project
3. Go inside the source folder, open the terminal and run: `deno run -A main.ts`

That's it! Now you can type RPL code. 😲 

<a name="langspec"/>
<h2>RPL Language Specifications</h2>

<b>Normal variables</b> are identifiers that are not RPL language keywords. Note that a variable name must contain only letters, no white spaces, no sybmols or numbers. They're also case-sensitive. This type of variables can be reassigned. 
```diff
- Do not forget, in RPL every variable declaration statement must end with a semicolon.
```

    variabila x = 10;
    variabila foo = (45 + 30) - 5;
    variabila bar = x + 30;
    

<b>Constant variables</b> are just like the normal variables but they can not be reassigned. When you declare this type of variables, a value must be provided.
    
    constanta y = 30;
    
    
<a name="binaryop"/>
<h2>Binary Operations</h2>

RPL offers support for binary operations. Code example:

    variabila foo = 50;
    variabile bar = 30;
    
    foo - bar
    foo + bar
    foo / bar
    bar * foo
    
    
    
***RPL is still under development, so stay tuned for more updates! Thank you!***
