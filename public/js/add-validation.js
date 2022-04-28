$(function(){
	$("#myform").on("submit",function(evt){
		evt.preventDefault();
		$("#alert").removeClass("alert-warning");
		$("#alert").empty();
		CKEDITOR.instances.ta.updateElement();
		var data = $("#myform").serialize();
		
		$.ajax({
			url:"/admin/pages/add-page",
		 method:"POST",
		 data: data,
		 success:function(result){
			 result = JSON.parse(result);
			 if(result.success){
				 window.location = "/admin/pages";
				 console.log("finish");
			 }else{
				 console.log();
				 if(typeof(result.data) ==="string"){
					 $("#alert").addClass("alert-warning");
					 $("#alert").text(result.data);
				 }else{
					 console.log(result.data);
					 $(`#title+p`).text(result.data[0].msg);
					 $("#cke_ta+p").text(result.data[1].msg);
					 console.log("here")
					 
				 }
				 
			 }
		 }
		});
		
		
	});
});
