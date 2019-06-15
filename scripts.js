
//*************************//
//   Author:Leila Hsiao    //
//*************************//

var ratio = 0.88;					//ratio of page width
var ratio2 = 0.95;					//smaller ratio of page width
var totalPage = 5;					//number of total pages
var currentPage =3 , prevPage = 3; 	//starting page
var winMin = 880;					//switch to small ratio when window gets too small
var pageHA = [];					//height of each page


var titleColorSet = ["#333", "#eee", "#333", "#eee", "#333"];

var imgFolderName = ["project","webProjects","art","3D"];

var numOfBlocks = [0,4,10,5];
var thumbY = [
				[],
				[],
				["", "11%", "top", "center", "34%", "65%", "56%", "83%","center","24%","70%"],
				["","center", "25%", "25%", "25%", "center"]
			]

var projectName = ["",
					"Fruit Farm"
				]

var webPName = ["",
				"storyScrolling",
				"CGSSdrawsim",
				"primeCalc",
				"feedMii"
				];
var titlesB=["",
			"Cross-fade background while scrolling",
			"Gacha Simulator",
			"Prime Number Calculator",
			"Feed Mii Recipe Generator"
			];
var desB1=["",
		  "Background can cross-fade as user scroll to certain points. Custom scrollbar are used.",
		  "A javascript simulator that simulates the gasha system in moble game Idolm@ster Cinderella Girls Starlight Stage.",
		  "A prime number calculator that displays both prime number and palindromic prime number.",
		  "This program will display possible recipe according to the given ingredient."
		  ];

//=============================
//=== Setting up page Width ===
//=============================
function setWidth(){
	var w = $('body').innerWidth();
	var bigW = w*totalPage;					
	var pageW;

	if( w >= winMin)
		pageW = w*ratio;
	else
		pageW = w*ratio2;

	$(".page").css("width",pageW);
	$(".page-warp").css("width",bigW);
}

//==============================
//=== Setting up page height ===
//==============================
function setHeight(curr){
	for(var i=1; i <= totalPage ; i++){
		$(".page"+i).css("height",pageHA[curr]);
	}
	checkScrollBar(curr);
}

//===================================
//=== Set height back to flexible ===
//===================================
function unsetHeight(){
	for(var i=1; i <= totalPage ; i++)
		$(".page"+i).css("height","auto");
}

//=====================================
//=== Remember heights of each page ===
//=====================================
function getAllH(){
	for(var i=1; i <= totalPage; i++)
		pageHA[i] = $('.page'+ i).height();
}

//==========================================
//=== Calc/set left margin for each page ===
//=== curr: current page ID              ===
//=== flag: if it's clicked from menu    ===
//==========================================
function setMargin(curr,flag){
	var w = $('body').innerWidth();
	var marg;
	var winRatio = 0;

	if( w >= winMin)
		winRatio=ratio;
	else
		winRatio=ratio2;

	//HAVE TO RESET WIDTH IF USER CLICKED FROM MENU!!!!
	//OTHERWISE THE NUMBER WILL MESS UP BC OF SCROLLBAR 
	if(flag == 1)
		setWidth();

	//console.log("pageWidth="+w*ratio);
	//console.log("w=" +w+ "; curr=" +curr+ "; winRatio="+ winRatio+ "; flag="+flag);
	marg = w* ( (curr-1)*winRatio - (1-winRatio)/2 )*-1;

	//console.log("marg="+marg);
	//console.log("========");
	$(".page-warp").css("left",marg);//fly
}

//=====================================
//=== Check if scrollbar is present ===
//=====================================
function checkScrollBar(curr){
	if (pageHA[curr] <= $(window).height()) 
		return false;
	else
		return true;
}

//==========================
//=== Change Title color ===
//==========================
function setTitleColor(curr){
	$(".myName").css("color",titleColorSet[curr-1]);
}

//=============================
//=== Convert type to index ===
//=============================
function getTypeIndex(type){
	var index;

	if(type == "A")
		index=0;
	else if(type == "B")
		index=1;
	else if(type == "C")
		index=2;
	else if(type == "D")
		index=3;

	return index;
}


