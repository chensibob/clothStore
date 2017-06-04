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

            <Form-item label="数量" prop="quantity">
                <Input v-model="formNewGood.quantity" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="售价" prop="sellingPrice">
                <Input v-model="formNewGood.sellingPrice" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="出厂日期" prop="manufactureDate">
                <Input v-model="formNewGood.manufactureDate" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="生产厂家" prop="manufacturer">
                <Input v-model="formNewGood.manufacturer" placeholder="请输入"></Input>
            </Form-item>


            <Form-item>
                <Button type="primary" @click="handleSubmit('formNewGood')" >上架</Button>
                <Button type="ghost" style="margin-left: 8px">取消</Button>
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
                        key:"quantity"
                    },
                    {
                        title:'售价',
                        key:"sellingPrice"
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
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.sellGood(params.index)
                                        }
                                    }
                                }, '售出'),
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
                goods:[],
                formNewGood:{
                    id: '',
                    name: '',
                    type: '',
                    size: '',
                    color: '',
                    material: '',      
                    quantity: '',
                    sellingPrice: '',
                    manufactureDate: '',
                    manufacturer: ''
                },
                // formNewGood:{
                //     goodId: 9,
                //     name: '绸袍',
                //     type: '睡衣',
                //     size: 'Z',
                //     color: '白',
                //     material: 'silk',      
                //     quantity: 100,
                //     sellingPrice: 999,
                //     manufactureDate:'2017-3-9',
                //     manufacturer:'春蚕'
                // },
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
                    quantity: [
                        // { required: true, message: '请填写商品数量', trigger: 'blur' }
                    ],
                    sellingPrice: [
                        // { required: true, message: '请填写商品售价', trigger: 'blur' }
                    ],
                    manufactureDate: [
                        { required: true, message: '请填写商品出厂日期', trigger: 'blur' }
                    ],
                    manufacturer: [
                        { required: true, message: '请填写商品生产厂家', trigger: 'blur' }
                    ],
                    
                }
            }
        },
        created() {
            this.getGoods();
        },
        methods:{
            getGoods() {
                HTTP.get(`spotitems`)
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
                // var maxId = 0;
                // for(var i=0; i<this.goods.length; i++){
                //     if(maxId<this.goods[i].id){
                //         maxId = this.goods[i].id;
                //     }
                // }
                // this.formNewGood.id = maxId+1;
                // this.goods.push(this.formNewGood);
                // this.formNewGood = {};

                HTTP.post(`spotitems`, this.formNewGood)
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
            sellGood(idx, num=1, discount=0) {
                var good = this.goods[idx];
                if (good.quantity >= num) {
                    good.quantity -= num;
                    HTTP.put(`spotitems/${good._id}`, good)
                    .then(res => {
                        var good = res.data;
                        console.log("UPDATED:", good);
                        var soldNote = {
                            goodId: good.goodId,
                            name: good.name,
                            type: good.type,
                            quantity: num,
                            discount: discount,
                            soldPrice: good.sellingPrice - discount,
                            soldDate: new Date()
                        }
                        this.noteSell(soldNote);
                    })
                    .catch(e => {
                        this.errors.push(e)
                    })
                }
            },
            delGood(idx){
                HTTP.delete('spotitems/' + this.goods[idx]._id)
                .then(res => {
                    this.goods.splice(idx, 1);
                    console.log('DELETED:', res);
                })
                .catch(e => {
                    this.errors.push(e);
                })
            },
            noteSell(note) {
                // console.log('NOTE:', note);
                HTTP.post(`soldnotes`, note)
                .then(res => {
                    var note = res.data;
                    // console.log("NOTE POSTED:", note);
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
            }
        }
    }
</script>
