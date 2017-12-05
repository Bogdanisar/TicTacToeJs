var x;
//x = document.getElementById("bdyContentGameTic");
x = document.getElementById("bdyContentGameMenu");
//x = document.getElementById("bdyContentGameStats");

x.style.display= "block";


var difficulty="hard",
	role="x",
	games=0,
	wins=0,
	draws=0,
	losses=0,
	gameInProgress=false,
	turn=1,
	botTurnEnd = false,
	drawingVictory = false;


function drawVictory (x,y,degree) {
	var elm = document.getElementById("bdyContentGameTicCont"),
		temp = document.createElement("div"),
		topCenter = "293px";

	temp.style.position="absolute";
	temp.style.height = "20px";
	//temp.style.backgroundColor = "green";
	temp.style.transform = "rotate(" + degree + "deg)";

	if (degree == 90) {
		var leftCenter = "28px";
		temp.style.width = "550px";
		temp.style.top = topCenter;
		temp.style.left = 28 + (y-1)*203 + "px";
	} 
	else if (degree == 0) {
		var leftCenter = "28px";
		temp.style.width = "550px";
		temp.style.top = 293 + (x-1)*203 + "px";
		temp.style.left = "28px";
	}
	else {
		var leftCenter = "0px";
		temp.style.width = "706px";
		temp.style.top = topCenter;
		temp.style.left = "-50px";
	}

	var tempIn = document.createElement('div');
	tempIn.style.backgroundColor = "red";
	tempIn.style.height = "100%";
	tempIn.style.width = "0%";

	temp.appendChild(tempIn);

	elm.appendChild(temp);

	var stop = setInterval(function() {intX(tempIn,stop)},10);
}

function botTurn () {
	var botRole = (role=='x') ? '0' : 'x';
	if (difficulty=="easy") {
		var x = document.querySelectorAll(".bdyContentGameTicDiv"),
			randomIt,
			v = [];
		for (var i=0;i<9;++i) {
			if (x[i].childNodes[0].className=="undefinedDiv") {
				v.push(x[i]);
			}
		}
		randomIt = Math.floor(Math.random() * v.length);
		//debugger;
		botTurnEnd = true;
		draw(v[randomIt],botRole);
	}
	else {
		var x = document.querySelectorAll(".bdyContentGameTicDiv"),
			v = [],
			nr = 0,
			dx = [[-1,-2],[0,0],[1,2],[1,2],[ 1, 2],[ 0, 0],[-1,-2],[-1,-2],[-1, 1],[ 0, 0],[-1,1],[1,-1]],
			dy = [[ 1, 2],[1,2],[1,2],[0,0],[-1,-2],[-1,-2],[-1,-2],[ 0, 0],[ 0, 0],[-1, 1],[-1,1],[-1,1]];
		for (var i=0;i<3;++i) {
			var rowV = [];
			for (var j=0;j<3;++j) {
				rowV.push(x[nr++]);
			}
			v.push(rowV);
		}

		//debugger;
		var baseC,
			canWin=false,
			canStop=false,
			xPosFin,
			yPosFin;		

		for (var i=0;i<3 && !canWin;++i) {
			for (var j=0;j<3 && !canWin;++j) {
				if (v[i][j].childNodes[0].className!="undefinedDiv") {
					continue;
				}
				baseC=botRole + "Div";
				for (var k=0;k<dx.length && !canWin;++k) {
					var ok=true;
					for (var l=0;l<2 && ok;++l) {
						var x = i + dx[k][l],
							y = j + dy[k][l];
						if (0<=x && x<=2 && 0<=y && y<=2) {
							if (v[x][y].childNodes[0].className!=baseC) {
								ok=false;
							}
						}
						else {
							ok=false;
						}

						/*
						if (turn==4) {
							debugger;
						}
						*/

					}
					if (ok) {
						canWin=true;
						xPosFin=i;
						yPosFin=j;
					}
				}

				if (canWin) {
					continue;
				}
				baseC=role + "Div";
				for (var k=0;k<dx.length && !canStop;++k) {
					var ok=true;
					for (var l=0;l<2 && ok;++l) {
						var x = i + dx[k][l],
							y = j + dy[k][l];
						if (0<=x && x<=2 && 0<=y && y<=2) {
							if (v[x][y].childNodes[0].className!=baseC) {
								ok=false;
							}
						}
						else {
							ok=false;
						}

						/*
						if (turn==4) {
							debugger;
						}
						*/
					}
					if (ok) {
						canStop=true;
						xPosFin=i;
						yPosFin=j;
					}
				}

				//debugger;
			}
		}

		if (canWin || canStop) {
			//debugger;
			botTurnEnd = true;
			draw(v[xPosFin][yPosFin],botRole);
		}
		else {
			var x = document.querySelectorAll(".bdyContentGameTicDiv"),
				randomIt,
				v = [];
			for (var i=0;i<9;++i) {
				if (x[i].childNodes[0].className=="undefinedDiv") {
					v.push(x[i]);
				}
			}
			randomIt = Math.floor(Math.random() * v.length);
			if (randomIt==v.length) {
				--randomIt;
			}
			//debugger;
			botTurnEnd = true;
			//debugger;
			draw(v[randomIt],botRole);
		}
	}
}

