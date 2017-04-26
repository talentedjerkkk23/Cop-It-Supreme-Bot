const
	DATA = JSON.parse(localStorage["data"]),
	generateExpireDate = () => {
		const expireMonth = document.getElementById("card_month")
		for (var m = 1; m <= 12; m++) {
			m = m.toString()
			m = m.length < 2 ? "0" + m : m
			var option = document.createElement("option")
			option.text = m, option.value = m
			expireMonth.add(option)
		}

		const expireYear = document.getElementById("card_year"), currentYear = new Date().getFullYear()
		for (var y = currentYear; y <= currentYear + 10; y++) {
			var option = document.createElement("option")
			option.text = y, option.value = y
			expireYear.add(option)
		}
	},
	Data = {
		fields: ["name",
				"card_type",
				"email",
				"card_number",
				"phone",
				"card_month",
				"card_year",
				"address1",
				"address2",
				"address3",
				"cvv",
				"city",
				"zip",
				'state',
				'province',
				"country"],
		fill: () => {
			document.getElementById("cgu").checked = JSON.parse(localStorage['cgu'])
			Data.fields.forEach(data => {
				if (typeof DATA[data] !== "undefined")
					document.getElementById(data).value = DATA[data]

				//display province/state if country is canada/usa
				if (data == 'country') {
					if (DATA.country == "USA")
						document.getElementById('state_row').style = ''
					else if (DATA.country == "CANADA")
						document.getElementById('province_row').style = ''
				}
			})
		},
		checkIfFilled: cb => {
			if (document.getElementById("cgu").checked === false)
				cb(gM("dataErrorTos"))
			else {
				var error = ''
				Data.fields.forEach((input, index, array) => {
					if (document.getElementById(input).value == '' && $('#'+input).is(":visible")) {
						//address2 and 3 are optional
						if (input != "address2" && input != "address3") {
							error += gM("emptyField", input)
						}
					}
					if (index === array.length - 1) cb(error)
				})
			}
		}
	},
	countryChange = () => {
		var country = document.getElementById('country')
		if (country.value == "USA") {
			document.getElementById('state_row').style = ''
			document.getElementById('province_row').style.display = 'none'
		}
		else if (country.value == "CANADA") {
			document.getElementById('province_row').style = ''
			document.getElementById('state_row').style.display = 'none'
		} else {
			document.getElementById('province_row').style.display = 'none'
			document.getElementById('state_row').style.display = 'none'
		}
	},
	editData = () => {
		Data.checkIfFilled(r => {
			if (r.length == 0) {
				dsp(gM("dataSuccess"), "success")
				var dataObj = {}
				Data.fields.forEach((data, index, array) => {
					dataObj[data] = document.getElementById(data).value
					if (index === array.length - 1) 
						localStorage["data"] = JSON.stringify(dataObj)
				})
			} else dsp(r, "error")		
		})
	}

document.getElementById('country').onchange = countryChange

document.getElementById("cgu").onclick = _ => {
	localStorage['cgu'] = document.getElementById("cgu").checked
}
document.getElementById("edit").onclick = editData
