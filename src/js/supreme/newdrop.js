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
	else
		setTimeout(() => location.reload(), 800)
	

}

function getFirstItem() {
	return $("article")[0].childNodes[0].childNodes[0].childNodes[0].getAttribute("alt")
}