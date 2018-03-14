/**
 * Created by neo on 2018/3/14.
 */

var canvas = require('./minify.js');

var uploadImg = {

    upload : function(){
        var url = "";
        canvas.toBlob(function(blob){
            var xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.status == 200 && xhr.readyState == 4){
                    var res = xhr.responseText;
                    console.log(res);
                }
            }
            xhr.open("POST", url, true);
            xhr.send(blob);
        });
    }

};


module.exports = uploadImg;