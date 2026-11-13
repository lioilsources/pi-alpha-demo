Zde pouzity format JSON je bez uvozovek kolem nazvu hodnot,
protoze to dela mensi soubory, rychleji se nacitaji
a predevsim to highlighter v prohlizeci i editoru prehledneji barvi
a vizualne odlisuje nazvy od hodnot...

Pokud potrebujete klasicke JSON s uvozovkami kolem nazvu, tak nektera z moznosti:

1. Nabrat obsah toho JSON do zdroje Javascript
var A=[...];


2. Pouzit EvalScript
eval.exe -v In=*.json "EnumFiles(In,function(N,O){ var X:=Json.ParseFile(O.FullName,utf8); if(X)StoreFile(O.FullName,Json.Stringify(X,null,' '),utf8)&&SetFileTime(O.FullName,O.Modified) })"

// funkce StrObj(Obj) vraci JSON string bez uvozovek kolem hodnot
// JSON.stringify(Obj) vraci standardni JSON string vse na jedne radce...
// JSON.stringify(Obj,null,' ') vraci standardni JSON string, odradkovany...

3. Doplnit uvozovky v Javascriptu

var JsData; // nejak se sem nacte obsah JSON souboru do jednoho stringu
JsData=(''+JsData).replace(/([a-z0-9_]+):/gi,'"$1":'); // uvozovky kolem nazvu hodnot
var Data=JSON.parse(JsData);

4. Muzete pouzit jinou implementaci JSON v Javascriptu, treba v
https://heliograf.org/Hg/dynui54.js
si muzete vykopirovat blok od objektu JsonParser, pod tim funkci jsonParse()
a pripadne i naopak funkci jsonStr() pro kodovani objektu do tohoto zkraceneho formatu JSON...

