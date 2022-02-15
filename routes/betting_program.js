const unsetMargin=[1e4,15e3,3e4,45e3,75e3,12e4,195e3,315e3,41e4,725e3],bettingScreen=document.querySelector("#bettingScreen"),BTN_Player=document.querySelector("#player"),BTN_Banker=document.querySelector("#banker"),win=document.querySelector("#win"),lose=document.querySelector("#lose"),winRate=document.querySelector("#winRate"),betAmount=document.querySelector("#betAmount"),startingAmount=document.querySelector("#startingAmount"),nowPrice=document.querySelector("#nowPrice"),profit=document.querySelector("#profit");let startAmountValue,premium=0,limit=10,sumGameResult=0,profitValue=0,playerScore=0,bankerScore=0,playerLoseStreak=!1,bankerLoseStreak=!1,playerMultiLose=!1,bankerMultiLose=!1,playerprice=0,bankerprice=0,list=[],gameResultArr=[],gameResultAllArr=[],sumGameResultArr=[],nowPriceValueArr=[],profitValueArr=[],margin=[],playerLoseStreakArr=[],bankerLoseStreakArr=[],playerMultiLoseArr=[],bankerMultiLoseArr=[],winRateCheck=0,winCountArr=[0],loseCountArr=[0];function nowProfit(){let e=nowPriceValueArr.slice(-1)[0]-startAmountValue;profit.innerHTML=e.toLocaleString("ko-KR")}function nowPricePlayerWin(){nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0]+(Math.abs(gameResultArr.slice(-1)[0])-Math.abs(gameResultArr.slice(-1)[0])*premium/100)),nowPrice.innerHTML=nowPriceValueArr.slice(-1)[0].toLocaleString("ko-KR"),nowPriceValueArr.slice(-1)[0]<0&&(alert("청산됐습니다."),gameReset())}function nowPriceBankerWin(){nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0]+(Math.abs(gameResultArr.slice(-1)[0])-5*Math.abs(gameResultArr.slice(-1)[0])/100)),nowPrice.innerHTML=nowPriceValueArr.slice(-1)[0].toLocaleString("ko-KR"),nowPriceValueArr.slice(-1)[0]<0&&(alert("청산됐습니다."),gameReset())}function nowPriceLose(){nowPriceValueArr.push(nowPriceValueArr.slice(-1)[0]-Math.abs(gameResultArr.slice(-1)[0])),nowPrice.innerHTML=nowPriceValueArr.slice(-1)[0].toLocaleString("ko-KR"),nowPriceValueArr.slice(-1)[0]<0&&(alert("청산됐습니다."),gameReset())}function gameReset(){bettingScreen.innerHTML="게임 결과를 입력해주세요.",bettingScreen.style.borderColor="#c7c7c7",bettingScreen.style.boxShadow="0 0 0 1px #c7c7c7 inset",bettingScreen.style.color="inherit",playerLoseStreakArr=[!1],bankerLoseStreakArr=[!1],playerMultiLoseArr=[!1],bankerMultiLoseArr=[!1],playerScore=0,bankerScore=0,winCount=0,loseCount=0,winRateCheck=0,winRate.innerHTML=0,win.innerHTML=0,lose.innerHTML=0,list=[],gameResultArr=[],gameResultAllArr=[],sumGameResultArr=[],profitValueArr=[],winCountArr=[0],loseCountArr=[0],nowPriceValueArr=[startAmountValue],startingAmount.innerHTML=startAmountValue.toLocaleString("ko-KR"),nowPrice.innerHTML=startAmountValue.toLocaleString("ko-KR"),nowProfit()}function revert(){if(list.splice(-1,1),gameResultArr.splice(-1,1),sumGameResultArr.splice(-1,1),nowPriceValueArr.splice(-1,1),gameResultAllArr.splice(-1,1),loseCountArr.splice(-1,1),winCountArr.splice(-1,1),playerMultiLoseArr.splice(-1,1),bankerMultiLoseArr.splice(-1,1),playerLoseStreakArr.splice(-1,1),bankerLoseStreakArr.splice(-1,1),win.innerHTML=winCountArr.slice(-1)[0],lose.innerHTML=loseCountArr.slice(-1)[0],winRate.innerHTML=Math.floor(winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0])*100),!0===isNaN(Math.floor(winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0])*100)))return gameReset();nowPrice.innerHTML=nowPriceValueArr.slice(-1)[0].toLocaleString("ko-KR"),bettingScreen.innerHTML=gameResultAllArr.slice(-1)[0].toLocaleString("ko-KR"),!0===gameResultAllArr.slice(-1)[0].includes("플레이어")?(bettingScreen.style.borderColor="#3498db",bettingScreen.style.boxShadow="0 0 0 1px #3498db inset",bettingScreen.style.color="#3498db"):!0===gameResultAllArr.slice(-1)[0].includes("뱅커")?(bettingScreen.style.borderColor="#e74c3c",bettingScreen.style.boxShadow="0 0 0 1px #e74c3c inset",bettingScreen.style.color="#e74c3c"):!0===gameResultAllArr.slice(-1)[0].includes("휴식")&&(bettingScreen.style.borderColor="#c7c7c7",bettingScreen.style.boxShadow="0 0 0 1px #c7c7c7 inset",bettingScreen.style.color="#c7c7c7"),nowProfit()}function LoseRecode(){!1===playerLoseStreak?playerLoseStreakArr.push(!1):!0===playerLoseStreak&&playerLoseStreakArr.push(!0),!1===bankerLoseStreak?bankerLoseStreakArr.push(!1):!0===bankerLoseStreak&&bankerLoseStreakArr.push(!0),!1===playerMultiLose?playerMultiLoseArr.push(!1):!0===playerMultiLose&&playerMultiLoseArr.push(!0),!1===bankerMultiLose?bankerMultiLoseArr.push(!1):!0===bankerMultiLose&&bankerMultiLoseArr.push(!0)}function betResult(){culBoth>0?(gameResultAllArr.push("플레이어 "+Math.abs(culBoth).toLocaleString("ko-KR")),bettingScreen.innerHTML=gameResultAllArr.slice(-1)[0].toLocaleString("ko-KR"),bettingScreen.style.borderColor="#3498db",bettingScreen.style.boxShadow="0 0 0 1px #3498db inset",bettingScreen.style.color="#3498db"):culBoth<0?(gameResultAllArr.push("뱅커 "+Math.abs(culBoth).toLocaleString("ko-KR")),bettingScreen.innerHTML=gameResultAllArr.slice(-1)[0].toLocaleString("ko-KR"),bettingScreen.style.borderColor="#e74c3c",bettingScreen.style.boxShadow="0 0 0 1px #e74c3c inset",bettingScreen.style.color="#e74c3c"):0===culBoth&&(gameResultAllArr.push(),bettingScreen.innerHTML="휴식",bettingScreen.style.borderColor="#c7c7c7",bettingScreen.style.boxShadow="0 0 0 1px #c7c7c7 inset",bettingScreen.style.color="#c7c7c7")}function manual(){document.querySelector("#manual").addEventListener("click",function(){document.querySelector("#gameMenu").style.display="block"}),document.querySelector("#gameMenuCloseBtn").addEventListener("click",function(){document.querySelector("#gameMenu").style.display="none"})}function nightMode(){const e=document.querySelector("#nightMode");e.addEventListener("click",function(){e.classList.toggle("active"),document.querySelector("html").classList.toggle("dark"),document.querySelector("#gameSet").classList.toggle("dark"),document.querySelector("#gameMenu").classList.toggle("dark"),document.querySelector("#cover").classList.toggle("dark")})}function setting(){const e=document.querySelector("#gameSet"),r=document.querySelector("#cover"),t=document.querySelector("#setOK"),l=document.querySelector("#setCancle"),o=document.querySelector("#priceInput"),n=document.querySelector("#martinSet"),s=document.querySelector("#levelLimit"),i=document.querySelector("#gameType");let c=1;n.addEventListener("change",function(){c=n.value}),i.addEventListener("change",function(){premium=i.value}),s.addEventListener("change",function(){limit=s.value}),document.querySelector("#settingBtn").addEventListener("click",function(){e.classList.add("active"),r.classList.add("active")}),t.addEventListener("click",function(){let n=document.querySelector("#martinSet option:checked").text;if(!(""==o.value||o.value<1e4)){margin=[];for(let e=0;e<unsetMargin.length;e++)margin.push(unsetMargin[e]*c);return betAmount.innerHTML=n,startAmountValue=Number(o.value),e.classList.remove("active"),r.classList.remove("active"),t.classList.add("active"),l.classList.add("active"),o.style.borderColor="#000",gameReset()}o.style.borderColor="#FF0000"}),l.addEventListener("click",function(){e.classList.remove("active"),r.classList.remove("active")})}nowProfit(),document.querySelector("#resetBtn").addEventListener("click",function(){gameReset()}),document.querySelector("#revert").addEventListener("click",function(){revert()}),BTN_Player.addEventListener("click",function(){gameResultArr.slice(-1)[0]>0?(winCountArr.push(winCountArr.slice(-1)[0]+1),loseCountArr.push(loseCountArr.slice(-1)[0]),win.innerHTML=winCountArr.slice(-1)[0],winRate.innerHTML=Math.floor(winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0])*100),nowPricePlayerWin()):gameResultArr.slice(-1)[0]<0&&(winCountArr.push(winCountArr.slice(-1)[0]),loseCountArr.push(loseCountArr.slice(-1)[0]+1),lose.innerHTML=loseCountArr.slice(-1)[0],winRate.innerHTML=Math.floor(winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0])*100),nowPriceLose()),nowProfit();for(let e=0;e<gameResultArr.length;e++)sumGameResult+=Math.abs(gameResultArr[e]);sumGameResultArr.push(sumGameResult),sumGameResult=0,"B"===list.slice(-2)[0]&&"B"===list.slice(-2)[1]?(playerLoseStreak=!0,bankerScore++,console.log("플레이어 A")):"A"===list.slice(-2)[0]&&"A"===list.slice(-2)[1]?!0===playerMultiLoseArr.slice(-1)[0]?(playerMultiLose=!1,onsole.log("플레이어 B-1")):(playerScore-=2,console.log("플레이어 B-2")):!0===playerMultiLoseArr.slice(-1)[0]?"A"===list.slice(-1)[0]?(bankerScore++,playerLoseStreak=!1,playerMultiLose=!1,console.log("플레이어 C-1")):(bankerScore++,console.log("플레이어 C-2")):!0===bankerLoseStreakArr.slice(-1)[0]&&"B"===list.slice(-2)[0]&&"A"===list.slice(-2)[1]?!0===bankerMultiLoseLise.slice(-1)[0]?(playerScore-=2,console.log("플레이어 D-1")):(bankerScore++,playerScore-=2,bankerLoseStreak=!1,bankerMultiLose=!0,console.log("플레이어 D-2")):!0===bankerMultiLoseArr.slice(-1)[0]?(playerScore-=2,console.log("플레이어 E")):(playerScore-=2,bankerScore++,playerLoseStreak=!1,console.log("플레이어 F")),playerScore<=0&&(playerScore=0);var e=margin[playerScore],r=margin[bankerScore];if("B"===list.slice(-2)[0]&&"B"===list.slice(-2)[1]&&!0===bankerLoseStreakArr.slice(-1)[0]&&(r=0),list.push("A"),"A"===list.slice(-2)[0]&&"A"===list.slice(-2)[1]&&(r=0),!0===bankerMultiLoseArr.slice(-1)[0]&&(r=0),!0===playerMultiLoseArr.slice(-1)[0]&&(e=0),LoseRecode(),culBoth=e-r,betResult(),bankerScore>=limit)return alert("자동 리셋에 도달했습니다. 게임을 다시 시작합니다."),gameReset();gameResultArr.push(culBoth)}),BTN_Banker.addEventListener("click",function(){for(let e=0;e<gameResultArr.length;e++)sumGameResult+=Math.abs(gameResultArr[e]);sumGameResultArr.push(sumGameResult),sumGameResult=0,gameResultArr.slice(-1)[0]<0?(winCountArr.push(winCountArr.slice(-1)[0]+1),loseCountArr.push(loseCountArr.slice(-1)[0]),win.innerHTML=winCountArr.slice(-1)[0],winRate.innerHTML=Math.floor(winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0])*100),nowPriceBankerWin()):gameResultArr.slice(-1)[0]>0&&(winCountArr.push(winCountArr.slice(-1)[0]),loseCountArr.push(loseCountArr.slice(-1)[0]+1),lose.innerHTML=loseCountArr.slice(-1)[0],winRate.innerHTML=Math.floor(winCountArr.slice(-1)[0]/(winCountArr.slice(-1)[0]+loseCountArr.slice(-1)[0])*100),nowPriceLose()),nowProfit(),"A"===list.slice(-2)[0]&&"A"===list.slice(-2)[1]?(bankerLoseStreak=!0,playerScore++,console.log("뱅커 A")):"B"===list.slice(-2)[0]&&"B"===list.slice(-2)[1]?!0===bankerMultiLoseArr.slice(-1)[0]?(bankerMultiLose=!1,console.log("뱅커 B-1")):(bankerScore-=2,console.log("뱅커 B-2")):!0===bankerMultiLoseArr.slice(-1)[0]?"B"===list.slice(-1)[0]?(playerScore++,bankerLoseStreak=!1,bankerMultiLose=!1,console.log("뱅커 C-1")):(playerScore++,console.log("뱅커 C-2")):!0===playerLoseStreakArr.slice(-1)[0]&&"A"===list.slice(-2)[0]&&"B"===list.slice(-2)[1]?!0===playerMultiLoseArr.slice(-1)[0]?(bankerScore-=2,console.log("뱅커 D-1")):(playerScore++,bankerScore-=2,playerLoseStreak=!1,playerMultiLose=!0,console.log("뱅커 D-2")):!0===playerMultiLoseArr.slice(-1)[0]?(bankerScore-=2,console.log("뱅커 E")):(bankerScore-=2,playerScore++,bankerLoseStreak=!1,console.log("뱅커 F")),bankerScore<=0&&(bankerScore=0);let e=margin[playerScore],r=margin[bankerScore];if("A"===list.slice(-2)[0]&&"A"===list.slice(-2)[1]&&!0===playerLoseStreakArr.slice(-1)[0]&&(e=0),list.push("B"),"B"===list.slice(-2)[0]&&"B"===list.slice(-2)[1]&&(e=0),!0===playerMultiLoseArr.slice(-1)[0]&&(e=0),!0===bankerMultiLoseArr.slice(-1)[0]&&(r=0),LoseRecode(),culBoth=e-r,betResult(),playerScore>=limit)return alert("리셋 단계에 도달되었습니다. 게임을 다시 시작합니다."),gameReset();gameResultArr.push(culBoth)}),manual(),nightMode(),setting();
