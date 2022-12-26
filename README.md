# Romanian Programming Language 
<p align="center">
    <img width="500" height="500" src="https://user-images.githubusercontent.com/78075261/209578509-783d7844-a329-49cf-b7f3-a7a3d4176585.png">
</p>

[![ro](https://img.shields.io/badge/lang-ro-yellow.svg)](https://github.com/snepsnepy/romanian-programming-language/blob/main/README.ro.md)

### Starting as a personal project, RPL wants to become a programming language that allows the user to write code in the Romanian language.

##### Table of Contents  
[How to use](#headers)  
[How to use](#langspec)
 
<a name="headers"/>
<h2>How to use</h2>

1. In order to run the project, Deno is required. See how to install Deno here: https://deno.land/manual@v1.29.1/getting_started/installation
2. Clone the project
3. Go inside the source folder, open the terminal and run: `deno run -A main.ts`

That's it! Now you can type RPL code. 😲 

<a name="langspec"/>
<h2>RPL Language Specification</h2>

<b>Normal variables</b> are identifiers that are not RPL language keywords. Note that a variable name must contain only letters, no white spaces, no sybmols or numbers. They're also case-sensitive. This type of variables can be reassigned. <span style="color:red;">Do not forget, in RPL every variable declaration statement must end with a semicolon.</span>

    variabila x = 10;
    
