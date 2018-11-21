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
    	$("#mNumber").innerHTML = mNumber;
    	$("#mCNumber").innerHTML = mCNumber;
    	$("#mSum").innerHTML = mSum;
    	$("#mBanknotes").innerHTML = mBanknotes;
    	$("#mStatus").innerHTML = mStatus;
    	$("#mDor").innerHTML = mDor;
    	$("#mSell").innerHTML = mSell;
    	$("#mSellection").innerHTML = mSellection;
    	$("#mPrice").innerHTML = mPrice;
    	$("#mStatistic").innerHTML = mStatistic;
    	$("#mFuvas").innerHTML = mFuvas;
    	$("#modal").style.display = "block";
    	var mImage = $('#mImage');
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

function itterate(varriable){
	var done = false;
	var count = 0;
	var err = 0;
	var gdd = 0;
	var unkwn = 0;
	var prpl = 0;
	var list = $('#machineRow');
	var errList = document.createElement('div');
	errList.setAttribute('id', 'errorList');
	var okList = document.createElement('div');
	okList.setAttribute('id', 'okList');
	var unknownList = document.createElement('div');
	unknownList.setAttribute('id', 'unknownList');
	var purpleList = document.createElement('div');
	purpleList.setAttribute('id', 'purpleList');
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
	var inHtml = errList.innerHTML + okList.innerHTML + unknownList.innerHTML + purpleList.innerHTML;
	list.innerHTML = inHtml;
	var unknownsP = $('#error');
	unknownsP.innerHTML = 'Машини в грешка: ' + err;
	var unknownsP = $('#good');
	unknownsP.innerHTML = 'Машини без грешка: ' + gdd;
	var unknownsP = $('#unknowns');
	unknownsP.innerHTML = 'Машини без платка: ' + unkwn;
	var counter = $('#machineCount');
	counter.innerHTML = 'Брой Машини: ' + count;
};

function loadAll(){
	var url = "http://46.10.241.187:4040/api/machines";
	$.get(url, function(data){
		itterate(data);
	});
	// var request = new XMLHttpRequest();
	// var jsonResponse;
	// request.open("GET", "http://46.10.241.187:4040/api/machines", true);
	// request.responseType = 'json';
	// request.onload = function() {
	// 	jsonResponse = request.response;
	// 	itterate(jsonResponse);
	// };
	// request.send();
}


function loadSearch(searchText){
	var url = "http://46.10.241.187:4040/api/machines/search/" + searchText;
	$.get(url, function(data){
		itterate(data);
	});
	// var request = new XMLHttpRequest();
	// var jsonResponse;
	// var serverUrl = "http://46.10.241.187:4040/api/machines/search/" + searchText;
	// request.open("GET", serverUrl, true);
	// request.responseType = 'json';
	// request.onload = function() {
	// 	jsonResponse = request.response;
	// 	itterate(jsonResponse);
	// };
	// request.send();
}

function clearButtons(){
	var list = $('#machineRow');
	list.innerHTML = "";
}

function searchClick(){
	var searchText = $("#search-box").value;
	$("#search-box").value = "";
	clearButtons();
	loadSearch(searchText);
}