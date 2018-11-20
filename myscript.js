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