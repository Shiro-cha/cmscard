$(function(){
	$("#myform").on("submit",function(evt){
		evt.preventDefault();
		$("#alert").removeClass("alert-warning");
		$("#alert").empty();

		var data = $("#myform").serialize();
			
			$.ajax({
			url:"/admin/category/add-category",
		  method:"POST",
		  data: data,
		  success:function(result){
			  result = JSON.parse(result);
			  console.log(result)
			  if(result.success){
				 window.location = "/admin/category";
				  console.log("finish");
			  }else{
				  
				  if(typeof(result.data) ==="string"){
					  $("#alert").addClass("alert-warning");
					  $("#alert").text(result.data);
				  }else{
						  $(`#title+p`).text(result.data[0].msg);
					  
				  }
				  
			  }
		  }
			});
		
		
	});
});
