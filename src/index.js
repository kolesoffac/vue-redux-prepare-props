const prepareProps = function(map, subConditions={}, prefix="inner_") {
	let calcs = {};
	let watchers = {};

	for (const prop in map) {
		const innerProp = prefix+prop;

		calcs[innerProp] = map[prop];
		watchers[innerProp] = function(newVal, oldVal) {
			if (newVal !== undefined && oldVal !== undefined && newVal != oldVal) {
				if (!subConditions[prop] || subConditions[prop] && typeof subConditions[prop] === "function" && subConditions[prop](newVal, oldVal)) {
					this[prop] = newVal;
				};
			};
		};
	};

	const datas = function(context) {
		const {$store:{state}} = context;
		let newDatas = {};

		for (const prop in map) {
			newDatas[prop] = map[prop].call(context, state);
		};

		return newDatas;
	};

	return {calcs, datas, watchers};
};

export default prepareProps;