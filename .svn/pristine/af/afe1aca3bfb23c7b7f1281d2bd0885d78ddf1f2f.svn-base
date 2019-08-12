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
                    <Button @click="showExportModal = true">导出</Button>
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
                ref="systemCodeTable" 
                border 
                show-header
                :stripe="showStripe" 
                :height="fixedHeader ? 250 : ''" 
                :data="systemCodes" 
                :columns="systemCodeColumns"
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

            <edit-modal 
                v-if="showEditModal" 
                :show-edit-modal="showEditModal" 
                :system-code="systemCode"
                :model-title="modelTitle"
                @clickedhidemodal="hideEditModal"></edit-modal>

            <detail-modal 
                v-if="showDetailModal" 
                :show-detail-modal="showDetailModal" 
                :system-code="systemCode"
                @clickedhidemodal="showDetailModal = false"></detail-modal>

            <export-modal 
                v-if="showExportModal" 
                :show-export-modal="showExportModal" 
                :system-code-columns="systemCodeColumns"
                @clickedhidemodal="showExportModal = false"></export-modal>


        </div>
    </Card>
</template>
<script>
    import { queryForPage, saveItem, updateItem, deleteItems, exportExcel, exportPdf } from './systemcode'
    import { forEach, getAssign } from '@/libs/tools'
    import {formatterEditMode} from '@/libs/formatter'
    import { constants } from 'crypto'
    const ExportModal = () => import('./ExportModal.vue')
    const DetailModal = () => import('./DetailModal.vue')
    const EditModal = () => import('./EditModal.vue')
    export default {
        components: {
            ExportModal,
            DetailModal,
            EditModal
        },
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
                showDetailModal: false,
                showEditModal: false,
                showExportModal: false,
                loading: false,
                systemCode: {
                }                
            }
        },
        computed: {
            systemCodeColumns () {
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
                                        this.showDetail(params.index)
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
            hideEditModal () {
                this.showEditModal = false;
                this.pageChange(1)
            },
            // 打开详情弹窗
            showDetail (index) { 
                this.showDetailModal = true;
                this.systemCode = JSON.parse(JSON.stringify(this.systemCodes[index]));
                this.systemCode.editmode = formatterEditMode(this.systemCode.editmode) 
            },
            remove () {
                let removeids = [];
                forEach(this.$refs.systemCodeTable.getSelection(), (item, index) => {
                    removeids.push(item.codeid);
                })
                if (removeids.length) {
                    this.$Modal.confirm({
                        title: '删除确认',
                        content: '是否确定',
                        onOk: () => {
                            deleteItems(removeids.join(',')).then(rs => {
                                console.log(rs, 'delete')
                                this.$Message.success('删除成功!');
                                pageChange(1)
                            })
                        },
                        onCancel: () => {
                            this.$Message.info('取消删除');
                        }
                    });
                } else {
                    this.$Modal.info({
                        title: "删除",
                        content: "请选择要删除的条目！"
                    });
                }
            },
            edit (index) {
                this.showEditModal = true;
                if (index !== undefined) {
                    this.modelTitle = '编辑';
                    // 类似angular.copy()深复制
                    this.systemCode = JSON.parse(JSON.stringify(this.systemCodes[index]));
                } else {
                    this.modelTitle = '新增';
                    this.systemCode = {};
                }             
            },
            pageChange (page) {
                this.currentPage = page
                const params = getAssign(this.searchCondition, {page: page, rows: this.rows})
                queryForPage(params).then(res => {
                    console.log(res, 111)
                    this.total = res.data.total
                    this.systemCodes = res.data.rows
                })
            },
            refresh () {
                this.searchCondition = {}
                this.pageChange(1)
            },
            onPageSizeChange (pageSize) {
                this.rows = pageSize
                this.pageChange(1);
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





