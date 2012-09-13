/*
* 
*/

var context;
var canvas = document.getElementById('mainCanvas');
var left = parseInt($('#gameContainer').offset().left);
var top = parseInt($('#gameContainer').offset().top);
var totalMatch = 0;
var pairs = [];
	pairs.push([{'img':'pair3.png', 'open' : 0,'complete' : 0},{'img':'pair5.png', 'open' : 0,'complete' : 0},{'img':'pair6.png', 'open' : 0,'complete' : 0},{'img':'pair8.png', 'open' : 0,'complete' : 0}]);
	pairs.push([{'img':'pair1.png', 'open' : 0,'complete' : 0},{'img':'pair4.png', 'open' : 0,'complete' : 0},{'img':'pair2.png', 'open' : 0,'complete' : 0},{'img':'pair4.png', 'open' : 0,'complete' : 0}]);
	pairs.push([{'img':'pair7.png', 'open' : 0,'complete' : 0},{'img':'pair8.png', 'open' : 0,'complete' : 0},{'img':'pair7.png', 'open' : 0,'complete' : 0},{'img':'pair6.png', 'open' : 0,'complete' : 0}]);
	pairs.push([{'img':'pair1.png', 'open' : 0,'complete' : 0},{'img':'pair2.png', 'open' : 0,'complete' : 0},{'img':'pair3.png', 'open' : 0,'complete' : 0},{'img':'pair5.png', 'open' : 0,'complete' : 0}]);


// check if browser supports the canvas.
if (canvas && canvas.getContext) {
    context = canvas.getContext('2d');
	var base_image;
    if (context) {
		var count = 1;
		context.moveTo(0, 0);
		var imageObj = new Image();
		imageObj.onload = function() {		
			for(var i=0; i<4; i++) {
				var rowCards = [];
				for(var j=0; j<4; j++){
					context.drawImage(imageObj, (j*80), (i*80));					
					canvas.addEventListener('click', eventClick, false);					
				}				
			}
		};
		imageObj.src = "img/CCPL.png";
    }
}
var openObj = null;
var openCordsX = null;
var openCordsY = null;

/*
* Reloading the image if not matched.
*/
function reload(x,y) {						
	var imageObj= new Image();
	imageObj.onload = function	() {		
		context.drawImage(imageObj, (openCordsX * 80), (openCordsY * 80));
		context.drawImage(imageObj, (x * 80), (y * 80));		
		pairs[y][x].open = 0;
		pairs[openCordsY][openCordsX].open = 0;
		openObj = null;
		openCordsX = null;
		openCordsY = null;							
	};	
	imageObj.src = "img/CCPL.png";
}		
					
/*
*
*/
function eventClick(e) {
	var x =(parseInt((e.pageX - left) / 80));
	var y = (parseInt((e.pageY - top) / 80 ));
	
	// if image has not been matched.
	if(pairs[y][x].complete != 1)
	{
		// if image is not open already.
		if(pairs[y][x].open != 1)
		{
			var imageObj= new Image();
			imageObj.onload = function() {		
				context.drawImage(imageObj, (x * 80), (y * 80));
				canvas.addEventListener('click', eventClick, false);			
			};
			
			// If First card
			if(openObj == null)	{				
				imageObj.src = "img/" + pairs[y][x].img;			
				openObj = pairs[y][x].img;
				openCordsX = x;
				openCordsY = y;	
				pairs[y][x].open = 1;			
			}
			else {  // If second card
			
				imageObj.src = "img/" + pairs[y][x].img;
				//alert('open');				
				
				//if matched
				if(openObj == pairs[y][x].img){	
					pairs[y][x].complete = 1;
					pairs[openCordsY][openCordsX].complete = 1;
					openObj = null;
					openCordsX = null;
					openCordsY = null;
					
					if(++totalMatch == 8)
						alert('Congratulations!!! You have done successfully.');
				}
				else{
					var imageObj= new Image();
					imageObj.onload = function	() {	
						context.drawImage(imageObj, (x * 80), (y * 80));							
					};					
					imageObj.src = "img/" + pairs[y][x].img;
					setTimeout('reload('+ x +','+ y +')',700);
				}	
			}			
		}
	}	
	
}
