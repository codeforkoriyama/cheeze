var Register;var RegistList=function(){function t(){this.target={area:"#areaList",container:"#areaList-container",contents:"#areaList-contents",loader:"#areaList-loading",menuBtn:"#header-listMenu",link:".jsClick-Process",swipeDelete:".jsSwipe-Delete",returnItem:".jsClick-Return"};this.easing={easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)"};this.cls={no_data:"no_data"};this.flg={touch:false};var t=this,a=Frame.getBrowserHeight()-40;$(t.target.area).css({height:a});$(t.target.menuBtn).on("touchend",function(a){a.preventDefault();var e=$(this).hasClass("show"),s=$("#btnEdit").hasClass("onEdit");if(s===true)Maps.closeBtn();if(e===false){t.showList()}else{t.closeList()}});$(document).on("click",t.target.link,function(a){a.preventDefault();t.flg.touch=false;var e=$(this),s=e.data("process"),n=e.parents(".registData");t.listProcess(s,n)});$(document).on({"touchstart.swipe":function(a){if(t.flg.touch===false)return false;var e=a.originalEvent.touches;this.start_x=e[0].pageX;this.start_y=e[0].pageY;this.start_time=a.timeStamp},"touchmove.swipe":function(a){if(t.flg.touch===false)return false;var e=a.originalEvent.touches;this.end_time=a.timeStamp;this.move_x=e[0].pageX-this.start_x;this.move_y=e[0].pageY-this.start_y;if(this.move_x<0){$(this).css({"-webkit-transform":"translate3d("+this.move_x+"px, 0, 0)",transform:"translate3d("+this.move_x+"px, 0, 0)","-webkit-transition":"none",transition:"none"})}},"touchend.swipe":function(a){if(t.flg.touch===false)return false;var e=this.start_x-this.move_x,s=this.end_time-this.start_time,n=0,i="0.3s",r=t.easing.easeOutBack;if(e>=350){n=-100;i="0.3s";r="ease"}$(this).css({"webkit-transform":"translate3d("+n+"%, 0, 0)",transform:"translate3d("+n+"%, 0, 0)","-webkit-transition":"-webkit-transform "+i+" "+r,transition:"transform "+i+" "+r}).on(EVENTS.animation.end,function(){var a=$(this),e=a.parents(".registData"),s=0,i=true;a.off(EVENTS.animation.end);if(n===-100){setTimeout(function(){if(i===true){e.addClass("delete").on(EVENTS.animation.end,function(){$(this).off(EVENTS.animation.end).remove()});var t=e.data("id");Register.deleteData(t,e)}},3e3);e.find(t.target.returnItem).on("touchend",function(a){a.preventDefault();var e="0.3s";clearTimeout(s);i=false;$(this).parents(".registData").find(".registData-show").css({"webkit-transform":"translate3d(0, 0, 0)",transform:"translate3d(0, 0, 0)","-webkit-transition":"-webkit-transform "+e+" "+t.easing.easeOutBack,transition:"transform "+e+" "+t.easing.easeOutBack})})}})}},t.target.swipeDelete)}t.prototype.showList=function(){var t=this;$(t.target.menuBtn).addClass("show");$("body").addClass("noScroll");$(t.target.area).addClass("show").on(EVENTS.animation.end,function(){$(this).off(EVENTS.animation.end);t.getMyData();t.flg.touch=true})};t.prototype.closeList=function(){var t=this;t.flg.touch=false;$(t.target.menuBtn).removeClass("show");$("body").removeClass("noScroll");$(t.target.area).removeClass("show").on(EVENTS.animation.end,function(){$(this).off(EVENTS.animation.end);$(t.target.loader).removeClass("hide");$(t.target.container).removeClass("show");$(t.target.contents).html("")})};t.prototype.hideLoading=function(){$(this.target.loader).addClass("hide");$(this.target.container).addClass("show")};t.prototype.getMyData=function(){var t=this,a=$("#form_team").val();if(a!==""){var e=Cmn.dir+"/myData/"+encodeURI(a);$.ajax({type:"GET",url:e,scriptCharset:"utf-8",dataType:"json",data:null,processData:false,contentType:false,success:function(a){switch(a.status){case"no_data":t.noData(a.message);break;case"success":t.writeMus(a.data);break}},error:function(t,a,e){console.log("error:",a)},complete:function(){}});t.hideLoading()}else{}};t.prototype.writeMus=function(t){var a=this;var e=Cmn.dir+"/mus/registList.mustache",s="";$.get(e,function(e){for(var n=t.length-1;n>=0;n--){var i=t[n];i.dir=Cmn.dir;s+=Mustache.render(e,i)}var r='<ol id="registListData">'+s+"</ol>";$(a.target.contents).removeClass(a.cls.no_data).html(r)})};t.prototype.noData=function(t){var a='<p class="noData">'+t+"</p>";$(this.target.contents).addClass(this.cls.no_data).html(a)};t.prototype.listProcess=function(t,a){var e={id:a.data("id"),name:a.data("name"),map:a.data("map"),cat:a.data("cat"),lat:a.data("lat"),lng:a.data("lng"),file:a.data("file"),thumb:"",geo:a.data("mapGep"),created:a.data("created"),updated:a.data("updated"),dir:Cmn.dir},s=Cmn.dir+"/mus/thumbImage.mustache";switch(t){case"edit":e.thumb=e.file+"_middle";var n=e.geo!==""?e.geo:false;$("#areaForm-formName").val(e.name);$("#areaForm-formMapNumber").val(e.map);$("#areaForm-formCategory").val(e.cat);$("#map-lat").val(e.lat);$("#map-lng").val(e.lng);$("#areaForm-dataID").val(e.id);$("#areaForm-photoFile").val(e.file);$("#mapGeo").val(n);$("#areaForm").removeClass("newWrite").addClass("editWrite");$.get(s,function(t){var a=Mustache.render(t,e);$("#photoThumb").html(a)});Maps.openBtn([e.lat,e.lng]);this.closeList();break;case"delete":var i=confirm(Cmn.message.conf.data_delete);if(i===false)return false;a.fadeOut(400,function(){Register.deleteData(e.id,a)});break}};return t}();new RegistList;