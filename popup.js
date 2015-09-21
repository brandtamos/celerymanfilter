
$(document).ready(function(){
	chrome.storage.local.get('filterKeywords', function(result){
		$('#filterKeywords').val(result.filterKeywords);
		//console.log(result);
		console.log(result.filterKeywords.split("\n"));
	});
	
	$('#saveKeywords').on('click', function(){
		var keywords = $('#filterKeywords').val();
		chrome.storage.local.set({'filterKeywords': $.trim(keywords)}, function() {
          // Notify that we saved.
        });
		$('#saveConfirm').slideDown();
	});
	
});
