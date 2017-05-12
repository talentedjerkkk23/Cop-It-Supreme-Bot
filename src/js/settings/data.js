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
		fieldsShipping: ["name",
				"email",
				"phone",
				"address1",
				"address2",
				"address3",
				"city",
				"zip",
				'state',
				'province',
				"country"],
		fieldsBilling: ["card_number",
						"card_year",
						"card_month",
						"card_type",
						"cvv"],
		fill: () => {
			var inputs = Data.fieldsShipping.concat(Data.fieldsBilling)
			inputs.forEach(data => {
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
		checkIfShippingFilled: cb => {
			var error = ''
			Data.fieldsShipping.forEach((input, index, array) => {
				if (document.getElementById(input).value == '' && $('#'+input).is(":visible")) {
					//address2 and 3 are optional
					if (input != "address2" && input != "address3") {
						error += "- Field " + input + " is empty.<br/>"
					}
				}
				if (index === array.length - 1) cb(error)
			})
		},
		checkIfBillingFilled: cb => {
			var error = ''
			Data.fieldsBilling.forEach((input, index, array) => {
				if (document.getElementById(input).value == '' && $('#'+input).is(":visible")) {
					error += "- Field " + input + " is empty.<br/>"
				}
				if (index === array.length - 1) cb(error)
			})
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
	editShipping = () => {
		Data.checkIfShippingFilled(r => {
			if (r.length == 0) {
				dsp("Information has been updated", "success")
				var dataObj = JSON.parse(localStorage["data"])
				Data.fieldsShipping.forEach((data, index, array) => {
					dataObj[data] = document.getElementById(data).value
					if (index === array.length - 1) 
						localStorage["data"] = JSON.stringify(dataObj)
				})
			} else dsp(r, "error")		
		})
	},
	editBilling = () => {
		Data.checkIfBillingFilled(r => {
			if (r.length == 0) {
				dsp("Information has been updated", "success")
				var dataObj = JSON.parse(localStorage["data"])
				Data.fieldsBilling.forEach((data, index, array) => {
					dataObj[data] = document.getElementById(data).value
					if (index === array.length - 1) 
						localStorage["data"] = JSON.stringify(dataObj)
				})
			} else dsp(r, "error")		
		})
	}

document.getElementById('country').onchange = countryChange

document.getElementById("billingSubmit").onclick = editBilling
document.getElementById("shippingSubmit").onclick = editShipping
