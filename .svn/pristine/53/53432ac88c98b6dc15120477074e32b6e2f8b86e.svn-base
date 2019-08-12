<template>
    <div>
        <Modal v-model="currentShowExportModal"  scrollable width="60" @on-cancel="hideModal">
            <p slot="header">
                <span>导出-全局代码</span>
            </p>
            <Form ref="systemCodeForExport" :label-width="120" inline class="detail-form">
                <div class="check-all-export">
                    <Checkbox
                        :indeterminate="indeterminate"
                        :value="checkAll"
                        @click.prevent.native="handleCheckAll">全选</Checkbox>
                </div>
                <CheckboxGroup ref="checkboxGroupForColums" v-model="checkedColums" @on-change="checkColumChange">
                        <Checkbox :label="index" v-for="(colum, index) in systemCodeColumns" :key="index" v-show="colum.key">
                        <span>{{colum.title}}</span>
                    </Checkbox>
                </CheckboxGroup>
            </Form>
            <form ref="exportHiddenForm" id="exportHiddenForm" target="_blank" style="visibility:hidden;" method="POST" action="">
                <input type="hidden" ref="allColValues" id="allColValues" name="allColValues" value="" />
                <input type="hidden" ref="allColNames" id="allColNames" name="allColValues" value="" />
            </form>
            <div slot="footer">
                <Button type="primary" @click="exportForPDF">导出PDF文件</Button>
                <Button type="warning" @click="exportForEXCEL" style="margin-left: 8px">导出Excel文件</Button>
                <Button @click="hideModal" style="margin-left: 8px">取消</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
import { forEach } from '@/libs/tools'
import { exportExcel, exportPdf } from './systemcode'
export default {
    props: ['showExportModal', 'systemCodeColumns'],
    data() {
        return {
            checkAll: false,
            indeterminate: false,
            checkedColums: [],
            currentShowExportModal: this.showExportModal,
        }
    },
    computed: {
    },
    watch: {
        showExportModal (newV, oldV) {
            this.currentShowExportModal = newV
        }
    },
    methods: {
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                forEach(this.systemCodeColumns, (item, index) => {
                    this.checkedColums.push(index);
                })
            } else {
                this.checkedColums = [];
            }
        },
        checkColumChange (data) {
            if (data.length === 3) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        },
        hideModal() {
            this.$emit("clickedhidemodal", false);
        },
        formexport(url) {
            let allColValueArr = '';
            let allColNameArr = '';
            for (var i = 0; i < this.checkedColums.length; i++) {
                if (this.systemCodeColumns[this.checkedColums[i]].key) {
                    allColValueArr += this.systemCodeColumns[this.checkedColums[i]].key + ','
                    allColNameArr += this.systemCodeColumns[this.checkedColums[i]].title + ','
                }
            }
            document.getElementById('exportHiddenForm').action = url;
            document.getElementById('allColNames').value = encodeURI(allColNameArr);
            document.getElementById('allColValues').value =  encodeURI(allColValueArr);
            document.getElementById('exportHiddenForm').submit();
        },
        exportForPDF () {
            this.formexport(exportPdf())
        },
        exportForEXCEL () {
            this.formexport(exportExcel())
        }
    }
}
</script>
