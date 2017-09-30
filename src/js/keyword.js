//find item by provided key
function find(key) {

	var articles = document.getElementById("container").childNodes	
	var ended = 0 //this var is to know if item is detect or not. 1 => stop

	if (articles.length != 0) {

		chrome.runtime.sendMessage({msg: "keywordsData", id: key}, data => {

			//iterate items 
			Array.prototype.forEach.call(articles, (article, id, arr) => {

				var item = article

				if (item.childNodes !== undefined) {
					content = item.innerHTML
					let link_regex = /\s*(href)=\"([^"]+)"/
					let itemId = id //iterator number
					//let itemUrl = item.childNodes[0].getAttribute("href")
					let itemUrl = item.innerHTML.match(link_regex)[2]
					let itemColor = item.childNodes[0].childNodes[2].childNodes[0].textContent.toLowerCase()
					//let name = item.childNodes[0].childNodes[1].childNodes[0].textContent
					let name = item.innerText
					let isSoldOut = item.innerHTML.indexOf("sold out") !== -1 ? true : false
					
					var keywords = data
					var nameMatches = 0

					keywords.keyword.split(" ").forEach((kw, index, array) => { //loop within loop
					//checks if keyword is in every article
						kw = kw.toLowerCase()

						if (name.toLowerCase().indexOf(kw) > -1)
							nameMatches++

						if (index === array.length - 1) { //once index reaches the end

							let colorFound = keywords.color === ' ' ? true : name.toLowerCase().indexOf(keywords.color.toLowerCase()) > -1
							//let colorFound = keywords.color === ' ' ? true : itemColor.indexOf(keywords.color.toLowerCase()) > -1

							if (nameMatches === array.length && colorFound && ended == 0) {

								ended = 1

								if (!isSoldOut)
									if(itemUrl.startsWith("http")){
										location.href = itemUrl	+ "#" + key 
									}
									else{
									location.href = "http://www.supremenewyork.com" + itemUrl + "#" + key //#key is for detect auto-purchase
									}
								else
									chrome.runtime.sendMessage({msg: "cop", id: key})

							}
							else if (itemId === arr.length - 1 && index === array.length - 1 && ended == 0) {

								ended = 1
								chrome.runtime.sendMessage({msg: "cop", id: key})

							}

						}

					})

				}

			})

		})

	} else {
		
		chrome.runtime.sendMessage({msg: "cop", id: key})

	}
	
}
