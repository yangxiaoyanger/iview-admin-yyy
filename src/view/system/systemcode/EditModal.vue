<template>
    <div>
        <Modal 
            v-model="currentShowEditModal"  
            scrollable 
            :loading="loading"
            width="60"
            @on-cancel="hideModal">
            <p slot="header">
                <span>{{modelTitle}}-全局代码</span>
            </p>
            <Form ref="systemCodeForEdit" :model="currentSystemCode" :rules="ruleValidate" :label-width="120" inline>
                <FormItem label="代码属性" prop="field">
                    <Input v-model="currentSystemCode.field" placeholder="请输入代码属性"></Input>
                </FormItem>
                <FormItem label="代码属性名称" prop="fieldname">
                    <Input v-model="currentSystemCode.fieldname" placeholder="请输入代码属性名称"></Input>
                </FormItem>
                <FormItem label="代码值" prop="code">
                    <Input v-model="currentSystemCode.code" placeholder="请输入代码值"></Input>
                </FormItem>
                <FormItem label="代码描述" prop="codedesc">
                    <Input v-model="currentSystemCode.codedesc" placeholder="请输入代码描述"></Input>
                </FormItem>
                <FormItem label="可编辑" prop="editmode">
                    <Select v-model="currentSystemCode.editmode" placeholder="请选择">
                        <Option value="1">是</Option>
                        <Option value="0">否</Option>
                    </Select>
                </FormItem>
                <FormItem label="排序" prop="sortno">
                    <Input v-model="currentSystemCode.sortno" placeholder="请输入排序序号"></Input>
                </FormItem>
                <FormItem label="备注" prop="remark" style="width: 100%;">
                    <Input v-model="currentSystemCode.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit">保存</Button>
                <Button type="warning" @click="handleReset" style="margin-left: 8px">重置</Button>
                <Button @click="hideModal">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { saveItem, updateItem } from './systemcode'
export default {
    props: ['showEditModal', 'systemCode', 'modelTitle'],
    data() {
        return {
            loading: false,
            currentShowEditModal: this.showEditModal,
            currentSystemCode: this.systemCode,
            ruleValidate: {
                fieldname: [
                    { required: true, message: '属性名称不能为空', trigger: 'blur' }
                ],
                codedesc: [
                    // { type: 'string', min: 20, message: '不能少于20个字', trigger: 'blur' }
                ]
            }
        }
    },
    computed: {
    },
    watch: {
        showEditModal (newV, oldV) {
            this.currentShowEditModal = newV
        },
        currentSystemCode (newV, oldV) {
            this.currentSystemCode = newV
        }
    },
    methods: {
        hideModal() {
            this.$emit("clickedhidemodal", false);
        },
        handleSubmit () {
            this.loading = true
            this.$refs['systemCodeForEdit'].validate((valid) => {
                if (valid) {
                    if (this.modelTitle == '新增') {
                        saveItem(this.currentSystemCode).then(res => {
                            this.loading = false
                            this.$Message.success('添加成功!');
                            this.$emit("clickedhidemodal", false)
                        })
                    } else {
                        updateItem(this.currentSystemCode).then(res => {
                            this.loading = false
                            this.$Message.success('修改成功!');
                            this.$emit("clickedhidemodal", false)
                        })
                    }
                    
                } else {
                    this.$Message.error('请注意格式!');
                }
            })
        },
        handleReset () {
            // this.currentSystemCode = {};
        },
    }
}
</script>
