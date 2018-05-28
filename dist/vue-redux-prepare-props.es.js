var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var prepareProps = function prepareProps(map) {
	var subConditions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "inner_";

	var calcs = {};
	var watchers = {};
	var mapObjectProps = {};

	var datas = function datas(context) {
		var state = context.$store.state;

		var newDatas = {};

		for (var prop in map) {
			var initialValue = map[prop].call(context, state);

			if ((typeof initialValue === "undefined" ? "undefined" : _typeof(initialValue)) === "object") {
				mapObjectProps[prop] = true;
				newDatas[prop] = initialValue;
			}		}
		return newDatas;
	};

	var _loop = function _loop(prop) {
		var innerProp = prefix + prop;

		calcs[innerProp] = map[prop];

		if (mapObjectProps[prop]) {
			watchers[innerProp] = function (newVal, oldVal) {
				if (newVal !== undefined && oldVal !== undefined && newVal != oldVal) {
					if (!subConditions[prop] || subConditions[prop] && typeof subConditions[prop] === "function" && subConditions[prop](newVal, oldVal)) {
						this[prop] = newVal;
					}				}			};
		}	};

	for (var prop in map) {
		_loop(prop);
	}
	return { calcs: calcs, datas: datas, watchers: watchers };
};

export default prepareProps;
