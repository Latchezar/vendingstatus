function showDetails(numberOfString) {
	var machine;
	var url = "http://46.10.241.187:4040/api/machines/" + numberOfString;
	var getMachine = new XMLHttpRequest();
	getMachine.open("GET", url, true);
	getMachine.responseType = 'json';
	getMachine.onload = function() {
		machine = getMachine.response;
		let machineStatus = machine.status;
		let mNumber = parseInt(machine.machineNumber) + ' обект, ' + machine.name;
    	let mCNumber = parseInt(machine.circuitBoardNumber) + ' платка / сигнал: ' + machine.csq;
    	let mSum = 'Монетник: ' + parseFloat(machine.sum).toFixed(2);
    	let mBanknotes = 'Банкноти: ';
    	let mStatus = '';
    	if (machine.status == 'good'){
    		mStatus = 'Грешка: няма';
    	} else {
    		mStatus = 'Грешка: ' + machine.status;
    	}
    	let mDor = 'Врата: ' + machine.ddor;
    	let mSell = 'Продажба ' + machine.dprd;
    	let mSellection = 'Селекция: ' + machine.but;
    	let mPrice = 'Цена: ' + machine.dcen;
    	let mStatistic = 'Отчет: ' + machine.drep;
    	let mFuvas = 'Фувас: ' + machine.fdin + '/' + machine.fmin;
    	document.getElementById("mNumber").innerHTML = mNumber;
    	document.getElementById("mCNumber").innerHTML = mCNumber;
    	document.getElementById("mSum").innerHTML = mSum;
    	document.getElementById("mBanknotes").innerHTML = mBanknotes;
    	document.getElementById("mStatus").innerHTML = mStatus;
    	document.getElementById("mDor").innerHTML = mDor;
    	document.getElementById("mSell").innerHTML = mSell;
    	document.getElementById("mSellection").innerHTML = mSellection;
    	document.getElementById("mPrice").innerHTML = mPrice;
    	document.getElementById("mStatistic").innerHTML = mStatistic;
    	document.getElementById("mFuvas").innerHTML = mFuvas;
    	document.getElementById("modal").style.display = "block";
    	var mImage = document.getElementById('mImage');
    	if (machineStatus == 'good'){
    		mImage.setAttribute('src', './button_round_green.png');
    	} else {
    		if (machineStatus == 'unknown'){
    			mImage.setAttribute('src', './button_round_yellow.png');
    		} else {
    			mImage.setAttribute('src', './button_round_red.png');
    		}
    	}
	}
	getMachine.send();
}

function loadAll(){
	var done = false;
	var count = 0;
	var err = 0;
	var gdd = 0;
	var unkwn = 0;
	var prpl = 0;
	var list = document.getElementById('machineRow');
	var errList = document.createElement('div');
	errList.setAttribute('id', 'errorList');
	var okList = document.createElement('div');
	okList.setAttribute('id', 'okList');
	var unknownList = document.createElement('div');
	unknownList.setAttribute('id', 'unknownList');
	var purpleList = document.createElement('div');
	purpleList.setAttribute('id', 'purpleList');
	function itterate(varriable){
		varriable.forEach(function(element) {
		console.log(element.machineNumber + " " + element.name);
			var status = element.status;
			var machineNumber = element.machineNumber;
			var onClickData = 'showDetails(\'' + machineNumber + '\')';
			var divElement = document.createElement('div');
			var imageText = document.createElement('div');
			imageText.classList.add('centered');
			imageText.innerHTML = parseInt(machineNumber);
			var imageButton = document.createElement('img');
			imageButton.setAttribute('id', machineNumber);
			imageButton.setAttribute('onclick', onClickData);
			imageText.setAttribute('id', machineNumber);
			imageText.setAttribute('onclick', onClickData);
			divElement.setAttribute('id', machineNumber);
			divElement.setAttribute('onclick', onClickData);
			imageButton.classList.add('innerimage');
			divElement.classList.add('col-1');
			divElement.appendChild(imageButton);
			divElement.appendChild(imageText);
			if (status != 'good' && status != 'unknown' && status != 'purple'){
				imageButton.src = 'button_round_red.png';
				errList.appendChild(divElement);
				err += 1;
				count += 1;
			}
			if (status == 'good') {
				imageButton.src = 'button_round_green.png';
				okList.appendChild(divElement);
				gdd += 1;
				count += 1;
			}
			if (status == 'unknown'){
				imageButton.src = 'button_round_yellow.png';
				unknownList.appendChild(divElement);
				unkwn += 1;
				count += 1;
			}
			if (status == 'purple'){
				imageButton.src = 'button_round_purple.png';
				purpleList.appendChild(divElement);
				prpl += 1;
				count += 1;
			}
		
		});
		var inHtml = errList.innerHTML + purpleList.innerHTML + okList.innerHTML + unknownList.innerHTML;
		list.innerHTML = inHtml;
		var unknownsP = document.getElementById('error');
		unknownsP.innerHTML = 'Машини в грешка: ' + err;
		var unknownsP = document.getElementById('good');
		unknownsP.innerHTML = 'Машини без грешка: ' + gdd;
		var unknownsP = document.getElementById('unknowns');
		unknownsP.innerHTML = 'Машини без платка: ' + unkwn;
		var counter = document.getElementById('machineCount');
		counter.innerHTML = 'Брой Машини: ' + count;
	};
	var request = new XMLHttpRequest();
	var jsonResponse;
	request.open("GET", "http://46.10.241.187:4040/api/machines", true);
	request.responseType = 'json';
	request.onload = function() {
		jsonResponse = request.response;
		itterate(jsonResponse);
	};
	request.send();
}


