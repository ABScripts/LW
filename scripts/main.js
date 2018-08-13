var wordReg = /(\w+) *[—-] *(\W+)/g,															//reg for parsing words
	collections = [],
		collection = {
			engWords: [],
			rusWords: [],
			keyWord: "",
			createCollection: function(){
				collections[collections.length] = Object.create(this);										//creates new element in collections array
			}
		}

window.onload = parse();																			//parse local storage data afte each reloaded page and also create graphic imaginate of it  																				
																																																																							
function returnString(key){																			//return strings from the local Storage by key
	return localStorage.getItem(key);
}

function setKeyWord(){																				//return key words for future collections
	return collections.length-1;
}

function createNewCollection(){          															//create new collection automatically when user													
	collection.createCollection();																	//click on the same button
	
		if(getValueById("mainText") && getValueById("collectionName")){								//if all text fields are fulled of by content
			var str = "";																			//continue creating...

			str = "[" + getValueById("collectionName") + "]";										//write down the name of collection wrote by user

			while(storage = wordReg.exec(getValueById("mainText"))){								//write down words from main-text field which will be
				 str += storage[1] + "—" + storage[2];												//saved to the local Storage
				}
			
			localStorage.setItem(setKeyWord(), str);												//Saved words and collection name to the local Storage
		}
		createGIFC(str, collections.length-1);														//collection.length-1 becouse I have already created new elm in collections and increase length of it
}

//this code should be optimized(upgrade createElm func)
function createGIFC(str, key){																																																								                                                             																			//set text for paragraph
	document.getElementById("collectionsBar").appendChild(createElement("p", str));																
	var button = document.getElementById("collectionsBar").lastElementChild.appendChild(createElement("button", "Delete"));	
	setAttributes(button, ["key", key, "onclick", "deleteCollection(this.getAttribute('key'))"]);					
	//button.setAttribute("key", key);																										
	//button.setAttribute("onclick" , "deleteCollection(this.getAttribute('key'))");	

}


function parse(){																					//This function calls when user reload page
								
		for(var i = 0;i<localStorage.length;i++){													//Go throught each local Storage element[which contains words and col. name] 
				
			createGIFC(localStorage.getItem(localStorage.key(i)), localStorage.key(i));

					collection.createCollection();														//Create local collections to correct work with creating of new collections in future

				collections[i].keyWord = returnString(i).match(/\[(\w+)\]/)[1];						//Write down col. name
			
				for(var j = 0;storage = wordReg.exec(returnString(i));j++){							//parse words from the local Storage
					collections[i].engWords[j] = storage[1];
					collections[i].rusWords[j] = storage[2];
					
				}
				
		} 
	
}

function createCollection(){
	createNewCollection();
}

function deleteCollection(key){
	reWriteCollections(key, localStorage.length-1);																				
}

function reWriteCollections(current, target){
            localStorage.removeItem(current);
            var target = document.getElementsByTagName("button");
            for(var i = 0;i<target.length;i++)
     			if(target[i].getAttribute("key") == current)target[i].parentNode.remove();
}