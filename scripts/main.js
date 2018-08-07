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

parse();																							//parse strings received from the local Storage every 
																									//time when user reload program or page

function getValueById(name){																		//gets value from text fields
	return document.getElementById(name).value != "" ? document.getElementById(name).value : false;
}

function returnString(key){													//return strings from the local Storage by key
	return localStorage.getItem(key);
}

function setKeyWord(){														//return key words for future collections
	return collections.length-1;
}

function createNewCollection(){          									//create new collection automatically when user													
	collection.createCollection();											//click on the same button
	
		if(getValueById("mainText") && getValueById("collectionName")){		//if all text fields are fulled of by content
			var str = "";													//continue creating...

			str = "[" + getValueById("collectionName") + "]";				//write down the name of collection wrote by user

			while(storage = wordReg.exec(getValueById("mainText"))){		//write down words from main-text field which will be
				 str += storage[1] + "—" + storage[2];						//saved to the local Storage
				}
		
			localStorage.setItem(setKeyWord(), str);						//Saved words and collection name to the local Storage
		}

}

function parse(){															//This function calls when user reload page
											
		for(var i = 0;i<localStorage.length;i++){							//Go throught each local Storage element[which contains words and col. name] 
			
			collection.createCollection();									//Create local collections to correct work with creating of new collections in future

			collections[i].keyWord = returnString(i).match(/\[(\w+)\]/)[1];	//Write down col. name
		
			for(var j = 0;storage = wordReg.exec(returnString(i));j++){		//parse words from the local Storage
				collections[i].engWords[j] = storage[1];
				collections[i].rusWords[j] = storage[2];
			
		}

	} 
	
}


function createCollection(){
	createNewCollection();
}