/**
 * Created by neo on 2018/3/14.
 */
//第一步：选择需要压缩的图片，通过Image，fileReader获取图片信息

//读取文件对象
var fileReader = new FileReader();

//imgDom对象
var img = new Image();

//创建画布对象
var canvas = document.createElement('canvas');
//2d绘图
var ctx = canvas.getContext('2d');

var box = document.getElementById('box');
var showImg = document.getElementById('showImg');

//图片压缩详细信息
var imgMsg = '';

//当读取的文件完成时
fileReader.onload = function(e){
    //把读取到的图片base64码赋值给img对象
    img.src = e.target.result;
    var imgQuality = ((file.size / 1024 / 1024) + "").substring(0,5);
    imgMsg = `<p>已选择图片：${file.name}</p>
                  <p>图片大小为：${imgQuality}M</p>
                 `;
};

//当图片完全加载完成
img.onload = function(){

    //第二步：给定图片压缩限定尺寸，如果图片尺寸大于限定尺寸，则进行压缩，否则使用原图大小
    var x = 0; //x坐标
    var y = 0; //y坐标
    var originW = this.width; //图片原始宽度
    var originH = this.height; //图片原始长度

    var limitW = 200; //压缩限定宽度
    var limitH = 200; //压缩限定长度

    var targetW = originW; //目标的宽度
    var targetH = originH; //目标的长度

    var quality = 0.5; //图片压缩质量

    if(originW > limitW || originH > limitH){
        if(originW / originH > limitW / limitH){
            targetW = limitW;
            //等比例缩放
            targetH = Math.round(targetW / (originW / originH));
        }else{
            targetH = limitH;
            //等比例缩放
            targetW = Math.round(targetH / (originH / originW));
        }
    }

    canvas.width = targetW;
    canvas.height = targetH;

    //开始压缩图片
    ctx.drawImage(img , 0 , 0 , targetW , targetH);
    var url = canvas.toDataURL('image/jpeg',quality);  //图片转换成base64
    //box.appendChild(img);  //展示原图片
    showImg.appendChild(canvas);  //展示压缩后图片
    imgMsg += ` <p>图片原尺寸：${img.width} x ${img.height}</p>
                <p>压缩后尺寸：${canvas.width} x ${canvas.height}</p>
                  `;
    box.innerHTML = imgMsg;

    //下载压缩后的图片
    document.getElementById('download').setAttribute('download',`${file.name}`);
    document.getElementById('download').innerHTML = `Download ${file.name}`;
    document.getElementById('download').href = url;
};

//文件DOM对象
var eleFile = document.getElementById('file');

//选择图片对象
var file = null;

//监听选择到的图片，并获取图片信息
eleFile.addEventListener('change' , function(e) {
    if(!e.target.files[0].type.match(/\/jpeg|\/png|\/gif/)){
        alert("必须是jpg,png,gif后缀的图片哦~");
    }else{
        file = e.target.files[0];
        //通过fileReader转换成base64格式
        fileReader.readAsDataURL(file);
    }

});

var minifyImg = {
    canvas : canvas
};
module.exports = minifyImg;