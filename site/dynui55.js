/* Code by P.A.Semi 2021-11..2026-01 */
//various utility functions...

function Ce1(T,F){var E=document.createElement(T);return(F&&F(E))||E}
function Sa(E,N,V){if(!V&&IsObj(N)){for(V in N)Sa(E,V,N[V]);return E}E&&N&&E.setAttribute(N,V||'');return E}
function Ra(E,N){E&&N&&E.removeAttribute(N);return E}
function Ga(E,N){return(E&&N&&E.getAttribute)?E.getAttribute(N):null}
function Sy(E,S){if(IsObj(S)){E&&Sv(E.style,S);return E}return Sa(E,'style',S)}
function Cls(E,C){return Sa(E,'class',C)}
function Sv1(E,V,n){if(E&&V)for(n in V)E[n]=V[n];return E}
function Sv(E,vv){var i,a=arguments,c=a.length;for(i=1;i<c;i++)Sv1(E,a[i]);return E}
function Svne(E,vv){var O=Object,n,i,a=arguments,c=a.length,V;if(!O||!O.defineProperty)return Sv.apply(null,a);
 if(E)for(i=1;i<c;i++)if(V=a[i])for(n in V)O.defineProperty(E,n,{value:V[n],enumerable:!1});
 return E
}
function San(E,Vs){return Sa(E,Vs)}
function Cinp(V){return Sv(Ce1('input'),V)}
function Hinp(N,V){return Cinp({type:'hidden',name:N||'',value:V||''})}
function Inh(E,T){E&&(E.innerHTML=T||'');return E}
function Tx(E,T){if(E)('innerText' in E)?(E.innerText=T||''):(E.textContent=T||'');return E}
function Txn(T){return document.createTextNode(T||'')}
function Fu(E,F){return(IsFunc(F)&&F(E))||E}
function bi0(id){return document.getElementById(id)||null}
function bid(id){return bi0(id)||{stub:true,style:{}}}
function IsObj(O){return O&&(typeof O=='object')}
function IfObj(O){return IsObj(O)?O:null}
function IsFunc(F){return F&&(typeof F=='function')}
function IsNum(N){return(typeof N=='number')}
function IsElem(E){return IsObj(E)&&('parentNode' in E)}
function IsStr(S){return typeof S=='string'}
function IfElem(E){return IsElem(E)?E:null}
function Soon(F){if(IsFunc(F))window.setTimeout(F,10)}
function Apc(P,C,B){P&&C&&P.insertBefore(C,B||null);return P}
function App(P,Cn){var i=1,Ar=arguments,C;while(i<Ar.length)if(C=Ar[i++])Apc(P,C);return P}
function CLab(T){return Tx(Ce('span','lab8'),T)}
function IsNull(O){return(!O&&(O===undefined||O===null))}
function Cancel(E){(E=E||{}).stopPropagation&&E.stopPropagation();E.preventDefault&&E.preventDefault();return E.returnValue=!1}
function AEvent(E,N,F,bn){if(IsNull(bn)&&typeof F=='boolean')bn=F;if(IsObj(N)){for(F in N)AEvent(E,F,N[F],bn);return E}E&&N&&(E.addEventListener?E.addEventListener(N,F,bn||false):E.attachEvent?E.attachEvent('on'+N,F):(E['on'+N]=F));return E}
function REvent(E,N,F){if(IsObj(N)){for(F in N)REvent(E,F,N[F]);return E}if(E&&N)E.removeEventListener?E.removeEventListener(N,F):E.detachEvent?E.detachEvent('on'+N,F):E['on'+N]=null;return E}
function DEvent(El,ev,bu){try{if(IsStr(ev))ev=new CustomEvent(ev,bu?IsObj(bu)?bu:{bubbles:!0}:{});if((El=El||D.body).dispatchEvent&&IsObj(ev))El.dispatchEvent(ev)}catch(x){}return El}
function Kchar(K,C){return (K>=0x41)&&(K<=0x5a)?String.fromCharCode(K):C||K}
function EKey(E){if(E||(E=window.event))return Kchar(E.which||E.keyCode)}
function Eke(E){return(E||(E=window.event))?Kchar(E.keyCode,E.key||EKey(E)):null}
function EShift(E){return(E.ctrlKey?'c':'')+(E.shiftKey?'s':'')+(E.altKey?'a':'')}
function ETarget(E,Th){return(E||window.event||{}).target||(Th&&(Th!=window)?Th:null)}
function IsTag(E,t){return(''+((E&&E.tagName)||'')).toLowerCase()==t}
function Vis(E,v){var S=E&&E.style;if(S)S.visibility=v||'visible';return E}
function Hid(E){return Vis(E,'hidden')}
function Disp(E,d){var S=E&&E.style;if(S)S.display=d||'block';return E}
function Und(E){return Disp(E,'none')}
function Unl(E,p){E&&(p=E.parentNode)&&p.removeChild(E);return E}
function Opa(E,op){var S=E&&E.style;if(S){S.opacity=op;S.filter='alpha(opacity='+(op*100)+')'}return E}
function nop(){}

function CLog(args){var C=window.console;C&&C.log&&C.log.apply(C,arguments)}
var Con=IfObj(window.console)||{log:nop,error:nop};

function tryFu(fu,args){try{if(IsFunc(fu))return(args=[].slice.call(arguments),args.shift())&&fu.apply(null,args)}catch(x){}}

//unquote
function unq(S){var q;switch(q=(S=(S||'').trim()).substr(0,1)){case'"':case"'":{return S=S.substr(1),(q=S.lastIndexOf(q))+1?S.substr(0,q):S}default:return S}}

function MvSubNodes(Dst,Src){var El;while(El=Src.firstChild){Src.removeChild(El);Apc(Dst,El)}return Dst}

