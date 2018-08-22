var wordReg = /(\w+) *[—-] *(\W+)/g,	
	returnedBack = false,	
	thisCollection,											//reg for parsing words
		collection = {
			words: [
					{	delayed: 0 	}
			],
			name: ""
		}

window.onload = loadGUI();																			//parse local storage data afte each reloaded page and also create graphic imaginate of it  																						

function returnString(key){																		//return strings from the local Storage by key
	return localStorage.getItem(localStorage.key(key));
}

function setKeyWord(){																			//return key words for future collections
	return localStorage.length;
}

function createCollection(){          																	//create new collection automatically when user																														
			if(getValueById("mainText") && getValueById("collectionName")){								//if all text fields are fulled of by content
				var str = "";																			//continue creating...
				str = "[" + getValueById("collectionName") + "]";										//write down the name of collection wrote by user
				while(storage = wordReg.exec(getValueById("mainText"))){								//write down words from main-text field which will be
					 str += storage[1] + "—" + storage[2];												//saved to the local Storage
					}																					//Saved words and collection name to the local Storage
			}
			let currentKey = setKeyWord();																//this var make more correct set values for other elms
			localStorage.setItem(currentKey, str);
				createGIFC(getValueById("collectionName"), currentKey);																								
}

function createGIFC(str, key){								
	document.getElementById("collectionsBar").appendChild(createElement("div", ""));				//wrapper	
	let element = document.getElementById("collectionsBar").lastChild;
	setAttributes(element, ["class", "wrapper"]);
	document.getElementById("collectionsBar").lastChild.appendChild(createElement("p", str));
	element = document.getElementById("collectionsBar").lastChild.lastChild;
	setAttributes(element,  ["key", key, "onclick", "sheetMode(this.getAttribute('key'))"]);
	element = document.getElementById("collectionsBar").lastChild.appendChild(createElement("button", "Delete"));	
	setAttributes(element, ["key", key, "onclick", "deleteCollection(this.getAttribute('key'))"]);					
}

function loadGUI(){
	for(let i = 0;i<localStorage.length;i++){
		createGIFC( returnString(i).match(/\[(\w+)\]/)[1], localStorage.key(i));             			//this reg exp doesnt understand any symbols like !@#$ and spaces
	}
}

function parse(key){																				//new compact parse-function 
	thisCollection = new Object(collection);
	thisCollection.name = localStorage.getItem(key).match(/\[(\w+)\]/)[1];
	for(let i = 0;storage = wordReg.exec(localStorage.getItem(key));i++){
		thisCollection.words[i].rusWord = storage[1];
		thisCollection.words[i].engWord = storage[2];
	}
}

function deleteCollection(current){
	if(current != localStorage-1){															//if not last local storage elm
			let text = localStorage.getItem(localStorage.length-1);							//give value from las LS elm
			localStorage.setItem(current, text);											//set this value to elm which should be deleted(here smt like swapping)
		}	
		localStorage.removeItem(localStorage.length-1);										//remove las elm
			while(document.getElementById("collectionsBar").firstChild){					//clean collectionsBar
				document.getElementById("collectionsBar").firstChild.remove();
			}

           		loadGUI();																	//set new collectionsBar elms

}

function sheetMode(key){
	document.getElementById("slideTop").classList.add("slide");                      //top pannel fall down
	document.getElementById("closeButton").classList.remove("rotate180");			  //rotate up arrow 
	//compactParse(key);
	//console.log(thisCollection.name);
	//console.log(thisCollection.words[0].engWord + " - " + thisCollection.words[0].rusWord);
}