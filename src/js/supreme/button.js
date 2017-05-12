const
	createQuickBuyButton = () => {
		var btn = document.createElement("input")
		btn.id = "quickbuy"
	    btn.type = "button"
	    btn.value = "instant buy"
	    btn.className = "button"
	    btn.style = "background-color: #000000; border-color: #000000; margin-top: 30px;"
	    btn.onclick = clickOnBuy
	    return btn
	},
	clickOnBuy = () => {
		var article = {
			name: document.title.split("Supreme: ")[1],
			price: (() => {
				for (var span in document.body.getElementsByTagName("span")) {
					span = document.body.getElementsByTagName("span")[span]
					if (span.getAttribute("itemprop")) {
						if (span.getAttribute("itemprop") == "price")
							return span.innerText
					}
				}
			})(),
			size: (() => {
				var s = document.getElementById("size")
				if (s.type != "hidden")
					return s.options[s.selectedIndex].text
				else
					return 0
			})()
		}
		if (confirm("Do you confirm the instant purchase of:\n\n" + article.name +", size: " + article.size + "\n\nFor the price of " + article.price + " ?\n\n(The parameter \"Auto-fill chekcout page and submit it\" must be enabled)") == true) {

			$.ajax({
				type: 'POST',
				url: $('#cart-addf').attr('action'),
				dataType: 'json',
				data: $('#cart-addf').serialize(),
				success: function(rep) {
					if (rep && rep.length) {
						location.href = "https://www.supremenewyork.com/checkout"
					}
				}
			})
			
		}
	}