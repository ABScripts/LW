
function getValueById(name){																				//gets value from text fields
	return document.getElementById(name).value != "" ? document.getElementById(name).value : false;
}

function createElement(name, text){																			//receive name of elm and text which will should be wrote on element
	var element = document.createElement(name);
	element.innerHTML = text;
	return element;
}