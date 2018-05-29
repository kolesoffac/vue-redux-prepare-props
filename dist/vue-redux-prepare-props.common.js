(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.VueReduxPrepareProps = factory());
}(this, (function () { 'use strict';

	var prepareProps = function prepareProps(map) {
		var subConditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "inner_";

		var calcs = {};
		var watchers = {};

		var _loop = function _loop(prop) {
			var innerProp = prefix + prop;

			calcs[innerProp] = map[prop];
			watchers[innerProp] = {
				sync: true,
				handler: function handler(newVal, oldVal) {
					if (newVal !== undefined && oldVal !== undefined && newVal != oldVal) {
						if (!subConditions[prop] || subConditions[prop] && typeof subConditions[prop] === "function" && subConditions[prop](newVal, oldVal)) {
							this[prop] = newVal;
						}				}			}
			};
		};

		for (var prop in map) {
			_loop(prop);
		}
		var datas = function datas(context) {
			var state = context.$store.state;

			var newDatas = {};

			for (var prop in map) {
				newDatas[prop] = map[prop].call(context, state);
			}
			return newDatas;
		};

		return { calcs: calcs, datas: datas, watchers: watchers };
	};

	return prepareProps;

})));
