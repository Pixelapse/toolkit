//draw the canvas the first time - do some preprocessing
function draw(imageUrl){
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext('2d');
	var img = new Image();
	img.src = imageUrl;
	console.log(img.src);

	img.onload = function(){
		if(img.width > img.height){
			maxY = maxX*img.height/img.width;
		}
		else{
			maxX = maxY*img.width/img.height;
		}
		context.drawImage(img,0,0,maxX,maxY);
	}
	return img;
}

var maxX = 800;
var maxY = 600;

//called each time the image needs to be redrawn
function redraw(c,img)
{
	c.clearRect(0,0,800,600);
	c.drawImage(img,0,0,maxX,maxY);
}

//for simplifying adding a formatted li to the selected colors
function createColorListItem(hex){
	item = '<li class="color">';
	item += '<div class="colorBox" style="background-color:'+hex+'"></div>';
	item +=hex+'</li>';
	return item;
}

//image data -> hex string
function getHex(x,y,c){
    var p = c.getImageData(x, y, 1, 1).data; 
    return "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
}

//find position of mouse relative to the canvas
function findPos(obj,e) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
		curleft = e.pageX - curleft;
		curtop = e.pageY - curtop;
        return { x: curleft, y: curtop };
    }
    return undefined;
}

function rgbToHex(r, g, b) {
    if (r > 255 || g > 255 || b > 255)
        throw "Invalid color component";
    return ((r << 16) | (g << 8) | b).toString(16);
}

//get coordinates with zero padding
function getCoord(pos){
	var x = formatZeros(pos.x);
	var y = formatZeros(pos.y);
	return "(" + x + "," + y + ")";
}

//zero pad nums
function formatZeros(num){
	result = num.toString();
	while(result.length < 3)
		result = "0" + result;
	return result;
}

function drawCrosshair(c,pos){
	c.beginPath();
	c.moveTo(pos.x,0);
	c.lineTo(pos.x,maxY);
	c.moveTo(0,pos.y);
	c.lineTo(maxX,pos.y);
	c.stroke();
}

//get string size of the box
function updateBox(oldPos,newPos){
	return Math.abs(oldPos.x-newPos.x) + " x " + Math.abs(oldPos.y-newPos.y);
}

//draw magnifier
function magDraw(c,img,pos){
	var smallPosX = pos.x*img.width/maxX;
	var smallPosY = pos.y*img.height/maxY;
	var largeBox = 100;
	var smallBox = largeBox/1.5;
	c.drawImage(img,smallPosX-smallBox/2,smallPosY-smallBox/2,smallBox,smallBox,pos.x-largeBox/2,pos.y-largeBox/2,largeBox,largeBox);
}

function drawSmallCross(c,pos){
		c.beginPath();
	c.moveTo(pos.x,pos.y-5);
	c.lineTo(pos.x,pos.y-1);
	c.moveTo(pos.x,pos.y+1);
	c.lineTo(pos.x,pos.y+5);
	c.moveTo(pos.x-5,pos.y);
	c.lineTo(pos.x-1,pos.y);
	c.moveTo(pos.x+1,pos.y);
	c.lineTo(pos.x+5,pos.y);
	c.stroke();
}