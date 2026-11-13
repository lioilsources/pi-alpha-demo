!function(D,W){
 var actDv;
 [].map.call(D.getElementsByClassName('videoPlace'),function(di){
  var de=di.getAttribute('data-videoDesc');//console.log(de);
  if(!de)return;
  try{de=eval('('+de+')')}catch(x){console.error(x);return!1}
  if(!de)return;
  function parseSize(size){
   switch(typeof size){
    case 'string':{var A=/([0-9]+)x([0-9]+)/.exec(size);return A?{x:parseInt(A[1]),y:parseInt(A[2])}:!1}
    case 'object':return size?size:!1
   }
   return!1
  }
  function canFit(size){
   if(size=parseSize(size)){var w=W.innerWidth,h=W.innerHeight;return w&&(size.x<=w)&&h&&(size.y<=h)}
   return!1
  }
  if(de.large&&canFit(de.large.size))de=de.large;
  var sz=parseSize(de.size),img=di.getElementsByTagName('img')[0];
  if(sz&&de.video&&img){
   de.videoDesc=de;de.videoSize=sz;
   img.style.cursor='pointer';
   img.onclick=(function(di,de,im,dv,vi,sh){return function(e){
    Cancel(e);
    //dv=dv||Ce('div',vi=vi||Ce('video','src='+de.video,'poster='+de.poster||im.getAttribute('src'),'width:'+de.videoSize.x+'px;height:'+de.videoSize.y+'px'));
    //Sv(dv.style,{position:'absolute'});
    im.style.transition='opacity 0.2s ease';
    if(!dv){
     dv=D.createElement('div');
     Sv(dv.style,{position:'absolute',margin:'auto',opacity:0.01,transition:'opacity 0.3s ease',backgroundColor:'ButtonFace',padding:'3px',left:(W.innerWidth-de.videoSize.x-6)/2+'px',zIndex:1000});
     dv.Close=function(){
      dv.style.opacity=0;
      sh&&sh.parentNode&&sh.parentNode.removeChild(sh);
      setTimeout(function(){dv.parentNode&&dv.parentNode.removeChild(dv)},300);
      vi&&vi.pause();
      im.style.opacity=1
     }
    }
    if(!vi){
     vi=D.createElement('video');
     vi.setAttribute('src',de.video);
     vi.setAttribute('poster',de.poster||im.getAttribute('src'));
     vi.setAttribute('controls',!0);
     Sv(vi.style,{width:de.videoSize.x+'px',height:de.videoSize.y+'px'});
     vi.onkeydown=function(e){
      switch((e=e||W.event).key){
       case'Escape':return dv.Close(),Cancel(e);
       case' ':case'Enter':return vi.playing?vi.pause():vi.play(),Cancel(e)
      }
     };
     vi.onended=function(e){vi.autoClosing=!0,setTimeout(function(){vi.autoClosing&&dv.Close()},3000)};
     vi.onplay=vi.onpause=function(){this.autoClosing=!1}
    }
    if(!sh){
     sh=D.createElement('div');
     Sv(sh.style,{position:'fixed',left:'0px',top:'0px',right:'0px',bottom:'0px',opacity:0.25,backgroundColor:'black',zIndex:990});
     sh.onmousedown=function(e){Cancel(e);dv.Close()}
    }
    actDv&&(actDv!=dv)&&actDv.Close();
    actDv=dv;
    //
    im.style.opacity=0;
    vi.autoClosing=!1;
    vi.parentNode||dv.insertBefore(vi,null);
    sh.parentNode||di.insertBefore(sh,di.firstChild);
    dv.parentNode||di.insertBefore(dv,di.firstChild);
    if(W.scrollY&&((dv.offsetTop<W.scrollY)||(dv.offsetTop+dv.offsetHeight>W.scrollY+W.innerHeight)))W.scrollTo(0,dv.offsetTop-(W.innerHeight-de.videoSize.y-6)/2);
    dv.style.opacity=1;
    vi.focus();
    vi.play()
   }})(di,de,img)
  }
 });
 function Cancel(E){(E=E||{}).stopPropagation&&E.stopPropagation();E.preventDefault&&E.preventDefault();return E.returnValue=!1}
 function Sv(E,V,n){if(E&&V)for(n in V)E[n]=V[n];return E}
}(document,window)

// Code by P.A.Semi 2024-09-14
