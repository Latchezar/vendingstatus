function showDetails(numberOfString) {
	var machine;
	var url = "http://192.168.1.3:4040/api/machines/" + numberOfString;
	$.get(url, function(data){
		machine = data;
		let machineStatus = machine.status;
		let mNumber = parseInt(machine.machineNumber) + ' обект, ' + machine.name;
		let mCNumber = parseInt(machine.circuitBoardNumber) + ' платка / сигнал: ' + machine.csq;
		let mModDate = 'Актуално към: ' + machine.lastModified;
    	let mSum = 'Монетник: ' + parseFloat(machine.sum).toFixed(2);
    	let mBanknotes = 'Банкноти: ';
    	let mStatus = '';
    	if (machineStatus == 'good'){
    		mStatus = 'Грешка: няма';
    	} else if (machineStatus == 'no recent response') {
			mStatus = 'Няма отговор от платката';
		} else if (machineStatus == 'no recent sale') {
			mStatus = 'Няма скорошна продажба';
		} else {
			mStatus = 'Грешка: ' + machine.status;
		}
    	let mDor = 'Врата: ' + machine.ddor;
    	let mSell = 'Продажба ' + machine.dprd;
    	let mSellection = 'Селекция: ' + machine.but;
    	let mPrice = 'Цена: ' + machine.dcen;
    	let mStatistic = 'Отчет: ' + machine.drep;
    	let mFuvas = 'Фувас: ' + machine.fdin + '/' + machine.fmin;
    	$("#mNumber").text(mNumber);
		$("#mCNumber").text(mCNumber);
		$("#mModDate").text(mModDate);
    	$("#mSum").text(mSum);
    	$("#mBanknotes").text(mBanknotes);
    	$("#mStatus").text(mStatus);
    	$("#mDor").text(mDor);
    	$("#mSell").text(mSell);
    	$("#mSellection").text(mSellection);
    	$("#mPrice").text(mPrice);
    	$("#mStatistic").text(mStatistic);
    	$("#mFuvas").text(mFuvas);
    	$("#modal").css("display", "block");
    	var mImage = $('#mImage');
    	if (machineStatus == 'good'){
    		mImage.attr('src', './button_round_green.png');
    	} else {
    		if (machineStatus == 'unknown'){
    			mImage.attr('src', './button_round_yellow.png');
			} else {
				if (machineStatus == 'no recent response' || machineStatus == 'no recent sale') {
					mImage.attr('src', './button_round_purple.png')
				}
				mImage.attr('src', './button_round_red.png');
    		}
    	}
	});
}

function itterate(varriable){
	var done = false;
	var count = 0;
	var err = 0;
	var gdd = 0;
	var unkwn = 0;
	var prpl = 0;
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
		if (status != 'good' && status != 'unknown' && status != 'no recent response' && status != 'no recent sale'){
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
		if (status == 'no recent response' || status == 'no recent sale'){
			imageButton.src = 'button_round_purple.png';
			purpleList.appendChild(divElement);
			prpl += 1;
			count += 1;
		}
	
	});
	var inHtml = errList.innerHTML + okList.innerHTML + unknownList.innerHTML + purpleList.innerHTML;
	$('#machineRow').html(inHtml);
	$('#error').text('Машини в грешка: ' + err);
	$('#good').text('Машини без грешка: ' + gdd);
	$('#unknowns').text('Машини без платка: ' + unkwn);
	$('#machineCount').text('Брой Машини: ' + count);
};

function loadAll(){
	var url = "http://192.168.1.3:4040/api/machines";
	$.get(url, function(data){
		itterate(data);
	});
}

function loadPersonal(person){
	var url = "http://192.168.1.3:4040/api/machines";
	$.get(url, function(data){
		itteratePersonal(data, person);
	});
}

function changeReadTime(readtime){
	var url = "http://192.168.1.3:4040/api/machines/readtime/" + readtime;
	$.get(url, function(data, status){
		console.log('Data: ' + data + '; Status: ' + status)
	});
}

function changeBackTime(backtime){
	var url = "http://192.168.1.3:4040/api/machines/backtime/" + backtime;
	$.get(url, function(data, status){
		console.log('Data: ' + data + '; Status: ' + status)
	});
}


function loadSearch(searchText){
	var url = "http://192.168.1.3:4040/api/machines/search/" + searchText;
	$.get(url, function(data){
		itterate(data);
	});
}

function loadCircuit(searchText){
	var url = "http://192.168.1.3:4040/api/machines/circuit/" + searchText;
	$.get(url, function(data){
		itterate(data);
	});
}

function loadSearchPersonal(searchText, person){
	var url = "http://192.168.1.3:4040/api/machines/search/" + searchText;
	$.get(url, function(data){
		itteratePersonal(data, person);
	});
}

function searchCircuit(){
	var circuitVal = $("#search-box-circuit").val();
	$("#search-box-circuit").val("");
	clearButtons();
	loadCircuit(circuitVal);
}

function clearButtons(){
	var list = $('#machineRow');
	list.innerHTML = "";
}

function searchClick(){
	var searchText = $("#search-box").val();
	$("#search-box").val("");
	clearButtons();
	loadSearch(searchText);
}

function searchPersonal(person){
	var searchText = $("#search-box").val();
	$("#search-box").val("");
	clearButtons();
	loadSearchPersonal(searchText, person);
}

function getMachineById(id){
	var url = "http://192.168.1.3:4040/api/machines/" + id;
	var result;
	$.get(url, function(data){
		result = data;
	});
	return result;
}

function itteratePersonal(varriable, person){
	var done = false;
	var count = 0;
	var err = 0;
	var gdd = 0;
	var unkwn = 0;
	var prpl = 0;
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
		var region = element.region;
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
		if (region == person && status != 'good' && status != 'unknown' && status != 'no recent response' && status != 'no recent sale'){
			imageButton.src = 'button_round_red.png';
			errList.appendChild(divElement);
			err += 1;
			count += 1;
		}
		if (region == person && status == 'good') {
			imageButton.src = 'button_round_green.png';
			okList.appendChild(divElement);
			gdd += 1;
			count += 1;
		}
		if (region == person && status == 'unknown'){
			imageButton.src = 'button_round_yellow.png';
			unknownList.appendChild(divElement);
			unkwn += 1;
			count += 1;
		}
		if (region == person && status == 'no recent response' || status == 'no recent sale'){
			imageButton.src = 'button_round_purple.png';
			purpleList.appendChild(divElement);
			prpl += 1;
			count += 1;
		}
	
	});
	var inHtml = errList.innerHTML + okList.innerHTML + unknownList.innerHTML + purpleList.innerHTML;
	$('#machineRow').html(inHtml);
	$('#error').text('Машини в грешка: ' + err);
	$('#good').text('Машини без грешка: ' + gdd);
	$('#unknowns').text('Машини без платка: ' + unkwn);
	$('#machineCount').text('Брой Машини: ' + count);
};