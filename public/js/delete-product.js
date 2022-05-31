$(function(){
	var id ="";
	$("button.btn.btn-danger").click(function(){
		id = this.id;
		const modalcontent = `<div class="modal" id="myModal">
		<div class="modal-dialog">
		<div class="modal-content">
		
		<!-- Modal Header -->
		<div class="modal-header">
		<h4 class="modal-title">Deleting Product</h4>
		<button type="button" class="close" data-dismiss="modal">&times;</button>
		</div>
		
		<!-- Modal body -->
		<div class="modal-body">
		Are you sure to delete this product ?
		product id: ${id}
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
			deleteproduct(this.id);
			$("#myModal").remove();
			$(".modal-backdrop.show").remove();
		});
		
		$("#closemodal").click(function(){
			$("#myModal").remove();
			$(".modal-backdrop.show").remove();
		});
		
	});
	
	
	function deleteproduct(id){
		$.ajax({
			url:`/admin/product/delete-product/${id}`,
		 	method:"DELETE",
		 	success:function(result){
				console.log(result);
				window.location="/admin/product";
			}
		});
	}
	
	
	
});