//===============================
//===      Grid Printer       ===
//=== pageNum: target page ID ===
//=== type: grid type         ===
//=== block: # of block       ===
//===============================
function printGrid(pageID, type, blockNum){
	var target = "page"+pageID;				
	var targetELE = document.getElementsByClassName(target);
	var content = "";
	var typeIndex=getTypeIndex(type);

	if(type == "A" || type == "B"){
		//-----------------------------------------
		// Print text type overlay fo type A, B
		//-----------------------------------------
		content += "<div class='content'>";
		content += "<div class='grid"+ type +"'>";
		for(var i=1; i<=blockNum; i++){
			content += "<div class='block'>";
				content += "<div class='thumb thumb"+i+"'></div>";
				content += "<div class='text'>";
			    	content += "<div class='title'>"+titlesB[i]+"</div>";
			    	content += desB1[i];
		    	content += "</div>";
		    	content += "<a href='#' class='viewBT open-overlay' id='overlay"+type+i+"'>View</a>"
			content += "</div>";
		}
		content += "</div>";
		content += "</div>";

		targetELE[0].innerHTML = content;

		//=============Thumbnail adjustment=============
		for(var j=1; j<=blockNum; j++){
			$(".grid"+ type +" .thumb"+j).css("background", "url("+imgFolderName[typeIndex]+"/"+webPName[j]+"/"+webPName[j]+".png) center top");
			$(".grid"+ type +" .thumb"+j).css("background-size", "cover");
		}


	}
	else if (type == "C" || type == "D"){
		//-----------------------------------------
		// Print image type overlay for type C, D
		//-----------------------------------------
		content += "<div class='content'>";
		content += "<div class='grid"+ type +"'>";
		for(var i=1; i<=blockNum; i++){
			content += " <a class='open-overlay' href='#img-page' id='overlay"+type+i+"'><div class='block block"+i+"'></div></a>";
		}
		content += "</div>";
		content += "</div>";

		targetELE[0].innerHTML = content;	
		//=============Thumbnail adjustment=============
		for(var j=1; j<=blockNum; j++){
			$(".grid"+ type +" .block"+j).css("background", "url(images/"+imgFolderName[typeIndex]+"/"+j+"-1.png) center "+ thumbY[typeIndex][j]);
		}

	}
	

	$(".gridC .block4").css("background-size", "cover");
	$(".gridC .block5").css("background-size", "cover");
	$(".gridC .block9").css("background-size", "cover");
	$(".gridD .block1").css("background-size", "cover");
	$(".gridD .block2").css("background-size", "cover");
	$(".gridD .block3").css("background-size", "cover");
	$(".gridD .block4").css("background-size", "cover");
	$(".gridD .block5").css("background-size", "cover");
}

