/**
 * Created by cai on 2016/1/7.
 */

(function(window){

    var version = "0.1";
    var core_trim = '';
    var domReady = false;

    var C = function(selector,fn){
        return new C.prototype.init(selector,fn);
    }

    C.prototype = {
        init: function(selector, fn){
            if(!selector)return;

            if(C.isFunction(selector)){
                 this.ready(fn);
            }else if(selector.slice(0,1) == "#"){
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
        ready: function(fn){
            var hasReadyFn = function(){
                if(domReady)return;
                domReady = false;
                fn && fn();
            }
            document.addEventListener("DOMContentLoaded",hasReadyFn,false);
            document.addEventListener("load",hasReadyFn,false);
        },
        name: "C",
        version: version,
        length: 0,
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
        },

        //只是获取元素的直接父元素，而不去获取爷爷辈的元素 - -。
        parent :function(){
            var arr = [];
            for(var i = 0;i< this.length;i++){
                if(this[i].parentNode.nodeType != 11){
                    arr.push(this[i].parentNode)
                }
            }
            return arr;
        },

        //一层一层的找上去
        //nodeType 为9时时document，不再往上找
        parents: function(){
            var arr = [];
            for(var i = 0;i< this.length;i++){
                var currentNode = this[i];
                while((currentNode = currentNode.parentNode) && currentNode.nodeType != 9 && arr.indexOf(currentNode) == -1){
                    arr.push(currentNode);
                }
            }

            return arr;
        },

        parentsUntil: function(filter){

        },

        each: function(callback){
            C.each(this,callback);
        }

    }


    //静态方法

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

    C.typeOf = function(obj){
      var typeStr = Object.prototype.toString.call(obj);
      return typeStr.split(" ")[1].toLocaleLowerCase().replace(/\]/g,"");
    }

    C.isArray = function(arr){
        return this.typeOf(arr) == "array";   
    }

    C.isObject = function(obj){
        return this.typeOf(obj) == "object";
    }

    C.isFunction = function(fn){
        return this.typeOf(fn) == "function";
    }

    C.trim = function(str){
        if(str === null)return "";
        return core_trim ? core_trim.call(str) : (str + "").replace(/^\s+|\s+$/g,"")
    }

    C.each = function(arr, callback){
       if(!arr || arr.length == 0)return;
       for(var i = 0; i < arr.length; i++){
           callback && callback.call(arr[i]);
       }
       return arr;
    }

    C.map = function(arr, callback){
        var isArray = this.isArray(arr);
        var _arr = [], rt = null;
        if(isArray || arr.length){
            for(var i = 0; i < arr.length; i++){
                rt = callback && callback(arr[i]);
                if(C.isArray(rt)){
                    _arr = arr.concat(rt);
                }else if(rt === null){
                    continue;
                }else{
                    _arr.push(rt);
                }
            }
        }
        return _arr;
    }



    C.prototype.init.prototype = C.prototype;
    window.C = C;

})(window)