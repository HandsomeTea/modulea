<template>
    <el-main class="demo_style">
        modulea
        <button @click="test">点击向主应用发送{action:'return'}</button>
    </el-main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { NoticeModuleOperateAction } from '../store/stateModel';

@Component
export default class Hoom extends Vue {
    @Action('setModuleOperate') sendAction: NoticeModuleOperateAction;

    test(): void {
        this.sendAction('return');
    }
}
</script>
