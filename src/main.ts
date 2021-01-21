if (window.__POWERED_BY_QIANKUN__) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;// eslint-disable-line
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

interface QiankunProps {
    container: HTMLElement
    // eslint-disable-next-line no-unused-vars
    onGlobalStateChange: (callback: (state: Record<string, unknown>) => void) => void
    // eslint-disable-next-line no-unused-vars
    setGlobalState: (state: Record<string, unknown>) => void
    platform: 'phone' | 'ipad' | 'spc' | 'pc'
    lang: 'zh-cn' | 'zh-tw' | 'en'
}

let instance: null | Vue = null;

// eslint-disable-next-line no-unused-vars
const render = (props?: QiankunProps) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    if (!instance) {
        instance = new Vue({
            router,
            store,
            i18n,
            render: h => h(view),
            computed: {
                noticeMasterParams() {
                    return store.state.moduleOperate;
                }
            }
        }).$mount(props?.container ? props?.container.querySelector('#appA') || '#appA' : '#appA');
    }
};

if (process?.env?.NODE_ENV === 'development') {
    render();
}

export async function bootstrap(): Promise<void> {
    //
}

// eslint-disable-next-line no-unused-vars
export async function mount(props: QiankunProps): Promise<void> {
    if (!props.platform) {
        return Tips.error('screen type is required.');
    }
    store.dispatch('setScreenType', props.platform);

    if (!props.lang) {
        return Tips.error('language type is required.');
    }
    store.dispatch('setLanguage', props.lang);

    render(props);

    instance?.$watch('noticeMasterParams', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line no-console
        console.log('module a 将通信抛出数据，通知主应用做返回操作', instance.noticeMasterParams);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        props.setGlobalState({ action: instance.noticeMasterParams });
    });
}

export async function unmount(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    instance.$destroy();
    instance = null;
    // eslint-disable-next-line no-console
    console.log('module a 卸载');
}