function verify() {
	var x = document.querySelectorAll(".bdyContentGameTicDiv"),
		v = [],
		nr = 0,
		dx = [[-1,-2],[0,0],[1,2],[1,2]],
		dy = [[ 1, 2],[1,2],[1,2],[0,0]],
		degree = [-45,0,45,90],
		xFin,
		yFin,
		degreeFin;
	
	for (var i=0;i<3;++i) {
		var rowV = [];
		for (var j=0;j<3;++j) {
			rowV.push(x[nr++]);
		}
		v.push(rowV);
	}

	var victory = false,
		victoryRole;
	for (var i=0;i<3 && !victory;++i) {
		for (var j=0;j<3 && !victory;++j) {
			var child = v[i][j].childNodes[0],
				c = child.className.slice(0,1);
			if (c == 'u') {
				continue;
			}
			//debugger;

			for (var k=0;k<4 && !victory;++k) {
				var ok = true;
				for (var l=0;l<2 && ok;++l) {
					var x = i + dx[k][l],
						y = j + dy[k][l];
					if (0<=x && x<=2 && 0<=y && y<=2) {
						var debug = v[x][y];
						var nextChild = v[x][y].childNodes[0],
							nextC = nextChild.className.slice(0,1);
						if (c!=nextC) {
							ok=false;
						}
					}
					else {
						ok=false;
					}
				}
				if (ok) {
					victory = true;
					victoryRole = c;
					xFin=i;
					yFin=j;
					degreeFin=degree[k];
				}
			}
		}
	}
	if (botTurnEnd) {
		++turn;
		botTurnEnd=false;
	}

	var x = document.getElementById("bdyContentGameTicTopRightMessage");
	if (victory) {
		++games;
		drawingVictory=true;
		drawVictory(xFin,yFin,degreeFin);
		setTimeout(function() {drawingVictory=false;},1100);
		gameInProgress = false;
		if (victoryRole == role) {
			x.innerHTML = "The player wins!";
			++wins;
		} 
		else {
			x.innerHTML = "The AI wins!";
			++losses;
		}
	}
	else if (turn>9) {
		++games;
		gameInProgress = false;
		x.innerHTML = "It's a draw!";
		++draws;
	}
	else {
		if ( ((turn)%2==1 && role=='x') || ((turn)%2==0 && role=='0') ) {
			x.innerHTML = "It's your turn!";
		}
		else {
			x.innerHTML = "It's the AI's turn";
			botTurn();
		}
	}
}

