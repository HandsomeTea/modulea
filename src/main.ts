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

let instance: null | Vue = null;

// eslint-disable-next-line no-unused-vars
const render = (props?: { container: HTMLElement, name: string, onGlobalStateChange: (callback: (state: Record<string, unknown>) => void) => void, setGlobalState: (state: Record<string, unknown>) => void }) => {
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
            // watch: {
            //     noticeMasterParams() {
            //         console.log(this.noticeMasterParams);
            //         console.log(props?.setGlobalState);
            //         // props?.setGlobalState({ action: this.noticeMasterParams });
            //     }
            // }
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
export async function mount(props: { container: HTMLElement, name: string, onGlobalStateChange: (callback: (state: Record<string, unknown>) => void) => void, setGlobalState: (state: Record<string, unknown>) => void }): Promise<void> {
    render(props);
    // development模式下props未传递
    if (process?.env?.NODE_ENV === 'development') {
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
}

export async function unmount(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    instance.$destroy();
    instance = null;
    // eslint-disable-next-line no-console
    console.log('module a 卸载');
}

export async function update(): Promise<void> {
    //
}
