// Prepared, v3...
(function(){
  function AEvent(E,N,F,bn){E&&N&&(E.addEventListener?E.addEventListener(N,F,bn||false):E.attachEvent?E.attachEvent('on'+N,V):(E[N]=V));return E}
  
  var Base="https://pi-alpha.org/tmp/";
  var Frames=[{file:"20221027_025753_2048_0193.jpg"},{file:"20221027_025753_2048_0193_HEq_HCw.jpg"},{file:"20221027_025753_2048_0193_HEq_HCw0.50.jpg"},{file:"20221027_025753_2048_0193_HEq_HCw_dkOnly3_g15d.jpg"},{file:"20221027_025753_2048_0193_HEq_HCw_v221029b1b.jpg"},{file:"AIA20221027_030000_PmHeq2048_G96.jpg"},{file:"20221027_0302_Mix171+193.jpg"},{file:"Mix_20221027_0300_AiaPm_CH_v221105a.jpg"},{file:"Pmx_221027_0257_Aia193+Mix171_v221101dg.jpg"},{file:"Pmx_221027_0257_Aia193+Sen8g512_v221030c_dk32b.jpg"},{html:'<br style="clear:both">'},{file:"20221030_025705_2048_0193.jpg"},{file:"20221030_025705_2048_0193_HEq_HCw.jpg"},{file:"20221030_025705_2048_0193_HEq_HCw0.50.jpg"},{file:"20221030_025705_2048_0193_HEq_HCw_dkOnly2.jpg"},{file:"20221030_025705_2048_0193_HEq_HCw_desc1b.jpg"},{file:"AIA20221030_030000_PmHeq2048_G96.jpg"},{file:"20221030_0301_Mix171+193.jpg"},{file:"Mix_20221030_0300_AiaPm_CH_v221105a.jpg"}];
  var TPos={"20221027_025753_2048_0193.jpg":[0,0],"20221027_025753_2048_0193_HEq_HCw.jpg":[256,0],"20221027_025753_2048_0193_HEq_HCw0.50.jpg":[512,0],"20221027_025753_2048_0193_HEq_HCw_dkOnly3_g15d.jpg":[768,0],"20221027_025753_2048_0193_HEq_HCw_v221029b1b.jpg":[1024,0],"20221027_0302_Mix171+193.jpg":[1280,0],"20221030_025705_2048_0193.jpg":[0,256],"20221030_025705_2048_0193_HEq_HCw.jpg":[256,256],"20221030_025705_2048_0193_HEq_HCw0.50.jpg":[512,256],"20221030_025705_2048_0193_HEq_HCw_dkOnly2.jpg":[768,256],"20221030_025705_2048_0193_HEq_HCw_desc1b.jpg":[1024,256],"20221030_0301_Mix171+193.jpg":[1280,256],"AIA20221027_030000_PmHeq2048_G96.jpg":[0,512],"AIA20221030_030000_PmHeq2048_G96.jpg":[256,512],"Mix_20221027_0300_AiaPm_CH_v221105a.jpg":[512,512],"Mix_20221030_0300_AiaPm_CH_v221105a.jpg":[768,512],"Pmx_221027_0257_Aia193+Mix171_v221101dg.jpg":[1024,512],"Pmx_221027_0257_Aia193+Sen8g512_v221030c_dk32b.jpg":[1280,512]};
  var Bg=Base+"Tiles_221027-30__v221105a_ico.jpg";
  
  if(document.readyState=='loading'){
    // generate tiles:
    var bnAny=!1, Html='<a name="gallery"></a><br>Gallery:<br>';
    Frames.forEach(function(F){
      var fi=F.file;
      if(!fi){if(F.html)Html+=F.html;return}
      var bpos=TPos[fi],iu=Base+fi;
      bpos=bpos?("-"+bpos[0]+"px -"+bpos[1]+"px"):'';
      Html+="<a class=imgLink href='"+iu+"' target=_blank><span class=imgTile style='display:inline-block;width:256px;height:256px;float:left;cursor:pointer;background:url(\""+Bg+"\") no-repeat "+bpos+"'></span></a>";
      bnAny=!0
    });
    if(bnAny){
      //var E=document.createElement('textarea');E.value=Html;document.body.appendChild(E);return;
      document.write(Html);
      AEvent(window,'load',function(){
        [].slice.call(document.getElementsByClassName('imgTile')).forEach(function(I){
          //!!!todo I.onclick=
        });
      });
      //
      var d=document,s=d.createElement('script');
      s.async=true;
      s.src='/gallery.js';
      d.body.appendChild(s);
      //
    }
  }else{
    console&&console.log("Wrong state: "+document.readyState);
  }
})()
