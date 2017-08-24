const rightMargin = $(".tab-pane.active").css('marginRight')

$(".nav-item").click(e => {

	var elementToDisplay = $("#" + e.target.getAttribute("show"))

	if (elementToDisplay.length === 0)
		return
	
	//NAVBAR
	$(".nav-item.active").removeClass("active")
	$(e.target).parent().addClass("active")

	//DIV
	var elementToHide = $(".tab-pane.active")
	elementToHide.animate({'margin-left': '-1000px'}, 400, () => {

		elementToHide.removeClass('active')
		elementToHide.hide(1, () => {

			elementToHide.css({'marginLeft': 'auto', 'marginRight': '-1000px'})

			elementToDisplay.animate({'margin-right': rightMargin}, 400)
			elementToDisplay.addClass('active')
			elementToDisplay.show()
		})
	})
})

$("#settings tr").mouseover(e => {
	var id = e.currentTarget.childNodes[1].childNodes[0].id || e.currentTarget.childNodes[1].childNodes[0].childNodes[0].id
	$("#docSettings").html(getSettingsDoc(id))
})

function getSettingsDoc(id) {
	switch (id) {
		case 'enabled':
			return "If this box is not checked, bot will be totally disabled."
		case 'checkCart':
			return "If you use keywords and if you found one or more items, this option will let you check your cart before checkout. We recommand you to use this option."
		case 'autoFill':
			return "When you are on checkout page (URL: http://supremenewyork.com/checkout), the form will be automatically filled with your information."
		case 'autoCheckout':
			return "The checkout form will be submitted automatically if this option is enabled."
		case 'retryOnFail':
			return "If when you are purchasing you got an error, the bot will try again until payment done <i style=\"color: #fff;\">(Option \"Auto-fill checkout page and submit it\" must be enabled)</i>"
		case 'nextSize':
			return "With keywords you can choose the wanted size, if size is sold-out, the bot will choose the next one."
		case 'startTime':
			return "Exact hour of the drop is recommanded. Start time must be in this format hh:mm:ss (ex: 14:23:54), if you put \"0\" as value, this option will be disabled. It permit to start the bot as the wanted time by click on \"Start\" on popup. <b>To use this option, you must be on Supreme page and don’t leave it."
		case 'startWhenUpdated':
			return "<b>Previous feature must be enabled.</b> Start the bot at the second when the new drop list is online. The bot must be started by the Start button."
		case 'removeCaptcha':
			return "This feature remove the captcha on checkout page. This option is not recommanded because payment can fail."
		case 'hideImages':
			return "Remove all images on www.supremenewyork.com, recommanded if you've a weak internet connection."
	}
}