//=======================
//=== Overlay Printer ===
//=== Only prints one ===
//=======================
function printOverlay(targetID){
	var targetDIV = "overlay-holder";				
	var targetELE = document.getElementsByClassName(targetDIV);
	var content = " ";
	var navNum = [	
					[0],
					[0],
					[0,3,3,0,0,2,0,2,0,0,2],
					[0,2,3,2,0,4]
				];

	var tempA = targetID.split('.');
	var targetClass = tempA[1];

	var type = targetID[8];// Get the type letter
	var temp = targetID.split('overlay'+type);
	var overlayID = parseInt(temp[1]);// Get overlay ID (int)
	var imgFolder;
	var typeIndex = getTypeIndex(type);

	var imgCaptions = [[""],[""],[""],[""]];
	imgCaptions[2][1] = "Lolita Dress";
	imgCaptions[2][2] = "Illustration for Pokemon fan zine(2016)" ;
	imgCaptions[2][3] = "Pokemon Poster card print" ;
	imgCaptions[2][4] = "Illustration for Pokemon fan zine(2014)" ;
	imgCaptions[2][5] = "Front cover illustration for Pokemon fan zine(2014)";
	imgCaptions[2][6] = "Illustration for Fire Emblem fan zine(2018)";
	imgCaptions[2][7] = "Front cover and back cover illustration for original art zine";
	imgCaptions[2][8] = "Sticker design";
	imgCaptions[2][9] = "Pokemon Poster Illustration For Pokemon Event(2015)";
	imgCaptions[2][10] = "Illustration for Touken Ranbu fan zine(2015)";

	imgCaptions[3][1] = "Donuts rendered using Blennder"
	imgCaptions[3][2] = "3D Character modeled using Blender and rigged using PMXE"
	imgCaptions[3][3] = "3D Character modeled using Blender and PMXE"
	imgCaptions[3][4] = "3D Character modeled using Blender"
	imgCaptions[3][5] = "Voxel Room rendered using MagicaVoxel"


	content += "<section class='overlay "+targetClass+"' aria-hidden='true'>";
	content += "<div class='bigCloseArea close-overlay' id='"+targetClass+"' ></div>";


	if(type == "A" || type == "B"){
		//-----------------------------------------
		// Print text type overlay fo type A, B
		//-----------------------------------------
		content += "<div id='txt-page'>";
		content += "<div class='closeBT close-overlay' id='"+targetClass+"' ></div>";
		content += "<div class='preview'></div>"
		content += "<div class='title'>"+titlesB[overlayID]+"</div>";
		content += "<div class='des'>"+desB1[overlayID]+"</div>";
		content += "<a target='_blank' href='"+imgFolderName[typeIndex]+"/"+webPName[overlayID]+"/"+webPName[overlayID]+".html'>";
		content += "<div class='viewBT'>View Demo</div></a>";
		content += "</div>";

		content += "<div class='jump-overlay toPrev'></div>";
		content += "<div class='jump-overlay toNext'></div>";
		content += "</section>";
		targetELE[0].innerHTML = content;

		$(".preview").css("background", "url("+imgFolderName[typeIndex]+"/"+webPName[overlayID]+"/"+webPName[overlayID]+".png) center top");
		$(".preview").css("background-size", "cover");

	}
	else if (type == "C" || type == "D"){
		//-----------------------------------------
		// Print image type overlay fo type C, D
		//-----------------------------------------
		content += "<div id='img-page'>";
		content += "<div class='closeBT close-overlay' id='"+targetClass+"' ></div>";

		if(navNum[typeIndex][overlayID] != 0){
			content += "<div class='img-holder multi-img'>";
			content += "<img id='img-display' src='images/"+imgFolderName[typeIndex]+"/"+overlayID+"-1.png'>";
			content += "</div>";
			content += "<ul class='img-nav'>";
			for(var j=1; j<=navNum[typeIndex][overlayID]; j++)
				content += "<li><img src='images/"+imgFolderName[typeIndex]+"/"+overlayID+"-"+j+".png'></li>"
			content += "</ul>";
		}else{
			content += "<div class='img-holder single-img'>";
			content += "<img id='img-display' src='images/"+imgFolderName[typeIndex]+"/"+overlayID+"-1.png'>";
			content += "</div>";
		}

		content += "<div class='img-cap'><div id='capbox'>";
		content += imgCaptions[typeIndex][overlayID];
		content += "</div></div>";
		content += "</div>";

		content += "<div class='jump-overlay toPrev'></div>";
		content += "<div class='jump-overlay toNext'></div>";
		content += "</section>";
		targetELE[0].innerHTML = content;
	}



}


//delete anything that is in the "overlay-holder" div
function deleteOverlay(){
	var targetDIV = "overlay-holder";
	var targetELE = document.getElementsByClassName(targetDIV);
	targetELE[0].innerHTML = " ";
}


