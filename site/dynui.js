/* various utility functions: */

function Ce1(T,F){var E=document.createElement(T);return(F&&F(E))||E}
function Sa(E,N,V){E&&N&&E.setAttribute(N,V||'');return E}
function Ga(E,N){return (E&&N&&E.getAttribute)?E.getAttribute(N):null}
function Sy(E,S){return Sa(E,'style',S)}
function Cls(E,C){return Sa(E,'class',C)}
function Sv(E,V){if(E&&V)for(var N in V)E[N]=V[N];return E}
function Cinp(V){return Sv(Ce1('input'),V)}
function Hinp(N,V){return Cinp({type:'hidden',name:N||'',value:V||''})}
function Inh(E,T){E&&(E.innerHTML=T||'');return E}
function Tx(E,T){E&&(E.innerText=T||'');return E}
function Txn(T){return document.createTextNode(T||'')}
function Fu(E,F){return(IsFunc(F)&&F(E))||E}
function bi0(id){return document.getElementById(id)||null}
function bid(id){return bi0(id)||{stub:true,style:{}}}
function IsObj(O){return O&&(typeof O=='object')}
function IfObj(O){return IsObj(O)?O:null}
function IsFunc(F){return F&&(typeof F=='function')}
function IsNum(N){return(typeof N=='number')}//!!!todo +numeric string
function IsElem(E){return IsObj(E)&&('parentNode' in E)}
function IsStr(S){return typeof S=='string'}
function IfElem(E){return IsElem(E)?E:null}
function Soon(F){if(IsFunc(F))window.setTimeout(F,10)}
function Apc(P,C,B){P&&C&&P.insertBefore(C,B||null);return P}
function App(P,Cn){var i=1,Ar=arguments,C;while(i<Ar.length)if(C=Ar[i++])Apc(P,C);return P}
function CLab(T){return Tx(Ce('span','lab8'),T)}
function IsNull(O){return(!O&&(O===undefined||O===null))}
function Cancel(E){E||(E={});E.stopPropagation&&E.stopPropagation();E.preventDefault&&E.preventDefault();return E.returnValue=!1}
function AEvent(E,N,F,bn){E&&N&&(E.addEventListener?E.addEventListener(N,F,bn||false):E.attachEvent?E.attachEvent('on'+N,V):(E[N]=V));return E}
function Kchar(K,C){return (K>=0x41)&&(K<=0x5a)?String.fromCharCode(K):C||K}
function EKey(E){if(E||(E=window.event))return Kchar(E.which||E.keyCode)}
function Eke(E){return(E||(E=window.event))?Kchar(E.keyCode,E.key||EKey(E)):null}
function EShift(E){return(E.ctrlKey?'c':'')+(E.shiftKey?'s':'')+(E.altKey?'a':'')}
function ETarget(E,Th){return(E||window.event||{}).target||(Th&&(Th!=window)?Th:null)}
function IsTag(E,t){return(''+((E&&E.tagName)||'')).toLowerCase()==t}
function Vis(E,v){var S=E&&E.style;if(S)S.visibility=v||'visible';return E}
function Hid(E){return Vis(E,'hidden')}
function Opa(E,op){var S=E&&E.style;if(S){S.opacity=op;S.filter='alpha(opacity='+(op*100)+')'}return E}

function CLog(args){var C=window.console;C&&C.log&&C.log.apply(C,arguments)}
var Con=IfObj(window.console)||{log:function(){}};

var R_ce_A=/^\s*([a-z]+:|)([a-z0-9_\-$]+)([:=]|\+=|-=)(.*)/i,
    R_ce_C=/^\s*([a-z_\-$][^:=\(\)\[\]]+)\s*$/i,
    R_ce_P=/^\s*([a-z0-9_\-$]+)\s*:\s*$/i;
// unquote
function unq(S){var q;switch(q=(S=(S||'').trim()).substring(0,1)){case '"':case "'":{return S=S.substring(1),(q=S.indexOf(q))+1?S.substring(0,q):S}default:return S}}

function MvSubNodes(Dst,Src){var El;while(El=Src.firstChild){Src.removeChild(El);Apc(Dst,El)}return Dst}

