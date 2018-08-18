var wordReg = /(\w+) *[—-] *(\W+)/g,															//reg for parsing words
		collection = {
			engWords: [],
			rusWords: [],
			collectionName: ""
		}

window.onload = loadGUI();																			//parse local storage data afte each reloaded page and also create graphic imaginate of it  																						

function returnString(key){																			//return strings from the local Storage by key
	return localStorage.getItem(localStorage.key(key));
}

function setKeyWord(){																				//return key words for future collections
	return localStorage.length;
}

function createCollection(){          																	//create new collection automatically when user																														//click on the same button
			if(getValueById("mainText") && getValueById("collectionName")){								//if all text fields are fulled of by content
				var str = "";																			//continue creating...
				str = "[" + getValueById("collectionName") + "]";										//write down the name of collection wrote by user
				while(storage = wordReg.exec(getValueById("mainText"))){								//write down words from main-text field which will be
					 str += storage[1] + "—" + storage[2];												//saved to the local Storage
					}
				localStorage.setItem(setKeyWord(), str);												//Saved words and collection name to the local Storage
			}
			createGIFC(getValueById("collectionName"), setKeyWord());													//collection.length-1 becouse I have already created new elm in collections and increase length of it																	
}

function createGIFC(str, key){																																																						                                                             																			//set text for paragraph
	document.getElementById("collectionsBar").appendChild(createElement("p", str));
	var button = document.getElementById("collectionsBar").lastElementChild.appendChild(createElement("button", "Delete"));	
	setAttributes(button, ["key", key, "onclick", "deleteCollection(this.getAttribute('key'))"]);					
}

function loadGUI(){
	for(let i = 0;i<localStorage.length;i++){
		createGIFC( returnString(i).match(/\[(\w+)\]/)[1], localStorage.key(i));
	}
}

function parse(current){
	 for(let i = 0;i<localStorage.length;i++){
	 	if(localStorage.key(i) == current){
	 		var currentCollection = Object.create(collection);
	 		currentCollection.collectionName = returnString(i).match(/\[(\w+)\]/)[1];
			for(let j = 0;storage = wordReg.exec(returnString(i));j++){
				currentCollection.engWords[j] = storage[1];
				currentCollection.rusWords[j] = storage[2];
			}
	 	}
	}
}

function deleteCollection(current){
	if(current != localStorage-1){														//if not last local storage elm
			let text = localStorage.getItem(localStorage.length-1);							//give value from las LS elm
			localStorage.setItem(current, text);											//set this value to elm which should be deleted(here smt like swapping)
		}
		localStorage.removeItem(localStorage.length-1);									//remove las elm
			while(document.getElementById("collectionsBar").firstChild){				//clean collectionsBar
				document.getElementById("collectionsBar").firstChild.remove();
			}

           		loadGUI();																//set new collectionsBar elms

}