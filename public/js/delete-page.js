$(function(){
	var id ="";
	$("button.btn.btn-danger").click(function(){
		id = this.id;
		const modalcontent = `<div class="modal" id="myModal">
		<div class="modal-dialog">
		<div class="modal-content">
		
		<!-- Modal Header -->
		<div class="modal-header">
		<h4 class="modal-title">Deleting Page</h4>
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		</div>
		
		<!-- Modal body -->
		<div class="modal-body">
		Are you sure to delete this page ?
		page id: ${id}
		</div>
		
		<!-- Modal footer -->
		<div class="modal-footer">
		<button type="button" id="closemodal" class="btn btn-default" data-dismiss="modal">Close</button>
		<button type="button" class="btn btn-danger deletebtn" id="${id}" data-dismiss="modal">Delete</button>
		</div>
		
		</div>
		</div>
		</div>`
		$("body").append(modalcontent);
// 		$("#myModal").css({"display": "block", "padding-right": "12px"});
		
		$("button.btn.btn-danger.deletebtn").click(function(){
			deletepage(this.id);
			$("#myModal").remove();
			$(".modal-backdrop.show").remove();
		});
		
		$("#closemodal").click(function(){
			$("#myModal").remove();
			$(".modal-backdrop.show").remove();
		});
		
	});
	
	
	function deletepage(id){
		$.ajax({
			url:`/admin/pages/delete-page/${id}`,
		 	method:"DELETE",
		 	success:function(result){
				console.log(result);
				window.location="/admin/pages";
			}
		});
	}
	
	
	
});
