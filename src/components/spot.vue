<template>
    <div>
        <Table :columns="columns" :data="goods"></Table>
        <Form ref="formNewGood" :model="formNewGood" :label-width="80" :rules="ruleNewGood" inline>
            <Form-item label="名称" prop="name">
                <Input v-model="formNewGood.name" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="种类" prop="type">
                <Input v-model="formNewGood.type" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="尺码" prop="size">
                <Input v-model="formNewGood.size" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="颜色" prop="color">
                <Input v-model="formNewGood.color" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="面料" prop="material">
                <Input v-model="formNewGood.material" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="数量" prop="amount">
                <Input v-model="formNewGood.amount" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="售价" prop="soldPrice">
                <Input v-model="formNewGood.soldPrice" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="出厂日期" prop="birthday">
                <Input v-model="formNewGood.birthday" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="生产厂家" prop="manufacturer">
                <Input v-model="formNewGood.manufacturer" placeholder="请输入"></Input>
            </Form-item>


            <Form-item>
                <Button type="primary" @click="handleSubmit('formNewGood')" >提交</Button>
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
                        title:'名称',
                        key:"name"
                    },
                    {
                        title:'种类',
                        key:"type"
                    },
                    {
                        title:'尺码',
                        key:"size"
                    },
                    {
                        title:'颜色',
                        key:"color"
                    },
                    {
                        title:'面料',
                        key:"material"
                    },
                    {
                        title:'数量',
                        key:"amount"
                    },
                    {
                        title:'售价',
                        key:"soldPrice"
                    },
                    {
                        title:'出厂日期',
                        key:"birthday"
                    },
                    {
                        title:'生产厂家',
                        key:"manufacturer"
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
                                            this.delGood(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                goods:[
                    {id:1, name:'乐町', type:'长裙', size:'M', color:'blue', material:'棉', amount:'10', soldPrice:'199', birthday:'2017-4', manufacturer:'宁波乐町时尚服饰有限公司'},
                    {id:2, name:'乐町', type:'短裙', size:'S', color:'black', material:'棉', amount:'12', soldPrice:'159', birthday:'2017-4', manufacturer:'宁波乐町时尚服饰有限公司'},
                ],
                formNewGood:{
                    id:0,
                    name:'',
                    type:'',
                    size:'',
                    color:'',
                    material:'',      
                    amount:'',
                    soldPrice:'',
                    birthday:'',
                    manufacturer:''
                },
                ruleNewGood: {
                    name: [
                        { required: true, message: '请填写商品名称', trigger: 'blur' }
                    ],
                    type: [
                        { required: true, message: '请填写商品种类', trigger: 'blur' }
                    ],
                    size: [
                        { required: true, message: '请填写商品尺码', trigger: 'blur' }
                    ],
                    color: [
                        { required: true, message: '请填写商品颜色', trigger: 'blur' }
                    ],
                    material: [
                        { required: true, message: '请填写商品面料', trigger: 'blur' }
                    ],
                    amount: [
                        { required: true, message: '请填写商品数量', trigger: 'blur' }
                    ],
                    soldPrice: [
                        { required: true, message: '请填写商品售价', trigger: 'blur' }
                    ],
                    birthday: [
                        { required: true, message: '请填写商品出厂日期', trigger: 'blur' }
                    ],
                    manufacturer: [
                        { required: true, message: '请填写商品生产厂家', trigger: 'blur' }
                    ],
                    
                }
            }
        },
        methods:{
            delGood(idx){
                this.goods.splice(idx, 1);
            },
            addGood(){
                var maxId = 0;
                for(var i=0; i<this.goods.length; i++){
                    if(maxId<this.goods[i].id){
                        maxId = this.goods[i].id;
                    }
                }
                this.formNewGood.id = maxId+1;
                this.goods.push(this.formNewGood);
                this.formNewGood = {};
            },
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('提交成功!');
                        this.addGood();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            }
        }
    }
</script>
