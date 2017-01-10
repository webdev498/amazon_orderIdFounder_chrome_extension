(function(window, jQuery) {

	$(document).ready(function() {
		var timer;
		
		chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
			switch(request.action) {
				case "start_search":
					$("select[name=itemsPerPage]").val(100);
					$("input[type=image]").last().trigger("click");

					var search_text = request.data.value;

					timer = setInterval(function(){
						var order_id = "";
						var customerId_object = $("#myo-table .data-display").find("input.cust-id");
						for(var index = 0 ; index < customerId_object.length; index++){
							var cust_id = customerId_object.eq(index).val();
							if(cust_id == search_text){
								order_id = customerId_object.eq(index).siblings().first().val();
								clearInterval(timer);
								break;
							}
						}

						if(order_id != ""){
							var showing_object = $("#myo-table .data-display strong");
							for(var k = 0 ; k < showing_object.length ; k++){
								if(showing_object.eq(k).html() == order_id){
									showing_object.eq(k).css("background-color", "#FF9632");
									var position_of_showing_object = showing_object.eq(k).position().top;
									$("body").animate({ scrollTop: position_of_showing_object - 100 });
								}
							}
						} else {
							// $("#myo-table .data-display a.myo_list_orders_link")[length-1].dispatchEvent(new MouseEvent("click"));
							var length = $("#myo-table .data-display a.myo_list_orders_link").length;
							$("#myo-table .data-display a.myo_list_orders_link")[length - 1].click();
						}
					} , 5000);
					
					break;

				case "stop_search":
					console.log("stop_search");
					$("#myo-table .data-display span.tiny").last().children("a")[1].click();
					clearInterval(timer);
					break;
				default:
					break;
			}
		});
	});
})(window, $)