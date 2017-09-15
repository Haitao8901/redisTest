/**
 * This is used to create a search box on the panel header for ruleeditor.
 * Search box has three types which are 'tree','console' and 'win'.
 * 1)If type is 'tree' then this search box is used to search file under the related org
 * and after clicking Enter or the searchIcon a search window(contains a search box which type is 'win') will be shown.
 * 
 * 2)If type is 'console' then this search box is used to search console
 * related logic is located in $.fn.htsearchdiv.consoleSearch
 * 
 * by haitao.
 */
(function($){
	
	var defaultStyles = {
		defaultSearchStyle:"cursor:pointer;position:absolute;right:0;top:0%;width: 17px;height: 17px;background: url('js/searchdiv/searchbox_button.png') no-repeat;",
		defaultPrevStyle:"cursor:pointer;position:absolute;right:51px;top:0%;width: 17px; height: 17px;background: url('js/searchdiv/prev_arrows.png') no-repeat;",
		defaultNextStyle:"cursor:pointer;position:absolute;right:34px;top:0%; width: 17px;height: 17px;background: url('js/searchdiv/next_arrows.png') no-repeat;",
		defaultClearStyle:"cursor:pointer;position:absolute;top:25%;right:16px;width: 17px; height: 17px;background: url('js/searchdiv/clear_icons.png') no-repeat;",
        defaultFilterStyle:"cursor:pointer;position:absolute;top:0%;right:68px;width: 17px; height: 16px;background: url('js/searchdiv/filter.png') no-repeat;"
	}
	
	var methods = {
		options:function(htsearch){
			return $.data(htsearch, "search");
		},
		getValue:function(htsearch){
			var options = $.data(htsearch, "search");
			return options.input.val();
		},
		update:function(htsearch){
			var options = $.data(htsearch, "search");
			if(options.lineUpdate){
				options.lineUpdate.bind(htsearch)();
			}
		},
		/**invoked when open an console*/
		searchConsoleForOpen:function(htsearch, consoleType){
			var options = $.data(htsearch, "search");
			var bg = "url('js/searchdiv/filter.png')";
            if (co.consoleFilter){
                bg = "url('js/searchdiv/filter2.png')";
            }
            //for left tree no need to do this
            if(options.type != 'tree'){
            	$(this).find('span:last').css("background",bg);
            }
			
			// if(options.type='console' && options.console == consoleType){
			if(options.console == consoleType){
				var shareInfo = $.fn.htsearchdiv.shareInfo;
				options.input[0].focus();
				if(options.tototalFoundCnt != 0 && shareInfo.total == 0 ){
					if(shareInfo.searchVal == ''){
						options.clear.bind(htsearch)();
					}else{
						options.clear.bind(htsearch)(options, false);
					}
				}else if(options.currentSearch != shareInfo.searchVal){//not same then do search
					options.input.val(shareInfo.searchVal);
					options.search.bind(htsearch)(shareInfo.order);
				}else if(options.currentOrder!= shareInfo.order){
					options.focusCurrent.bind(htsearch)(options, shareInfo.order);
				}else if(options.consoleFilter == undefined || options.consoleFilter != co.consoleFilter){
                    options.consoleFilter = co.consoleFilter;
                    var searchfunc = options.search.bind(htsearch);
                    if(searchfunc){
                        searchfunc(0, true);
                    }else{
                        console.log("Not find search function");
                    }

                }
			}
		},
		setValue:function(htsearch, value){
			var options = $.data(htsearch, "search");
			options.input.val(value);
		},
		search:function(){
			console.log("search()");
		},
		keydown: function(e){
			if(e.keyCode==13){
				e.preventDefault();
				var searchVal = e.target.value;
				var myOptions = $.data(this, "search")
                if (searchVal == '' && searchVal != myOptions.currentSearch){
                    myOptions.clear.bind(this)(this);
                }


                if(searchVal && searchVal != ''){
					var searchfunc = $(this).data("search").search.bind(this);
					if(searchfunc){
						searchfunc();
					}else{
						console.log("Not find search function");
					}
				}
			}
		},
		keyup:function(){console.log("keyup()");},
		findNext:function(){console.log("findNext()");},
		findPrev:function(){console.log("findPrev()");},
		clear:function(){console.log("clear()");},
		
		doRequest:function(params, successFn, failFn){
			var url = params.url;
			var org = params.org;
			var reg = params.reg;
			var requestTime = $.format.date(new Date(),"yyyy-MM-dd HH:mm:ss");
			var request = "{\"header\":{\"action\":\"searchFile\",\"ip\":\"test.ip\",\"requestId\":\"test.request\",\"requestTime\":\"$requestTime\"},\"body\":{\"org\":\"$org\",\"reg\":\"$reg\"}}";
			var params = request.replace("$requestTime", requestTime).replace("$org", org).replace("$reg", reg);
			$.ajax({
				type:'POST',
				async: true,
	            url: url,
	            cache: false,
	            data: {
					request : params
				},
	            dataType: "json",
	            success:successFn ,
	            error:failFn
	        });
		},
		//function used to open the selected file from search result
		openFileFun:function(){console.log("openFileFun()");},
		//things to do after opening a file
		afterOpenFile:function(){console.log("afterOpenFile()");}
	}
	
	function initSearWinOptions(_this){
		var options = $.data(_this, "search");
		var searchWin = options.pOptions.searchWin;
		
		//get it from parent
		options.openFileFun = options.pOptions.openFileFun;
		options.afterOpenFile = function(){
			searchWin.window("close");
		}
		
		searchWin.on("dblclick", "li", function(e){
			options.openFileFun(e, options.afterOpenFile);
		});
		
		options.search = doSearch.bind(_this);
		function doSearch(){
			var options = $.data(this, "search");
			var params = {};
			params.org = options.pOptions.org;
			params.reg = options.input.val();
			params.url = options.pOptions.url;
			
			//last time have do the same search and found result then no need to do it again
			if(options.lastSearch && options.lastSearch == params.reg && options.lastFoundResult){
				return;
			}
			
			options.doRequest(params, successFn.bind(this), failFn.bind(this));
			options.lastSearch = params.reg;
		}
		function successFn(data){
			var options = $.data(this, "search");
			var resultUl = options.resultUl;
			$(resultUl).html("");
			options.lastFoundResult = true;
			if(data.body.results && data.body.results.length > 0){
				for(var i = 0; i < data.body.results.length; i++){
					var rsFile = data.body.results[i];
					var fileName = rsFile.fileName;
					var filePath = rsFile.filePath;
					var showMsg = "<strong>" + fileName + "</strong> - " + filePath;
					$(resultUl).append("<li style=\"margin-top:3px;cursor:pointer;\" class=\"info_msg\">" + showMsg + "</li>");
				}
			}else{
				options.lastFoundResult = false;
				$(resultUl).append("<li style=\"margin-top:3px;\" class=\"info_msg\">Not found any files under current org.</li>");
			}
		}
		
		function failFn(error){
			var options = $.data(this, "search");
			var resultUl = options.resultUl;
			$(resultUl).append("<li style=\"margin-top:3px;\" class=\"error_msg\">" + error.message + "</li>");
		}
	}
	
	function initSearchWin(_this){
		var searchWin = $("<div></div>").appendTo(window.document.body);
		searchWin.window({
            title:'Open Resource',
            inline: true,
            width:600,
            height:400,
            collapsible:false,
            modal:true,
            draggable:true,
            closable:true,
            minimizable:false,
            maximizable:false,
            minWidth: 400,
            minHight: 400,
            content:"<div style=\"width:100%;height:100%;overflow:auto;font-size:14px;padding:0px;background-color:gainsboro;user-select:none;\"><ul style=\"padding:2px;\"></ul></div>",
            tools: [{search:true,type:'win'}]
		});
		
		var options = $.data(_this, "search")
		options.search = function(){
			var searchVal = options.input.val();
			//empty value do not open the window
			if(searchVal && searchVal != ''){
				searchWin.window("open");
			}
		}
		
		//pass below property to search window
		$.extend(options, {"searchWin": searchWin});

		$.data(searchWin[0], "pOptions", options);
		
		searchWin.window({
			onBeforeOpen:function(){
				var pOptions = $.data(this, "pOptions");
				if(!pOptions.searchWinInitialed){
					var searchdiv = $(".searchdiv[data-type=win]");
					var resultUl = $(this).find("ul:first")[0];
					searchdiv.htsearchdiv({"pOptions": pOptions, "resultUl": resultUl});
					pOptions.searchWinInitialed = true;
					$.data(this, "options", searchdiv.htsearchdiv("options"));
					return false;
				}else{
					var options = $.data(this, "options");
					options.input.val(options.pOptions.input.val());
					options.input[0].focus();
					if(options.input.val() && options.input.val() != ''){
						options.pOptions.input.val("");//empty tree search input value
						options.search();
					}
					return true;
				}
			}
		});
		
		//ctrl + shift + f to open search file window
		$(document).keydown(function (e){
			if(e.ctrlKey && e.shiftKey && (e.keyCode == 70 || e.keyCode == 102)){
				if(searchWin.window("options").closed){
					searchWin.window("open");  
					var options = $.data(searchWin[0], "options");
					options.input[0].focus();
				}
			}
	    });
	}

	function initSearchdiv(_this){
		var __this = $(_this);
		__this.parent().css("height", "auto");
		var options = $.data(_this, "search");
		__this.css({"display":"inline", "position":"relative", "margin-right":"10px"});
		
		if(options.type != 'tree'){
			var searchInput = $("<input style=\"width:110px;padding-right:83px;display:inline;height:17px;border-width:1px;border-radius:4px;\">").appendTo(__this);
			
			$.extend(options, {"input":searchInput});
			$.data(searchInput, "parent", _this);
		}
		
		var searchIcon = null;
		if(options.searchClass){
			searchIcon = $("<span class=\"" + options.searchClass + "\"></span>").appendTo(__this);
		}else{
			searchIcon = $("<span style=\"" + options.defaultSearchStyle + "\"></span>").appendTo(__this);
		}
		
		var nextIcon, prevIcon, clearIcon, filterIcon;
		if(options.type == 'console'){
			if(options.clearClass){
				clearIcon = $("<span class=\"" + options.clearClass + "\"></span>").appendTo(__this);
			}else{
				clearIcon = $("<span style=\"" + options.defaultClearStyle + "\"></span>").appendTo(__this);
			}
			if(options.nextClass){
				nextIcon = $("<span class=\"" + options.nextClass + "\"></span>").appendTo(__this);
			}else{
				nextIcon = $("<span style=\"" + options.defaultNextStyle + "\"></span>").appendTo(__this);
			}
			if(options.prevClass){
				prevIcon = $("<span class=\"" + options.prevClass + "\"></span>").appendTo(__this);
			}else{
				prevIcon = $("<span style=\"" + options.defaultPrevStyle + "\"></span>").appendTo(__this);
			}
			// filter search result
            if(options.filterClass){
                filterIcon = $("<span class=\"" + options.filterClass + "\"></span>").appendTo(__this);
            }else{
                filterIcon = $("<span style=\"" + options.defaultFilterStyle + "\"></span>").appendTo(__this);
            }

			initOptionsForConsole(_this);
		}
		//do nothing when type is tree, search function has been moved to console
		if(options.type == 'tree'){
//			options.divId = null;
//            options.listId = null;
            options.console = null;
//            //no need to do this now, moved to new search resource window.
////			initSearchWin(_this);
//            
//            $("#searchWin").css({display:""});
//			$('#searchWin').window({
//	                modal:true,inline:true,minimizable:false,collapsible:false,width:600,height:400
//	        });
//			
//			co.iplatform.ruleeditor.ui.canShowSerachWin = false;
//			$("#searchWin").css({display:""});
//			$('#searchWin').window({
//				onBeforeOpen:function(){
//					if(co.iplatform.ruleeditor.ui.canShowSerachWin){
//						if(co.appListChanged || !co.searchWinInitialed){
//							if(!co.searchWinInitialed){
//								co.searchWinInitialed = true;
//							}
//							co.appList = [];
//							var orgNode = $('#fileTree').tree('find', co.orgInfo.orgid);
//	                    	if(orgNode.children){
//	                    		for(var i = 0; i < orgNode.children.length; i++){
//	                        		var app = orgNode.children[i];
//	                        		co.appList.push(app.text);
//	                        	}
//	                    	}
//	                    	
//							$("#searchorgselect").empty();
//							$("#searchorgselect").append('<option value="*" selected="selected">*</option>')
//							$("#searchorgselect").append('<option value="'+ co.orgInfo.orgid +'">' + co.orgInfo.orgid + '</option>')
//							
//							$("#searchappselect").empty();
//							$("#searchappselect").append('<option value="*" selected="selected">*</option>')
//							if(co.appList){
//								$.each(co.appList,function(i, text){
//			    					$('#searchappselect').append('<option value="'+ text +'">'+text+'</option>');
//			        			});
//							}
//							co.appListChanged = false;
//						}
//						return true;
//					}else{
//						return false;
//					}
//				}
//			});
//			options.search = function(){
//				co.iplatform.ruleeditor.ui.canShowSerachWin = true;
//				$('#searchWin').window("open");
//			}
//			
//			__this.css({"display": "inline-block", "position": "relative", "height": "16px", "width": "161px", "margin-right": "10px"});
//			
//			//ctrl + shift + f to open search file window
//			$(document).keydown(function (e){
//				if(e.ctrlKey && e.shiftKey && (e.keyCode == 70 || e.keyCode == 102)){
//					co.iplatform.ruleeditor.ui.canShowSerachWin = true;
//					if($("#searchWin").window("options").closed){
//						$("#searchWin").window("open");  
//					}
//				}
//		    });
//			
//	        function searchTreeClick(node){
//	        	if(node.debugid){
//            		$("#searchWin").window("close");
//            		console.log("opendebugFile path is:" + node.filepath);
//            		co.iplatform.ruleeditor.ui.showDebugFile(node.debugid,true);
//            	}else if(node.filepath){
//            		$("#searchWin").window("close");
//            		console.log("openSearchFile path is:" + node.filepath);
//                	co.iplatform.ruleeditor.debugQueue.submit(node.filepath, null);
//            	}else{
//            		$("#searchTree").tree('toggle', node.target);
//            	}
//	        }
//	        
//	        $("#searchTree").tree({
//	            onClick: searchTreeClick,
//	            onDblClick:searchTreeClick
//	        });
//	        
//	        $("#searchWin input[type=text]").on("keydown", function(e){
//			if(e.keyCode==13){
//				e.preventDefault();
//				var searchData = {};
//            	searchData.org = $('#searchorgselect').val();
//            	searchData.app = $('#searchappselect').val();
//            	searchData.filename = $('#searchFileName').val();
//            	searchData.filetext = $('#searchContainText').val();
//            	co.iplatform.ruleeditor.processSearchAction(searchData);
//			}});
		}
		
		if(options.type == 'win'){
			options.divId = null;
            options.listId = null;
            options.console = null;
			initSearWinOptions(_this);
		}
		
		//bind events
		if(searchInput){
			searchInput.on("keydown", options.keydown.bind(_this));
		}
		searchIcon.on("click", options.search.bind(_this));
		if(nextIcon){
			nextIcon.on("click", options.findNext.bind(_this));
		}
		if(prevIcon){
			prevIcon.on("click", options.findPrev.bind(_this));
		}
		if(clearIcon){
			clearIcon.on("click", options.clear.bind(_this));
		}
		if(filterIcon){
            filterIcon.on("click", options.filter.bind(_this));
		}
	}
	
	function initOptionsForConsole(_this){
		var options = $.data(_this, "search");
		$.extend(options, $.fn.htsearchdiv.consoleSearch);
		options.search = options.searchConsole;
	}
	
	$.fn.htsearchdiv = function(arg1, arg2){
		//do method
		if(typeof arg1 == 'string'){
			if(this.length > 1){
				this.each(function(){
					if(typeof arg1 == 'string'){
						var options = $.data(this, "search");
						if(options[arg1]){
							options[arg1].bind(this)(this, arg2);
						}else{
							console.log("Not find the method with name " + arg1);
						}
					}
				});
				return;
			}else{
				var options = $.data(this[0], "search");
				if(options[arg1]){
					return options[arg1].bind(this[0])(this[0], arg2);
				}else{
					console.log("Not find the method with name " + arg1);
				}
			}
			return;
		}
		
		
		//initial
		this.each(function(){
			var type = this.dataset.type;
			var data=$.data(this, "search");
			if(data && data.initialed){
				return;
			}
			$.data(this, "search", $.extend({}, methods, defaultStyles, {"type":type}, arg1));
			initSearchdiv(this, arg2)
			$.extend($.data(this, "search"), {"initialed":true});
		});
	}
	
	/**
	 * Shared by three console.
	 * Used to make all console have the same behavior
	 * when change console from one to another(e.g. from normal to east) 
	 * */
	$.fn.htsearchdiv.shareInfo = {
			order:-1,
			prevorder:-1,
			searchVal:'',
			total:0,
			refreshInfo:function(options){
				$.fn.htsearchdiv.shareInfo.order = options.currentOrder;
				$.fn.htsearchdiv.shareInfo.searchVal = options.currentSearch;
				$.fn.htsearchdiv.shareInfo.prevorder = options.prevOrder;
				$.fn.htsearchdiv.shareInfo.total = options.totalFoundCnt;
			}
	}
	
	$.fn.htsearchdiv.consoleSearch = {
			//need add a space here, because ie will auto create a pace
			//if there is no space between property and value
			highColor:"background-color: orange;",
			normalColor:"background-color: yellow;",
			totalLine:0,
			totalFoundCnt:0,
			currentOrder:-1,
			prevOrder:-1,
			currentSearch:'',
			foundLines:[],
			specialChars:[".","?","+","$","^", "[", "]", "(", ")", "{", "}", "|"],
			
		    searchConsole:function(order, isUpdate){
		    	var myOptions = $.data(this, "search");
		    	var searchVal = $(this).htsearchdiv("getValue");
		    	searchVal = searchVal||'';
		    	if(searchVal == ''){
		    		return;
		    	}

		    	if(searchVal == myOptions.currentSearch && !isUpdate){
		    		return;
		    	}else{
		    		myOptions.clear.bind(this)(this, false);
		    	}
		    	//
		    	myOptions.currentSearch = searchVal;
		    	searchVal = searchVal.replace(/\\/ig, "14725===8369");
		    	for(var i in myOptions.specialChars){
		    		var rreg = new RegExp("\\" + myOptions.specialChars[i], "ig");
		    		searchVal = searchVal.replace(rreg, "\\" + myOptions.specialChars[i]);
		    	}
		    	searchVal = searchVal.replace(/14725===8369/ig, "\\\\");
		    	
		    	var reg = /\*/ig;
		    	searchVal = myOptions.translateXml(searchVal.replace(reg, ".*"));
//		    	$(this).htsearchdiv("setValue", searchVal);
		    	var allLines = $(myOptions.listId).find("li");
		    	myOptions.totalLine = allLines.length;
		    	
		    	for(var i = 0; i < allLines.length; i++){
                    var cnt = myOptions.totalFoundCnt;
                    var line = allLines[i];
                    $(line).show();
		    		myOptions.checkOneLine(line, searchVal, i, myOptions);
		    		if (cnt == myOptions.totalFoundCnt && co.consoleFilter){
						$(line).hide();
					}
		    	}
		    	if(myOptions.totalFoundCnt <= 0){
		    		return;
		    	}
		    	//order start from 0
		    	myOptions.currentOrder = 0;
		    	if(order && typeof order != 'object'){
		    		myOptions.currentOrder = order;
		    	}
		    	myOptions.focusCurrent(myOptions);
		    },
		    
		    findNext:function(){
		    	var myOptions = $.data(this, "search");
		    	if(myOptions.totalFoundCnt == 0){
		    		return;
		    	}
		    	var currentOrder = myOptions.currentOrder;
		    	//one result, just return 
		    	if(myOptions.totalFoundCnt == 1){
		    		return;
		    	}
		    	
		    	var prev = currentOrder;
		    	currentOrder++;
		    	if(currentOrder >= myOptions.totalFoundCnt){
		    		myOptions.currentOrder = 0;
		    	}else{
		    		myOptions.currentOrder = currentOrder;
		    	}
		    	myOptions.prevOrder = prev;
		    	myOptions.focusCurrent(myOptions);
		    	console.log("consoleSearch.findNext()");
		    },
		    
		    findPrev:function(){
		    	var myOptions = $.data(this, "search");
		    	if(myOptions.totalFoundCnt == 0){
		    		return;
		    	}
		    	var currentOrder = myOptions.currentOrder;
		    	//one result, just return 
		    	if(myOptions.totalFoundCnt == 1){
		    		return;
		    	}
		    	
		    	var prev = currentOrder;
		    	currentOrder--;
		    	if(currentOrder < 0){
		    		myOptions.currentOrder = myOptions.totalFoundCnt-1;
		    	}else{
		    		myOptions.currentOrder = currentOrder;
		    	}
		    	myOptions.prevOrder = prev;
		    	myOptions.focusCurrent(myOptions);
		    	console.log("consoleSearch.findPrev()");
		    },
		    
		    clear:function(obj, clearAll){
		    	var myOptions = $.data(this, "search");
		    	if(typeof clearAll == 'undefined'
		    		|| (typeof clearAll == 'boolean' && clearAll)){
		    		//clear input
			    	$(this).htsearchdiv("setValue", "");
			    	myOptions.currentSearch = "";
		    	}
		    	
		    	//reset data
		    	myOptions.currentOrder = -1;
		    	myOptions.prevOrder = -1;
		    	
		    	//remvoe highlight
		    	if(myOptions.totalFoundCnt != 0){
		    		myOptions.removeHighlight(myOptions);
		    	}

				if(myOptions.consoleFilter == undefined || myOptions.consoleFilter){
                    $(myOptions.listId).find("li:hidden").show();
				}

		    	myOptions.totalFoundCnt = 0;
		    	myOptions.foundLines = [];
		    	$.fn.htsearchdiv.shareInfo.refreshInfo(myOptions);
		    	console.log("consoleSearch.clear()");
		    },

			filter:function () {
		    	var bg = "";
				if (co.consoleFilter){
                    co.consoleFilter = false;
                    bg = "url('js/searchdiv/filter.png')";


				} else {
                    co.consoleFilter = true;
                    bg = "url('js/searchdiv/filter2.png')";
                }
                $(this).find('span:last').css("background",bg);
                // $('.searchdiv').each(function () {
                //     if (this.childNodes.length == 6){
                //     }
                // });
                var options = $(this).data("search")
                options.consoleFilter = co.consoleFilter;
                var searchfunc = options.search.bind(this);
                if(searchfunc){
                    searchfunc(0, true);
                }else{
                    console.log("Not find search function");
                }


            },
		    
		    removeHighlight:function(myOptions){
		    	if(myOptions.totalFoundCnt != 0){
		    		for(var i in myOptions.foundLines){
			    		var foundLine = myOptions.foundLines[i];
			    		var line = foundLine.line;
			    		var originalhtmlText= foundLine.originalHtml;
			    		$(line).html(originalhtmlText);
			    	}
		    	}
		    },
		    
		    translateXml:function(str){
		    	return str.replace(/&/ig, "&amp;").replace(/</ig, "&lt;").replace(/>/ig, "&gt;");
		    },
		    
		    checkOneLine:function(line, searchVal, lineNum, myOptions){
		    	var innerHtml = line.innerHTML;
		    	
		    	//regs
		    	var htmltagReg = new RegExp("<\/?[^>]*>", "ig");
		    	var searchReg = new RegExp("(" + searchVal + ")", "ig");
		    	
		    	var tags = [];
		    	var lineOrder = 0;
		    	var tagOrder = 0;
		    	
		    	innerHtml = innerHtml.replace(htmltagReg, function(tag){
		    		//first replace html tag with \n\t\n to avoid the attribute value affecting the search
		    		tags.push(tag);
		    		return "\n\t\n";
		    	}).replace(searchReg, function(foundText){
		    		//second record the matched info and hightligh it
		    		if("" == foundText.trim()){
		    			return "";
		    		}
		    		var foundLine = {};
		    		myOptions.totalFoundCnt++;
		    		foundLine.searchVal = searchVal;
		    		foundLine.line = line;
		    		foundLine.lineNum = lineNum;
		    		foundLine.order = myOptions.totalFoundCnt-1;
		    		//one line may contains several matches text, lineOrder is the order they appear
		    		foundLine.lineOrder = lineOrder++;
		    		foundLine.originalHtml = $(line).html();
		    		myOptions.foundLines.push(foundLine);
		    		return "<span class=\"matchtext\" style=\"background-color: yellow;\">" + foundText + "</span>";
		    	}).replace(/\n\t\n/ig, function(foundText){
		    		//finally restore the html tag
		    		return tags[tagOrder++];
		    	});
		    	
		    	$(line).html(innerHtml);
		    },
		    
		    focusCurrent:function(myOptions, order){
		    	if(myOptions.totalFoundCnt == 0){
		    		myOptions.currentOrder = -1;
		    		myOptions.prevOrder = -1;
		    	}
		    	if(order){
		    		myOptions.prevOrder = myOptions.currentOrder;
		    		myOptions.currentOrder = order;
		    	}
		    	//first highlight orange to the target one
		    	if(myOptions.currentOrder > -1){
		    		var foundLine = myOptions.foundLines[myOptions.currentOrder];
		    		var line = foundLine.line;
		    		var lineOrder = foundLine.lineOrder;
		    		var matchSpans = $(line).find("span.matchtext");
		    		if(matchSpans.length > 0 && matchSpans[lineOrder]){
		    			$(matchSpans[lineOrder]).css({"background-color": "orange"});
		    		}
		    	}
	    		//then highlight yellow to the previous one
	    		if(myOptions.prevOrder > -1){
	    			var foundLine = myOptions.foundLines[myOptions.prevOrder];
	    			var line = foundLine.line;
		    		var lineOrder = foundLine.lineOrder;
		    		var matchSpans = $(line).find("span.matchtext");
		    		if(matchSpans.length > 0 && matchSpans[lineOrder]){
		    			$(matchSpans[lineOrder]).css({"background-color": "yellow"});
		    		}
	    		}
	    		var foundLine = myOptions.foundLines[myOptions.currentOrder];
	    		var lineNum = foundLine.lineNum;
	    		myOptions.doScroll(foundLine.line, myOptions);
	    		$.fn.htsearchdiv.shareInfo.refreshInfo(myOptions);
		    },
		    
		    doScroll:function(line, myOptions){
		    	var scrollDiv = null;
		    	if(myOptions.divId){
		    		scrollDiv = $(myOptions.divId);
		    	}else if(myOptions.console &&(myOptions.console == 'east' || myOptions.console == 'float')){
		    		scrollDiv = $(myOptions.listId).parent().parent();
		    	}
		    	
		    	//offset parent is panalbody, need reduce panel header's height
		    	//also reduce half of console height to make it display at the center of console
		    	scrollDiv.scrollTop(line.offsetTop - 28 - scrollDiv[0].offsetHeight/2);
		    	
//		    	if(myOptions.console == 'normal'){
//		    		scrollDiv.scrollTop(lineNum*17);
//		    	}else if(myOptions.console == 'east'){
//		    		scrollDiv.scrollTop(lineNum*14);
//		    	}else if(myOptions.console == 'float'){
//		    		scrollDiv.scrollTop(lineNum*14);
//		    	}
		    },
		    
		    lineUpdate:function(){
		    	var myOptions = $.data(this, "search");
		    	if(myOptions.currentSearch == ''){
		    		return;
		    	}
		    	myOptions.totalLine++;
		    	var prevTotal = myOptions.totalFoundCnt;
		    	var appendLine = $(myOptions.listId).find("li:last");
		    	var searchVal = myOptions.currentSearch;
		    	var reg = /\*/ig;
		    	searchVal = myOptions.translateXml(searchVal.replace(reg, ".*"));
		    	myOptions.checkOneLine(appendLine[0], searchVal, myOptions.totalLine-1, myOptions);
		    	if(myOptions.totalFoundCnt > prevTotal){
//		    		for(var i = prevTotal; i < myOptions.totalFoundCnt; i++){
//		    			var foundLine = myOptions.foundLines[i];
//			    		appendLine.html(myOptions.getHighLightHtml(foundLine));
//		    		}
//		    		if(myOptions.currentOrder == -1){
//		    			myOptions.currentOrder = 0;
//		    			myOptions.focusCurrent(myOptions);
//		    		}
		    	} else {
		    		if (co.consoleFilter){
                        appendLine.hide();
					}
				}
		    }
	}
})(jQuery)