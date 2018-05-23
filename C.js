/**
 * Created by cai on 2016/1/7.
 */

 import Cprototype from "./src/prototype"
 import utils from "./src/util"

(function(window){

    var C = function(selector,fn){
        return new C.prototype.init(selector,fn);
    }
    // console.log(Cprototype)
    C.prototype = Cprototype

    C.prototype.init.prototype = C.prototype;
    window.C = C;

})(window)