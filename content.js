var elementCount = 0;

var substrings = [];
chrome.storage.local.get('filterKeywords', function(result){
        if(typeof(result.filterKeywords) != "undefined" && result.filterKeywords != ""){
            substrings = result.filterKeywords.split("\n");
        }
	});
//searchs a string for an occurence of values in a substring array, and returns whatever what matched first.
function containsAny(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
        var substring = substrings[i];
        if (str.toLowerCase().indexOf(substring.toLowerCase()) != - 1) {
            return substring;
        }
    }
    return null; 
}

//bind to the DOMSubtreeModified event, have to do this because of how
//facebook dynamically loads posts as you scroll down
$('#topnews_main_stream_408239535924329').bind("DOMSubtreeModified",function(){
    
    //get all elements in the news stream
    var els = $('div.userContentWrapper._5pcr');
    
    //check if the number of elements have changed (ie, if more posts have been loaded)
    if(els.length > elementCount){
        
        //grab the new subset of elements, we only want to run through those for efficencey's sake
        var elsToCheck = els.slice(elementCount, els.length);
        elementCount = els.length;
        
        $.each(elsToCheck, function(index, value){
            var text  = $(this).find('div._5pbx.userContent').text();
            var result = containsAny(text, substrings);
            if(result != null){
                console.log('Post hidden based on keyword: ' + result);  
                $(this).html('<img src="http://okayco.de/img/celeryman.gif" style="margin: auto; width: 100%"/>');   
            }

        });
    } 
});