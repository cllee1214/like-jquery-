import utils from "./util"

export default {
  init: function(selector, fn){
      if(!selector)return;

      if(utils.isFunction(selector)){
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
      var domReady = false;
      var hasReadyFn = function(){
          if(domReady)return;
          domReady = false;
          fn && fn();
      }
      document.addEventListener("DOMContentLoaded",hasReadyFn,false);
      document.addEventListener("load",hasReadyFn,false);
  },
  name: "C",
  version: "0.1",
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
    utils.each(this,callback);
  }

}