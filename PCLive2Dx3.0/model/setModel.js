function setModel(width, height){
	L2Dwidget.init({
		"model": {
			jsonPath: "./model/src/index.json",
			"scale": 1,
		},
		"display": {
			"position": "right",
			"width": width,
			"height": height,
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
		}
	});
}
setModel(document.body.clientWidth/2, (document.body.clientHeight/5)*3);
window.addEventListener('keydown', (e) => {
	if (e.keyCode === 13 || e.keyCode === 108){
		setModel(document.body.clientWidth/2, (document.body.clientHeight/5)*3);
	}
})