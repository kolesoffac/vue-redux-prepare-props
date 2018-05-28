const prepareProps = function(map, subConditions={}, prefix="inner_") {
	let calcs = {};
	let watchers = {};
	let mapObjectProps = {};

	const datas = function(context) {
		const {$store:{state}} = context;
		let newDatas = {};

		for (const prop in map) {
			const initialValue = map[prop].call(context, state);

			if (typeof initialValue === "object") {
				mapObjectProps[prop] = true;
				newDatas[prop] = initialValue;
			};
		};

		return newDatas;
	};

	for (const prop in map) {
		const innerProp = prefix+prop;

		calcs[innerProp] = map[prop];

		if (mapObjectProps[prop]) {
			watchers[innerProp] = function(newVal, oldVal) {
				if (newVal !== undefined && oldVal !== undefined && newVal != oldVal) {
					if (!subConditions[prop] || subConditions[prop] && typeof subConditions[prop] === "function" && subConditions[prop](newVal, oldVal)) {
						this[prop] = newVal;
					};
				};
			};
		};
	};

	return {calcs, datas, watchers};
};

export default prepareProps;