function IsHtml(S){if(S&&IsStr(S)){var A;
 return((S.indexOf('&')+1)&&/&\#?[a-z0-9]+;/i.test(S))||!!((S.indexOf('<')+1)&&(A=/<([a-z0-9]+)[^<>]*>/i.exec(S))&&(S.indexOf('</'+A[1]+'>')+1))
}}

function Ce(tag,mixed){
 var Ar=arguments,C=Ar.length,i,par,n=null,El=IsElem(tag)?tag:tag?Ce1(tag):n,ma,na,op,v,fu,pr,o,co,q;
 Ce.init||init();
 for(i=1;i<C;i++)if(par=Ar[i])switch(typeof par){
  case 'string':{
   if(((q=(pr=par.trim()).substring(0,1))=='"')||(q=="'")){// "quoted" -- innerText
    par=pr.substring(1);((op=par.lastIndexOf(q))>=0)&&!par.substring(op+1).trim()&&(par=par.substring(0,op));
    if(IsHtml(par)){El.firstChild?MvSubNodes(El,Inh(Ce('div'),par)):Inh(El,par)}else Apc(El,Txn(par));
    par=pr=n;
    break
   }
   o=par.indexOf('=')+1;co=par.indexOf(':')+1;
   if(!o&&!co&&(ma=Ce.rC.exec(par))){//'className'
    Cls(El,((Ga(El,'class')||'')+' '+par).trim())
   }else
   if((o||co)&&(ma=Ce.rA.exec(par))){//'a=value' 'css:props'
    na=ma[1]+ma[2];v=ma[4];pr='';
    switch(op=ma[3]){
     case ':':{//add to style...
      o=Ga(El,'style')||'',Sy(El,o+(o?';':'')+par);
      break
     }
     case '-=':{//'a-=value'
      v=unq(v);
      ((o=(pr=' '+(Ga(El,na)||'')+' ').indexOf(' '+v+' '))>=0)&&Sa(El,na,(pr.substring(0,o)+' '+pr.substring(o+v.length+1)).trim());
      break
     }
     case '+=':pr=(Ga(El,na)||'')+' ';//'a+=value'
     case '=':{//'a=value'
      Sa(El,na,pr+unq(v));
      break
     }
    }
    par=n
   }else
   if(co&&(ma=Ce.rP.exec(par))){//'prop:', value follows...
    na=ma[1];par=n;v=Ar[++i];
    El&&(El[na]=v);
   }else{
    Con.log('Ce unknown:',par);//?
   }
   ma=n;break
  }
  case 'object':{IsElem(par)?Apc(El,par):Array.isArray(par)?Ce.apply(null,[El].concat(par)):Sv(El,par);break}
  case 'function':{El=IfElem(par(El))||El;par=n;break}
 }
 function init(){Sv(Ce,{init:!0,rA:/^\s*([a-z]+:|)([a-z0-9_\-$]+)([:=]|\+=|-=)(.*)/i,rC:/^\s*([a-z_\-$][^:=\(\)\[\]]+)\s*$/i,rP:/^\s*([a-z0-9_\-$]+)\s*:\s*$/i})}
 return El
}

function Cinp2(mixed){var A=Arguments;[].unshift.call(A,'input');return Ce.apply(null,A)}

function ICss(id,CssText){var S,Se;
 (!CssText)&&(typeof id=='string')&&(id.indexOf('\x7b')+1)&&(CssText=id,id=null);
 if(!id||!(Se=bi0(id))||Se.stub)try{
  Apc(document.head,Se=Ce('style',function(S){id&&(S.id=id)}));
  try{Se.textContent=CssText}catch(x){Con.error(x)}
  S=Se.sheet;
  if(!S.cssRules.length)(''+CssText).replace(/\s*([^\{\}]+)\s*\{([^\{\}]*)\}/g,function(M,sel,css){try{return S.insertRule(sel+'{'+css+'}',S.cssRules.length),''}catch(x){Con.error(x)}})
 }catch(E){Con.error(E)}
 if(S=S||Se.sheet)S.insRule=function(rule,index){this.insertRule(rule,IsNull(index)?this.cssRules.length:index);return this};
 return S
}

function Ccb(V,T){
 var C,S=Ce('span',C=Sv(Cinp({type:'checkbox'}),V)),L=Ce('label');
 if(T||(T=V?V.Label:'')){Apc(S,S.lab=Tx(L,T));L.cb=C;L.onmousedown=function(C){if(C&&C.button)return;C=this.cb;C.focus();C.checked=!C.checked,DEvent(DEvent(C,'click'),'change');return!1}}
 return S
}

function gbt(E,t){return (E?E.getElementsByTagName(t):0)||[]}
function gbc(E,c){return(E&&E.getElementsByClassName?E.getElementsByClassName(c):Find(E,[]))||[];function Find(E,A){if(HasClass(E,c))A.push(E);E=E.firstElementChild;while(E){Find(E,A);E=E.nextElementSibling};return A}}

function ForClass(W,C,F){ForList(gbc(W||document.body,C),F)}
function ForTag(W,T,F){ForList(gbt(W||document.body,T),F)}
function ForList(L,F){var i,E;if(L)for(i=0;i<L.length;i++)(E=L[i])&&F(E)}

function Qs(E,S){if(S&&IsObj(E)&&'querySelector' in E)return E.querySelector(S);else if(IsStr(E))return Qs(document,E)}
function Qsa(E,S){if(S&&IsObj(E)&&'querySelectorAll' in E)return E.querySelectorAll(S);else if(IsStr(E))return Qsa(document,E)}
function QsA(E,S){return[].slice.call(Qsa(E,S)||[])}

function ACat(arrays){var R=[],i,Ar=arguments,c1=Ar.length,A,j,c2;
 for(i=0;i<c1;i++)if(A=Ar[i])if(IsObj(A)&&('length' in A))for(j=0,c2=A.length;j<c2;j++)R.push(A[j]);else R.push(A);
 return R
}

function FindAttr(A,V){var Found=null;
 function Find(E){
  if(!E)return;
  if(Ga(E,A)==V)return Found=E;
  for(E=E.firstElementChild;E;E=E.nextElementSibling)if(Find(E))return!0
 }
 return Find(document.body),Found
}

function FindParent(E,T){while(E&&!IsTag(E,T))E=E.parentNode;return E}

function HasClass(E,C){return E?((Ga(E,'class')||'').split(/\s+/g).indexOf(C)>=0):!1}
function AddClass(E,C){if(E&&C&&!HasClass(E,C))Cls(E,(C+' '+(Ga(E,'class')||'')).trim());return E}
function RemClass(E,C){if(E&&C){var A=(Ga(E,'class')||'').trim().split(/\s+/g),i=A.indexOf(C);if(i>=0){A.splice(i,1);Cls(E,A.join(' '))}}return E}

function UrlHost(U){
 var A=/\x2f\x2f([^\x2f]+)\x2f/i.exec(U);
 return A?A[1]:null
}

function atou(S){return decodeURIComponent(escape(atob(S)))} //base64 decode
function utoa(S){return btoa(unescape(encodeURIComponent(S)))} //base64 encode
function urlEncode(S){return encodeURIComponent(S||'')}

function LoadScript(src,onload,asy){
 var sc='script',D=document,S=D.createElement(sc),S0=gbt(D,sc)[0],R=S;
 if(onload)S.onload=onload;else{
  var re,d,rs=function(o){re=o,d=1},rj=function(e){re=e,d=2};
  R=new Prom(function(res,rej){d?d-1?rej(re):res(re):(rs=res,rj=rej)});
  R[sc]=Sv(S,{onload:function(f){S&&Con.log('loaded ',src),f=rs,R[sc]=null,R=rs=0,f&&f(S),S=0},onerror:function(f){Con.log('error loading ',src,f&&f.message||f),f=rj,R[sc]=null,R=rs=rj=0;f&&f(S),S=0}})
 }
 if(asy)S.async=S.defer=!0;
 S.src=src;
 S0.parentNode.insertBefore(S,S0);
 S0=null;
 return R
}

function PLoadImage(url){
 // returns Prom, resolves to <img> element
 var ok,bd,Im=Ce('img'),P=new Prom(function(Res,Rej){ok=Res;bd=Rej;Sv(P.Img=Im,{onload:DoLd,onerror:DoErr,src:url})});
 function DoLd(){ok&&ok(Im);Clr()}
 function DoErr(E){bd&&bd((E&&E.message)||'Image load error');Clr()}
 function Clr(){ok=bd=Im=P=null}
 return P
}

function Prom(Fu){if(!(this instanceof Prom))return new Prom(Fu);
 // new Prom(function(resolve,reject))
 var P=this;
 P._s=3;
 return IsFunc(Fu)&&setTimeout(function(){
  function _Rs(Value){P._resolve(Value)}
  function _Rj(Reason){P._reject(Reason)}
  try{Fu(_Rs,_Rj)}catch(E){_Rj(E)}
 }),P
}
Prom.prototype=(function(){
 function addHandler(P1,P2,onFu,onErr){
  if(IsFunc(onFu))P2._onFulfilled=onFu;
  if(IsFunc(onErr))P2._onError=onErr;
  P2._Parent=P1;
  (P1._s==3)?(P1._ha||(P1._ha=[])).push(P2):Sched(P1,P2);
  return P2
 }
 function Sched(P1,P2){
  setTimeout(function(){
   var res,hfu=(P1._s!==1)?P2._onFulfilled:P2._onError;
   if(P2._Parent==P1)P2._Parent=null;
   if(!hfu){Settle(P2,P1._s,P1._v);return}
   try{res=hfu(P1._v)}catch(E){Settle(P2,1,E);return}
   SettleX(P2,res)
  })
 }
 function Settle(P,state,value){
  if(P._s==3){
   P._s=state;P._v=value;
   var i,A=P._ha,l=A?A.length:0;
   for(i=0;i<l;i++)Sched(P,A[i]);
   P._ha=null
  }
  return P
 }
 function SettleX(P,x){
  if(x==P)return Settle(P,1,'Circular prom chain');
  if(x&&(IsFunc(x)||IsObj(x))){
   var xthen;try{xthen=x.then}catch(E){return Settle(P,1,E)}
   if(IsFunc(xthen)){
    if(IsProm(x))SettleXthen(P,x,xthen);
    else setTimeout(function(){SettleXthen(P,x,xthen)});
    return P
   }
  }
  return Settle(P,2,x)
 }
 function SettleXthen(P,x,xthen){try{xthen.call(x,function(y){x&&(x=0,SettleX(P,y))},function(r){x&&(x=0,Settle(P,1,r))})}catch(E){x&&(x=0,Settle(P,1,E))}}
 function IsProm(P){return P&&IsFunc(P._IsProm)?P._IsProm():!1}
 // special constructors:
 Prom.resolve=function(Value){return Settle(new Prom(),2,Value)};
 Prom.reject=function(Reason){return Settle(new Prom(),1,Reason)};
 return{
  then:function(onFulfill,onReject){return addHandler(this,new Prom(),onFulfill,onReject)},
  "catch":function(onError){return this.then(undefined,onError)},
  "finally":function(onFinally){
   var P=this;
   return P.then(function(V){
    return P.resolve(onFinally()).then(function(){return V})
   },function(er){
    return P.resolve(onFinally()).then(function(){throw er})
   })
  },
  valueOf:function(){return this._v},
  _resolve:function(Value){return Settle(this,2,Value)},
  _reject:function(Reason){return Settle(this,1,Reason)},
  _IsProm:function(){return!0}
 }
})();

function Now(){return Date.now()}

function clPro(){var P=window.Promise;return(P&&P.resolve)?P:Prom}
function Pres(r){return clPro().resolve(r)}
function Prej(e){return clPro().reject(e)}
function nPro(){//returns{res,rej,then,catch}
 var e,r,E,R,rs,rj,P=new(clPro())(function(s,j){r?s(R):e?j(E):P?(P.res=s,P.rej=j,P=0):(rs=s,rj=j)});
 P.res=rs||function(a){R=a,r=1};P.rej=rj||function(b){E=b,e=1};//stubs or already
 return P
}
function Pwai(t){var P;return setTimeout(function(){P&&P.res(),P=0},+t||1000),Sv(P=nPro(),{abort:function(){var p=P;P=0;p&&p.rej('abort')}})}
function aniwait(t){return Pwai.bind(null,t)}
function ProC(arrThen){var ctx={};function _c(p){return p.ctx=ctx,p}return[].reduce.call(arguments,function(P,T){
 switch(typeof T){case'function':return _c(P.then(T));case'object':
  if(Array.isArray(T)){
   if(T.length==2&&T[0]===0&&typeof(T[1])=='function')return _c(P.catch(T[1]));//[0,catch]
   return _c(P.then((function(T){return function(v){return ProC([v].concat(T))}})(T)))// sub-chain, new ctx?
  }else if(IsFunc(T.then))return(function(T,c){return function(v){return T?T.ctx=ctx:T,T}})(T,ctx);
 default:return _c(P.start?Pres(T):P.then((function(T){return function(v){return T}})(T)))
 }
},Sv(Pres(1),{start:1}))}

function Anim(E,v1,v2,t,n,on){
 E=E||Ce('span');
 var ex=Now()+(t=+t||1000),st=t/(n=+n||8),p,S=E.style,ai=[],vo,vn,un,l;
 var ab,rs,rj,P=new(window.Promise||Prom)(function(s,j){rs=s,rj=j});
 if(on)P=P.then(function(r){return on(r)||r});
 v1=v1||{};
 function nun(v,a){un='';if(a=/^\s*(-?\+?[0-9.]+)([a-z]*)\s*$/.exec(v)){un=a[2];v=a[1]}return parseFloat(v)}
 //!!!todo - color,object{clone,walk,valueOf}
 //!!!todo - ai.push(Sv([...],{apply:function(f){...}}))
 //!!!todo - ai.forEach(function(it){it.apply(f)})
 for(p in v2)if(!IsNull(vo=nun(v1[p]))||!IsNull(vo=nun(S[p])))if(!IsNull(vn=nun(v2[p])))ai.push([S,p,vo,vn+un,(vn-vo)/n,un]);
 S=v1=v2=0;
 function doFin(){
  ai&&ai.forEach(function(it,s,p){(s=it[0])&&(p=it[1])&&(s[p]=it[3])}),ai=0;
  rs(E);
  P=rs=rj=0
 }
 function doStep(){
  if(ab||!--n||Now()>ex)return doFin();
  ai.forEach(function(it,s,p,o,k){isNaN(k=it[4])||(s=it[0])&&(p=it[1])&&(s[p]=(it[2]+=k)+it[5])});
  st&&setTimeout(doStep,st)
 }
 setTimeout((l=ai.length)?doStep:doFin,l?st:t);
 return Sv(P,{abort:function(){ab=1;rs=rj}})//!!!todo: abort() aborts last only!
}

function defGs(o,n,g,s,e){var p,O=Object||{};return(IsObj(o)&&n&&g||s)?O.defineProperty?O.defineProperty(o,n,p=Sv(Sv(Sv({},g&&{get:g}),s&&{set:s}),e!==undefined&&{enumerable:e}))&&p:!1:!1}
function noEnum(P){var O=Object,g,d,n,v;if(O)if(g=O.getOwnPropertyDescriptor)if(d=O.defineProperty){for(n in P)if(IsObj(v=g.call(O,P,n)))v.enumerable=!1,d.call(O,P,n,v);return P}}
function setC(O,f,b){return IsNull(f)||Sy(O,{color:f}),IsNull(b)||Sy(O,{backgroundColor:b}),O}

//Clr Color
try{function Clr(r,g,b,a){return(this instanceof Clr)?this.init(r,g,b,a):(IsNull(r)?null:IsObj(r)?(r instanceof Clr)?r.mix(g,b,a):setC(r,g,b):new Clr(r,g,b,a))}
!function(){var O=Object,rn=Math.round,ap=[],P=Clr.prototype=noEnum({
 init:function(r,g,b,a){
  if(IsStr(r)&&r.substr(0,1)=='#')this.parseRgb(r);
  else if(!g&&!b&&IsObj(r))this.assign(r);
  else this.fr=fc(r),this.fg=fc(g),this.fb=fc(b),IsNull(a)||(this.fa=fc(a));
  return this
 },
 clone:function(){return new Clr(this.fr,this.fg,this.fb,this.fa)},
 assign:function(s,d){d=this;
  function co(nn){var f=s[nn],i,c,a;if(f!==undefined)return fc(f);for(i=1,a=arguments,c=a.length;i<c;i++)if((f=s[a[i]])!==undefined)return fc(f);return null}
  d.fr=co('fr','r','R','red');d.fg=co('fg','g','G','green');d.fb=co('fb','b','B','blue');d.fa=co('fa','a','A','alpha')
 },
 walk:function(C2,f){
  if(f)if(C2=C2?(typeof C2=='object'&&C2 instanceof Clr)?C2:new Clr(C2):0){
   this.fr=wf(this.fr,C2.fr,f);
   this.fg=wf(this.fg,C2.fg,f);
   this.fb=wf(this.fb,C2.fb,f);
   if(!IsNull(C2.fa))this.fa=wf(this.fa,C2.fa,f)
  }
  return this
 },
 mix:function(cc){return ap.filter.call(arguments,function(c){this.walk(c,0.5)}),this},//!!!todo alternate color,ratio ?
 getValue:getStr,toString:getStr,valueOf:getStr,parseRgb:paRgb
});
 function paRgb(s){var n;
  if(typeof s=='string'){
   if(s.slice(0,1)=='#')switch((s=s.slice(1)).length){
    case 6:return this.fr=sfc(s.slice(0,2)),this.fg=sfc(s.slice(2,4)),this.fb=sfc(s.slice(4,6)),this;
    case 3:return this.fr=(n=sfc(s.slice(0,1)))+n*16,this.fg=(n=sfc(s.slice(1,2)))+n*16,this.fb=(n=sfc(s.slice(2,3)))+n*16,this;
   }//!!!todo 'red'
  }else
  if(Array.isArray(s)){switch(s.length){case 0:case 2:return!1;case 1:return(s!=s[0])?this.parseRgb(s[0]):!1;default:this.a=fc(s[3]);case 3:this.r=fc(s[0]),this.g=fc(s[1]),this.b=fc(s[2])}return this}
 }
 function getStr(){return'#'+s2(this.fr)+s2(this.fg)+s2(this.fb)}function s2(fc){return('0'+(this.fr||0).toString(16)).slice(-2)}
 function setStr(s){this.parseRgb(s)}
 function sfc(s){return isNaN(s=parseInt(sx,16)/255)?null:s}
 function wf(a,b,f){return(f>0)?(f<1)?a+(b-a)*f:b:a}
 function fc(n,f){
  if(typeof n=='string')return!isNaN(f=(n.indexOf('.')+1)?parseFloat(n):(parseInt(n,16)/255))?f:null;
  return(!isNaN(f=+n))?(0>((f>1.25)?(f=f/255):f))?-f:f:null
 }
 function getR(){return rn(this.fr*255)}function getG(){return rn(this.fg*255)}function getB(){return rn(this.fb*255)}function getA(){return rn(this.fa*255)}
 function si(c,i,n){c[n]=isNaN(i=(typeof i=='number')?i/255:fc(i))?null:i}
 function setR(i){si(this,i,'fr')}function setG(i){si(this,i,'fg')}function setB(i){si(this,i,'fb')}function setA(i){si(this,i,'fa')}
 defGs(P,'R',getR,setR),defGs(P,'G',getG,setG),defGs(P,'B',getB,setB),defGs(P,'A',getA,setA);
 defGs(P,'str',getStr,setStr),defGs(P,'rgb',getStr,setStr);
 P=0
}()}catch(e){Con.error(e,'Clr',Clr);Clr=null}

function FadeIn(E){
 Anim(E,{opacity:0.2},{opacity:1},200);
 return E
}

function FadeOff(E,tm,then=null){
 if(E){
  var n=8,ts=Math.ceil((tm||3000)/n)||200,S=E.style,o=parseFloat(S.opacity)||1,ino=o,ns=0,exp=Now()+(n+1)*ts;
  function Step(){
   if((Now()>exp)||(++ns>n)){Hid(Opa(E,0));Opa(E,ino);setTimeout(Rem,ts)}
   else{Opa(E,o=o*0.777);Schd()}
  }
  function Schd(){setTimeout(Step,ts)}
  function Rem(){Unl(E);then&&then(E);E=S=null}
  Schd()
 }
 return E
}

var gLocalTz;
function ApplyLocalTz(Input){lSt.setItem('LocalTz',gLocalTz=Input.value||'default');ForClass(null,'Time',function(S){S.Time&&Tx(S,DispTime(S.Time))})}
function TimeLabel(T){return Ce('span','Time',Txn(DispTime(S.Time=T)),'title='+DispIsoTime(T))}
function DispTime(T,bnDateOnly){
 if(T){
  if((typeof T=='number')&&(T>=1400000000000))T=new Date(T);
  if((typeof T=='object')&&T.getFullYear)return LDate(T)
 }else{return '?'}
 var D,A=/(19[0-9][0-9]|20[0-5][0-9])-([0-1]?[0-9])-([0-3]?[0-9])[\sT]*([0-2]?[0-9]):([0-5][0-9]):?([0-5][0-9]|)(\.[0-9][0-9][0-9]|)\s*([+-][0-2][0-9]:?[0-5][0-9]|Z|)/.exec(T);
 if(!A&&bnDateOnly)if(A=/(19[0-9][0-9]|20[0-5][0-9])-([0-1]?[0-9])-([0-3]?[0-9])/.exec(T)){A.push(12);A.push(0);A.push(0)}
 function N2(n){return('0'+n).slice(-2)}
 function pi(s){return parseInt(s,10)}
 if(A){
  var y=pi(A[1]),m=pi(A[2]),d=pi(A[3]),h=pi(A[4]),n=pi(A[5]),s=pi(A[6])||0,tz=A[8]||'Z';
  return LDate(new Date(y+'-'+N2(m)+'-'+N2(d)+'T'+N2(h)+':'+N2(n)+':'+N2(s)+tz));
 }
 function LDate(D){
  var tz=gLocalTz=gLocalTz||lSt.getItem('LocalTz')||'default',Dt2;
  if(tz!='default'){
   try{
    Dt2=new Date(D.valueOf()+tz*3600000+D.getTimezoneOffset()*60000);
    if(bnDateOnly)return Dt2.toLocaleDateString();
    return Dt2.toLocaleString().replace(/([0-2]?[0-9]:[0-5][0-9]):[0-5][0-9]/,'$1')
   }catch(Ex){Con.error(Ex)}
  }
  if(bnDateOnly)return D.toLocaleDateString();
  return D.toLocaleString().replace(/([0-2]?[0-9]:[0-5][0-9]):[0-5][0-9]/,'$1')
 }
 return T
}
function DispIsoTime(T){
 return T?(''+T).replace('T',' ').replace(/([+\-][0-2][0-9]:?[0-5][0-9])/,' $1'):'?'
}

function IsSelected(){var sel=window.getSelection();return!!(sel&&!sel.isCollapsed)}

function PendingList(){var v=PushPending;return v.__List=v.__List||[]}
function PushPending(X){
 var L=PendingList();
 (L.push(X)==1)&&IsFunc(L.StartPending)&&L.StartPending()
}
function PopPending(X){
 var L=PendingList(),i=L.indexOf(X);
 if(i+1)L.splice(i,1);
 !i&&!L.length&&IsFunc(L.DonePending)&&L.DonePending()
}

function MkAjax(Met,Url,Opt,OnComplete){
 if(!OnComplete&&IsFunc(Opt))OnComplete=Opt,Opt=null;
 try{
  var X=new XMLHttpRequest(),H,N;
  X.timeOpen=new Date();
  X.open(Met,Url,!0);
  if(IsObj(Opt)){Sv(X,Opt);if(H=Opt.Headers)for(N in H)X.setRequestHeader(N,H[N]);IsFunc(Opt.Init)&&Opt.Init(X)}
  if(IsFunc(OnComplete))X.onreadystatechange=function(){
   if(this.readyState!=4)return;
   X&&(X.timeComplete=new Date())&&PopPending(X);
   var F=OnComplete,z=OnComplete=X=0;
   F&&F(this.response||this.status||-1,this)
  };
  PushPending(X);
  return X
 }catch(E){Con.error(E,'(Ajax)');return{send:function(){return!1}}}
}

function AjaxGet(Url,Opt,OnComplete){MkAjax('GET',Url,Opt,OnComplete).send()}
function AjaxPost(Url,FormData,Opt,OnComplete){MkAjax('POST',Url,Opt,OnComplete).send(FormData)}
function Pajax(U,Fd,Opt,OnDone,p){return p=nPro(),p.X=MkAjax(Fd?'POST':'GET',U,Opt,function(r,X){IsNum(r)?p.rej(X.status+' '+X.statusText):p.res(r);p=p.X=0}),Fd=p.X.send(Fd||undefined),OnDone?p.then((function(X,F){return function(r){return F(r,X)||r}})(p.X,OnDone)):p}

function min(){var A=arguments,m=A[0],i,j,c=A.length;for(i=1;i<c;i++)if(!isNaN(j=A[i]))if(isNaN(m)||(j<m))m=j;return m}
function max(){var A=arguments,m=A[0],i,j,c=A.length;for(i=1;i<c;i++)if(!isNaN(j=A[i]))if(isNaN(m)||(j>m))m=j;return m}

var topZ=2000;
function Movable(What,Movers){
 if(!What)return null;
 var Ms=What.Movers||(What.Movers=[]),i,Ar=arguments,c=Ar.length,E,Leg;
 What.MoveBy||(What.MoveBy=function(dx,dy,nx,ny){Sv(this.style,{left:nx+'px',top:ny+'px'})});
 What.FinishMove||(What.FinishMove=function(nx,ny){});
 function MvMouseDown(ev){
  ev=ev||window.event;if(!ev||ev.button>0)return;
  var M=What,zi=topZ=M.style.zIndex=max(M.style.zIndex*1,topZ)+4,T=ev.target;
  Leg||fiLeg();
  if(T!=M)if(Ms.indexOf(T)<0)return;
  function pix(p,A){return(A=/(-?[0-9.]+)px/.exec(p))?parseInt(A[1]):null}
  var mx,my,minit=T=!0,S=M.style,ex=pix(S.left)||M.offsetLeft||0,ey=pix(S.top)||M.offsetTop||0,m;
  if(m=pix(S.marginTop))ey-=m,S.marginTop='0px';
  if(m=pix(S.marginLeft))ex-=m,S.marginLeft='0px';
  var Handler=Ce('span','position:fixed;left:0px;top:0px;right:0px;bottom:0px;opacity:0.01;cursor:move;z-index:'+(zi+1e6),{onmousedown:StopMv,onmouseup:StopMv,onmousemove:ApplyMv});
  Cancel(ev);
  Sv(S,{left:ex+'px',top:ey+'px',right:'auto',bottom:'auto'});
  function StopMv(ev){var H=Unl(Handler);try{M.FinishMove(ex,ey)}catch(e){}Handler=M=S=null;return!1}
  function ApplyMv(ev){if(ev=ev||window.event){
   var x=ev.screenX,y=ev.screenY,dx=x-mx,dy=y-my;
   mx=x;my=y;
   if(minit){minit=!1;return}
   M.MoveBy(dx,dy,ex+=dx,ey+=dy)
  }}
  Apc(document.body,Handler);
  return!1
 }
 function hk(E){E&&Ms.push(E);E.style.cursor='pointer';return AEvent(E,'mousedown',MvMouseDown)}
 function fiLeg(){return Leg||((Leg=What.firstElementChild)&&IsTag(Leg,'legend')&&(Ms.indexOf(Leg)+1||hk(Leg)))?Leg:(Leg=null)}
 for(i=1;i<c;i++)if(E=Ar[i])hk(E);
 fiLeg();
 return hk(What)
}

function WCenter(E){var W=window,x=Math.round(((W.innerWidth||W.clientWidth)-E.offsetWidth)/2),y=Math.round(((W.innerHeight||W.clientHeight)-E.offsetHeight)/2);Sv(E.style,{left:(x<0?0:x)+'px',top:(y<0)?0:y+'px'});return E}

function Popup(Title,OnInit,OnApply,OnCancel){
 var A=arguments,ai=IsFunc(A[0])?(Title=0):1,In=A[ai++],Ap=A[ai++],Ca=A[ai++];
 var F,Fs,Sh,zi=topZ+=10,Leg;
 F=Opa(Ce('form','Popup','position:fixed;z-index:'+zi+';min-width:240px',Fs=Ce('fieldset',Leg=IsStr(Title)&&Tx(Ce('legend'),Title))),0);
 Sh=Opa(Ce('div','Shade','position:fixed;left:0px;top:0px;right:0px;bottom:0px;background:black;z-index:'+(zi-1),{onclick:CloseClick,onmousedown:CloseClick}),0);
 if(Leg)F.ETitle=Leg;
 function GetValue(F){return(F.EValue||F.elements[0]||{}).value}
 function Cbk(Fu,par){IsFunc(Fu)&&Fu(par),Ap=Ca=null}
 function CloseClick(ev){Cancel(ev||window.event);F.Close();return!1}
 Sv(F,{
  Close:function(){Unl(Sh),Unl(F),Sh=Fs=F=null,Cbk(Ca,null)},
  Apply:function(V){Cbk(Ap,V||GetValue(F)),F.Close()},
  Cancel:function(){F.Close()}
 });
 Ce(document.body,Sh,Movable(F,Fs,Leg));
 //
 if(IsFunc(In))In(F,Fs);
 //
 Opa(Sh,0.25);
 if(F.style.position=='fixed')if(!F.style.left)WCenter(F);
 return FadeIn(F)
}
var txCancel="X";

function InputQuery(Title,Value,OnApply,OnCancel,OnInit){
 return Popup(Title,function(P,Pi){
  function clkOk(e){Cancel(e||window.event);P.Apply();return!1}
  function clkCanc(e){Cancel(e||window.event);P.Cancel();return!1}
  function InpKeyDown(ev){switch(Eke(ev||(ev=window.event))){
   case'Enter':case 13:return clkOk(ev);
   case'Esc':case 'Escape':case 27:return clkCanc(ev)
  }}
  var N='EIQvalue'+topZ;
  Ce(Pi,
   Ce('label','for='+N),
   P.EValue=Cinp({type:'text',name:'Edit',value:Value||'',size:40,id:N,onkeydown:InpKeyDown}),
   Ce('br'),Ce('span','float:right',Cinp({type:'button',value:'OK',onclick:clkOk}),Txn(' '),Cinp({type:'button',value:txCancel||"X",onclick:clkCanc}))
  );
  P.Edit.focus();
  P.Edit.select();
  IsFunc(OnInit)&&OnInit(P,Pi)
 },OnApply,OnCancel)
}

function Alert(msg,title,OnAfter){
 return Popup(title||'Notice',function(P,Pi){
  function clkOk(e){Cancel(e||window.event);P.Apply();return!1}
  var B;
  Ce(Pi,Tx(Ce('div','text-align:center'),msg),
   Ce('br'),Ce('div','width:5em;margin:auto;float:right',B=Sy(Cinp({type:'button',value:"OK",onclick:clkOk}),'width:4em'))
  );
  B.focus()
 },OnAfter,OnAfter)
}

// Json:
function JsonParser(json){return(this instanceof JsonParser)?(json&&this.prepare(json),this):new JsonParser(json)}
JsonParser.prototype={
 init:function(){this.strTab=this.opTab=null;return this},
 prepare:function(json){
  var St=this.strTab||(this.strTab={nid:0});
  var Ot=this.opTab||(this.opTab={nid:0});
  json=this.jsonText=''+(json||this.jsonText);
  //strings
  var q=json.split(/([\x22\x27])/),c=q?q.length:null,i,t,pa=[],s,si,any=1;
  for(i=0;i<c;i++){switch(t=q[i]){case'"':case"'":{
   s=q[++i]||'';
   while(i<c)if(s.slice(-1)=="\x5c")s=s.slice(0,-1)+q[++i]+q[++i];else if(q[i+1]!=t)s+=q[++i]+q[++i];else{i++;break}
   if(s.indexOf("\x5c")+1)s=s.replace(/(\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\.)/gi,function(m){
    switch(m.substr(1,1)){case'n':return"\n";case'r':return"\r";case't':return"\t";case'u':case'x':return String.fromCharCode(parseInt(m.substr(2),16))}
    return m.substr(1)
   });
   St[t='%S_'+St.nid++]=s
  }}pa.push(t)}
  json=pa.join('');
  //balanced [{}]
  while(any){any=0;
   if(json.indexOf("\x7b")<0)if(json.indexOf("\x5b")<0)break;
   json=json.replace(/\{[^\{\}\[\]]*\}|\[[^\{\}\[\]]*\]/g,function(m){
    var oi='%O_'+Ot.nid++,bo=m.slice(1,-1);
    switch(m.substr(0,1)){
     case"\x5b":{//[...]
      return Ot[any=oi]={body:bo,perform:function(ctx){
       var A=[],s=this.body,it,v;
       while(s){
        if((p=s.indexOf(','))+1){it=s.substr(0,p).trim();s=s.substr(p+1)}else{it=s.trim();s=0}
        if(it)if((v=ctx.simple(it))!==undefined)A.push(v)
       }
       return A
      }},oi
     }
     case"\x7b":{//{...}
      Ot[any=oi]={body:bo,perform:function(ctx){
       var o={},b=this.body||'',r=ctx.error=b.replace(/(\%S_[0-9]+|[a-z][a-z0-9_\-]*)\s*:\s*(\%S_[0-9]+|\%O_[0-9]+|-?\+?[0-9\.]+[Ee]*\+?-?[0-9]*|true|false|null)\s*,?\s*/gi,
        function(t,n,v){
         return((v=ctx.simple(v))!==undefined)?(o[(n.substr(0,3)=='%S_')?St[n]:n]=v,''):t
        }).trim()||!1;
       return o
      }};
      return oi
     }
    }
    return m
   })
  }
  // now whole should be '%Op_345' or simple value, return true if anything rests:
  return!!(this.code=json.trim())
 },
 simple:function(tk){var P=this,t=''+tk,o;
  if(t.charCodeAt(0)==37){//%
   switch(t.substr(0,3)){
    case'%S_':{
     if((o=P.strTab[t])||(t in P.strTab))return o;
     P.error='undefined string '+t;
     break
    }
    case'%O_':{
     if(o=P.opTab[t])return o.perform(P);
     P.error='undefined op '+t;
     break
    }
    default:P.error='syntax error: '+t
   }
  }else{
   switch(t){case'false':return!1;case'true':return!0;case'null':return null}
   if(t)if(!isNaN(o=1*t))return o;
   P.error='syntax error: '+t
  }
  //return undefined
 },
 exec:function(){return this.code?this.simple(this.code):undefined}
};
function jsonParse(json){return(new JsonParser(json)).exec()}
function detectJson(json){//{...}~[...]
 return((typeof json=='string')&&!(((json=json.trim()).charCodeAt(0)-91)&223)&&(json.charCodeAt(json.length-1)==json.charCodeAt(0)+2))?jsonParse(json)||json:json
}

function jsonStr(o,qn,re,b7){var Stk=[];return _Str(o);
 function _Str(o){return!IsNull(o)?o?(Stk.indexOf(o)+1)?eR():(Stk.push(o),o=_jstr(o),Stk.pop(),o):_jstr(o):'null'}
 function eR(e,t){e='recurse';if(re)return e;throw(t=window.TypeError)?new t(e):e}
 function q(n){return(qn||!n.match(/^[a-z][a-z0-9_]*$/i))?'"'+n.replace(/"/g,"\\\"")+'"':n}
 function _jstr(o){var r='',n,v;switch(typeof o){
  case'boolean':return o?'true':'false';
  case'number':return''+o;
  case'string':return o=o.replace(/[\x22\x5c]/g,function(m){return'\\'+m}),'"'+(b7?o.replace(/[\x0a]/g,'\\n').replace(/[\x0d]/g,'\\r').replace(/[\x09]/g,'\\t').replace(/[^\x20-\x7f]/g,function(m){return'\\u'+('000'+m.charCodeAt(0).toString(16)).slice(-4)}):o)+'"';
  case'object':{
   if(Array.isArray(o))return'['+o.map(_Str).join(',')+']';
   for(n in o)if((v=o[n])!==undefined)if(!IsFunc(v))r+=(r?',':'')+q(n)+':'+_Str(v);
   return'{'+r+'}'
  }
 }}
}

function lSt(){var S;try{S=localStorage}catch(x){}
 return Sv(lSt,{stg:S,getItem:function(n){return S?S.getItem(n):null},setItem:function(n,v){try{S&&S.setItem(n,v)}catch(x){}},removeItem:function(n){try{S&&S.removeItem(n)}catch(x){}}})
}lSt();

// Init forEach:
!function(D){
function In(O,p){try{if(p=O&&Object.getPrototypeOf(O))p.forEach||(p.forEach=[].forEach)}catch(E){Con.error(E)}}
In(D.querySelectorAll('div'));In(gbc(D,'test'));
[].indexOf||([].indexOf=function(b,fi,i,c){fi=+fi;for(c=this.length,i=(fi>=0)?fi:c+fi;i<c;i++)if(this[i]===b)return i;return -1})
}(document);

!function(){
// md5.min.js inline:
!function(n){"use strict";function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((c=d(d(t,n),d(e,u)))<<(f=o)|c>>>32-f,r);var c,f}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function i(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=v(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=v(a,c,f,i,n[h+6],9,-1069501632),i=v(i,a,c,f,n[h+11],14,643717713),f=v(f,i,a,c,n[h],20,-373897302),c=v(c,f,i,a,n[h+5],5,-701558691),a=v(a,c,f,i,n[h+10],9,38016083),i=v(i,a,c,f,n[h+15],14,-660478335),f=v(f,i,a,c,n[h+4],20,-405537848),c=v(c,f,i,a,n[h+9],5,568446438),a=v(a,c,f,i,n[h+14],9,-1019803690),i=v(i,a,c,f,n[h+3],14,-187363961),f=v(f,i,a,c,n[h+8],20,1163531501),c=v(c,f,i,a,n[h+13],5,-1444681467),a=v(a,c,f,i,n[h+2],9,-51403784),i=v(i,a,c,f,n[h+7],14,1735328473),c=g(c,f=v(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=g(a,c,f,i,n[h+8],11,-2022574463),i=g(i,a,c,f,n[h+11],16,1839030562),f=g(f,i,a,c,n[h+14],23,-35309556),c=g(c,f,i,a,n[h+1],4,-1530992060),a=g(a,c,f,i,n[h+4],11,1272893353),i=g(i,a,c,f,n[h+7],16,-155497632),f=g(f,i,a,c,n[h+10],23,-1094730640),c=g(c,f,i,a,n[h+13],4,681279174),a=g(a,c,f,i,n[h],11,-358537222),i=g(i,a,c,f,n[h+3],16,-722521979),f=g(f,i,a,c,n[h+6],23,76029189),c=g(c,f,i,a,n[h+9],4,-640364487),a=g(a,c,f,i,n[h+12],11,-421815835),i=g(i,a,c,f,n[h+15],16,530742520),c=m(c,f=g(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function a(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function h(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return a(i(h(t=r(n)),8*t.length));var t}function u(n,t){return function(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,16<o.length&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}n.md5=t}(this)
}();

// Crc32:
!function(W){
 var CTable=(function(i,c,j,T){T=[];for(i=0;i<=255;i++){c=i;for(j=0;j<=7;j++)c=((c&1)?0xedb88320:0)^(c>>>1);T.push(c)}return T})();
 W.Crc32||(W.Crc32=function(data){return Up(-1,data)});W.UpdateCrc32||(W.UpdateCrc32=Up);function Up(C,data){C=C&0xffffffff;if(data){if(typeof data!='string')data=''+data;var l=data.length,i,D;for(i=0;i<l;i++)C=(C>>>8)^CTable[(C^data.charCodeAt(i))&0xff]}return C}
}(window);
