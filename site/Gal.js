// Gal.js - gallery viewer...

!function(D,W){
 var con=(0&&console&&console.log)?console:{log:function(){},error:function(){}};
 
 var G=W.Gal={aimgs:[]},__Gv,tzi;
 
 var galCfg=W.galCfg=W.galCfg||{smStr:'top',smH:64}; // currently unused...
 
 function scanImgA(){ // -> [{a,u,i}]
  var n=0,aimgs=[],t=['a','area'].forEach(function(t){[].slice.call(D.querySelectorAll(t+'.imglink')).forEach(function(A,u){if(u=A.href)if(u.indexOf('#')<0)aimgs.push({a:A,u:u,i:++n})})});
  return aimgs
 }
 function OpenImg(ev){return!(__Gv=__Gv||OpenImgView(G.aimgs,this)).select(this)||Cancel(ev)}
 function InitImgA(){ // initial scan, + can re-scan later...
  (G.aimgs=scanImgA()).forEach(function(o){
   o.a.Gal||AEvent(Sv(o.a,{Gal:G,gi:o}),{click:OpenImg})
  })
 }
 InitImgA();
 
 function closeBtn(on){return Ce('span','"x"','position:absolute;line-height:1.4em;z-index:9;right:1px;top:1px;width:1.5em;height:1.5em;border:1px outset;color:white;background:#b61b02;opacity:0.7;cursor:pointer;text-align:center;font-family:Courier New,fixed;border-radius:4px',{onclick:on})}
 function closeBtn2(on){return Ce('input',{type:'button',value:"Close"},'position:absolute;line-height:1.333em;z-index:7;left:1px;top:1px;opacity:0.7;cursor:pointer;border-radius:4px',{onclick:on})}
 function EShift(ev){return(ev.ctrlKey?'c':'')+(ev.shiftKey?'s':'')+(ev.altKey?'a':'')}
 
 function OpenImgView(aimgs,asel){
  var smStr,lgStr,imVi,fo,cap,ANext,APrior;
  var Gv=Ce('div','position:fixed;left:0px;top:0px;right:0px;bottom:0px;background:ButtonFace;opacity:0.1;overflow:hidden',
   closeBtn(btCloseClick),closeBtn2(btCloseClick),
   cap=Ce('div','margin:auto;text-align:center;background:ButtonFace;border:1px inset ButtonFace;padding:1px;font-weight:bold'),//!!!todo
   fo=Ce('input','opacity:0',{type:'text'}),
   smStr=Ce('div','position:absolute;left:2px;top:2px;right:2px;height:4em;overflow:hidden',Ce('div','position:absolute;left:0px;top:0px;bottom:0px;display:flex;flex-flow:row nowrap')),
   lgStr=Ce('div','position:absolute;left:2px;top:4.1em;right:2px;bottom:2px;overflow:hidden',imVi=Ce('div')),
   APrior=Ce('div','" < "','position:absolute;left:0.2em;top:45%;padding:4px;border:1px solid gray;border-radius:4px;background:ButtonFace;opacity:0.1;font-size:120px;z-index:7;cursor:pointer',btHovers(clickPrior)),
   ANext=Ce('div','" > "','position:absolute;right:0.2em;top:45%;padding:4px;border:1px solid gray;border-radius:4px;background:ButtonFace;opacity:0.1;font-size:120px;z-index:7;cursor:pointer',btHovers(clickNext)),
   Ce('div','position:absolute;left:0px;top:0px;bottom:0px;width:10%;z-index:6;cursor:pointer',btHovers(clickPrior),{other:APrior}),
   Ce('div','position:absolute;right:0px;top:0px;bottom:0px;width:10%;z-index:6;cursor:pointer',btHovers(clickNext),{other:ANext}),
   {});
  !function(s){Gv.box=s.overflowX;Gv.boy=s.overflowY;s.overflow='hidden'}(D.body.style);
  function btHovers(click){
   function btMouseOver(){this.style.opacity=0.88;if(this.other)this.other.style.opacity=0.88}
   function btMouseLeave(){this.style.opacity=0.1;if(this.other)this.other.style.opacity=0.1}
   function dblClick(ev){return click(ev),Cancel(ev)} // thus dblClick skips 2 images...
   return{onmouseover:btMouseOver,onmouseleave:btMouseLeave,onclick:click,ondblclick:dblClick}
  }
  function btCloseClick(ev){return Gv.close(),Cancel(ev||W.event)}
  G.galView=Gv;
  Sy(Gv,{zIndex:tzi=(W.topZ||tzi||100000)*1+10,visibility:'hidden'});
  Sv(Gv,{
   Caption:cap,
   select:function(a){
    //!!!todo - instead select in lgStr viewer, in smStr stripe
    //!!!todo - this is old method, replace single image:
    if(!a)return this.close();
    con.log('select:',a);
    if(IsTag(a.a,'a'))a=a.a;
    var V=this;
    if(V.currentA==a)return!0;
    //
    V.currentA=a;
    if(V.already){
     var NImg=V.newImg=V.createImg(), OImg, Par, nsteps=10;
     NImg.onload=function(){
      var NImg=this,nst=Ga(NImg,'style');
      NImg.onload=null;
      W.setTimeout(function(){
       Par=(OImg=V.imgView).parentNode;
       var ox=OImg.offsetLeft,oy=OImg.offsetTop,ow=OImg.offsetWidth,oh=OImg.offsetHeight;
       var nw=NImg.width, nh=NImg.height;
       var pw=Par.offsetWidth,ph=Par.offsetHeight,px=Par.offsetLeft||0,py=Par.offsetTop||0;
       var fs=(nw*nh)?Math.min(pw/nw,ph/nh):1;
       nw=Math.round(nw*fs);
       nh=Math.round(nh*fs);
       var S=NImg.style;
       var nx=Math.round(px+ox+ow/2-nw/2+10),ny=Math.round(py+oy+oh/2-nh/2-7);
       S.left=nx+'px';S.top=ny+'px';
       S.marginLeft=S.marginRight='';
       S.position='absolute';
       OImg.style.zIndex=2+(S.zIndex=1);
       S.opacity=0.01;
       Par.insertBefore(NImg,OImg);
       V.imgView=NImg;
       //
       W.setTimeout(switchImg,20);
       S=0
       //
      },10);
      //
      function switchImg(){
        Anim(OImg,0,{opacity:0},200,5);
        Anim(NImg,0,{opacity:1},200,5).then(function(){
         if(!OImg.parentNode||!NImg.parentNode)return;
         var So=OImg.style,Sn=NImg.style;
         Sn.opacity=1;
         So.opacity=0;
         Sy(NImg,nst);
         NImg=Par=nst=0;
         OImg.src='';
         OImg=0;
         rmLoading(BG(V.Caption,1));
        })
      }
      //
     };
     BG(V.Caption,0);
     NImg.src=Ga(a,'href')
    }else{
     var ivi,ldNotify=function(){rmLoading(BG(Gv.Caption,1));REvent(ivi,'load',ldNotify);ivi=ldNotify=0};
     AEvent(ivi=V.imgView,'load',ldNotify);
     V.imgView.src=Ga(a,'href');
     V.already=!0
    }
    //
    var Th=(byTag(a,'img')||[])[0]||a; //thumb
    Tx(V.Caption,'Loading: '+(V.Caption.txt=Ga(Th,'title')||Ga(Th,'alt')||GetFileName(a)||'???')).bnLoading=1;
    //
    var idx=findAImg(aimgs,a),Pi=(idx>0)?aimgs[idx-1]:0,Ni=(idx<aimgs.length-1)?aimgs[idx+1]:0;
    Gv.priorImg=Pi;
    Gv.nextImg=Ni;
    //!!!todo - ena other n/p buttons...
    BG(APrior,Pi);BG(ANext,Ni); //!!!todo
    //
    function rmLoading(E){if(E.bnLoading)E.bnLoading=0,Tx(E,E.txt);return E}
    //
    return!0
   },
   selectBy:function(dir){ // == selectNext, selectPrev
    var a=(dir<0)?this.priorImg:this.nextImg;
    return a?this.select(a):!1
   },
   close:function(){
    function un(s){Unl(Gv);s=D.body.style;s.overflowX=Gv.box;s.overflowY=Gv.boy;G.galView=__Gv=Gv=s=smStr=lgStr=imVi=aimgs=null}
    Gv.parentNode?Anim(Gv,{opacity:1},{opacity:0},250,8,un):un();
    return!1
   },
   createImg:function(){
    return Ke(Ce('img','display:block;margin:auto;max-width:98%;max-height:95%;margin-top:4px;z-index:9',{ondblclick:closeImgView,onclick:NFoc}))
   },
  });
  //
  Gv.imgView=Gv.createImg();
  Apc(lgStr,Gv.imgView);
  //
  function galKey(ev){
   //con.log(ev);
   switch((ev=ev||W.event).key||ev.keyCode||ev.which){
     case 13:case 'Enter':
     case 39:case 'ArrowRight':
     case 34:case 'PageDown':return Gv.selectBy(1),Cancel(ev);
     case 37:case 'ArrowLeft':
     case 33:case 'PageUp':return Gv.selectBy(-1),Cancel(ev);
     case 27:case 'Escape':return Gv.close(),Cancel(ev);
   }
  }
  function closeImgView(ev){return Gv.close(),Cancel(ev)}
  function NFoc(){if(fo&&fo!=this)fo.focus()}
  function imViWheel(ev){
   //!!!todo
  }
  function clickNext(ev){return Gv.selectBy(1),Cancel(ev)}
  function clickPrior(ev){return Gv.selectBy(-1),Cancel(ev)}
  function Ke(E){return AEvent(E,Sv({keydown:galKey,wheel:imViWheel},(E.tagName!='A')?{focus:NFoc}:0))}
  function foCheck(ev){
   con.log('focus:',ev,ev.target); // onfocus does not happen ?
   if((ev=ev||window.event||{}).target!=fo)return fo.focus(),Cancel(ev)
  }
  function findAImg(aimgs,a,i,m,g){for(i=0,g=aimgs.length;i<g;i++)if(m=aimgs[i])if(m.a==a)return i;return-1}
  //
  AEvent(Gv,{keydown:galKey,focus:foCheck,mousedown:function(e){con.log(e);setTimeout(function(){fo.focus()},20)}},0,!0);
  AEvent(Gv,{dblclick:closeImgView});
  Apc(D.body,Gv);
  if(asel)Gv.select(asel);
  //
  Sy(Gv,{visibility:'visible'});
  //
  Anim(Gv,{opacity:0.1},{opacity:1},250,8);
  fo.focus();
  //
  return Gv
 }

//--------------------------------------------- 
function Anim(E,v1,v2,t,n,on){
 var ex=Date.now()+(t=t||1000),st=t/(n=n||8),p,S=E.style,ai=[],ons=(typeof on=='function')?[on]:[],vo,vn,un;
 v1||(v1={});
 function nun(v,a){un='';if(a=/^\s*(-?\+?[0-9.]+)([a-z]*)\s*$/.exec(v)){un=a[2];v=a[1]}return parseFloat(v)}
 for(p in v2)if(!IsNull(vo=nun(v1[p]))||!IsNull(vo=nun(S[p])))if(!IsNull(vn=nun(v2[p])))ai.push([S,p,vo,vn+un,(vn-vo)/n,un]);
 S=v1=v2=0;
 function doFin(){
  ai&&ai.forEach(function(it,s,p){(s=it[0])&&(p=it[1])&&(s[p]=it[3])}),ai=0;
  while(ons&&ons.length)if(on=ons.shift())on(E);
  ons=on=0
 }
 function doStep(){
  if(!--n||Date.now()>ex)return doFin();
  ai.forEach(function(it,s,p,o,k){isNaN(k=it[4])||(s=it[0])&&(p=it[1])&&(s[p]=(it[2]+=k)+it[5])});
  st&&setTimeout(doStep,st)
 }
 setTimeout(ai.length?doStep:doFin,st);
 return{then:function(f){ons?ons.push(f):setTimeout(function(){f(E)},10)}}
}

function BG(E,B){if(E)E.style.color=B?'black':'gray';return E}
function GetFileName(A,u,p){
 if(u=Ga(A,'href')){
  if((p=u.indexOf('#'))+1)u=u.substr(0,p);
  while((p=u.indexOf('/'))+1)u=u.substr(p+1);
  return u
 }
 return null
}

//--------------------------------------------- 
// dynui4:
function Ce1(T,F){var E=document.createElement(T);return(F&&F(E))||E}
function Ga(E,N){return(E&&N&&E.getAttribute)?E.getAttribute(N):null}
function Sa(E,N,V){if(!V&&IsObj(N)){for(V in N)Sa(E,V,N[V]);return E}E&&N&&E.setAttribute(N,V||'');return E}
function Sv(E,V){if(E&&V)for(var n in V)E[n]=V[n];return E}
function byTag(E,T){return E&&T&&E.getElementsByTagName(T)}
function unq(S){var q;switch(q=(S=(S||'').trim()).substring(0,1)){case '"':case "'":{return S=S.substring(1),(q=S.indexOf(q))+1?S.substring(0,q):S}default:return S}}
function Inh(E,T){E&&(E.innerHTML=T||'');return E}
function Tx(E,T){if(E)('innerText' in E)?(E.innerText=T||''):(E.textContent=T||'');return E}
function Txn(T){return document.createTextNode(T||'')}
function Apc(P,C,B){P&&C&&P.insertBefore(C,B||null);return P}
function Sy(E,S){IsObj(S)?Sv(E&&E.style,S):Sa(E,'style',S);return E}
function Unl(E,p){E&&(p=E.parentNode)&&p.removeChild(E);return E}
function Cancel(E){E||(E={});E.stopPropagation&&E.stopPropagation();E.preventDefault&&E.preventDefault();return E.returnValue=!1}
function IsTag(E,t){return(''+((E&&E.tagName)||'')).toLowerCase()==t}
function IsObj(O){return O&&(typeof O=='object')}
function AEvent(E,N,F,bn){if(IsObj(N)){for(F in N)AEvent(E,F,N[F],bn);return E}E&&N&&(E.addEventListener?E.addEventListener(N,F,bn||false):E.attachEvent?E.attachEvent('on'+N,F):(E['on'+N]=F));return E}
function REvent(E,N,F){if(IsObj(N)){for(F in N)REvent(E,F,N[F]);return E}if(E&&N)E.removeEventListener?E.removeEventListener(N,F):E.detachEvent?E.detachEvent('on'+N,F):E['on'+N]=null;return E}

function IsNull(O){return(!O&&(O===undefined||O===null))}
function IsFunc(F){return F&&(typeof F=='function')}
function IsElem(E){return IsObj(E)&&('parentNode' in E)}
function IfElem(E){return IsElem(E)?E:null}
function IsStr(S){return typeof S=='string'}
function IsHtml(S){if(S&&IsStr(S)){var A;
 return((S.indexOf('&')+1)&&/&\#?[a-z0-9]+;/i.test(S))||!!((S.indexOf('<')+1)&&(A=/<([a-z0-9]+)[^<>]*>/i.exec(S))&&(S.indexOf('</'+A[1]+'>')+1))
}}

function Ce(tag,mixed){
 var Ar=arguments,C=Ar.length,i,par,n=null,El=IsElem(tag)?tag:Ce1(tag),ma,na,op,v,fu,pre,o,co,q;
 Ce.rA||init();
 for(i=1;i<C;i++)switch(typeof(par=Ar[i]||n)){
  case 'string':{
   if(((q=(pre=par.trim()).substring(0,1))=='"')||(q=="'")){// "quoted" -- innerText
    par=pre.substring(1);((op=par.lastIndexOf(q))>=0)&&!par.substring(op+1).trim()&&(par=par.substring(0,op));
    if(IsHtml(par)){El.firstChild?MvSubs(El,Inh(Ce('div'),par)):Inh(El,par)}else Apc(El,Txn(par));
    par=pre=n;
    break
   }
   o=par.indexOf('=')+1;co=par.indexOf(':')+1;
   if(!o&&!co&&(ma=Ce.rC.exec(par))){// 'className'
    Sa(El,'class',((Ga(El,'class')||'')+' '+par).trim())
   }else
   if((o||co)&&(ma=Ce.rA.exec(par))){ // 'a=value' 'css:props'
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
   if(co&&(ma=Ce.rP.exec(par))){// 'prop:', value follows...
    na=ma[1];par=n;v=Ar[++i];
    El&&(El[na]=v)
   }else{
    con.log('Ce unknown:',par);// ?
   }
   ma=n;break
  }
  case 'object':{IsElem(par)?Apc(El,par):Sv(El,par);break}
  case 'function':{El=IfElem(par(El))||El;par=n;break}
 }
 function init(){Sv(Ce,{rA:/^\s*([a-z]+:|)([a-z0-9_\-$]+)([:=]|\+=|-=)(.*)/i,rC:/^\s*([a-z_\-$][^:=\(\)\[\]]+)\s*$/i,rP:/^\s*([a-z0-9_\-$]+)\s*:\s*$/i})}
 function MvSubs(D,S,e){while(e=S.firstChild){S.removeChild(e);Apc(D,e)}return D}
 return El
}

//function min(){var A=arguments,m=A[0],i,j,c=A.length;for(i=1;i<c;i++)if(!isNaN(j=A[i]))if(isNaN(m)||(j<m))m=j;return m}
function max(){var A=arguments,m=A[0],i,j,c=A.length;for(i=1;i<c;i++)if(!isNaN(j=A[i]))if(isNaN(m)||(j>m))m=j;return m}

var topZ=2000;
function Movable(What,Movers){ // currently unused...
 if(!What)return null;
 var Ms=What.Movers||(What.Movers=[]),i,Ar=arguments,c=Ar.length,E,Leg;
 What.MoveBy||(What.MoveBy=function(dx,dy,nx,ny){Sv(this.style,{left:nx+'px',top:ny+'px'})});
 What.FinishMove||(What.FinishMove=function(nx,ny){});
 function MvMouseDown(ev){
  ev=ev||window.event;if(!ev)return;
  var M=What,zi=topZ=M.style.zIndex=max(M.style.zIndex*1,topZ)+4,T=ev.target;
  Leg||fiLeg();
  if(T!=M)if(Ms.indexOf(T)<0)return;
  function pix(p,A){return(A=/([0-9]+)px/.exec(p))?parseInt(A[1]):null}
  var mx,my,minit=T=!0,S=M.style,ex=pix(S.left)||M.offsetLeft||0,ey=pix(S.top)||M.offsetTop||0;
  var Handler=Ce('span','position:fixed;left:0px;top:0px;right:0px;bottom:0px;opacity:0.01;cursor:move;z-index:'+(zi+1e6),{onmousedown:StopMv,onmouseup:StopMv,onmousemove:ApplyMv});
  Cancel(ev);
  Sv(S,{left:ex+'px',top:ey+'px',right:'',bottom:''});
  function StopMv(ev){var H=Unl(Handler);try{M.FinishMove(ex,ey)}catch(e){}Handler=M=S=null;return!1}
  function ApplyMv(ev){if(ev=ev||window.event){
   var x=ev.screenX,y=ev.screenY,dx=x-mx,dy=y-my;
   mx=x;my=y;
   if(minit){minit=!1;return}
   M.MoveBy(dx,dy,ex+=dx,ey+=dy)
  }}
  Ce(document.body,Handler);
  return!1
 }
 function hk(E){E&&Ms.push(E);E.style.cursor='pointer';return AEvent(E,'mousedown',MvMouseDown)}
 function fiLeg(){return Leg||((Leg=What.firstElementChild)&&IsTag(Leg,'legend')&&(Ms.indexOf(Leg)+1||hk(Leg)))?Leg:(Leg=null)}
 for(i=1;i<c;i++)if(E=Ar[i])hk(E);
 fiLeg();
 return hk(What)
}
function WCenter(E){var W=window,x=Math.round(((W.innerWidth||W.clientWidth)-E.offsetWidth)/2),y=Math.round(((W.innerHeight||W.clientHeight)-E.offsetHeight)/2);Sv(E.style,{left:(x<0?0:x)+'px',top:(y<0)?0:y+'px'});return E}
//
}(document,window)