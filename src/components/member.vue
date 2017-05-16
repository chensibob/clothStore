<template>
	<div>
        <Table :columns="columns" :data="members"></Table>
        <Form ref="formNewMember" :model="formNewMember" :label-width="80" :rules="ruleNewMember" inline>
            <Form-item label="姓名" prop="name">
                <Input v-model="formNewMember.name" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="身份证号" prop="idNumber">
                <Input v-model="formNewMember.idNumber" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="联系方式" prop="tel">
                <Input v-model="formNewMember.tel" placeholder="请输入"></Input>
            </Form-item>

            <Form-item>
                <Button type="primary" @click="handleSubmit('formNewMember')" >提交</Button>
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
                        title:'身份证号',
                        key:"idNumber"
                    },
                    {
                        title:'联系方式',
                        key:"tel"
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
                                            this.delMember(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                members:[
                    {id:1, name:'张三', idNumber:'330802198001014404', tel:'13812345678'},
                    {id:2, name:'李四', idNumber:'330802198002024404', tel:'13987654321'},
                    {id:3, name:'5', idNumber:'330802198001014404', tel:'13812345678'},
                    {id:4, name:'6', idNumber:'330802198002024404', tel:'13987654321'},
                    {id:5, name:'7', idNumber:'330802198001014404', tel:'13812345678'},
                    {id:6, name:'8', idNumber:'330802198002024404', tel:'13987654321'},
                    {id:7, name:'9', idNumber:'330802198001014404', tel:'13812345678'},
                    {id:8, name:'10', idNumber:'330802198002024404', tel:'13987654321'},
                    {id:9, name:'11', idNumber:'330802198001014404', tel:'13812345678'},
                    {id:10, name:'12', idNumber:'330802198002024404', tel:'13987654321'},
                ],
                formNewMember:{
                    id:0,
                    name:'',
                    idNumber:'',
                    tel:'',
                },
                ruleNewMember: {
                    name: [
                        { required: true, message: '请填写姓名', trigger: 'blur' }
                    ],
                    idNumber: [
                        { required: true, message: '请填写身份证号', trigger: 'blur' },

                        { type: 'regexp', pattern: /(\d{18})/, message: '身份证号码不正确', trigger: 'blur' }

                        //{ type: 'regexp', pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证号码不正确', trigger: 'blur' }
                    ],
                    tel:[
                        { required: true, message: '请填写联系方式', trigger: 'blur' },
                        //{ type: 'regexp', pattern: /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/, message: '格式不正确', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            delMember(idx){
                this.members.splice(idx, 1);
            },
            addMember(){
                var maxId = 0;
                for(var i=0; i<this.members.length; i++){
                    if(maxId<this.members[i].id){
                        maxId = this.members[i].id;
                    }
                }
                this.formNewMember.id = maxId+1;
                this.members.push(this.formNewMember);
                this.formNewMember = {};
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.addMember();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