function draw (elm,c) {
	if (elm.childNodes[0].className!="undefinedDiv" || (c=='x' && turn%2==0) || (c=='0' && turn%2==1) || !gameInProgress
		|| drawingVictory) {
		return;
	}
	elm.innerHTML = '';
	if (c == role) {
		++turn;
	}
	if (c=='x') {
		var temp1 = document.createElement('div'),
			temp2 = document.createElement('div');
		temp1.style.height = "10px";
		temp1.style.width = "202px";
		temp1.style.left = "-1px";
		temp1.style.top = "95px";
		temp1.style.position = "absolute";

		temp1.style.transform = "rotate(45deg)";

		temp1.className = "xDiv";


		temp2.style.height = "10px";
		temp2.style.width = "202px";
		temp2.style.left = "-1px";
		temp2.style.top = "95px";
		temp2.style.position = "absolute";

		temp2.style.transform = "rotate(-45deg)";

		temp2.className = "xDiv";


		elm.appendChild(temp1);
		elm.appendChild(temp2);


		var tempIn1 = document.createElement('div');
		tempIn1.style.backgroundColor = "black";
		tempIn1.style.height = "100%";
		tempIn1.style.width = "0%";

		temp1.appendChild(tempIn1);

		var tempIn2 = document.createElement('div');
		tempIn2.style.backgroundColor = "black";
		tempIn2.style.height = "100%";
		tempIn2.style.width = "0%";

		temp2.appendChild(tempIn2);

		var stop1 = setInterval (function() { intX(tempIn1,stop1); },2.5);
		setTimeout ( 
			function() {var stop2 = setInterval (function() { intX(tempIn2,stop2); },2.5);},
			575);
		//debugger;
	}
	else {
		var temp1 = document.createElement('div');
		temp1.style.width = "112.8px";
		temp1.style.height = "150.4px";
		temp1.style.marginTop = "18.8px";
		temp1.style.marginLeft = "37.6px";

		temp1.style.borderRadius = "100%";
		temp1.style.borderWidth = "6px";
		temp1.style.borderStyle = "solid";
		temp1.style.borderColor = "#11a8d2";

		temp1.className = "0Div";

		elm.appendChild(temp1);

		var color = temp1.style.borderColor;
		var vec = color.slice(4,color.length-1);
		vec = vec.split(',');
		var R=Number(vec[0]),
			G=Number(vec[1]),
			B=Number(vec[2]);
		var obj = {
			nr1:R,
			nr2:G,
			nr3:B
		}
		var stop = setInterval(function () {int0(temp1,obj,stop)} , 2.5);
	}

	setTimeout(verify,1000);
}

function intX(elm,stop) {
	var w = parseInt(elm.style.width);
	if (w!=100) {
		++w;
		elm.style.width = w + "%";
	}
	else {
		clearInterval(stop);
	}
}

function int0(elm,obj,stop) {
	if (obj.nr1>1 || obj.nr2>1 || obj.nr3>1) {
		obj.nr1 = shadeColor (obj.nr1,-1);
		obj.nr2 = shadeColor (obj.nr2,-1);
		obj.nr3 = shadeColor (obj.nr3,-1);
		var string="rgb(" + Math.floor(obj.nr1) + ',' + Math.floor(obj.nr2) + ',' + Math.floor(obj.nr3) + ')';
		elm.style.borderColor=string;
	}
	else {
		clearInterval(stop);
	}

}

function shadeColor(C,percent) {
    C = C * (100 + percent) / 100;

    C = (C<255) ? C : 255;
    C = (C>0) ? C : 0;  

    return C;
}

function changeMenuToTic() {
	var x = document.getElementById("bdyContentGameMenu");
	x.style.display="none";
	x = document.getElementById("bdyContentGameTic");
	x.style.display="block";

	if (!gameInProgress) {
		x = document.getElementById("bdyContentGameTicCont");
		x.innerHTML = '';

		x = document.getElementById("bdyContentGameTicTopRightMessage");
		if (role=='x') {
			x.innerHTML = "It's your turn!";
		}
		else {
			x.innerHTML = "It's the AI's turn!";
		}

		var tableV = [];
		x = document.getElementById("bdyContentGameTicCont");
		gameInProgress = true;
		turn = 1;

		for (var i=0;i<=4;++i) {
			if (i%2==0) {
				var rowV = [];
				for (var j=0;j<=4;++j) {
					var temp;
					if (j%2==0) {
						temp = document.createElement("div");
						temp.style.width = temp.style.height = "200px";
						temp.style.display = "inline-block";
						temp.style.verticalAlign = "top";
						temp.style.position = "relative";
						
						temp.setAttribute("onclick","draw(this,role)");
						temp.setAttribute("class","bdyContentGameTicDiv");

						var temp1 = document.createElement("div");
						temp1.className = "undefinedDiv";

						temp.appendChild(temp1);
					}
					else {
						temp = document.createElement("div");
						temp.style.width = "3px";
						temp.style.height = "200px";
						temp.style.display = "inline-block";
						temp.style.verticalAlign = "top";
						temp.style.backgroundColor = "black";
					}
					rowV.push(temp);
					x.appendChild(temp);
				}
				tableV.push(rowV);
			}
			else {
				var temp;
				temp = document.createElement("div");
				temp.style.width = "606px";
				temp.style.height = "3px";
				temp.style.display = "inline-block";
				temp.style.verticalAlign = "top";
				temp.style.backgroundColor = "black";

				x.appendChild(temp);
				tableV.push(temp);
			}
		}
		if (role == '0') {
			botTurn();
		}
	}
}

