
function getValueById(name){																				//Gets value from text fields
	return document.getElementById(name).value != "" ? document.getElementById(name).value : false;
}

function createElement(name, text){																			//Receive name of elm and text which will should be wrote on element
	var element = document.createElement(name);
	element.innerHTML = text;
	return element;
}

/*Set attributes to element. Receives DOM-element. Next
attribute will be array which contains attribute-parametres
written in such form: [key, value]                        */
function setAttributes(element, attributes){                                                              
	for(let i = 0;i<attributes.length;i++) element.setAttribute(attributes[i], attributes[++i]);			
return element;
}

function setStyle(elm, prop, value){
	console.log(elm + " " + prop +  " " + value);
	elm.style.prop = value;
}
