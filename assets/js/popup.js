(function(window, jQuery){

	$(document).ready(function() {

		$("#value").on("keyup", function(){
			if($(this).val() != ""){
				$("#start_button").removeAttr("disabled");
			} else {
				$("#start_button").attr("disabled", "");
			}
		})
		$("#start_button").click(function() {
			var value = $("#value").val();
			localStorage.setItem('client_value',value);
			chrome.extension.sendMessage({
				msg: "start"
			}, function(response) {
				console.log(response);
			});
			// window.close();
		});

		$("#stop_button").click(function(){
			chrome.extension.sendMessage({
				msg: "stop"
			}, function(response) {
				console.log(response);
			});
		})
	});
})(window, $);