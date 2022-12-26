# Romanian Programming Language
[![en](https://img.shields.io/badge/lang-en-blue.svg)](https://github.com/snepsnepy/romanian-programming-language/blob/main/README.md)
<p align="center">
    <img width="500" height="500" src="https://user-images.githubusercontent.com/78075261/209578509-783d7844-a329-49cf-b7f3-a7a3d4176585.png">
</p>

### Inceput ca si proiect personal, RPL vrea sa devina un limbaj de programare ce ii ofera utilizatorului posibilitatea de a scrie cod in limba romana, intr-un mod atractiv

##### Cuprins  
[Cum sa incepi](#headers)  
[Specificatiile Limbajului](#langspec)   
[Operatii cu numere binare](#binaryop)
 
<a name="headers"/>
<h2>Cum sa incepi</h2>

1. Pentru a putea rula proiectul, este necesar sa ai 'Deno' instalat. Vezi aici pasii instalarii: https://deno.land/manual@v1.29.1/getting_started/installation
2. Cloneaza proiectul
3. Mergi in interiorul directorului sursa, deschide terminal-ul si ruleaza comanda: `deno run -A main.ts`

Felicitari! Acum poti scrie cod folosind RPL. 😲 

<a name="langspec"/>
<h2>Specificatiile limbajului RPL</h2>

<b>Variabile normale</b> sunt identificatori ce nu fac parte din cuvintele cheie ale limbajului RPL. Nu uita ca numele variabilei nu poate fi format decat din litere mici, fara spatii sau alte semne de punctuatie. Acest tip de variabile pot fi reasignate.
```diff
- Nu uita, in RPL, declararea unei variabile, mereu trebuie sa se sfarseasca cu punct si virgula (';')
```

    variabila x = 10;
    variabila foo = (45 + 30) - 5;
    variabila bar = x + 30;
    

<b>Variabile constante</b> sunt la fel ca si variabilele normale, insa acestea nu pot fi reasignate. La declararea unei variabile constante, este necesara specificarea unei valori.
    
    constanta y = 30;
    constanta x = 10;
    
    constanta z; -> Aceasta va afisa un mesaj de eroare
    
    
<a name="binaryop"/>
<h2>Operatii cu numere binare</h2>

RPL ofera suport pentru operatii cu numere binare. Vezi exemplul de mai jos:

    variabila foo = 50;
    variabile bar = 30;
    
    foo - bar
    foo + bar
    foo / bar
    bar * foo
    
    
    
***RPL este inca in dezvoltare. Alte functionalitati urmeaza sa fie implementate. Multumesc!***