//========================
//=== Flex holder size ===
//========================
function setHolderSize(target){
	resetImgSize(target);
	var offset = 50;

	var holderH = $(target).children("#img-page").children(".img-holder").children().height();
	var holderW = $(target).children("#img-page").children(".img-holder").children().width();
	var picRatio =  holderH/holderW;

	var capH = $(target).children("#img-page").children(".img-cap").height();

	var pageH = holderH+capH;
	var newPageH = $(window).height()*0.95;
	var newHolderH;
	var ratio;

	// Note: Because the image is absolute positioned
	//       The holder have to know it's height to correctly dispay the image
	$(target).children("#img-page").children(".img-holder").css("height",holderH);


	// If the window height gets too small that it starts cropping images, resize
	if(pageH > $(window).height()-offset) {
		// Calculate the best height for img-holder
		newHolderH = newPageH-capH;


		// Calculate the correct ratio 
		var winW = $('body').innerWidth();
		var newHolderW = newHolderH/picRatio; 	// Calculate correct width for img-holder 
		var maxRatioSingle = newHolderW/winW; 	// Calculate a ratio according to window width 

		var newPageW = newHolderW/0.78; 		// Calculate correct width for img-page
		var maxRatioMulti = newPageW/winW; 		// Calculate a ratio according to window width 

		// THIS RATIO IS WRONG, it dosen't consider width when width change
		// ratio = newHolderH / holderH; 

		// Change page width percentage and holder height
		$(target).children("#img-page").children(".multi-img").parent().css("width", maxRatioMulti*100+"%");
		$(target).children("#img-page").children(".single-img").parent().css("width",maxRatioSingle*100+"%");

		$(target).children("#img-page").children(".img-holder").css("height",newHolderH);
	}

	var rRatio = 0.75;
	if($('body').innerWidth() >= 1200)
		rRatio = 0.45;
	var txtW =  $('body').innerWidth()*rRatio - parseInt( $(target).children("#txt-page").css("padding") )*2;
	$(target).children("#txt-page").css("width",txtW );

}

//====================================
//=== Reset a few flexible element ===
//====================================
function resetImgSize(target){
	$(target).children("#img-page").children(".single-img").css("width","100%");

	$(target).children("#img-page").children(".multi-img").css("width","78%");
	$(target).children("#img-page").children(".multi-img").siblings(".img-nav").css("width","20%");
	$(target).children("#img-page").css("width","80%");
}

//==========================================
//=== Overlay close area height solution ===
//==========================================
function overlayHSync(target){
	var eleH = $(target).children("#img-page").children(".img-holder").children().height();
	var capH = $(target).children("#img-page").children(".img-cap").height();

	eleH += capH;
	if (eleH <= $(window).height()) {
		$(target).children(".bigCloseArea").css("height",$(window).height());	
		$(target).children("#img-page").css("top","50%");
		$(target).children("#img-page").css("transform","translate(-50%,-50%)");
	}else if(eleH > $(window).height()){
		//make sure the holder dosen't jump to top when y-axis overflows
		$(target).children("#img-page").css("top",20);
		$(target).children("#img-page").css("transform","translate(-50%,0)");
		$(target).children(".bigCloseArea").css("height",eleH);
	}
	//Notes: Image navigator height still can't resize when y-axis overflows
}



//======================//
//===                ===//
//=== Ready Function ===//
//===                ===//
//======================//

$(document).ready(function() {

	//------------------------------
	//--- Handles clicks on menu ---

	$("#linklist li").click(function(event) {
		//change tab color
		$(this).addClass("current");
		$(this).siblings().removeClass("current");   

		var pageID = $(this).attr("href");
		for(var i=1; i <= totalPage; i++){
			if(pageID == "#page"+i){
				prevPage = currentPage;
				currentPage = i;//set destination
			}
		}
		setTitleColor(currentPage);
		setHeight(currentPage);
		setMargin(currentPage,1);		
	});

	//-----------------------------------
	//--- Handles clicks on the side  ---
	for(var i=1; i<= totalPage;i++){
		$(".page"+i).click(function(event){
			var x = $(this).attr('class');
			var temp = x.split('page page');
			var pgID = parseInt(temp[1]);
			// If the page clicked is not current page
			if(currentPage!=pgID){
				// Trigger click on menu
				$("#linklist").children().eq(pgID-1).trigger( "click" );	
			}

		});
	}

});

$(document).ready(function(){ 
	var c = document.getElementById("linklist").getElementsByTagName("li");
	$(c[currentPage-1]).addClass("current");
	setMargin(currentPage,0);
	setWidth();

	getAllH();
	setHeight(currentPage);
	setTitleColor(currentPage);
});

$(window).resize(function(){ 
	setWidth();
	setMargin(currentPage,0);

	unsetHeight();
	getAllH();
	setHeight(currentPage);
	setHolderSize();
});

