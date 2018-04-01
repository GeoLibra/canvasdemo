var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=8;

var MARGIN_LEFT=50;
var MARGIN_TOP=50;
window.onload=function () {
    var draw=document.getElementById('draw');
    var ctx=draw.getContext('2d');


    draw.width=WINDOW_WIDTH;
    draw.height=WINDOW_HEIGHT;
    render(ctx);
}
function render(ctx){
    var hours=12;
    var minutes=25;
    var seconds=55;
    var num_width=(digit[0][0].length+1)*2*(RADIUS+1);
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
    renderDigit(MARGIN_LEFT+num_width,MARGIN_TOP,hours%10,ctx);
    renderDigit(MARGIN_LEFT+2*num_width,MARGIN_TOP,parseInt(minutes/10),ctx);
}
function renderDigit(x,y,num,ctx){
    ctx.fillStyle='#56a36c';
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]===1){
                ctx.beginPath();
                ctx.arc(x+(2*j+1)*(RADIUS+1),y+(2*i+1)*(RADIUS+1),RADIUS,0,2*Math.PI);
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}