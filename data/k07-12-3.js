//*************************************************************************
//* 語文高手題庫:
//*		每一行題庫以逗號當各欄位的分隔, 
//*			第一欄位為標準答案,每個之間以一個半形空白隔開
//*			第二欄位起為有加上注音的題目, 每組國字注音間以一個半形空白隔開
//* [題庫產生器] http://mail.lsps.tp.edu.tw/~gsyan/works/getph2.php
//**************************************************************************
question_lines = new Array(
//-------------------以下開始貼您的題庫--------------------------
  "ㄈㄥˋ ㄈㄥˊ,ㄇㄣˊ門 ㄈㄥˋ縫,ㄌㄧㄝˋ裂 ㄈㄥˋ縫,ㄒㄧㄝˊ鞋 ㄈㄥˋ縫,ㄈㄥˊ縫 ㄖㄣˋ紉,ㄈㄥˊ縫 ㄓˋ製,ㄈㄥˊ縫 ㄏㄜˊ合"
, "ㄍㄨㄢ ㄍㄨㄢˋ,ㄏㄨㄤˊ皇 ㄍㄨㄢ冠,ㄋㄨˋ怒 ㄈㄚˇ髮 ㄔㄨㄥ衝 ㄍㄨㄢ冠,ㄐㄧ雞 ㄍㄨㄢ冠,ㄧㄢˋ豔 ㄍㄨㄢˋ冠 ㄑㄩㄣˊ群 ㄈㄤ芳,ㄍㄨㄢˋ冠 ㄗㄨㄟˋ罪 ㄇㄧㄥˊ名,ㄖㄨㄛˋ弱 ㄍㄨㄢˋ冠,ㄍㄨㄢˋ冠 ㄐㄩㄣ軍"
, "ㄅㄤ ㄅㄤˋ,ㄅㄤ傍 ㄨˇ午,ㄅㄤ傍 ㄨㄢˇ晚,ㄧ依 ㄕㄢ山 ㄅㄤˋ傍 ㄕㄨㄟˇ水"
//--------------------題庫結束------------------------------------
);

//基本設定
optionsTotal = 6;		//共有幾個選項
optionColTotal = 3;		//一列有幾個選項

/******************************************************************
 以下為程式碼, 不要更動
 ******************************************************************/
 
/******************************************************************
 語文高手題庫格式專用
	形近字的選項都是國字
	多音字的選項都是注音
	同音字的選項都是國字+注音
 ******************************************************************/
//由題庫中抓出一題回傳
getOneQuestion = function() {
	if(typeof questionCurrendIndex == 'undefined' 
		|| typeof questionIndexRandom == 'undefined'
		|| questionCurrendIndex >= question_lines.length	) {
		
		questionIndexRandom = makeRandomIndex(0, question_lines.length-1);
		questionCurrendIndex = 0;
		questionCurrentSubIndex = 0;
	}
	//以亂數取得一筆題庫
	if(questionCurrentSubIndex == 0
			|| typeof questionFields == 'undefined'
			|| questionCurrentSubIndex >= questionFields.length ) {
		qLine = question_lines[questionIndexRandom[questionCurrendIndex++]];
		questionCurrentSubIndex = 1;
	}
	//以逗號將各欄分開
	questionFields = qLine.split(',');
	var question = questionFields[questionCurrentSubIndex++];
	var ngArray = questionFields[0].split(' ');
	answer = '';
	for(var i=0; i<ngArray.length; i++) {
		var ansAt = question.indexOf(ngArray[i]);
		if(ansAt >= 0) {
			if ( typeofword(ngArray[i]) == "注音" ) {
				//如果答案是注音, 一聲的注音就可能誤判，所以再檢查下一個字是否為 2,3,4 聲
				//如果找不到 2,3,4 聲的才是真正的標準答案
				var p = question.substr(ansAt+ngArray[i].length,1);
				if ( "ˊˇˋ".indexOf(p) == -1 || p == "") {
					answer = ngArray[i];
					ngArray.splice(i,1);	//把答案由其它選項中刪除，以免重覆出現
					break;
				}
			} else {
				answer = ngArray[i];
				ngArray.splice(i,1);	//把答案由其它選項中刪除，以免重覆出現
				break;
			}
		}
	}
	
	//重組成物件,準備回傳
	var op = new Object();
	
	op.question = question;	
	op.optionsOK = new Array();	
	op.optionsOK[0] = answer;
	op.optionsNG = ngArray;
	op.type = '注音';

	return op;
	
};
