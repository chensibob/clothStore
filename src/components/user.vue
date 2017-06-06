<template>
    <div>
        <Table :columns="columns" :data="users"></Table>
        <Form ref="formEditUser" :model="formEditUser" :label-width="80" :rules="ruleEditUser" inline v-if="editing">
            <Form-item label="姓名" prop="name">
                <Input v-model="formEditUser.name" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="联系方式" prop="phone">
                <Input v-model="formEditUser.phone" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="角色" prop="role">
                <Select v-model="formEditUser.role" style="width:100px">
                    <Option value="intern">intern</Option>
                    <Option value="memberAdmin">memberAdmin</Option>
                    <Option value="spotAdmin">spotAdmin</Option>
                    <Option value="stockAdmin">stockAdmin</Option>
                </Select>
            </Form-item>

            <Form-item>
                <Button type="primary" @click="handleSubmit('formEditUser')" >提交</Button>
                <Button type="ghost" @clikc="clear()" style="margin-left: 8px">取消</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
    import {HTTP} from '../http-common';

    export default {
        data() {
            return {
                columns:[
                    // {
                    //     title:'编号',
                    //     key:"id"
                    // },
                    {
                        title:'姓名',
                        key:"name"
                    },
                    {
                        title:'联系方式',
                        key:"phone"
                    },
                    {
                        title:'用户名',
                        key:"username"
                    },
                    {
                        title:'角色',
                        key:"role"
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.editUser(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delUser(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                users: [],
                formEditUser: {},
                ruleEditUser: {
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    phone:[
                        { required: true, len: 11, message: '请填写11位手机号', trigger: 'blur' },
                    ]
                },
                editing: false
            }
        },
        created() {
            console.log("HELLO!!!")
            this.getUsers();
        },
        methods:{
            getUsers() {
                console.log("FETCHING users")
                HTTP.get(`users`)
                .then(res => {
                    console.log('FETCHED USERS:', res.data);
                    this.users = res.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            delUser(idx){
                HTTP.delete('users/' + this.users[idx]._id)
                .then(res => {
                    this.users.splice(idx, 1);
                    console.log('DELETED:', res);
                })
                .catch(e => {
                    this.errors.push(e);
                })
            },
            updateUser() {
                HTTP.put(`users/${this.formEditUser._id}`, this.formEditUser)
                .then(res => {
                    var user = res.data;
                    console.log("UPDATED:", user);
                    if (!this.editing) {
                        this.users.push(user)
                    }
                    this.formEditUser = {}
                    this.editing = false;
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            editUser(idx) {
                this.formEditUser = this.users[idx];
                // console.log('EDITING:', this.formEditUser);
                this.editing = true;
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.updateUser();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            clear() {
                console.log('CANCELLED');
                this.editing = false;
                this.formEditUser = {};
            }
        }
    }
</script>
