<template>
    <div>
        <Table :columns="columns" :data="admin"></Table>
        <Form ref="formNewAdmin" :model="formNewAdmin" :label-width="80" :rules="ruleNewAdmin" inline>
            <Form-item label="姓名" prop="name">
                <Input v-model="formNewAdmin.name" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="联系方式" prop="tel">
                <Input v-model="formNewAdmin.tel" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="帐号" prop="account">
                <Input v-model="formNewAdmin.account" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="密码" prop="password">
                <Input v-model="formNewAdmin.password" placeholder="请输入"></Input>
            </Form-item>

            <Form-item>
                <Button type="primary" @click="handleSubmit('formNewAdmin')" >提交</Button>
                <Button type="ghost" style="margin-left: 8px">取消</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                columns:[
                    {
                        title:'编号',
                        key:"id"
                    },
                    {
                        title:'姓名',
                        key:"name"
                    },
                    {
                        title:'联系方式',
                        key:"tel"
                    },
                    {
                        title:'帐号',
                        key:"account"
                    },
                    {
                        title:'密码',
                        key:"password"
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                /*h('Button', {
                                    props: {
                                        type: 'primary',
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
                                }, '查看'),*/
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delAdmin(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                admins:[
                    {id:1, name:'老马', tel:'13812345678', account:'aaa', password:'123'},
                    {id:2, name:'小牛', tel:'13987654321', account:'bbb', password:'456'},
                ],
                formNewAdmin:{
                    id:0,
                    name:'',
                    tel:'',
                    account:'',
                    password:''
                },
                ruleNewAdmin: {
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    tel:[
                        { required: true, message: '请填写联系方式', trigger: 'blur' },
                        //{ type: 'regexp', pattern: /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/, message: '格式不正确', trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: '请填写帐号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请填写密码', trigger: 'blur' }
                    ],
                }
            }
        },
        methods:{
            delAdmin(idx){
                this.admins.splice(idx, 1);
            },
            addAdmin(){
                var maxId = 0;
                for(var i=0; i<this.admins.length; i++){
                    if(maxId<this.admins[i].id){
                        maxId = this.admins[i].id;
                    }
                }
                this.formNewAdmin.id = maxId+1;
                this.admins.push(this.formNewAdmin);
                this.formNewAdmin = {};
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.addAdmin();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
