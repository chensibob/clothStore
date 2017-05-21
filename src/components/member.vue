<template>
	<div>
        <Table :columns="columns" :data="members"></Table>
        <Form ref="formNewMember" :model="formNewMember" :label-width="80" :rules="ruleNewMember" inline>
            <Form-item label="会员号" prop="memberId">
                <Input v-model="formNewMember.memberId" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="姓名" prop="name">
                <Input v-model="formNewMember.name" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="身份证号" prop="idcard">
                <Input v-model="formNewMember.idcard" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="联系方式" prop="phone">
                <Input v-model="formNewMember.phone" placeholder="请输入"></Input>
            </Form-item>

            <Form-item>
                <Button type="primary" @click="handleSubmit('formNewMember')" >提交</Button>
                <Button type="ghost" @click="clear()" style="margin-left: 8px">取消</Button>
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
                    {
                        title:'会员号',
                        key:"memberId"
                    },
                    {
                        title:'姓名',
                        key:"name"
                    },
                    {
                        title:'身份证号',
                        key:"idcard"
                    },
                    {
                        title:'联系方式',
                        key:"phone"
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
                                            this.editMember(params.index)
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
                                            this.delMember(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                members: [],
                formNewMember: {
                    memberId: '99999',
                    name: 'HHH',
                    idcard: '330802198002024404',
                    phone: '12345678900',
                },
                ruleNewMember: {
                    memberId: [
                        { required: true, message: '请填写会员卡号', trigger: 'bulr'}
                    ],
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    idcard: [
                        { required: true, message: '请填写身份证号', trigger: 'blur' },
                        { type: 'regexp', pattern: /(\d{18})/, message: '身份证号码不正确', trigger: 'blur' }
                        //{ type: 'regexp', pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码不正确', trigger: 'blur' }
                    ],
                    phone:[
                        { required: true, message: '请填写联系方式', trigger: 'blur' },
                        //{ type: 'regexp', pattern: /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/, message: '格式不正确', trigger: 'blur' }
                    ]
                },
                editing: false
            }
        },
        created() {
            this.getMembers();
        },
        methods: {
            getMembers() {
                HTTP.get(`members`)
                // this.$http.get(`http://localhost:3000/members`)
                .then(res => {
                    console.log('FETCHED:', res.data);
                    this.members = res.data;
                })
                .catch(e => {
                    console.log('LOGFAILED:');
                    this.errors.push(e)
                })
            },
            addMember() {
                console.log('POSTING:', this.formNewMember);
                HTTP.post(`members`, this.formNewMember)
                .then(res => {
                    var member = res.data
                    console.log("POSTED:", member)
                    if (!this.editing) {
                        this.members.push(member)
                    }
                    this.formNewMember = {}
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            updateMember() {
                var url = `members/${this.formNewMember._id}`; 
                console.log(url, this.formNewMember);
                HTTP.put(`members/${this.formNewMember._id}`, this.formNewMember)
                .then(res => {
                    var member = res.data
                    console.log("UPDATED:", member)
                    if (!this.editing) {
                        this.members.push(member)
                    }
                    this.formNewMember = {}
                    this.editing = false;
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            editMember(idx) {
                this.formNewMember = this.members[idx];
                // console.log('EDITING:', this.formNewMember);
                this.editing = true;
            },
            delMember(idx) {
                HTTP.delete('members/' + this.members[idx]._id)
                .then(res => {
                    this.members.splice(idx, 1);
                    console.log('DELETED:', res);
                })
                .catch(e => {
                    this.errors.push(e);
                })
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        if (this.editing) {
                            this.updateMember();
                        } else {
                            this.addMember();                        
                        }
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            clear() {
                this.editing = false;
                this.formNewMember = {};
            }
        }
    }
</script>
