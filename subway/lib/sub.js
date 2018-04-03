/**
 * Created by HGIS on 2018/4/3.
 */
var draw=document.getElementById('draw');
//添加事件
draw.onmousedown=clickSubway;
draw.onmousemove=dragSubway;
draw.onmouseup=stopDrag;
draw.onmouseout=stopDrag;
draw.onmousewheel=scaleSubway;

const colors=["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"];
var station_r=3;
var isDrag=false;
var left=1;
var top=1;
//平移
//保存一开始的坐标
var start_x=0;
var start_y=0;
var end_x=0;
var end_y=0;
var scale=1;
var mx=end_x-start_x;
var my=end_y-start_y;
draw.width=1300;
draw.height=800;
var maxScale=4.0;      // 最大放大倍数
var minScale=0.1;       // 最小放大倍数
var step=0.1;          // 每次放大、缩小 倍数的变化值

var ctx=draw.getContext('2d');
//读取本地数据
var xhr=new XMLHttpRequest();
var cityname='wuhan';
var lines;
xhr.open('get','./data/drw_'+cityname+'.json');
xhr.send();
xhr.onreadystatechange=function () {
    if(xhr.readyState==4&&xhr.status==200){
        var result=JSON.parse(xhr.responseText);
        lines=result.l;

        drawSubway();

    }
};

function clickSubway(e) {
    isDrag=true;
    start_x=e.offsetX;
    start_y=e.offsetY;

}
function dragSubway(e) {
    end_x=e.offsetX;
    end_y=e.offsetY;

    if(isDrag){
        mx=end_x-start_x;
        my=end_y-start_y;

        drawSubway();

    }
    start_x=end_x;
    start_y=end_y;

}

function stopDrag(e) {
    isDrag=false;
    e.stopPropagation();
    e.preventDefault();
}
function scaleSubway(e) {
    scale=1;
    if(e.wheelDelta<0){  //缩小
        scale =scale <= minScale? minScale : scale - step;
    }else{
        scale = draw.scale >= maxScale? maxScale : scale + step;
    }

    ctx.scale(scale,scale);
    drawSubway();

}
function drawSubway() {
    ctx.save();
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,draw.width,draw.height);
    ctx.restore();
    var rs={};
    // ctx.save();
    ctx.translate(mx,my);
    lines.forEach(function (item,index) {
        var points=item.c;  //线路

        ctx.beginPath();
        ctx.strokeStyle=colors[index];
        ctx.lineWidth=5;
        ctx.lineJoin='round';
        ctx.lineCap='round';
        var x=parseInt(points[0].split(' ')[0]);
        var y=parseInt(points[0].split(' ')[1]);
        ctx.moveTo(x,y);
        for(var i=1;i<points.length;i++){
            x=parseInt(points[i].split(' ')[0]);
            y=parseInt(points[i].split(' ')[1]);
            ctx.lineTo(x,y);
//                    ctx.arc(points[i].split(' ')[0],points[i].split(' ')[1],2,0,Math.PI*2);
        }
        ctx.stroke();
        ctx.closePath();
        var stations=item.st;   //站点

        stations.forEach(function (station) {
            if(rs[station.poiid]){

            }else{
                var x=parseInt(station.rs.split(' ')[0]);
                var y=parseInt(station.rs.split(' ')[1]);
                ctx.strokeStyle='#000';
                ctx.fillStyle='#fff';
                ctx.lineWidth=1;
                ctx.beginPath();
                if(station.t==='1'){
                    //换乘站
                    ctx.arc(x,y,station_r*2,0,2*Math.PI);
                }else{
                    ctx.arc(x,y,station_r,0,2*Math.PI);
                }
                ctx.stroke();
                ctx.fill();
                ctx.textAlign='start';
                ctx.textBaseline='hanging';
                ctx.fillStyle='#000';
                ctx.fillText(station.n,x+5,y+5);
                ctx.closePath();
                rs[station.poiid]='';
            }

        });

    });
    // ctx.restore();
}