<template>
    <Card shadow>
        <div>
            <div style="margin: 10px">
                <div class="page-title">
                    全局代码
                </div>
                <div class="button-group pull-right">
                    <Button type="info">新增</Button>
                    <Button type="warning">搜索</Button>
                    <Button type="primary">刷新</Button>
                    <Button type="error">删除</Button>
                    <Button>导出</Button>
                </div>
                <div class="clear-fix"></div>
            </div>
            <Table border :stripe="showStripe" show-header :height="fixedHeader ? 250 : ''" :data="systemCodes" :columns="tableColumns3"></Table>
            <Page :total="100" show-sizer show-elevator show-total :styles="pageStyle" :current="currentPage" @on-change="pageChange"/>

            <Modal v-model="editModel" draggable scrollable width="80">
                <p slot="header">
                    <span>编辑-全局代码</span>
                </p>
                <Form ref="systemCode" :model="systemCode" :rules="ruleValidate" :label-width="120" inline>
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
                    <Button type="primary" @click="handleSubmit('systemCode')">确定</Button>
                    <Button @click="handleReset('systemCode')" style="margin-left: 8px">重置</Button>
                </div>
            </Modal>

            <Modal v-model="detailModel" draggable scrollable width="80">
                <p slot="header">
                    <span>详情-全局代码</span>
                </p>
                <Form ref="systemCode" :model="systemCode"  :label-width="120" inline class="detail-form">
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
    </Card>
</template>
<script>
    import { queryForPage } from '@/api/system/systemcode'
    import {formatterEditMode} from '@/libs/formatter'
    export default {
        data () {
            return {
                systemCodes: [],
                rows: 10,
                totle: 0,
                currentPage: 1,
                showStripe: false,
                showIndex: false,
                showCheckbox: false,
                fixedHeader: false,
                pageStyle: {
                  marginTop: '20px'
                },
                detailModel: false,
                editModel: false,
                systemCode: {
                    // name: '',
                    // mail: '',
                    // city: '',
                    // gender: '',
                    // interest: [],
                    // date: '',
                    // time: '',
                    // desc: ''
                },
                ruleValidate: {
                    name: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Mailbox cannot be empty', trigger: 'blur' },
                        { type: 'email', message: 'Incorrect email format', trigger: 'blur' }
                    ],
                    city: [
                        { required: true, message: 'Please select the city', trigger: 'change' }
                    ],
                    gender: [
                        { required: true, message: 'Please select gender', trigger: 'change' }
                    ],
                    interest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                        { type: 'array', max: 2, message: 'Choose two hobbies at best', trigger: 'change' }
                    ],
                    date: [
                        { required: true, type: 'date', message: 'Please select the date', trigger: 'change' }
                    ],
                    time: [
                        { required: true, type: 'string', message: 'Please select time', trigger: 'change' }
                    ],
                    desc: [
                        { required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
                        { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ]
                }
            }
        },
        computed: {
            tableColumns3 () {
                let columns = [];
                if (this.showCheckbox) {
                    columns.push({
                        type: 'selection',
                        width: 60,
                        align: 'center'
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
                    sortable: true,
                    fixed: 'left'
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
            remove (index) {
                this.systemCodes.splice(index, 1);
            },
            edit (index) {
              this.editModel = true;
              this.systemCode = JSON.parse(JSON.stringify(this.systemCodes[index]));
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            pageChange (page) {
                console.log(page)
                this.currentPage = page
                queryForPage({
                    page: page, 
                    rows: this.rows
                }).then(res => {
                    console.log(res, 111)
                    this.totle = res.data.total
                    this.systemCodes = res.data.rows
                })
            }
        },
        mounted() {
            queryForPage({
                page: this.currentPage, 
                rows: this.rows
            }).then(res => {
                console.log(res, 8888)
                this.totle = res.data.total
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





