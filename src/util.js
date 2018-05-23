export default {
  typeOf: function(obj){
    var typeStr = Object.prototype.toString.call(obj);
    return typeStr.split(" ")[1].toLocaleLowerCase().replace(/\]/g,"");
  },

  isArray: function(arr){
      return this.typeOf(arr) == "array";   
  },

  isObject: function(obj){
      return this.typeOf(obj) == "object";
  },

  isFunction: function(fn){
      return this.typeOf(fn) == "function";
  },

  trim: function(str){
      var core_trim = '';
      if(str === null)return "";
      return core_trim ? core_trim.call(str) : (str + "").replace(/^\s+|\s+$/g,"")
  },

  each: function(arr, callback){
     if(!arr || arr.length == 0)return;
     for(var i = 0; i < arr.length; i++){
         callback && callback.call(arr[i]);
     }
     return arr;
  },

  map: function(arr, callback){
      var isArray = this.isArray(arr);
      var _arr = [], rt = null;
      if(isArray || arr.length){
          for(var i = 0; i < arr.length; i++){
              rt = callback && callback(arr[i]);
              if(this.isArray(rt)){
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
}