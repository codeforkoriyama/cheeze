var Register={target:{form:"#postForm",btn:".submit-link",mesArea:"#message",mesText:"#message-text",input:".jsChange-Edit"},btn:{write:"new",update:"update",del:"delete"},init:function(){var e=this,t=$(e.target.form),a="";$(e.target.btn).on("click",function(s){s.preventDefault();a=$(this).data("submit");e.process(t,a);return false});$(document).on("keydown",function(e){switch(e.keyCode){case 13:return false;break}});t.on("submit",function(e){return false});$(document).on("click","#upLoads-delete",function(e){e.preventDefault();var t=confirm(Cmn.message.conf.image_delete);if(t===false)return false;$("#photoThumb").fadeOut(400,function(){$(this).html("");$("#areaForm-photoFile").val("")})})},process:function(e,t){var a=this,s="",r="",o=$("#postForm"),n=new FormData(o[0]),i=$("#areaForm-formName"),m=i.val();if(m===""){i.addClass("error");return false}$(a.target.mesText).text(Cmn.message.write.process).addClass("process");$(a.target.mesArea).addClass("show");n.append("btnType",t);$.ajax({type:"POST",url:Cmn.dir+"/register",dataType:"json",data:n,processData:false,contentType:false,success:function(e){s=e.result;r=e.message},error:function(e){s="error";r=Cmn.message.write.error},complete:function(){a.displayMessage(r,s)}})},displayMessage:function(e,t){var a=this;$(a.target.mesText).removeClass("process").text(e).addClass(t);$(a.target.mesArea).addClass("show");Maps.closeBtn();setTimeout(function(){$(a.target.mesArea).removeClass("show").on(EVENTS.animation.end,function(){$(this).off(EVENTS.animation.end);$(a.target.mesText).text("").removeClass(t)})},3e3)},deleteData:function(e,t){var a=this,s=new FormData;s.append("btnType","delete");s.append("data_id",e);$.ajax({type:"POST",url:Cmn.dir+"/register",dataType:"json",data:s,processData:false,contentType:false,success:function(e){switch(e.result){case"success":t.remove();break;case"error":$(a.target.mesText).text(e.message).addClass(e.result);$(a.target.mesArea).addClass("show");setTimeout(function(){$(a.target.mesArea).removeClass("show")},3e3);t.fadeIn(300);break}},error:function(e){},complete:function(){}})},removeForm:function(){$("input, select, textarea").blur();$(this.target.input).val("");$("#areaForm-formCategory").val("0");$("#areaForm-formName").removeClass("error");$("#photoThumb").attr("style","").html("");$("#mapGeo").val("false")}};Register.init();