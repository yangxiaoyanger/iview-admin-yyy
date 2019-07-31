<template>
    <Card shadow>
        <div>
            <div>
                <div class="page-title">
                    全局代码
                </div>
                <div class="table-button-group pull-right">
                    <Button type="warning" @click="openSearchBlock = !openSearchBlock">搜索</Button>
                    <Button type="info" @click="edit()">新增</Button>
                    <Button type="primary" @click="refresh()">刷新</Button>
                    <Button type="error" @click="remove()">删除</Button>
                    <Button @click="exportList()">导出</Button>
                </div>
                <div class="clear-fix"></div>
                <div v-show="openSearchBlock" class="search-block">
                    <div class="search-block-item">
                        <label for="" >代码属性</label>
                        <Input clearable placeholder="输入关键字搜索" class="search-input" style="width: auto" v-model="searchCondition.field"/>
                    </div>
                    <div class="search-block-item">
                        <label for="" >代码属性名称</label>
                        <Input clearable placeholder="输入关键字搜索" class="search-input" style="width: auto" v-model="searchCondition.fieldname"/>
                    </div>
                    <div class="search-block-footer">
                        <Button type="primary" @click="pageChange(1)">查询</Button>
                        <Button type="warning" @click="searchCondition = {}">重置</Button>
                        <Button @click="openSearchBlock = false">取消</Button>
                    </div>
                </div>
            </div>
            <Table 
                ref="systemCodeTable" border 
                :stripe="showStripe" show-header 
                :height="fixedHeader ? 250 : ''" 
                :data="systemCodes" 
                :columns="tableColumns3"
            >
            </Table>
            <Page 
                :total=total 
                show-sizer 
                show-elevator 
                show-total 
                :styles="pageStyle" 
                :current="currentPage" 
                :page-size="rows"
                @on-change="pageChange"
                @on-page-size-change="onPageSizeChange"
            />

            <Modal v-model="editModel"  scrollable width="80">
                <p slot="header">
                    <span>{{modelTitle}}-全局代码</span>
                </p>
                <Form ref="systemCodeForEdit" :model="systemCode" :rules="ruleValidate" :label-width="120" inline>
                    <FormItem label="代码属性" prop="field">
                        <Input v-model="systemCode.field" placeholder="请输入代码属性"></Input>
                    </FormItem>
                    <FormItem label="代码属性名称" prop="fieldname">
                        <Input v-model="systemCode.fieldname" placeholder="请输入代码属性名称"></Input>
                    </FormItem>
                    <FormItem label="代码值" prop="code">
                        <Input v-model="systemCode.code" placeholder="请输入代码值"></Input>
                    </FormItem>
                    <FormItem label="代码描述" prop="codedesc">
                        <Input v-model="systemCode.codedesc" placeholder="请输入代码描述"></Input>
                    </FormItem>
                    <FormItem label="可编辑" prop="editmode">
                        <Select v-model="systemCode.editmode" placeholder="请选择">
                            <Option value="1">是</Option>
                            <Option value="0">否</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="排序" prop="sortno">
                        <Input v-model="systemCode.sortno" placeholder="请输入排序序号"></Input>
                    </FormItem>
                    <FormItem label="备注" prop="remark" style="width: 100%;">
                        <Input v-model="systemCode.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
                    </FormItem>
                </Form>
                <div slot="footer">
                    <Button type="primary" @click="handleSubmit('systemCodeForEdit')">确定</Button>
                    <Button @click="handleReset('systemCodeForEdit')" style="margin-left: 8px">重置</Button>
                </div>
            </Modal>
            
            <Modal v-model="detailModel" scrollable width="80">
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


            <Modal v-model="exportModel"  scrollable width="80">
                <p slot="header">
                    <span>导出-全局代码</span>
                </p>
                <Form ref="systemCodeForExport" :label-width="120" inline class="detail-form">
                    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <Checkbox
                            :indeterminate="indeterminate"
                            :value="checkAll"
                            
                            @click.prevent.native="handleCheckAll">全选</Checkbox>
                    </div>
                    <CheckboxGroup ref="checkboxGroup" v-model="checkAllGroup" @on-change="checkAllGroupChange">
                         <Checkbox :label="colum.key" v-for="(colum, index) in tableColumns3" :key="index" :show="colum.key">
                            <span>{{colum.title}}</span>
                        </Checkbox>
                    </CheckboxGroup>
                </Form>
                <form ref="exportHiddenForm" target="_blank" style="visibility:hidden;" method="POST" action="">
                    <input type="hidden" name="allColValues" id="allColValues" value="" />
                    <input type="hidden" name="allColNames" id="allColNames" value="" />
                </form>
            </Modal>
        </div>
    </Card>
</template>
<script>
    import { queryForPage, saveItem, updateItem, deleteItems, exportExcel, exportPdf } from '@/api/system/systemcode'
    import { forEach, getAssign } from '@/libs/tools'
    import {formatterEditMode} from '@/libs/formatter'
