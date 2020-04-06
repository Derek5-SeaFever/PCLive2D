/*
* @author: SeaFever
* @LastDate: 2020.3
*/


var wid = 150, hei = 300, hOf = 0, vOf = -20, _OD = 1.0, speed = 10;
function setModel(){
	L2Dwidget.init({
		"model": {
	　　		//jsonpath控制显示那个小萝莉模型，下面这个就是我觉得最可爱的小萝莉模型
			jsonPath: "./live2d_models/14/14.json",
			"scale": 1
		},
		"display": {
			"position": "right", //看板娘的表现位置
			"width": 150,  //小萝莉的宽度
			"height": 300, //小萝莉的高度
			"hOffset": 0,
			"vOffset": 0
		},
		"mobile": {
			"show": true,
			"scale": 0.5
		},
		"react": {
			"opacityDefault": 1,
			"opacityOnHover": 0.2
		},
	});
}



setModel();

// 按键监听
document.onkeydown = function(e){
	
	// 缩小模型
	if(!e.ctrlKey && e.altKey && e.keyCode == 219 ){
		speed = -10;
		resetModel();
	}else if(e.ctrlKey && e.altKey && e.keyCode == 219){
		speed = -1;
		resetModel();
	}
	
	// 放大模型
	if(!e.ctrlKey && e.altKey && e.keyCode == 221 ){
		speed = 10;
		resetModel();
	}else if(e.ctrlKey && e.altKey && e.keyCode == 221){
		speed = 1;
		resetModel();
	}
	
	(e.altKey && e.keyCode == 37) && (moveModel(37));
	(e.altKey && e.keyCode == 38) && (moveModel(38));
	(e.altKey && e.keyCode == 39) && (moveModel(39));
	(e.altKey && e.keyCode == 40) && (moveModel(40));
}


function resetModel(){
	wid += speed;
	hei += speed;
	setModel();
}

function moveModel(target){
	switch(target){
		case 39:hOffset(-10); break;
		case 37:hOffset(10); break;
		case 38:vOffset(10); break;
		case 40:vOffset(-10); break;
	}
	function hOffset(speed){
		hOf+=speed;
		setModel();
		gl.loseContext();
	}
	function vOffset(speed){
		vOf+=speed;
		setModel();
	}
}