<template>
    <div id="member">
        <Input id="search" v-model="searchParam">
            <Select v-model="searchItem" slot="prepend" style="width: 80px">
                <Option value="name">姓名</Option>
                <Option value="phone">联系方式</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="searchMembers"></Button>
            <Button slot="append" icon="refresh" @click="refreshMembers"></Button>
        </Input>
        
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
                searchParam: '',
                searchItem: 'phone',
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
                    memberId: '',
                    name: '',
                    idcard: '',
                    phone: '',
                },
                // formNewMember: {
                //     memberId: '99999',
                //     name: 'HHH',
                //     idcard: '330802198002024404',
                //     phone: '12345678900',
                // },
                ruleNewMember: {
                    memberId: [
                        { required: true, message: '请填写会员卡号', trigger: 'bulr'}
                    ],
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    idcard: [
                        { required: true, len: 18, message: '请填写18位身份证号', trigger: 'blur' },
                        { type: 'regexp', pattern: /(\d{18})/, message: '身份证号码不正确', trigger: 'blur' }
                        //{ type: 'regexp', pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码不正确', trigger: 'blur' }
                    ],
                    phone:[
                        { required: true, len: 11, message: '请填写11位手机号', trigger: 'blur' },
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
                    this.errors.push(e)
                })
            },
            searchMembers() {
                if (this.searchParam == '') {
                    this.$Message.error('请输入查询内容!');
                    return;
                }
                var params = {};
                switch (this.searchItem) {
                    case 'name':
                        params.name = this.searchParam;
                        break;
                    case 'phone':
                        params.phone = this.searchParam;
                        break;
                    default:
                }
                console.log("SEARCH", params);
                HTTP.get(`members`, { params: params })
                // this.$http.get(`http://localhost:3000/members`)
                .then(res => {
                    console.log('FETCHED:', res.data);
                    this.members = res.data;
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            refreshMembers() {
                this.searchParam = '';
                this.getMembers();
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
            updateMember() {
                // var url = `members/${this.formNewMember._id}`; 
                // console.log(url, this.formNewMember);
                HTTP.put(`members/${this.formNewMember._id}`, this.formNewMember)
                .then(res => {
                    var member = res.data;
                    console.log("UPDATED:", member);
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

<style>
    #search {
        /*display: block;*/
        right: 0px;
        width: 300px;
        margin: 10px;
    }

</style>
