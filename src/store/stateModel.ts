export type ModuleOperateType = '' | 'return';

export interface RootState {
    loginStatus: boolean
    language: string
    menuHidden: boolean
    screenType: 'phone' | 'ipad' | 'spc' | 'pc' | '',
    moduleOperate: ModuleOperateType;
}

export interface UserState {
    username: string
}

export interface toogleSideAction {
    (): never
}

export interface setLanguageAction {
    (language: 'zh' | 'en'): never // eslint-disable-line no-unused-vars
}

export interface NoticeModuleOperateAction {
    (action: ModuleOperateType): never // eslint-disable-line no-unused-vars
}
