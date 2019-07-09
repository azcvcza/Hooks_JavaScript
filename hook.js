function withHookBefore(originFn, hookFn) {
    return function() {
        if (hookFn.apply(this, arguments) === false) {
            return
        }
        return originFn.apply(this, arguments);
    }
}

function withHookAfter(originFn, hookFn) {
    return function() {
        var output = originFn.apply(this, arguments);
        hookFn.apply(this, arguments);
        return output;
    }
}

function hookArgs(originalFn, argsGetter) {
    return function() {
        var _args = argsGetter.apply(this, arguments)
        if (Array.isArray(_args)) {
            for (var i = 0; i < _args.length; i++) arguments[i] = _args[i]
        }
        return originalFn.apply(this, arguments)
    }
}

function hookOutput(originalFn, outputGetter) {
    return function() {
        var _output = originalFn.apply(this, arguments)
        return outputGetter(_output)
    }
}

module.exports = {
    withHookBefore,
    withHookAfter,
    hookArgs,
    hookOutput
}