import { constants } from 'crypto';
    export default {
        data () {
            return {
                systemCodes: [],
                searchCondition: {},
                modelTitle: '新增',
                rows: 10,
                total: 0,
                currentPage: 1,
                openSearchBlock: false,
                showStripe: false,
                showIndex: false,
                showCheckbox: true,
                fixedHeader: false,
                pageStyle: {
                  marginTop: '20px'
                },
                detailModel: false,
                editModel: false,
                exportModel: false,
                systemCode: {
                },
                ruleValidate: {
                    fieldname: [
                        { required: true, message: '属性名称不能为空', trigger: 'blur' }
                    ],
                    codedesc: [
                        { type: 'string', min: 20, message: '不能少于20个字', trigger: 'blur' }
                    ]
                },
                indeterminate: false,
                checkAll: false,
                checkAllGroup: []
            }
        },
        computed: {
            tableColumns3 () {
                let columns = [];
                if (this.showCheckbox) {
                    columns.push({
                        type: 'selection',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    })
                }
                if (this.showIndex) {
                    columns.push({
                        type: 'index',
                        width: 60,
                        align: 'center'
                    })
                }
                columns.push({
                    title: '代码属性',
                    key: 'field',
                    sortable: true                    
                });
                columns.push({
                    title: '代码属性名称',
                    key: 'fieldname'
                });
                columns.push({
                    title: '代码值',
                    key: 'code',
                    sortable: true
                    // render: (h, params) => {
                    //     return h('div', [
                    //         h('input', {

                    //         })
                    //     ]);
                    // }
                });
                columns.push({
                    title: '代码描述',
                    key: 'codedesc',
                });
                columns.push({
                    title: '可编辑',
                    key: 'editmode',
                    render: (h, params) => {
                        let value = formatterEditMode(params.row.editmode)
                        return h('div', value);
                    }
                });
                columns.push({
                    title: '排序',
                    key: 'sortno'
                });
                columns.push({
                    title: '备注',
                    key: 'remark'
                });
                columns.push({
                    title: '操作',
                    key: 'action',
                    width: 350,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'success',
                                    size: 'small',
                                    icon: 'md-create'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.index)
                                    }
                                }
                            }, '编辑'),
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small',
                                    icon: 'md-eye'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '详情')
                            
                        ]);
                    }
                });
                return columns;
            }
        },
        methods: {
            show (index) {
                this.detailModel = true;
                this.systemCode = JSON.parse(JSON.stringify(this.systemCodes[index]));
                this.systemCode.editmode = formatterEditMode(this.systemCode.editmode) 
            },
            remove () {
                let removeids = [];
                forEach(this.$refs.systemCodeTable.getSelection(), (item, index) => {
                    removeids.push(item.codeid);
                })
                if (removeids.length) {
                    deleteItems(removeids.join(',')).then(rs => {
                        console.log(rs, 'delete')
                        this.$Message.success('删除成功!');
                        pageChange(1)
                    })
                } else {

                }
            },
            edit (index) {
                console.log(index, 'edit')
                this.editModel = true;
                if (index !== undefined) {
                    this.modelTitle = '编辑';
                    this.systemCode = JSON.parse(JSON.stringify(this.systemCodes[index]));
                }              
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        console.log(valid, this.systemCode ,99999)
                        if (this.modelTitle == '新增') {
                            saveItem(this.systemCode).then(res => {
                                console.log(res, 'saveItem')
                                this.$Message.success('添加成功!');
                                this.editModel = false;
                                this.pageChange(1);
                            })
                        } else {
                            updateItem(this.systemCode).then(res => {
                                console.log(res, 'updateItem')
                                this.$Message.success('修改成功!');
                                this.editModel = false;
                                this.pageChange(1);
                            })
                        }
                        
                    } else {
                        this.$Message.error('请注意格式!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            pageChange (page) {
                console.log(page)
                this.currentPage = page
                const params = getAssign(this.searchCondition, {page: page, rows: this.rows})
                queryForPage(params).then(res => {
                    console.log(res, 111)
                    this.total = res.data.total
                    this.systemCodes = res.data.rows
                })
            },
            refresh () {
                this.pageChange(1)
            },
            onPageSizeChange () {
                console.log(this)
            },
            exportList () {
                this.exportModel = true

            },
            handleCheckAll () {
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                    this.checkAllGroup = [];
                } else {
                    this.checkAllGroup = [];
                }
            },
            checkAllGroupChange (data) {
                console.log(this.checkAllGroup, 777777)
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
            }
        },
        mounted() {
            queryForPage({
                page: this.currentPage, 
                rows: this.rows
            }).then(res => {
                console.log(res, 8888)
                this.total = res.data.total
                this.systemCodes = res.data.rows
            })
        }
    }
</script>
<style>
  .ivu-form-inline .ivu-form-item {
    width: 50%;
    margin-right: 0;
  }
  .ivu-modal-footer {
    text-align: center
  }
  .detail-form .ivu-form-item {
    margin-bottom: 5px;
    margin-left: 15%;
    width: 35%;
  }
</style>