function loadSearch(searchText){
	var done = false;
	var count = 0;
	var err = 0;
	var gdd = 0;
	var unkwn = 0;
	var list = document.getElementById('machineRow');
	var errList = document.createElement('div');
	errList.setAttribute('id', 'errorList');
	var okList = document.createElement('div');
	okList.setAttribute('id', 'okList');
	var unknownList = document.createElement('div');
	unknownList.setAttribute('id', 'unknownList');
	function itterate(varriable){
		varriable.forEach(function(element) {
		console.log(element.machineNumber + " " + element.name);
			var status = element.status;
			var machineNumber = element.machineNumber;
			var onClickData = 'showDetails(\'' + machineNumber + '\')';
			var divElement = document.createElement('div');
			var imageText = document.createElement('div');
			imageText.classList.add('centered');
			imageText.innerHTML = parseInt(machineNumber);
			var imageButton = document.createElement('img');
			imageButton.setAttribute('id', machineNumber);
			imageButton.setAttribute('onclick', onClickData);
			imageText.setAttribute('id', machineNumber);
			imageText.setAttribute('onclick', onClickData);
			divElement.setAttribute('id', machineNumber);
			divElement.setAttribute('onclick', onClickData);
			imageButton.classList.add('innerimage');
			divElement.classList.add('col-1');
			divElement.appendChild(imageButton);
			divElement.appendChild(imageText);
			if (status != 'good' && status != 'unknown'){
				imageButton.src = 'button_round_red.png';
				errList.appendChild(divElement);
				err += 1;
				count += 1;
			}
			if (status == 'good') {
				imageButton.src = 'button_round_green.png';
				okList.appendChild(divElement);
				gdd += 1;
				count += 1;
			}
			if (status == 'unknown'){
				imageButton.src = 'button_round_yellow.png';
				unknownList.appendChild(divElement);
				unkwn += 1;
				count += 1;
			}
		
		});
		var inHtml = errList.innerHTML + okList.innerHTML + unknownList.innerHTML;
		list.innerHTML = inHtml;
		var unknownsP = document.getElementById('error');
		unknownsP.innerHTML = 'Машини в грешка: ' + err;
		var unknownsP = document.getElementById('good');
		unknownsP.innerHTML = 'Машини без грешка: ' + gdd;
		var unknownsP = document.getElementById('unknowns');
		unknownsP.innerHTML = 'Машини без платка: ' + unkwn;
		var counter = document.getElementById('machineCount');
		counter.innerHTML = 'Брой Машини: ' + count;
	};
	var request = new XMLHttpRequest();
	var jsonResponse;
	var serverUrl = "http://46.10.241.187:4040/api/machines/search/" + searchText;
	request.open("GET", serverUrl, true);
	request.responseType = 'json';
	request.onload = function() {
		jsonResponse = request.response;
		itterate(jsonResponse);
	};
	request.send();
}

function clearButtons(){
	var list = document.getElementById('machineRow');
	list.innerHTML = "";
}

function searchClick(){
	var searchText = document.getElementById("search-box").value;
	document.getElementById("search-box").value = "";
	clearButtons();
	loadSearch(searchText);
}