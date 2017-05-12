if (typeof localStorage["data"] !== "string") localStorage["data"] = "{}"
if (typeof localStorage["params"] !== "string") localStorage["params"] = "{}"
if (typeof localStorage["keyword"] !== "string") localStorage["keyword"] = '{"0": {"category":"jackets", "keyword": "", "color": "", "size": "Small"}}'
if(localStorage['cgu'] === undefined) localStorage['cgu'] = false


var keywordData = JSON.parse(localStorage["keyword"])
var keywordID = []

var _initKeyword = _ => {
	var i = 0
	for (var key in keywordData) {
		keywordID[i] = key
		i++
	}
}