function IsHtml(S){if(S&&IsStr(S)){var A;
  return((S.indexOf('&')+1)&&/&\#?[a-z0-9]+;/i.test(S))||!!((S.indexOf('<')+1)&&(A=/<([a-z0-9]+)[^<>]*>/i.exec(S))&&(S.indexOf('</'+A[1]+'>')+1))
}}

function Ce(tag,mixArgs){
 var Ar=arguments,C=Ar.length,i,par,n=null,El=IsElem(tag)?tag:Ce1(tag),ma,na,op,v,fu,pre,o,co,q;
 for(i=1;i<C;i++)switch(typeof(par=Ar[i]||n)){
  case 'string':{
   if(((q=(pre=par.trim()).substring(0,1))=='"')||(q=="'")){// "quoted" -- innerText
    par=pre.substring(1);((op=par.lastIndexOf(q))>=0)&&!par.substring(op+1).trim()&&(par=par.substring(0,op));
    if(IsHtml(par)){El.firstChild?MvSubNodes(El,Inh(Ce('div'),par)):Inh(El,par)}else Apc(El,Txn(par));
    par=pre=n;
    break
   }
   o=par.indexOf('=')+1;co=par.indexOf(':')+1;
   if(!o&&!co&&(ma=R_ce_C.exec(par))){// 'className'
    Cls(El,((Ga(El,'class')||'')+' '+par).trim())
   }else
   if((o||co)&&(ma=R_ce_A.exec(par))){ // 'a=value' 'css:props'
    na=ma[1]+ma[2];v=ma[4];pre='';
    switch(op=ma[3]){
     case ':':{//add to style...
      Sy(El,((Ga(El,'style')||'')+' '+par).trim());
      break
     }
     case '-=':{// 'a-=value'
      v=unq(v);
      ((o=(pre=' '+(Ga(El,na)||'')+' ').indexOf(' '+v+' '))>=0)&&Sa(El,na,(pre.substring(0,o)+' '+pre.substring(o+v.length+1)).trim());
      break
     }
     case '+=':pre=(Ga(El,na)||'')+' ';// 'a+=value'
     case '=':{// 'a=value'
      Sa(El,na,pre+unq(v));
      break
     }
    }
    par=n
   }else
   if(co&&(ma=R_ce_P.exec(par))){// 'prop:', value follows...
    na=ma[1];par=n;v=Ar[++i];
    El&&(El[na]=v);
   }else{
    Con.log('Ce unknown:',par);//what else?
   }
   ma=n;break
  }
  case 'object':{IsElem(par)?Apc(El,par):Sv(El,par);break}
  case 'function':{El=IfElem(par(El))||El;par=n;break}
 }
 return El
}

function Cinp2(mixArgs){var A=Arguments;Array.prototype.unshift.call(A,'input');return Ce.apply(null,A)}

function ICss(id,CssText){
  (!CssText)&&(typeof id=='string')&&(id.indexOf('\x7b')>=0)&&(CssText=id,id=null);
  var S,Se;
  if(!id||!(Se=bi0(id))||Se.stub)try{
    Apc(document.head,Se=Ce('style',function(S){id&&(S.id=id)}));
    S=Se.sheet;
    (''+CssText).replace(/\s*([^\{\}]+)\s*\{([^\{\}]*)\}/g,function(M,sel,css){
      S.insertRule(sel+'{'+css+'}',S.cssRules.length);
      return ''
    })
  }catch(E){console&&console.error(E)}
  return S||Se.sheet
}

function Ccb(V,T){
  var C,S=Ce('span',C=Sv(Cinp({type:'checkbox'}),V)),L=Ce('label');
  if(T||(T=V?V.Label:'')){Apc(S,Tx(L,T));L.cb=C;L.onmousedown=function(C){C=this.cb;C.focus();C.checked=!C.checked;return!1}}
  return S
}

function gbt(E,t){return (E?E.getElementsByTagName(t):0)||[]}
function gbc(E,c){return(E&&E.getElementsByClassName?E.getElementsByClassName(c):Find(E,[]))||[];function Find(E,A){if(HasClass(E,c))A.push(E);E=E.firstElementChild;while(E){Find(E,A);E=E.nextElementSibling};return A}}

function ForClass(W,C,F){ForList(gbc(W||document.body,C),F)}
function ForTag(W,T,F){ForList(gbt(W||document.body,T),F)}
function ForList(L,F){var i,E;if(L)for(i=0;i<L.length;i++)(E=L[i])&&F(E)}

function ACat(arrays){var R=[],i,Ar=arguments,c1=Ar.length,A,j,c2,it;
 for(i=0;i<c1;i++)if(A=Ar[i])if(IsObj(A)&&('length' in A)){for(j=0,c2=A.length;j<c2;j++)R.push(A[j])}else R.push(A);
 return R
}

function FindAttr(A,V){
  var Found=null;
  function Find(Wh){
    if(!Wh)return;
    if(Ga(Wh,A)==V){Found=Wh;return!0}
    Wh=Wh.firstElementChild;
    while(Wh){
      if(Find(Wh))return!0;
      Wh=Wh.nextElementSibling
    }
  }
  Find(document.body);
  return Found
}

function FindParent(E,t){
  while(E&&!IsTag(E,t))E=E.parentNode;
  return E
}

function HasClass(E,C){return E?((Ga(E,'class')||'').split(/\s+/g).indexOf(C)>=0):!1}
function AddClass(E,C){if(E&&C&&!HasClass(E,C))Cls(E,(C+' '+(Ga(E,'class')||'')).trim());return E}
function RemClass(E,C){if(E&&C){var A=(Ga(E,'class')||'').trim().split(/\s+/g),i=A.indexOf(C);if(i>=0){A.splice(i,1);Cls(E,A.join(' '))}}return E}

function UrlHost(U){
  var A=/\x2f\x2f([^\x2f]+)\x2f/i.exec(U);
  return A?A[1]:null
}

function atou(S){return decodeURIComponent(escape(atob(S)))} // base64 decode
function utoa(S){return btoa(unescape(encodeURIComponent(S)))} // base64 encode

function LoadScript(src,onload){
  var sc='script',D=document,S=D.createElement(sc),S0=gbt(D,sc)[0],R=S;
  if(onload)S.onload=onload;
  else {
    var Res;
    R=new Prom(function(Resolve){Res=Resolve});
    R[sc]=S;
    S.onload=function(){CLog('loaded ',src);try{Res(S)}finally{R[sc]=R=S=Res=null}};
  }
  S.src=src;
  S0.parentNode.insertBefore(S,S0);
  S0=null;
  return R
}

function PLoadImage(url){
  // returns Prom which resolves to <img> element
  var ok,bd,Im=Ce('img'),P=new Prom(function(Res,Rej){ok=Res;bd=Rej;Sv(P.Img=Im,{onload:DoLd,onerror:DoErr,src:url})});
  function DoLd(){ok&&ok(Im);Clr()}
  function DoErr(E){bd&&bd((E&&E.message)||'Image load error');Clr()}
  function Clr(){ok=bd=Im=P=null}
  return P
}

function Prom(Fu){
  // new Prom(function(resolve,reject))
  var P=(this&&(this!=window))?this:{};
  P.prototype=Prom.prototype;
  P._s=3;
  if(IsFunc(Fu))setTimeout(function(){
    try{Fu(_Res,_Rej)}catch(E){_Rej(E)}
    function _Res(Value){P._resolve(Value)}
    function _Rej(Reason){P._reject(Reason)}
  });
  return P
}
Prom.prototype=(function(){
  function addHandler(P1,P2,onFu,onErr){
    if(IsFunc(onFu))P2._onFulfilled=onFu;
    if(IsFunc(onErr))P2._onError=onErr;
    (P1._ha||(P1._ha=[])).push(P2);
    P2._Parent=P1;
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
  
  return {
    then:function(onFulfill,onReject){return addHandler(this,new Prom(),onFulfill,onReject)},
    "catch":function(onError){return this.then(undefined,onError)},
    "finally":function(onFinally){
      var P=this;
      return P.then(function(V){
        return P.resolve(onFinally()).then(function(){return V})
      },function(E){
        return P.resolve(onFinally()).then(function(){throw err})
      });
    },
    valueOf:function(){return this._v},
    _resolve:function(Value){return Settle(this,2,Value)},
    _reject:function(Reason){return Settle(this,1,Reason)},
    _IsProm:function(){return!0}
  }
})();

function FadeOff(E,tm,then=null){
 if(E){
  var n=8,ts=Math.ceil((tm||3000)/n)||200,S=E.style,o=parseFloat(S.opacity)||1,ino=o,ns=0,P;
  function Step(){
    if(!S||(++ns>n)){Op(0);S.visibility='hidden';Op(ino);setTimeout(Remove,ts)}
    else{Op(o=o*0.777);Sched()}
  }
  function Sched(){setTimeout(Step,ts)}
  function Remove(){(P=E&&E.parentNode)&&P.removeChild(E);then&&then(E);E=P=S=null}
  function Op(o){S.opacity=o;S.filter='alpha(opacity='+(o*100)+')'}
  Sched()
 }
 return E
}

var gLocalTz;
function ApplyLocalTz(Input){localStorage.setItem('LocalTz',gLocalTz=Input.value||'default');ForClass(null,'Time',function(S){S.Time&&Tx(S,DispTime(S.Time))})}
function TimeLabel(T){return Ce('span','Time',Txn(DispTime(S.Time=T)),'title='+DispIsoTime(T))}
function DispTime(T,bnDateOnly){
  if(T){
    if((typeof T=='number')&&(T>=1400000000000))T=new Date(T);
    if((typeof T=='object')&&T.getFullYear)return LDate(T)
  }else{return '?'}
  var D,A=/(19[0-9][0-9]|20[0-5][0-9])-([0-1]?[0-9])-([0-3]?[0-9])[\sT]*([0-2]?[0-9]):([0-5][0-9]):?([0-5][0-9]|)(\.[0-9][0-9][0-9]|)\s*([+-][0-2][0-9]:?[0-5][0-9]|Z|)/.exec(T);
  if(!A&&bnDateOnly){
    if(A=/(19[0-9][0-9]|20[0-5][0-9])-([0-1]?[0-9])-([0-3]?[0-9])/.exec(T)){A.push(12);A.push(0);A.push(0)}
  }
  function N2(n){return(n<=9)?('0'+n):(''+n)}
  function pi(s){return parseInt(s,10)}
  if(A){
    var y=pi(A[1]),m=pi(A[2]),d=pi(A[3]),h=pi(A[4]),n=pi(A[5]),s=pi(A[6])||0,tz=A[8]||'Z';
    return LDate(new Date(y+'-'+N2(m)+'-'+N2(d)+'T'+N2(h)+':'+N2(n)+':'+N2(s)+tz));
  }
  
  function LDate(D){
    var tz=gLocalTz=gLocalTz||localStorage.getItem('LocalTz')||'default',Dt2;
    if(tz!='default'){
      try{
        Dt2=new Date(D.valueOf()+tz*3600000+D.getTimezoneOffset()*60000);
        if(bnDateOnly)return Dt2.toLocaleDateString();
        return Dt2.toLocaleString().replace(/([0-2]?[0-9]:[0-5][0-9]):[0-5][0-9]/,'$1')
      }catch(Ex){CLog(Ex)}
    }
    if(bnDateOnly)return D.toLocaleDateString();
    return D.toLocaleString().replace(/([0-2]?[0-9]:[0-5][0-9]):[0-5][0-9]/,'$1')
  }
  return T
}
function DispIsoTime(T){
  return T?(T+'').replace('T',' ').replace(/([+\-][0-2][0-9]:?[0-5][0-9])/,' $1'):'?'
}

function IsSelected(){var sel=window.getSelection();return!!(sel&&!sel.isCollapsed)}

var __PendList;
function PendingList(){return __PendList||(__PendList=[])}
function PushPending(X){
  var L=PendingList(),bn=!L.length;
  L.push(X)
  bn&&IsFunc(L.StartPending)&&L.StartPending()
}
function PopPending(X){
  var L=PendingList(),idx=L.indexOf(X);
  if(idx>=0)L.splice(idx,1);
  !idx&&!L.length&&IsFunc(L.DonePending)&&L.DonePending()
}

function MkAjax(Met,Url,Opt,OnComplete){
  if(!OnComplete&&IsFunc(Opt)){OnComplete=Opt;Opt=null}
  try{
    var X=new XMLHttpRequest(),H;
    X.open(Met,Url,!0);
    if(IsObj(Opt)&&Sv(X,Opt)&&(H=Opt.Headers))for(var N in H)X.setRequestHeader(N,H[N]);
    if(IsFunc(OnComplete))X.onreadystatechange=function(){
        if(this.readyState==4){
          PopPending(X);
          var Fn=OnComplete;
          OnComplete=null;
          Fn(this.response||this.status||-1,this)
        }
      };
    PushPending(X);
    return X
  }catch(E){
    CLog('Ajax:',E.message);
    return null
  }
}

function AjaxGet(Url,Opt,OnComplete){MkAjax('GET',Url,Opt,OnComplete).send()}
function AjaxPost(Url,FormData,Opt,OnComplete){MkAjax('POST',Url,Opt,OnComplete).send(FormData)}

/* Code by P.A.Semi 2021-11..12 */

(function(){
function InitMd5(){
  // md5.min.js inline:
  !function(n){"use strict";function d(n,t){var r=(65535&n)+(65535&t);return(n>>16)+(t>>16)+(r>>16)<<16|65535&r}function f(n,t,r,e,o,u){return d((c=d(d(t,n),d(e,u)))<<(f=o)|c>>>32-f,r);var c,f}function l(n,t,r,e,o,u,c){return f(t&r|~t&e,n,t,o,u,c)}function v(n,t,r,e,o,u,c){return f(t&e|r&~e,n,t,o,u,c)}function g(n,t,r,e,o,u,c){return f(t^r^e,n,t,o,u,c)}function m(n,t,r,e,o,u,c){return f(r^(t|~e),n,t,o,u,c)}function i(n,t){var r,e,o,u;n[t>>5]|=128<<t%32,n[14+(t+64>>>9<<4)]=t;for(var c=1732584193,f=-271733879,i=-1732584194,a=271733878,h=0;h<n.length;h+=16)c=l(r=c,e=f,o=i,u=a,n[h],7,-680876936),a=l(a,c,f,i,n[h+1],12,-389564586),i=l(i,a,c,f,n[h+2],17,606105819),f=l(f,i,a,c,n[h+3],22,-1044525330),c=l(c,f,i,a,n[h+4],7,-176418897),a=l(a,c,f,i,n[h+5],12,1200080426),i=l(i,a,c,f,n[h+6],17,-1473231341),f=l(f,i,a,c,n[h+7],22,-45705983),c=l(c,f,i,a,n[h+8],7,1770035416),a=l(a,c,f,i,n[h+9],12,-1958414417),i=l(i,a,c,f,n[h+10],17,-42063),f=l(f,i,a,c,n[h+11],22,-1990404162),c=l(c,f,i,a,n[h+12],7,1804603682),a=l(a,c,f,i,n[h+13],12,-40341101),i=l(i,a,c,f,n[h+14],17,-1502002290),c=v(c,f=l(f,i,a,c,n[h+15],22,1236535329),i,a,n[h+1],5,-165796510),a=v(a,c,f,i,n[h+6],9,-1069501632),i=v(i,a,c,f,n[h+11],14,643717713),f=v(f,i,a,c,n[h],20,-373897302),c=v(c,f,i,a,n[h+5],5,-701558691),a=v(a,c,f,i,n[h+10],9,38016083),i=v(i,a,c,f,n[h+15],14,-660478335),f=v(f,i,a,c,n[h+4],20,-405537848),c=v(c,f,i,a,n[h+9],5,568446438),a=v(a,c,f,i,n[h+14],9,-1019803690),i=v(i,a,c,f,n[h+3],14,-187363961),f=v(f,i,a,c,n[h+8],20,1163531501),c=v(c,f,i,a,n[h+13],5,-1444681467),a=v(a,c,f,i,n[h+2],9,-51403784),i=v(i,a,c,f,n[h+7],14,1735328473),c=g(c,f=v(f,i,a,c,n[h+12],20,-1926607734),i,a,n[h+5],4,-378558),a=g(a,c,f,i,n[h+8],11,-2022574463),i=g(i,a,c,f,n[h+11],16,1839030562),f=g(f,i,a,c,n[h+14],23,-35309556),c=g(c,f,i,a,n[h+1],4,-1530992060),a=g(a,c,f,i,n[h+4],11,1272893353),i=g(i,a,c,f,n[h+7],16,-155497632),f=g(f,i,a,c,n[h+10],23,-1094730640),c=g(c,f,i,a,n[h+13],4,681279174),a=g(a,c,f,i,n[h],11,-358537222),i=g(i,a,c,f,n[h+3],16,-722521979),f=g(f,i,a,c,n[h+6],23,76029189),c=g(c,f,i,a,n[h+9],4,-640364487),a=g(a,c,f,i,n[h+12],11,-421815835),i=g(i,a,c,f,n[h+15],16,530742520),c=m(c,f=g(f,i,a,c,n[h+2],23,-995338651),i,a,n[h],6,-198630844),a=m(a,c,f,i,n[h+7],10,1126891415),i=m(i,a,c,f,n[h+14],15,-1416354905),f=m(f,i,a,c,n[h+5],21,-57434055),c=m(c,f,i,a,n[h+12],6,1700485571),a=m(a,c,f,i,n[h+3],10,-1894986606),i=m(i,a,c,f,n[h+10],15,-1051523),f=m(f,i,a,c,n[h+1],21,-2054922799),c=m(c,f,i,a,n[h+8],6,1873313359),a=m(a,c,f,i,n[h+15],10,-30611744),i=m(i,a,c,f,n[h+6],15,-1560198380),f=m(f,i,a,c,n[h+13],21,1309151649),c=m(c,f,i,a,n[h+4],6,-145523070),a=m(a,c,f,i,n[h+11],10,-1120210379),i=m(i,a,c,f,n[h+2],15,718787259),f=m(f,i,a,c,n[h+9],21,-343485551),c=d(c,r),f=d(f,e),i=d(i,o),a=d(a,u);return[c,f,i,a]}function a(n){for(var t="",r=32*n.length,e=0;e<r;e+=8)t+=String.fromCharCode(n[e>>5]>>>e%32&255);return t}function h(n){var t=[];for(t[(n.length>>2)-1]=void 0,e=0;e<t.length;e+=1)t[e]=0;for(var r=8*n.length,e=0;e<r;e+=8)t[e>>5]|=(255&n.charCodeAt(e/8))<<e%32;return t}function e(n){for(var t,r="0123456789abcdef",e="",o=0;o<n.length;o+=1)t=n.charCodeAt(o),e+=r.charAt(t>>>4&15)+r.charAt(15&t);return e}function r(n){return unescape(encodeURIComponent(n))}function o(n){return a(i(h(t=r(n)),8*t.length));var t}function u(n,t){return function(n,t){var r,e,o=h(n),u=[],c=[];for(u[15]=c[15]=void 0,16<o.length&&(o=i(o,8*n.length)),r=0;r<16;r+=1)u[r]=909522486^o[r],c[r]=1549556828^o[r];return e=i(u.concat(h(t)),512+8*t.length),a(i(c.concat(e),640))}(r(n),r(t))}function t(n,t,r){return t?r?u(t,n):e(u(t,n)):r?o(n):e(o(n))}"function"==typeof define&&define.amd?define(function(){return t}):"object"==typeof module&&module.exports?module.exports=t:n.md5=t}(this);
}
InitMd5();
})();

// Crc32:
(function(W){
 var CTable=(function(i,c,j,T){T=[];for(i=0;i<=255;i++){c=i;for(j=0;j<=7;j++)c=((c&1)?0xedb88320:0)^(c>>>1);T.push(c)}return T})();
 W.Crc32||(W.Crc32=function(data){return Up(-1,data)});W.UpdateCrc32||(W.UpdateCrc32=Up);function Up(C,data){C=C&0xffffffff;if(data){if(typeof data!='string')data=''+data;var len=data.length,i,D;for(i=0;i<len;i++)C=(C>>>8)^CTable[(C^data.charCodeAt(i))&0xff]}return C}
})(window);
