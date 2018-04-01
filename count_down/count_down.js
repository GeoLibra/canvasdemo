var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=7;

var MARGIN_LEFT=0;
var MARGIN_TOP=0;

var end_time=new Date(2018,3,2,20,0,0);
var curTimeSeconds=0;
window.onload=function () {
    var draw=document.getElementById('draw');
    var ctx=draw.getContext('2d');


    draw.width=WINDOW_WIDTH;
    draw.height=WINDOW_HEIGHT;
    curTimeSeconds=getCurTimeSeconds();
    render(ctx);
}
function getCurTimeSeconds() {
    return Math.round((end_time.getTime()-new Date().getTime())/1000);
}
function render(ctx){
    var hours=parseInt(curTimeSeconds/3600);
    var minutes=parseInt((curTimeSeconds-3600*hours)/60);
    var seconds=curTimeSeconds%60;
    var num_width=(digit[0][0].length+1)*2*(RADIUS+1);
    var colon_width=(digit[10][0].length+1)*2*(RADIUS+1);
    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
    renderDigit(MARGIN_LEFT+num_width,MARGIN_TOP,hours%10,ctx);
    //绘制冒号
    renderDigit(MARGIN_LEFT+2*num_width,MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT+2*num_width+colon_width,MARGIN_TOP,parseInt(minutes/10),ctx);
    renderDigit(MARGIN_LEFT+3*num_width+colon_width,MARGIN_TOP,parseInt(minutes%10),ctx);

    renderDigit(MARGIN_LEFT+4*num_width+colon_width,MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT+4*num_width+colon_width*2,MARGIN_TOP,parseInt(seconds/10),ctx);
    renderDigit(MARGIN_LEFT+5*num_width+colon_width*2,MARGIN_TOP,parseInt(seconds%10),ctx);
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