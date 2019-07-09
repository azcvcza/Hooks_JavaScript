//封装console.log
//
function withHookBefore(originFn, hookFn) {
    return function() {
        hookFn.apply(this, arguments);
        return oringinFn.apply(this, arguments);
    }
}
console.log = withHookBefore(console.log, (...data) => ajax(data))

//中断原有console.log的执行
function withHookBefore1(originFn, hookFn) {
    return function() {
        if (hookFn.apply(this, arguments) === false) {
            return
        }
        return originFn.apply(this, arguments);
    }
}
console.log = withHookBefore(console.log, () => false)
    //结束对一般函数的劫持
    //对DOM API的劫持
    /**
     * Event.Target.prototype.addEventListener = withHookBefore(
     * 			EventTarget.prototype.addEventListener,
     * 			myHookFn
     * )
     */
function hookArgs(originFn, argsGetter) {
    return function() {
        var _args = argsGetter.apply(this, argsGetter);
        for (var i = 0; i < _args.length; i++) {
            arguments[i] = _args[i]
        }
        return originFn.apply(this, arguments);
    }
}
/**
 * EventTarget.prototype.addEventListener = hookArgs(
 * 			  EventTarget.prototype.addEventListener,
 * 			  function(type,listener,options){
 * 					const hookedListener = withHookBefore(listener,e=>myEvents.push(e)){
 * 					return [type, hookedListener, options]
 * 			}
 * }
 * )
 *
 */
//对前端框架的插桩
import Vue from 'vue';
Vue.prototype.$emit = withHookBefore(Vue.prototype.$emit, (name, payload) => {
    // 在此发挥你的黑魔法
    console.log('emitting', name, payload)
})