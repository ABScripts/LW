var wordReg = /(\w+) *[—-] *(\W+)/g;																//reg for parsing words
var collections = [];

var collection = {
	engWords: [],
	rusWords: [],
	keyWord: "",
	createCollection: function(){
		collections[collections.length] = Object.create(this);										//creates new element in collections array
	}
}

	parse();																						//parse strings received from the local Storage every 
																									//time when user reload program or page

function getValueById(name){																		//gets value from text fields
	return document.getElementById(name).value != "" ? document.getElementById(name).value : false;
}

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

//this code should be optimized
function createGIFC(str, key){																		//should to add new func which receives tag-name and content and create this element;
	var p = document.createElement("p");															//create new paragraph                                                              
	p.innerHTML = str;																				//set text for paragraph
	document.getElementById("collectionsBar").appendChild(p);										//add this paragraph to DOM
	var button = document.createElement("button");													//create button
	button.innerHTML = "Delete";																	//set button text
	document.getElementById("collectionsBar").lastElementChild.appendChild(button);					//add button to DOM
	button.setAttribute("key", key);																//set key-attribute, for easily identificating this button
	button.setAttribute("onclick" , "deleteCollection(this.getAttribute('key'))");					//set onclick-attribute
}

function parse(){																					//This function calls when user reload page
		console.log("localStorage, length = " + localStorage.length);									
		for(var i = 0;i<localStorage.length;i++){													//Go throught each local Storage element[which contains words and col. name] 

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

//this code should be optimized
function reWriteCollections(current, target){

          var temp = [];																			//create local temporary array which contains items from localStorage
          localStorage.removeItem(current); 														//remove elm which should be deleted
          for(var i = 0;i<target;i++){													
          	temp[i] = localStorage.getItem(localStorage.key(i));							
          }

          localStorage.clear();																		//clear storage

          var element = document.getElementById("collectionsBar");    								//clear graphic imagination of local storage
			while (element.firstChild) {						
			  element.removeChild(element.firstChild);
			}

            for(var i = 0;i<temp.length;i++){
            	localStorage.setItem(i, temp[i]);													//set new items 
          	createGIFC(localStorage.getItem(i), i);													//create new graphic elm
            }
}
