// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    // eslint-disable-next-line no-undef
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;// eslint-disable-line camelcase
}
import Vue from 'vue';
import store from './store';
import router from './router';
import i18n from './lang';
import view from './views/index.vue';
import Tips from './ui-frame/ui-tips';
import './ui-frame';
import './assets';

Vue.config.productionTip = false;
Vue.config.performance = true;
Vue.config.errorHandler = async (error: Error /*, vm, info*/) => {
    Tips.error(`${error}`);
};
Vue.config.warnHandler = (msg: string /*, vm, trace*/) => {
    console.error(msg); /* eslint-disable-line no-console */
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
let instance = null;

const render = (props?: { container: HTMLElement }) => {
    console.log('will render a');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!instance) {
        console.log('a render props', props);
        instance = new Vue({
            router,
            store,
            i18n,
            render: h => h(view),
            created() {
                console.log('a created');
            }
        }).$mount(props?.container ? props?.container.querySelector('#appA') || '#appA' : '#appA');
        console.log('render a completed');
    }
};

// if (process?.env?.NODE_ENV === 'development') {
//     render();
// }
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
    render();
}

export async function bootstrap(): Promise<void> {
    console.log('a', 'bootstrap');
}

export async function mount(props: { container: HTMLElement }): Promise<void> {
    console.log('a', 'mount');
    render(props);
}

export async function unmount(): Promise<void> {
    console.log('a', 'unmount');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    instance.$destroy();
    instance = null;
}

export async function update(): Promise<void> {
    //
}
