<template>
    <Card shadow>
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
            <Page :total="100" show-sizer show-elevator show-total :styles="pageStyle"/>

            <Modal v-model="editModel" draggable scrollable width="70">
            <p slot="header">
                    <span>编辑弹窗</span>
                </p>
                <Form ref="editFormValidate" :model="editFormValidate" :rules="ruleValidate" :label-width="80" inline>
                <FormItem label="Name" prop="name">
                    <Input v-model="editFormValidate.name" placeholder="Enter your name"></Input>
                </FormItem>
                <FormItem label="E-mail" prop="mail">
                    <Input v-model="editFormValidate.mail" placeholder="Enter your e-mail"></Input>
                </FormItem>
                <FormItem label="City" prop="city">
                    <Select v-model="editFormValidate.city" placeholder="Select your city">
                        <Option value="beijing">New York</Option>
                        <Option value="shanghai">London</Option>
                        <Option value="shenzhen">Sydney</Option>
                    </Select>
                </FormItem>
                <FormItem label="Date">
                    <Row>
                        <Col span="11">
                            <FormItem prop="date">
                                <DatePicker type="date" placeholder="Select date" v-model="editFormValidate.date"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col span="2" style="text-align: center">-</Col>
                        <Col span="11">
                            <FormItem prop="time">
                                <TimePicker type="time" placeholder="Select time" v-model="editFormValidate.time"></TimePicker>
                            </FormItem>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="Gender" prop="gender">
                    <RadioGroup v-model="editFormValidate.gender">
                        <Radio label="male">Male</Radio>
                        <Radio label="female">Female</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="Hobby" prop="interest">
                    <CheckboxGroup v-model="editFormValidate.interest">
                        <Checkbox label="Eat"></Checkbox>
                        <Checkbox label="Sleep"></Checkbox>
                        <Checkbox label="Run"></Checkbox>
                        <Checkbox label="Movie"></Checkbox>
                    </CheckboxGroup>
                </FormItem>
                <FormItem label="Desc" prop="desc" style="width: 100%;">
                    <Input v-model="editFormValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
                </FormItem>
                <!-- <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem> -->
            </Form>
            <div slot="footer">
                <Button type="primary" @click="handleSubmit('editFormValidate')">确定</Button>
                <Button @click="handleReset('editFormValidate')" style="margin-left: 8px">重置</Button>
            </div>
            </Modal>

            <Modal v-model="detailModel" draggable scrollable width="60">
                <p slot="header">
                    <span>详情弹窗</span>
                </p>
                <Form ref="detailFormValidate" :model="detailFormValidate"  :label-width="80" inline class="detail-form">
                    <FormItem label="Name" prop="name">
                        Enter your name
                    </FormItem>
                    <FormItem label="E-mail" prop="mail">
                        Enter your e-mail
                    </FormItem>
                    <FormItem label="City" prop="city">
                        Enter your e-mail
                    </FormItem>
                    <FormItem label="Date">
                        Enter your e-mail
                    </FormItem>
                    <FormItem label="Gender" prop="gender">
                        Gender
                    </FormItem>
                    <FormItem label="Hobby" prop="interest">
                        Gender
                    </FormItem>
                    <FormItem label="Desc" prop="desc">
                        Gender
                    </FormItem>
            </Form>
            <!-- <div slot="footer">
                <Button type="primary" @click="handleSubmit('formValidate')">确定</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </div> -->
            </Modal>
        </div>
    </Card>
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
                tableSize: 'default',
                pageStyle: {
                  marginTop: '20px'
                },
                detailModel: false,
                editModel: false,
                editFormValidate: {
                    name: '',
                    mail: '',
                    city: '',
                    gender: '',
                    interest: [],
                    date: '',
                    time: '',
                    desc: ''
                },
                detailFormValidate: {},
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
                this.detailModel = true;
            },
            remove (index) {
                this.tableData3.splice(index, 1);
            },
            edit (index) {
              this.editModel = true;
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
            }
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





