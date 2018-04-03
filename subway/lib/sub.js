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
draw.height=900;
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
    start_x=e.pageX-draw.offsetLeft;
    start_y=e.pageY-draw.offsetTop;

}
function dragSubway(e) {
    end_x=e.pageX-draw.offsetLeft;
    end_y=e.pageY-draw.offsetTop;
    mx=end_x-start_x;
    my=end_y-start_y;
    if(isDrag){
        drawSubway();
    }

}

function stopDrag(e) {
    isDrag=false;
    e.stopPropagation();
    e.preventDefault();

}
function scaleSubway(e) {
    if(e.wheelDelta<0){  //缩小
        scale*=0.5;
    }else{
        scale*=2;
    }

}
function drawSubway() {
    ctx.clearRect(0,0,draw.width,draw.height);
    var rs={};

    lines.forEach(function (item,index) {
        var points=item.c;  //线路

        ctx.beginPath();

//            ctx.strokeStyle=colors[Math.floor(Math.random()*colors.length)];
        ctx.strokeStyle=colors[index];
        ctx.lineWidth=5;
        ctx.lineJoin='round';
        ctx.lineCap='round';
        var x=parseInt(points[0].split(' ')[0]);
        var y=parseInt(points[0].split(' ')[1]);
        ctx.moveTo(x+mx,y+my);
        for(var i=1;i<points.length;i++){
            x=parseInt(points[i].split(' ')[0]);
            y=parseInt(points[i].split(' ')[1]);
            ctx.lineTo(x+mx,y+my);
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
                    ctx.arc(x+mx,y+my,station_r*2,0,2*Math.PI);
                }else{
                    ctx.arc(x+mx,y+my,station_r,0,2*Math.PI);
                }
                ctx.stroke();
                ctx.fill();
                ctx.textAlign='start';
                ctx.textBaseline='hanging';
                ctx.fillStyle='#000';
                ctx.fillText(station.n,x+5+mx,y+5+my);
                ctx.closePath();
                rs[station.poiid]='';
            }

        });

    });
}