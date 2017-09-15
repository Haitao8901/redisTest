function check() {
	var searchVal = "a";
	var line = document.getElementById("myli");
	var details = [];
	// find text node
	var textNodeValue = '';
	var fromIndex = 0;
	for (var i = 0; i < line.childNodes.length; i++) {
		var detail = {};
		var child = line.childNodes[i];
		if (child.nodeName == "#text") {
			detail.tagName = "text";
			detail.length = child.length;
			detail.text = child.nodeValue;
			detail.from = fromIndex;
			detail.textBegin = detail.from;
			fromIndex += detail.length;
			detail.end = fromIndex;
		} else {
			detail.tagName = child.tagName;
			detail.length = child.textContent.length;
			detail.text = child.textContent;
			detail.from = fromIndex;
			detail.textBegin = detail.from + child.outerHTML.indexOf(">");
			fromIndex += child.outerHTML.length;
			detail.end = fromIndex;
		}
		details.push(detail);

	}
	var reg = new RegExp(searchVal, "ig");
	var foundLines = [];
	var totalFoundCnt = 0;

	for (var i = 0; i < details.length; i++) {
		var detail = details[i];
		var outText = detail.text;
		while (true) {
			result = reg.exec(outText);

			// not found then stop the loop
			if (!result) {
				break;
			}
			if (result.length < 1) {
				break;
			}
			// avoid dead loop
			if (result[0] == '') {
				break;
			}

			console.log(result[0]);
			totalFoundCnt++;

			var foundStr = result[0];
			var beginIndex = result.index;
			var foundLine = {};
			foundLine.order = totalFoundCnt - 1;
			foundLine.matchStr = foundStr;
			foundLine.begin = detail.textBegin + beginIndex;
			foundLine.len = foundStr.length;
			foundLine.line = line;
			foundLine.originalHtml = $(line).html();
			foundLines.push(foundLine);
		}
	}

	for (var i = 0; i < foundLines.length; i++) {
		var foundLine = foundLines[i];
		var line = foundLine.line;
		var newHemlText = getHighLightHtml(foundLine);
		$(line).html(newHemlText);
	}

}

	function getHighLightHtml(foundLine){
		var matchStr = foundLine.matchStr;
		var begin = foundLine.begin;
		var len = foundLine.len;
		var line = foundLine.line;
		var order = foundLine.order;
		
		var htmlText= $(line).html();
		
		
		var headbegin = begin
		var tailbegin = begin+len;
		var reg = new RegExp("<span[^<]*</span>", "ig");
		while(true){
			var result = reg.exec(htmlText);
			
			//not found then stop the loop
			if(!result){
				break;
			}
			if(result.length < 1){
				break;
			}
			
			var foundStr = result[0];
			var matchLength = foundStr.indexOf("</span>") - (foundStr.indexOf(">")+1);
			var plusLength = foundStr.length - matchLength;
			
			headbegin += plusLength;
			tailbegin += plusLength;
		}
		var headHtml = htmlText.substring(0, headbegin);
		console.log(headHtml);
		var tailHtml = htmlText.substring(tailbegin);
		console.log(tailHtml);
		var middleHtml = "<span class=\"matchcs" + order + "\" style=\"background-color:red\">" + matchStr + "</span>"
		return headHtml+middleHtml+tailHtml;
	}
