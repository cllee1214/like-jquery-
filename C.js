/**
 * Created by cai on 2016/1/7.
 */

(function(window){

    var C = function(selector){
        return new C.prototype.init(selector);
    }

    C.prototype = {
        init:function(selector){
            if(!selector)return;

            if(selector.slice(0,1) == "#"){
                this[0] = document.getElementById(selector.slice(1));
                this.length = 1;
            }else if(selector.slice(0,1) == "."){
                var nodeLists = document.getElementsByClassName(selector.slice(1))
                this.length = nodeLists.length;
                for(var i = 0;i<nodeLists.length;i++){
                    this[i] = nodeLists[i];
                }
            }

            return this;
        },
        name:"C",
        length:0,
        get: function(index){
            if(index != null || index != undefined){
                return this[index];
            }
        },
        even: function(){
            var arr = [];
            for(var i = 0;i<this.length;i++){
                if(i % 2 == 0){
                    arr.push(this[i])
                }
            }
            return  arr;
        },
        odd: function(){
            var arr = [];
            for(var i = 0;i<this.length;i++){
                if(i % 2 == 1){
                    arr.push(this[i])
                }
            }
            return  arr;
        }

    }


    //扩展方法
    C.extend = C.prototype.extend = function(){

        var target = null;
        var i = 0;

         //通过参数判断target
         //如果参数是只有一个，那么是扩展实例的方法
         //如果是多个，那么是把后面的扩展到第一个
         if(arguments.length == 1){
            target = this;
         }else{
             target = arguments[0];
             i = 1;
         }

        for(;i<arguments.length;i++){
            for(name in arguments[i]){
                //console.log(name)
                target[name] = arguments[i][name]
            }
        }
        return target;
    }


    C.prototype.init.prototype = C.prototype;
    window.C = C;

})(window)