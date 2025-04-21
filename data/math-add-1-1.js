//
//開始比賽前, 說明對話框的說明文字
//
helpText = "請找出算式的答案。大家都按GO以後開始PK";


//number1 operator number2 = ?
number1Min = 1;  //number1 最小
number1Max = 19;  //number1 最大

number2Min = 1;  //number2 最小
number2Max = 19;  //number2 最大

operator = '+';  //運算子


//基本設定
optionsTotal = 6;		//共有幾個選項
optionColTotal = 3;		//一列有幾個選項

/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
getOneQuestion = function(tools) {
	var question, 
		answer,
		n1,
		n2,
		offset,
		r,
		temp,
		opSymbol,
		ngMin,
		ngOffset;
		
	
	
	// 抽出 number1
        n1 = Math.floor(Math.random() * (number1Max - number1Min + 1)) + number1Min;

        // 根據 n1 動態限制 n2 的最大值，使得 n1 + n2 <= 20
        let maxN2 = Math.min(number2Max, 20 - n1);
        if (maxN2 < number2Min) maxN2 = number2Min;  // 避免 n2 無法抽出

        // 抽出 number2
        n2 = Math.floor(Math.random() * (maxN2 - number2Min + 1)) + number2Min;



	//計算答案
	if(operator=='+') {
		opSymbol = '＋';
		answer = n1+n2;	//答案
	} else if(operator=='-') {
		opSymbol = '－';
		if(n1-n2<0) {
			temp = n1;
			n1 = n2;
			n2 = temp;
		}
		answer = n1-n2;	//答案
	}	
	
	//組合成題幹
	var question = n1 +' '+opSymbol+' '+ n2 + ' = ?';		//題幹

	//製作其它非正解的選項
	//以亂數產生要由答案再加減多少
	if(answer-4>0) {
		ngMin = -4;
	} else {
		ngMin = 1-answer;
	}
	if(number1Max<10) {
		ngOffset = 11;
	} else {
		ngOffset = 21;
	}
	var nRandom = tools.makeRandomIndex(ngMin, ngMin+ngOffset);	//其它選項比解答加減多少(用亂數排)
	for(var j=0; j<nRandom.length; j++) {
		if(nRandom[j] == 0 ) {
			nRandom.splice(j,1);	//將是答案者去掉
			break;
		}
	}

	var op = new Object();
	op.optionsOK = [];
	op.optionsNG = [];
	
	op.question = question;
	op.optionsOK[0] = answer;
	for(var i=0; i<nRandom.length; i++) {
		op.optionsNG[i] = answer+nRandom[i];
	}
	return op;
}
