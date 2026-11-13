/* Gallery viewer support */
/* code by P.A.Semi 2019-03-09 - 2021-10-22 */

(function(){
var Gallery,galImgView;

InitGallery();

function InitGallery(){
  // either use class=imglink in <a> or <area>
  var gal=[],i,a,img;
  var list=document.getElementsByClassName('imglink'); // iexplore error, but position:fixed missing also.
  if(!list||!list.length){
    // or take all image anchors and all area
    var ar=[],C,Ima,Rg=/\.j?pe?n?g$/i; // jpg or png
    list=Geb(document,'img');
    if(list&&(C=list.length)){for(i=0;i<C;i++){Rg.test(Ga(Ima=list[i].parentNode,'href'))&&ar.push(Ima)}}
    list=Geb(document,'area');
    if(list&&(C=list.length)){for(i=0;i<C;i++)ar.push(list[i])}
    if(!ar.length)return;
    list=ar
  }
  
  for(i=0;i<list.length;i++){
    if((a=list[i]).onclick)continue;
    Sa(a,'target','_blank').onclick=OpenGallery;
    gal.push(a);
    (img=Geb(a,'img')[0])&&(img.onclick=OpenGallery);
  }
  Gallery=gal
}

function OpenGallery(ev){
  canc(ev);
  var E=this,U;
  while(E&&!(U=Ga(E,'href')))E=E.parentNode;
  //
  var view=galImgView||(galImgView=OpenImgView(U));
  view.SelectImg(E);
  view.nextItem&&view.ANext.focus();
  return!1
}

function Ce(T,Fun){T=document.createElement(T);Fun&&Fun(T);return T}
function Sy(e,s){return Sa(e,'style',s)}
function Tx(e,t){e&&(e.textContent=e.innerText=t);return e}
function Apc(p,c,b){p&&c&&p.insertBefore(c,b||null);return p}
function Sa(e,n,v){e&&e.setAttribute(n,v);return e}
function Ga(e,n){return e&&e.getAttribute(n)}
function Geb(e,t){return e&&e.getElementsByTagName(t)}
function BG(e,b){e.style.color=b?'black':'gray'}

function OpenImgView(imgUrl){
  var V={
    SelectImg: function(A){
      if(!A)return CloseImgView();
      var V=this,G,C,idx,Pi,Ni=Pi=null,Th;
      if(V.currentImg==A)return;
      //
      V.currentImg=A;
      if(V.already){
        var NImg=V.NewImg=V.CreateImgView(), OImg, Par, nsteps=10;
        NImg.onload=function(){
          var NImg=this,nst=Ga(NImg,'style');
          NImg.onload=null;
          window.setTimeout(function(){
            OImg=V.ImgView;
            Par=OImg.parentNode;
            var ox=OImg.offsetLeft,oy=OImg.offsetTop,ow=OImg.offsetWidth,oh=OImg.offsetHeight;
            var nw=NImg.width, nh=NImg.height;
            var pw=Par.offsetWidth, ph=Par.offsetHeight, px=Par.offsetLeft||0, py=Par.offsetTop||0;
            var fs=(nw&&nh)?Math.min(pw/nw,ph/nh):1;
            nw=Math.round(nw*fs);
            nh=Math.round(nh*fs);
            var S=NImg.style;
            var nx=Math.round(px+ox+ow/2-nw/2+10), ny=Math.round(py+oy+oh/2-nh/2-7);
            S.left=nx+'px';S.top=ny+'px';
            S.marginLeft=S.marginRight='';
            S.position='absolute';
            OImg.style.zIndex=2+(S.zIndex=1);
            S.opacity=0.01;
            Par.insertBefore(NImg,OImg);
            V.ImgView=NImg;
            //
            window.setTimeout(SwitchImg,20);
            S=null
          },10);
          //
          function SwitchImg(){
            var So=OImg.style, Sn=NImg.style;
            if(!OImg.parentNode||!NImg.parentNode)return;
            //
            var op=Sn.opacity+0.5;
            if(((--nsteps)<=0)||(op>=1)){
              Sn.opacity=1;
              So.opacity=0;
              Par.removeChild(OImg);
              Sn.position='';
              Sy(NImg,nst);
              NImg=Par=nst=null;
              OImg.src='';
              OImg=null;
              BG(V.Caption,1)
            }else{
              So.opacity=1-(Sn.opacity=op);
              window.setTimeout(SwitchImg,10)
            }
            Sn=So=null
          }
        };
        BG(V.Caption,0);
        NImg.src=Ga(A,'href')
      }else{
        V.ImgView.src=Ga(A,'href');
        V.already=!0
      }
      //
      Th=Geb(A,'img')[0]||A; //thumb
      Tx(V.Caption,Ga(Th,'title')||Ga(Th,'alt')||GetFileName(A)||'???');
      //
      (G=Gallery) && ((idx=G.indexOf(A))>=0) && ( (idx>0)&&(Pi=G[idx-1]) , (idx<G.length-1)&&(Ni=G[idx+1]) );
      V.priorItem=Pi;
      V.nextItem=Ni;
      //
      BG(V.APrior,Pi);BG(V.APrior2,Pi);
      BG(V.ANext,Ni);BG(V.ANext2,Ni);
      V.APrior3.style.opacity=Pi?0.1:0;
      V.ANext3.style.opacity=Ni?0.1:0;
      return !0
    },
    PriorImg: function(A){
      (A=this.priorItem)&&this.SelectImg(A)
    },
    NextImg: function(A){
      ((A=this.nextItem)&&this.SelectImg(A))||Gal_StopAuto(4)
    },
    Shade: Ce('div',function(D){
              Sy(D,'position:fixed;left:0px;top:0px;right:0px;bottom:0px;opacity:0.5;background-color:black;z-index:90');
              D.onclick=D.onmousedown=D.onfocus=CloseImgView
            }),
    DOuter: Ce('div',function(D){
              Ke(Sy(D,'position:fixed;left:20px;top:20px;right:20px;bottom:20px;background:white;border:1px solid gray;z-index:93')).onmousedown=OutMouseDown
            }),
    DTop: Ce('div',function(D){
              Sy(D,'width:100%;overflow:auto;border-bottom:1px solid gray;background-color:#eee').ondblclick=canc;
              Ke(Apc(D,FloatBt('X',CloseImgView,'right')))
            }),
    CreateImgView: function(){return Ce('img',function(I){
              Sy(I,'display:block;margin:auto;max-width:98%;max-height:95%;margin-top:4px;z-index:99').ondblclick=CloseImgView;
              Ke(I).onclick=NFoc
            })},
    Caption: Ce('h3',function(H){
              Ke(Sy(H,'width:100%;text-align:center;color:black;margin:0px')).onclick=NFoc
            }),
    APrior: FloatBt('<<',Gal_PriorImg,'left'),
    ANext: FloatBt('>>',Gal_NextImg,'right'),
    ANext2: FloatBt('>>',Gal_NextImg,'left'),
    APrior2: FloatBt('<<',Gal_PriorImg,'right'),
    APrior3: Arrow('<','left:22px',Gal_PriorImg),
    ANext3: Arrow('>','right:22px',Gal_NextImg),
    btAuto: FloatBt('(A)',Gal_PopupAuto,'right')
  };
  V.ImgView=V.CreateImgView();
  function FloatBt(txt,click,fl) {
    return Ce('a',function(A){
      Tx(Sy(Sa(A,'href','#'),'float:'+(fl||'left')+';text-decoration:none;padding:2px;margin:1px;border:1px solid black;font-weight:bold;color:black'),txt).onclick=click;
      Ke(A)
    })
  }
  function Arrow(t,p,o){
    return Tx(Ce('span',function(S){Sy(S,'position:fixed;'+p+';top:45%;font-size:64px;font-weight:bold;z-index:-1;opacity:0.1').onmousedown=o}),t);
  }
  function NFoc(){var F=galImgView&&galImgView.ANext;F&&(F!=this)&&F.focus()}
  function Ke(E){E.onkeydown=ImgViewKeyDown;E.onmousedown=CloseAutoPup;E.onwheel=ImgViewWheel; (E.tagName!='A')&&(E.onfocus=NFoc); return E}
  //
  Apc(Apc(Apc(Apc(Apc(Apc(V.DTop,V.APrior),V.ANext2),V.ANext),V.APrior2),V.btAuto),V.Caption);
  //
  Apc(Apc(Apc(Apc(V.DOuter,V.APrior3),V.ANext3),V.DTop),V.ImgView);
  //
  if(imgUrl)V.ImgView.src=imgUrl;
  //
  Apc(Apc(document.body||(Geb(document.documentElement,'body')[0]),V.Shade),V.DOuter);
  try{window.HidePlay&&window.HidePlay()}catch(E){}
  //
  return V
}

function Gal_PriorImg(ev){
  canc(ev);
  Gal_StopAuto(1);
  galImgView.PriorImg();
  return!1
}

function Gal_NextImg(ev){
  if(ev)Gal_StopAuto(2)
  canc(ev);
  galImgView.NextImg();
  return!1
}

function ImgViewKeyDown(ev){
  if(!(ev=ev||window.event))return;
  var key=ev.which||ev.keyCode;
  
  switch(key){
    case 27: return CloseImgView(ev); // 27=escape
    case 39: case 34: return Gal_NextImg(ev); // 39=right, 34=page down
    case 37: case 33: return Gal_PriorImg(ev); // 37=left, 33=page up
    case 0x41: return Gal_PopupAuto(ev); // A=Auto
  }
  //alert(key)
}
function ImgViewWheel(ev){
  var d=(ev||(ev=window.event)).deltaY||ev.deltaX||0;
  return (d<0)?Gal_PriorImg(ev):(d>0)?Gal_NextImg(ev):null
}

function OutMouseDown(ev){
  if(!(ev=ev||window.event)||(ev.target!=galImgView.DOuter))return;
  var x=ev.clientX-this.offsetLeft,w=this.offsetWidth;
  return(x<w*0.45)?Gal_PriorImg(ev):(x>w*0.55)?Gal_NextImg(ev):null
}

function GetFileName(A){
  var U=Ga(A,'href'),p;
  if(U){
    ((p=U.indexOf('#'))>0)&&(U=U.substring(0,p));
    while((p=U.indexOf('/'))>=0)U=U.substring(p+1,255);
    return U
  }
  return null
}

function CloseImgView(ev){
  canc(ev);
  //
  var V=galImgView;
  if(!V)return!1;
  galImgView=null;
  //
  Hide(V.Shade);
  Hide(V.DOuter);
  function Hide(E){E&&(E.style.display='none',E.parentNode&&E.parentNode.removeChild(E))}
  //
  V.tmAuto&&(clearTimeout(V.tmAuto),V.tmAuto=null);
  //
  return!1
}

function Gal_PopupAuto(ev){
  canc(ev);
  //
  var V=galImgView,x=0,y=0,tm;
  if(V.AutoPup)return CloseAutoPup();
  if(V.tmAuto)return Gal_StopAuto(3);
  //
  CalcOffset(V.btAuto);
    function CalcOffset(N){
      while(N){
        if(N.offsetLeft)x+=N.offsetLeft;
        if(N.offsetTop)y+=N.offsetTop;
        N=N.parentNode;
      }
    }
  //
  var Pup=V.AutoPup=Ce('div',function(D){Sy(D,'visibility:hidden;display:block;position:fixed;z-index:120;background-color:ButtonFace;border:1px solid ButtonShadow;padding:2px 8px;margin:2px;')});
  Apc(Pup,Pup.D1=Ce('div',function(D){D.innerHTML='Automatic slide-show<br><br>Interval:&nbsp;&nbsp;'}));
  Apc(Pup.D1,Pup.EInterval=Ce('input',function(I){I.type='number';I.max=60;I.min=0.1;I.align='right';Sy(I,'width:3em').onkeydown=AutoPup_Interval_KeyDown}));
  Apc(Pup.D1,Ce('br'));
  Apc(Pup.D1,Pup.btStart=Ce('input',function(I){I.type='button';I.value='Start';Sy(I,'margin-top:3px').onclick=Gal_StartAuto}));
  Apc(Pup.D1,Pup.btCancel=Ce('input',function(I){I.type='button';I.value='Cancel';Sy(I,'margin-top:3px;margin-left:4px').onclick=CloseAutoPup}));
  Apc(V.DOuter.parentNode,Pup);
  //
  tm=(V.AutoInterval&&(V.AutoInterval/1000)) || (localStorage&&parseFloat(localStorage.getItem('SlideShow_Auto'))) || 2.1;
  Pup.EInterval.value=tm;
  //
  Pup.style.left=x-Pup.offsetWidth+V.btAuto.offsetWidth;
  Pup.style.top=y+4+V.btAuto.offsetHeight;
  //
  Pup.style.visibility='visible';
  Pup.EInterval.focus();
  //
  return!1
}

function AutoPup_Interval_KeyDown(E){
  if (E=E||window.event) {
    switch(E.which||E.keyCode){
      case 13: {
        galImgView.AutoPup.btStart.click();
        return!1
      }
    }
  }
}

function Gal_StopAuto(k){
  var V=galImgView;
  if(!V)return;
  if(V.tmAuto){clearTimeout(V.tmAuto);V.tmAuto=null}
  V.btAuto.style.background='none';
  return V.bnAuto=!1
}

function Gal_AutoTimer(){
  var V=galImgView;
  if(!V)return;
  V.tmAuto=null;
  if(V.bnAuto) {
    Gal_NextImg();
    if(V.AutoInterval)V.tmAuto=setTimeout(Gal_AutoTimer,V.AutoInterval);
  }
}

function Gal_StartAuto(ev){
  canc(ev);
  //
  var V=galImgView,tm=V.AutoPup.EInterval.value;
  if(typeof tm=='string')tm=parseFloat(tm);
  tm=V.AutoInterval=(tm||5)*1000;
  localStorage&&localStorage.setItem('SlideShow_Auto',''+(tm/1000));
  //
  CloseAutoPup();
  //
  V.tmAuto=setTimeout(Gal_AutoTimer,tm);
  V.bnAuto=!0;
  V.btAuto.style.backgroundColor='ButtonShadow';
  //
  return!1
}

function CloseAutoPup(){
  var V=galImgView,Pup=V&&V.AutoPup;
  if(!Pup)return!1;
  Pup.parentNode&&Pup.parentNode.removeChild(Pup);
  V.AutoPup=null;
  return V.bnAuto=!1
}

function canc(E){
  (E=E||window.event||{}).stopPropagation&&E.stopPropagation();
  E.preventDefault&&E.preventDefault();
  return E.returnValue=!1
}

})();
