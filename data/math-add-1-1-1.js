//
//開始比賽前, 說明對話框的說明文字
//
helpText = "請找出算式的答案。大家都按GO以後開始PK";

// 不要固定設定 operator，我們改成每題隨機決定加減

// 題目數字設定
numberMin = 1;
numberMax = 19;  // 為了保證答案在 20 以內

//基本設定
optionsTotal = 6;		//共有幾個選項
optionColTotal = 3;		//一列有幾個選項

/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
getOneQuestion = function(tools) {
	var question, answer, n1, n2, opSymbol, ngMin, ngOffset;

	// 隨機決定是加法或減法
	var isAddition = Math.random() < 0.5;  // 50%加法 50%減法

	if (isAddition) {
		// 【進位加法題】讓 n1 + n2 必定超過 10，但不超過 20
		n1 = Math.floor(Math.random() * 9) + 2;  // 2~10
		n2 = Math.floor(Math.random() * (20 - n1 - 1)) + 1;  // 讓答案 < 20
		answer = n1 + n2;
		opSymbol = '＋';
	} else {
		// 【退位減法題】讓 n1 - n2 必定 < 10 且要退位
		// 先決定答案（0~9），然後讓 n2 = 個位數大於答案（模擬借位）
		answer = Math.floor(Math.random() * 10);  // 答案 0~9
		n2 = Math.floor(Math.random() * 9) + 1;    // 1~9
		n1 = answer + n2;
		opSymbol = '－';
	}

	question = n1 + ' ' + opSymbol + ' ' + n2 + ' = ?';

	// 選項產生
	if (answer - 4 > 0) {
		ngMin = -4;
	} else {
		ngMin = 1 - answer;
	}
	ngOffset = 11;
	var nRandom = tools.makeRandomIndex(ngMin, ngMin + ngOffset);
	for (var j = 0; j < nRandom.length; j++) {
		if (nRandom[j] == 0) {
			nRandom.splice(j, 1);
			break;
		}
	}

	var op = new Object();
	op.question = question;
	op.optionsOK = [answer];
	op.optionsNG = [];

	for (var i = 0; i < nRandom.length; i++) {
		op.optionsNG[i] = answer + nRandom[i];
	}
	return op;
}
