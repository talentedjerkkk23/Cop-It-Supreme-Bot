var oldItem;

if (validUrl.oldDrop(location.href)) {

	oldItem = getFirstItem()

	chrome.runtime.sendMessage({msg: "oldItem", item: oldItem}, rep => {
		location.href = rep.url + ';' + rep.item
	})
}
else if (validUrl.newDrop(location.href)) {
	oldItem = location.href.split(";")[1]

	//droplist updated!
	if (oldItem !== getFirstItem())
		chrome.runtime.sendMessage({msg: "startCop"})
	else {
		chrome.runtime.sendMessage({msg: "params"}, res => {
			var startTime = parseInt(res["startTime"].replace(/:/g, ""))
			var nowTime = parseInt(new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1").replace(/:/g, ""))

			if (nowTime > startTime + 3)
				chrome.runtime.sendMessage({msg: "startCop"})
			else
				setTimeout(() => location.reload(), 1212)
		})
	}
	
}

function getFirstItem() {
	if ($("article").length !== 0)
		return $("article")[0].childNodes[0].childNodes[0].childNodes[0].getAttribute("alt")
	else
		return 0
}