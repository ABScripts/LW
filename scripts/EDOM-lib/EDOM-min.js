
function getValueById(name){																				//Gets value from text fields
	return getElementById(name).value != "" ? getElementById(name).value : false;
}

function getElementById(name){
	return document.getElementById(name);
}

function setTextInsideIElements(){
	for(let i=  0;i < arguments.length;i++)
		arguments[i].innerHTML = arguments[++i]
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

function setClickEventListener(){
	for(let i = 0;i<arguments.length;i++)
		arguments[i].addEventListener("click", arguments[++i]);
}
