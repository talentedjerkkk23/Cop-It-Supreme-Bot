const
	//display modal with success/error message
	dsp = (msg, type) => {
		if(type != "success") type = "danger"
		document.getElementById("modal-text").innerHTML = msg
		document.getElementById("close-modal").className = "btn btn-"+type
		$('#important-msg').modal()  
	},
	//init all settings page
	 _init = () => {
		generateExpireDate()
		Data.fill()
	}

document.title = "COPIT v" + chrome.runtime.getManifest().version

document.body.onload = _init
