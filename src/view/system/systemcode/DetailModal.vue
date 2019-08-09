<template>
    <div>
        <Modal v-model="currentShowDetailModal" scrollable width="60"  @on-ok="hideModal" @on-cancel="hideModal">
            <p slot="header">
                <span>详情-全局代码</span>
            </p>
            <Form ref="systemCodeForDetail" :model="systemCode"  :label-width="120" inline class="detail-form">
                <FormItem label="代码属性" prop="field">
                    {{systemCode.field}}
                </FormItem>
                <FormItem label="代码属性名称" prop="fieldname">
                    {{systemCode.fieldname}}
                </FormItem>
                <FormItem label="代码值" prop="code">
                    {{systemCode.code}}
                </FormItem>
                <FormItem label="代码描述" prop="fieldname">
                    {{systemCode.fieldname}}
                </FormItem>
                <FormItem label="可编辑" prop="editmode">
                    {{systemCode.editmode}}
                </FormItem>
                <FormItem label="排序" prop="sortno">
                    {{systemCode.sortno}}
                </FormItem>
                <FormItem label="备注" prop="remark" style="width: 100%;">
                    {{systemCode.remark}}
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
export default {
    props: ['showDetailModal', 'systemCode'],
    data() {
        return {
            currentShowDetailModal: this.showDetailModal
        }
    },
    watch: {
        showDetailModal (newV, oldV) {
            this.currentShowDetailModal = newV
        }
    },
    computed: {
    },
    methods: {
        hideModal() {
            this.$emit("clickedhidemodal", false);
        },
    }
}
</script>
