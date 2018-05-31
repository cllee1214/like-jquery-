
function Promise(fn){
    this.status = "pending";
    this.callbacks = {
        resolveFns: [],
        rejectFns: []
    };

    function resolve(value){
        console.log(value)
    }
    function reject(reson){
        console.log(reson)
    }
    fn && fn.call(this, resolve, reject)
}

Promise.prototype.then = function(resolveFn, rejectFn){
    rejectFn && this.callbacks.rejectFns.push(rejectFn);
    resolveFn && this.callbacks.resolveFns.push(resolveFn);
    return this;
}