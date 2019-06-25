<template>
  <div>
    <div style="margin: 10px">
        Display border <i-switch v-model="showBorder" style="margin-right: 5px"></i-switch>
        Display stripe <i-switch v-model="showStripe" style="margin-right: 5px"></i-switch>
        Display index <i-switch v-model="showIndex" style="margin-right: 5px"></i-switch>
        Display multi choice <i-switch v-model="showCheckbox" style="margin-right: 5px"></i-switch>
        Display header <i-switch v-model="showHeader" style="margin-right: 5px"></i-switch>
        Table scrolling <i-switch v-model="fixedHeader" style="margin-right: 5px"></i-switch>
        <br>
        <br>
        Table size
        <Radio-group v-model="tableSize" type="button">
            <Radio label="large">large</Radio>
            <Radio label="default">medium(default)</Radio>
            <Radio label="small">small</Radio>
        </Radio-group>
    </div>
    <Table :border="showBorder" :stripe="showStripe" :show-header="showHeader" 
    :height="fixedHeader ? 250 : ''" :size="tableSize" :data="tableData3" :columns="tableColumns3"></Table>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                tableData3: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    },
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        date: '2016-10-03'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park',
                        date: '2016-10-01'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        date: '2016-10-02'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        date: '2016-10-04'
                    }
                ],
                showBorder: false,
                showStripe: false,
                showHeader: true,
                showIndex: true,
                showCheckbox: false,
                fixedHeader: false,
                tableSize: 'default'
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
                    title: 'Date',
                    key: 'date',
                    sortable: true,
                    fixed: 'left'
                });
                columns.push({
                    title: 'Name',
                    key: 'name'
                });
                columns.push({
                    title: 'Age',
                    key: 'age',
                    sortable: true,
                    filters: [
                        {
                            label: 'Greater than 25',
                            value: 1
                        },
                        {
                            label: 'Less than 25',
                            value: 2
                        }
                    ],
                    filterMultiple: false,
                    filterMethod (value, row) {
                        if (value === 1) {
                            return row.age > 25;
                        } else if (value === 2) {
                            return row.age < 25;
                        }
                    }
                });
                columns.push({
                    title: 'Address',
                    key: 'address',
                    filters: [
                        {
                            label: 'New York',
                            value: 'New York'
                        },
                        {
                            label: 'London',
                            value: 'London'
                        },
                        {
                            label: 'Sydney',
                            value: 'Sydney'
                        }
                    ],
                    filterMethod (value, row) {
                        return row.address.indexOf(value) > -1;
                    }
                });
                columns.push({
                    title: 'Action',
                    key: 'action',
                    width: 350,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'info',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.show(params.index)
                                    }
                                }
                            }, '详情'),
                            h('Button', {
                                props: {
                                    type: 'error',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.remove(params.index)
                                    }
                                }
                            }, '删除'),
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.edit(params.index)
                                    }
                                }
                            }, '编辑')
                        ]);
                    }
                });
                return columns;
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.tableData3[index].name}<br>Age：${this.tableData3[index].age}<br>Address：${this.tableData3[index].address}`
                })
            },
            remove (index) {
                this.tableData3.splice(index, 1);
            },
            edit (index) {
              this.$Modal.confirm({
                    title: 'Title',
                    content: '<p>Content of dialog</p><p>Content of dialog</p>',
                    onOk: () => {
                        this.$Message.info('Clicked ok');
                    },
                    onCancel: () => {
                        this.$Message.info('Clicked cancel');
                    }
                });
            }
        }
    }
</script>




