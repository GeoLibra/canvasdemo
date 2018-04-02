var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var RADIUS=7;

var MARGIN_LEFT=0;
var MARGIN_TOP=0;

var end_time=new Date(2018,3,2,12,38,0);
var curTimeSeconds=0;

var balls=[];
const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];

var num_width=(digit[0][0].length+1)*2*(RADIUS+1);
var colon_width=(digit[10][0].length+1)*2*(RADIUS+1);
window.onload=function () {
    var draw=document.getElementById('draw');
    var ctx=draw.getContext('2d');


    draw.width=WINDOW_WIDTH;
    draw.height=WINDOW_HEIGHT;
    curTimeSeconds=getCurTimeSeconds();
    setInterval(function () {
        render(ctx);
        update();
    },50);
}
function getCurTimeSeconds() {
    return Math.round((end_time.getTime()-new Date().getTime())/1000);
}
function render(ctx){
    ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    var hours=parseInt(curTimeSeconds/3600);
    var minutes=parseInt((curTimeSeconds-3600*hours)/60);
    var seconds=curTimeSeconds%60;

    renderDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10),ctx);
    renderDigit(MARGIN_LEFT+num_width,MARGIN_TOP,hours%10,ctx);
    //绘制冒号
    renderDigit(MARGIN_LEFT+2*num_width,MARGIN_TOP,10,ctx);

    renderDigit(MARGIN_LEFT+2*num_width+colon_width,MARGIN_TOP,parseInt(minutes/10),ctx);
    renderDigit(MARGIN_LEFT+3*num_width+colon_width,MARGIN_TOP,parseInt(minutes%10),ctx);

    renderDigit(MARGIN_LEFT+4*num_width+colon_width,MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT+4*num_width+colon_width*2,MARGIN_TOP,parseInt(seconds/10),ctx);
    renderDigit(MARGIN_LEFT+5*num_width+colon_width*2,MARGIN_TOP,parseInt(seconds%10),ctx);
    //绘制弹跳的小球
    for(var i=0;i<balls.length;i++){
        ctx.fillStyle=balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x,balls[i].y,RADIUS,0,Math.PI*2);
        ctx.fill();
        ctx.closePath();
    }
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
function update() {


    var nexTimeSeconds=getCurTimeSeconds();

    var nextHours=parseInt(nexTimeSeconds/3600);
    var nextMinutes=parseInt((nexTimeSeconds-nextHours*3600)/60);
    var nextSeconds=parseInt(nexTimeSeconds%60);

    var curHours=parseInt(curTimeSeconds/3600);
    var curMinutes=parseInt((curTimeSeconds-3600*curHours)/60);
    var curSeconds=parseInt(curTimeSeconds%60);
    
    if(nexTimeSeconds!=curTimeSeconds){
        if(parseInt(curHours/10)!=parseInt(nextHours/10)){
            addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curHours/10));
        }
        if(parseInt(curHours%10)!=parseInt(nextHours%10)){
            addBalls(MARGIN_LEFT+num_width,MARGIN_TOP,parseInt(nextHours%10));
        }

        if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
            addBalls(MARGIN_LEFT+2*num_width+colon_width,MARGIN_TOP,parseInt(nextMinutes/10));
        }
        if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
            addBalls(MARGIN_LEFT+3*num_width+colon_width,MARGIN_TOP,parseInt(nextMinutes%10));
        }
        if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
            addBalls(MARGIN_LEFT+4*num_width+colon_width*2,MARGIN_TOP,parseInt(nextSeconds/10));
        }
        if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
            addBalls(MARGIN_LEFT+5*num_width+colon_width*2,MARGIN_TOP,parseInt(nextSeconds%10));
        }
        curTimeSeconds=nexTimeSeconds;
    }
    updateBalls();
}
function addBalls(x,y,num) {
    for(var i=0;i<digit[num].length;i++){
        for(var j=0;j<digit[num][i].length;j++){
            if(digit[num][i][j]===1){
                var aBall={
                    x:x+(2*j+1)*(RADIUS+1),
                    y:y+(2*i+1)*(RADIUS+1),
                    g:1.5+Math.random(),
                    vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
                    vy:-5,
                    color:colors[Math.floor(Math.random()*colors.length)]
                };
                balls.push(aBall);
            }
        }
    }
}
function updateBalls() {
    for(var i=0;i<balls.length;i++){
        balls[i].x+=balls[i].vx;
        balls[i].y+=balls[i].vy;
        balls[i].vy+=balls[i].g;
        if(balls[i]>=WINDOW_HEIGHT-RADIUS){
            balls[i].y=WINDOW_HEIGHT-RADIUS;
            balls[i].vy=-balls[i].vy*0.75;
        }
    }
}