function changeTicToMenu() {
	if (gameInProgress && !((role=='x' && turn%2==1) || (role=='0' && turn%2==0)) || drawingVictory) {
		return;
	}
	var x = document.getElementById("bdyContentGameTic");
	x.style.display="none";
	x = document.getElementById("bdyContentGameMenu");
	x.style.display="block";
	x = document.getElementById("bdyContentGameTicTopLeftButton1");
	if (!gameInProgress) {
		document.getElementById("bdyContentGameMenuDivMenuButton1").innerHTML="Start Game";
	}
	else {
		document.getElementById("bdyContentGameMenuDivMenuButton1").innerHTML="Resume Game";
	}
}

function changeDifficulty(d) {
	var x = document.querySelectorAll(".bdyContentGameStatsMenuButtonSpan");
	switch (d) {
		case "easy": {
			x[0].style.color = "white";
			x[1].style.color = "black";
			difficulty = "easy";
			break;
		}
		default: {
			x[0].style.color = "black";
			x[1].style.color = "white";
			difficulty = "hard";
		}
	}
}

function mouseOverExit () {
	if ( gameInProgress && !((role=='x' && turn%2==1) || (role=='0' && turn%2==0)) || drawingVictory) {
		document.getElementById("bdyContentGameTicTopRightMessage").style.display = "none";
		document.getElementById("bdyContentGameTicTopRightMessageExit").style.display = "inline-block";
	}
}

function mouseOutExit () {
	document.getElementById("bdyContentGameTicTopRightMessage").style.display = "inline-block";
	document.getElementById("bdyContentGameTicTopRightMessageExit").style.display = "none";
}

function mouseOverRole (elm) {
	if (!gameInProgress) {
		return;
	}
	document.getElementById("bdyContentGameStatsMenuLeftBot").innerHTML = "You can't change role while a game is running";
}

function mouseOutRole (elm) {
	if (!gameInProgress) {
		return;
	}
	if (role=='x') {
		document.getElementById("bdyContentGameStatsMenuLeftBot").innerHTML = "Crosses have the first round!";
	}
	else {
		document.getElementById("bdyContentGameStatsMenuLeftBot").innerHTML = "Noughts have the second round!";
	}
}

function changeRole(d) {
	if (gameInProgress) {
		return;
	}

	var x = document.querySelectorAll(".bdyContentGameStatsMenuButtonSpan");
	var y = document.getElementById("bdyContentGameStatsMenuLeftBot");
	switch (d) {
		case "x": {
			x[2].style.color = "white";
			x[3].style.color = "black";
			role = "x";
			y.innerHTML = "Crosses have the first round!";
			break;
		}
		default: {
			x[2].style.color = "black";
			x[3].style.color = "white";
			role = "0";
			y.innerHTML = "Noughts have the second round!";
		}
	}
}


function changeMenuToStats() {
	var x = document.getElementById("bdyContentGameMenu");
	x.style.display="none";
	x = document.getElementById("bdyContentGameStats");
	x.style.display="block";
	
	x = document.querySelectorAll(".bdyContentGameStatsMenuButtonSpan");

	switch (difficulty) {
		case "easy": {
			x[0].style.color = "white";
			break;
		}
		default: {
			x[1].style.color = "white";
		}
	}

	switch (role) {
		case "x": {
			x[2].style.color = "white";
			break;
		}
		default: {
			x[3].style.color = "white";
		}
	}


	x = document.querySelectorAll(".bdyContentGameStatsMenuRightBoxData");
	x[0].innerHTML = "Games: " + games;
	x[1].innerHTML = "Wins: " + wins;
	x[2].innerHTML = "Draws: " + draws;
	x[3].innerHTML = "Losses: " + losses;
	winrate = wins/games *100;
	x[4].innerHTML = "Winrate: ";
	x[4].innerHTML += (isNaN(winrate)) ? "N/A" : winrate.toFixed(2) + "%";
}

function changeStatsToMenu() {
	x = document.getElementById("bdyContentGameStats");
	x.style.display="none";
	var x = document.getElementById("bdyContentGameMenu");
	x.style.display="block";	
}

function mouseOverButton (x) {
	x.style.color = "#00ff00";
}

function mouseOutButton (x) {
	x.style.color = "green";
}