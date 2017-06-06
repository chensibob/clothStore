<template>
    <div>
        <Table :columns="columns" :data="soldNotes"></Table>
        <!-- <Form ref="formNewSoldNote" :model="formNewSoldNote" :label-width="80" :rules="ruleNewSoldNote" inline>
            <Form-item label="商品编号" prop="goodId">
                <Input v-model="formNewSoldNote.goodId" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="商品名称" prop="name">
                <Input v-model="formNewSoldNote.name" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="种类" prop="type">
                <Input v-model="formNewSoldNote.type" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="数量" prop="quantity">
                <Input v-model="formNewSoldNote.quantity" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="优惠价格" prop="discount">
                <Input v-model="formNewSoldNote.discount" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="实际收银" prop="soldPrice">
                <Input v-model="formNewSoldNote.soldPrice" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="下单时间" prop="soldDate">
                <Input v-model="formNewSoldNote.soldDate" placeholder="请输入"></Input>
            </Form-item>

            <Form-item>
                <Button type="primary" @click="handleSubmit('formNewSoldNote')" >提交</Button>
                <Button type="ghost" style="margin-left: 8px">取消</Button>
            </Form-item>
        </Form> -->
    </div>
</template>

<script>
    import {HTTP} from '../http-common';

    export default {
        data() {
            return {
                columns:[
                    {
                        title:'商品编号',
                        key:"goodId"
                    },
                    {
                        title:'商品名称',
                        key:"name"
                    },
                    {
                        title:'种类',
                        key:"type"
                    },
                    {
                        title:'数量',
                        key:"quantity"
                    },
                    {
                        title:'单件优惠',
                        key:"discount"
                    },
                    {
                        title:'实际收银',
                        key:"soldPrice"
                    },
                    {
                        title:'下单时间',
                        key:"soldDate"
                    },
                    // {
                    //     title: '操作',
                    //     key: 'action',
                    //     width: 150,
                    //     align: 'center',
                    //     render: (h, params) => {
                    //         return h('div', [
                    //             h('Button', {
                    //                 props: {
                    //                     type: 'primary',
                    //                     size: 'small'
                    //                 },
                    //                 style: {
                    //                     marginRight: '5px'
                    //                 },
                    //                 on: {
                    //                     click: () => {
                    //                         this.show(params.index)
                    //                     }
                    //                 }
                    //             }, '查看'),
                    //             h('Button', {
                    //                 props: {
                    //                     type: 'error',
                    //                     size: 'small'
                    //                 },
                    //                 on: {
                    //                     click: () => {
                    //                         this.delSoldNote(params.index)
                    //                     }
                    //                 }
                    //             }, '删除')
                    //         ]);
                    //     }
                    // }
                ],
                soldNotes:[],
                // soldNotes:[
                //     {id:1, name:'乐町', type:'长裙', amount:'10', preferentialPrice:'19.9', cash:'179.1', 
                //     date:'2017.5.15'},
                //     {id:2, name:'乐町', type:'短裙', amount:'12', preferentialPrice:'15.9', cash:'143.1', 
                //     date:'2017.5.15'},
                // ],
                // formNewSoldNote:{
                //     id:0,
                //     name:'',
                //     type:'',
                //     amount:'',
                //     preferentialPrice:'',
                //     cash:'',
                // },
                // ruleNewSoldNote: {
                //     name: [
                //         { required: true, message: '请填写商品名称', trigger: 'blur' }
                //     ],
                //     type: [
                //         { required: true, message: '请填写商品种类', trigger: 'blur' },
                //     ],
                //     amount:[
                //         { required: true, message: '请填写商品数量', trigger: 'blur' },
                //     ],
                //     preferentialPrice:[
                //         { required: true, message: '请填写优惠价格', trigger: 'blur' },
                //     ],
                //     cash:[
                //         { required: true, message: '请填写实际收银', trigger: 'blur' },
                //     ],
                //     date:[
                //         { required: true, message: '请填写下单时间', trigger: 'blur' },
                //     ],
                // }
            }
        },
        created() {
            this.getSoldNote();
        },
        methods:{
            getSoldNote() {
                HTTP.get(`soldnotes`)
                .then(res => {
                    this.soldNotes = res.data;
                    console.log('FETCHED:', this.soldNotes);
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }
            // delSoldNote(idx){
            //     this.soldNotes.splice(idx, 1);
            // },
            // addSoldNote(){
            //     var maxId = 0;
            //     for(var i=0; i<this.soldNotes.length; i++){
            //         if(maxId<this.soldNotes[i].id){
            //             maxId = this.soldNotes[i].id;
            //         }
            //     }
            //     this.formNewSoldNote.id = maxId+1;
            //     this.soldNotes.push(this.formNewSoldNote);
            //     this.formNewSoldNote = {};
            // },
            // handleSubmit(name) {
            //     this.$refs[name].validate((valid) => {
            //         if (valid) {
            //             this.$Message.success('提交成功!');
            //             this.addSoldNote();
            //         } else {
            //             this.$Message.error('表单验证失败!');
            //         }
            //     })
            // }
        }
    }
</script>
