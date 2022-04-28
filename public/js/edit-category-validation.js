$(function(){
	
	$("#myform").on("submit",function(evt){
		evt.preventDefault();
		$("#alert").removeClass("alert-warning");
		$("#alert").empty();
		var data = $("#myform").serialize();
		var url = $("#myform")[0].attributes.action.nodeValue;
		console.log(data);
		$.ajax({
		url:url,
		 method:"POST",
		 data: data,
		 success:function(result){
			 
			 result = JSON.parse(result);
			 if(result.success){
				 window.location = "/admin/category";
			 }else{
				 $("#title+p").text(result.msg);
				 
			 }
		 }
		});
	
	
	
});
});
