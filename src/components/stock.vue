<template>
    <div>
        <Table :columns="columns" :data="goods"></Table>
        <Form ref="formNewGood" :model="formNewGood" :label-width="80" :rules="ruleNewGood" inline>
            <Form-item label="商品编号" prop="goodId">
                <Input v-model="formNewGood.goodId" placeholder="请输入"></Input>
            </Form-item>

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

            <Form-item label="数量" prop="stockQuantity">
                <Input v-model="formNewGood.stockQuantity" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="进价" prop="purchasePrice">
                <Input v-model="formNewGood.purchasePrice" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="出厂日期" prop="manufactureDate">
                <Input v-model="formNewGood.manufactureDate" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="生产厂家" prop="manufacturer">
                <Input v-model="formNewGood.manufacturer" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="进货日期" prop="purchaseDate">
                <Input v-model="formNewGood.instockDate" placeholder="请输入"></Input>
            </Form-item>

            <Form-item>
                <Button type="primary" @click="handleSubmit('formNewGood')" >提交</Button>
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
                        title:'编号',
                        key:"goodId"
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
                        key:"stockQuantity"
                    },
                    {
                        title:'进价',
                        key:"purchasePrice"
                    },
                    {
                        title:'出厂日期',
                        key:"manufactureDate"
                    },
                    {
                        title:'生产厂家',
                        key:"manufacturer"
                    },
                    {
                        title:'进货日期',
                        key:"instockDate"
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
                goods: [],
                // formNewGood: {
                //     goodId: '',
                //     name: '',
                //     type: '',
                //     size: '',
                //     color: '',
                //     material: '',
                //     stockQuantity: '',
                //     purchasePrice: '',
                //     manufactureDate: '',
                //     manufacturer: '',
                //     instockDate: ''
                // },
                formNewGood: {
                    goodId: '3',
                    name: '乐町',
                    type: '长裙',
                    size: 'M',
                    color: 'blue',
                    material: '棉',
                    stockQuantity: 10,
                    purchasePrice: 60,
                    manufactureDate: '2017-04-21',
                    manufacturer: '宁波乐町时尚服饰有限公司',
                    instockDate: '2017-05-20'
                },
                ruleNewGood: {
                    goodId: [
                        { required: true, message: '请填写商品编号', trigger: 'blur' }
                    ],
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
                    stockQuantity: [
                        // { required: true, message: '请填写商品数量', trigger: 'blur' },
                        // { type: "number", min: 1, message: '数量至少为1', trigger: 'blur' }
                    ],
                    purchasePrice: [
                        // { required: true, message: '请填写商品进价', trigger: 'blur' },
                        // { type: "float", min: 0.01, message: '价格至少为0.01', trigger: 'blur' }
                    ],
                    manufactureDate: [
                        { required: true, message: '请填写商品出厂日期', trigger: 'blur' }
                    ],
                    manufacturer: [
                        { required: true, message: '请填写商品生产厂家', trigger: 'blur' }
                    ],
                    instockDate: [
                        { required: true, message: '请填写商品进货日期', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            this.getGoods();
        },
        methods:{
            getGoods() {
                HTTP.get(`stockitems`)
                .then(res => {
                    // console.log('FETCHED:', res.data);
                    this.goods = res.data;
                    console.log('FETCHED:', this.goods);
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            addGood(){
                // console.log('POSTING:', this.formNewGood);
                HTTP.post(`stockitems`, this.formNewGood)
                .then(res => {
                    var good = res.data;
                    console.log("POSTED:", good);
                    this.goods.push(good);
                    this.formNewGood = {};
                })
                .catch(e => {
                    this.errors.push(e)
                })
            },
            delGood(idx){
                HTTP.delete('stockitems/' + this.goods[idx]._id)
                .then(res => {
                    this.goods.splice(idx, 1);
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
                        this.addGood();
                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            clear() {
                this.formNewGood = {};
            }
        }
    }
</script>
