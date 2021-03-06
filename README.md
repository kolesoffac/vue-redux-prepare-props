# Vue-redux-prepare-props

[![NPM](https://nodei.co/npm/vue-redux-prepare-props.png?downloads=true&downloadRank=true&stars=true)](https://npmjs.org/package/vue-redux-prepare-props)

[![npm version](https://img.shields.io/npm/v/vue-redux-prepare-props.svg?style=flat-square)](https://www.npmjs.com/package/vue-redux-prepare-props)
[![npm downloads](https://img.shields.io/npm/dm/vue-redux-prepare-props.svg?style=flat-square)](https://www.npmjs.com/package/vue-redux-prepare-props)

> Helper for use props of *Redux* with *Vue.js* using *Vuex* and *Vuedeux*

## Resolved problem
When change only one prop from redux state then triggering all computed and wathers where using props of redux state, which did not change, because always change root object. It's sensitive when prop is object or array.

## How it works
0) Created computed props from selectors with prefix(default: *"inner_"*);
1) Created initial values from props using selectors;
2) Created watchers for *"inner_"* props and when object mutated from selectors then set prop this value.

## Using

``` javascript
import { mapState } from "vuex";
import prepareProps from "vue-redux-prepare-props";

const props = {
    prop1: state => state.redux.prop1,
    ...
    propN: state => state.redux.propN
};

const {calcs, datas, watchers} = prepareProps(props);

export default {
    computed: {
    //redux store
    ...mapState(calcs),
    ...
  },
  watch: {
    ...watchers,
    ...
  },
  data () {
    return {
        ...datas(this),
        ...
    };
  },
  ...
};
```

## License

[Apache-2.0](https://opensource.org/licenses/Apache-2.0)
