const 
	keywordfields = ['category', 'keyword', 'color', 'size'],
	differentSize = {"pants":
							"<option>30</option>" + 
							"<option>32</option>" +
							"<option>34</option>" +
							"<option>36</option>" +
							"<option value=\"0\">No matter</option>",
					"shorts":
							"<optgroup label='Standard Sizes (i.e water shorts)'>" +
							"<option>Small</option>" +
	                        "<option>Medium</option>" +
	                        "<option>Large</option>" +
	                        "<option>XLarge</option>" +
	                        "</optgroup>" +
	                        "<optgroup label='Pants Sizes'>" +
	                        "<option>30</option>" + 
							"<option>32</option>" +
							"<option>34</option>" +
							"<option>36</option>" +
							"</optgroup>" +
	                        "<option value=\"0\">No matter</option>",
				    "shoes":
							"<option>US 7 / UK 6</option>" + 
							"<option>US 7.5 / UK 6.5</option>" +
							"<option>US 8 / UK 7</option>" +
							"<option>US 8.5 / UK 7.5</option>" +
							"<option>US 9 / UK 8</option>" +
							"<option>US 9.5 / UK 8.5</option>" +
							"<option>US 10 / UK 9</option>" +
							"<option>US 10.5 / UK 9.5</option>" +
							"<option>US 11 / UK 10</option>" +
							"<option>US 11.5 / UK 10.5</option>" +
							"<option>US 12 / UK 11</option>" +
							"<option value=\"0\">No matter</option>",
					"default":
							"<option>Small</option>" +
	                        "<option>Medium</option>" +
	                        "<option>Large</option>" +
	                        "<option>XLarge</option>" +
	                        "<option value=\"0\">No matter</option>"},
	editKeyword = () => {
		var keywordData = {}, error = ""
		Array.prototype.forEach.call(document.getElementsByClassName("kwf"), (element, divIndex, divArray) => {
			var ID = parseInt(element.id.split("[")[1])
			keywordData[ID] = {}
			//check if fields are filled
			keywordfields.forEach((data, fieldIndex, fieldArray) => {
				var fieldName = data + "[" + ID + "]"
				if (document.getElementById(fieldName).value == '') {
					error += "- Field " + fieldName + " is empty.<br/>"
				} else {
					keywordData[ID][data] = document.getElementById(fieldName).value
				}
				if (divIndex === divArray.length - 1 && fieldIndex === fieldArray.length - 1) {
					if (error.length == 0) {
						localStorage["keyword"] = JSON.stringify(keywordData)
						dsp("Keywords has been updated.", "success")
					} else dsp(error, "error")
				}
			})
		})
	},
	getNextFormId = () => {
		if (document.getElementById("addKeywordForm").previousSibling.data !== undefined)
			return parseInt(document.getElementById("addKeywordForm").previousSibling.previousSibling.id.split("[")[1]) + 1
		else
			return parseInt(document.getElementById("addKeywordForm").previousSibling.id.split("[")[1]) + 1
	}

function addKeywordForm(id) {
	var formId = Number.isInteger(parseInt(id)) ? id : getNextFormId(),
		newForm = document.createElement('div'),
		deleteLine = formId != 0 ? '<tr><td colspan="2""><center><button class="btn btn-sm btn-danger" id="removeForm['+formId+']">X</button></center></td</tr>' : ''
	newForm.className = "col-lg-6 kwf"
	newForm.id = "keywordForm["+formId+"]"
	newForm.innerHTML = '<table class="table table-sm" style="margin-top: 20px;">' +
                            '<tbody>' +
                                '<tr><td>Category</td><td>' +
                                    '<select class="form-control" id="category['+formId+']">' +
                                        '<option value="jackets">jackets</option>' +
                                        '<option value="shirts">shirts</option>' +
                                        '<option value="tops_sweaters">tops/sweaters</option>' +
                                        '<option value="sweatshirts">sweatshirts</option>' +
                                        '<option value="pants">pants</option>' +
                                        '<option value="shorts">shorts</option>' +
                                        '<option value="t-shirts">t-shirts</option>' +
                                        '<option value="hats">hats</option>' +
                                        '<option value="bags">bags</option>' +
                                        '<option value="shoes">shoes</option>' +
                                        '<option value="accessories">accessories</option>' +
                                        '<option value="skate">skate</option>' +
                                    '</select>' +
                                '</td></tr>' +
                                '<tr><td>Keywords <i>(Separated from a space)</i></td><td><input class="form-control" id="keyword['+formId+']" type="text"/></td></tr>' +
                                '<tr><td>Color <i>(Leave a space if no matter)</i></td><td><input class="form-control" id="color['+formId+']" type="text"/></td></tr>' +
                                '<tr><td>Size</td><td>' +
                                    '<select class="form-control" id="size['+formId+']">'
                                        + differentSize.default +
                                    '</select>' +
                                '</td></tr>' +
                                deleteLine +
                            '</tbody>' +
                        '</table>'

    //add the form
	document.getElementById("keywordsForm").insertBefore(newForm, document.getElementById("addKeywordForm"))

	//fill form
	if (Number.isInteger(parseInt(id))) {
		var data = JSON.parse(localStorage["keyword"])[id]
		keywordfields.forEach(name => {
			var field = name + "[" + id + "]"
			if (name == "size") {
				var category = JSON.parse(localStorage["keyword"])[formId]["category"]
				if (differentSize[category] !== undefined)
					document.getElementById(field).innerHTML = differentSize[category]
				else
					document.getElementById(field).innerHTML = differentSize["default"]
			}
			document.getElementById(field).value = data[name]
		})
	}

	//change size list
	document.getElementById("category["+formId+"]").onchange = () => {
		var category = document.getElementById("category["+formId+"]").value
		if (differentSize[category] !== undefined)
			document.getElementById("size["+formId+"]").innerHTML = differentSize[category]
		else
			document.getElementById("size["+formId+"]").innerHTML = differentSize["default"]
	}
	//delete form, we can't delete keyword with id 0
	if (formId != 0)
		document.getElementById('removeForm['+formId+']').onclick = () => 
			document.getElementById("keywordsForm").removeChild(document.getElementById("keywordForm["+formId+"]"))
}


//for each keywords set, we show forms
for(var key in JSON.parse(localStorage["keyword"]))
	addKeywordForm(key)

document.getElementById('addKeywordButton').onclick = addKeywordForm
document.getElementById('editKeyword').onclick = editKeyword