$(function(){
	console.log($("#myform"));
	$("#myform").on("submit",function(evt){
		evt.preventDefault();
		$("#alert").removeClass("alert-warning");
		$("#alert").empty();
		CKEDITOR.instances.ta.updateElement();
		var data = $("#myform").serialize();
		var url = $("#myform")[0].attributes.action.nodeValue;
		
		$.ajax({
			url:url,
		 method:"PUT",
		 data: data,
		 success:function(result){
			 result = JSON.parse(result);
			 if(result.success){
				 window.location = "/admin/pages";
			 }else{
				 if(typeof(result.data ==="string")){
					 $("#alert").addClass("alert-warning");
					 $("#alert").text(result.data);
				 }else{
					 result.data.forEach(function(value){
						 $(`#${value.param}+p`).text(value.msg);
					 });
				 }
				 
			 }
		 }
		});
	
	
	
});
});
