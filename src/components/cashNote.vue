<template>
	<div>
        <Table :columns="columns" :data="cashNotes"></Table>
        <!-- <Form ref="formNewFundBalance" :model="formNewFundBalance" :label-width="80" :rules="ruleNewFundBalance" inline>
            <Form-item label="收银" prop="cash">
                <Input v-model="formNewFundBalance.income" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="找零" prop="change">
                <Input v-model="formNewFundBalance.change" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="进账" prop="income">
                <Input v-model="formNewFundBalance.fundBalance" placeholder="请输入"></Input>
            </Form-item>

            <Form-item label="日期" prop="date">
                <Input v-model="formNewFundBalance.date" placeholder="请输入"></Input>
            </Form-item>

            <Form-item>
                <Button type="primary" @click="handleSubmit('formNewFundBalance')" >提交</Button>
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
                    // {
                    //     title:'编号',
                    //     key:"id"
                    // },
                    {
                        title:'收银',
                        key: "cash"
                    },
                    {
                        title:'找零',
                        key:"change"
                    },
                    {
                        title:'进账',
                        key:"income"
                    },
                    {
                        title:'日期',
                        key:"date"
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
                    //                         this.delFundBalance(params.index)
                    //                     }
                    //                 }
                    //             }, '删除')
                    //         ]);
                    //     }
                    // }
                ],
                cashNotes: []
                // fundBalances:[
                //     {id:1, income:'1000', change:'20', fundBalance:'980', date:'2017-5-14'},
                //     {id:2, income:'2000', change:'40', fundBalance:'1960', date:'2017-5-15'},
                // ],
                // formNewFundBalance:{
                //     id:0,
                //     income:'',
                //     change:'',
                //     fundBalance:'',
                //     date:'',
                // },
                // ruleNewFundBalance: {
                //     income: [
                //         { required: true, message: '请填写收入', trigger: 'blur' }
                //     ],
                //     change: [
                //         { required: true, message: '请填写找零', trigger: 'blur' }
                //     ],
                //     fundBalance: [
                //         { required: true, message: '请填写资金余额', trigger: 'blur' }
                //     ],
                //     date: [
                //         { required: true, message: '请填写日期', trigger: 'blur' }
                //     ],
                // }
            }
        },
        created() {
            this.getCashNote();
        },
        methods:{
            getCashNote() {
                HTTP.get(`cashnotes`)
                .then(res => {
                    this.cashNotes = res.data;
                    console.log('FETCHED:', this.cashNotes);
                })
                .catch(e => {
                    this.errors.push(e)
                })
            }
        }
        // methods: {
        //     delFundBalance(idx){
        //         this.fundBalances.splice(idx, 1);
        //     },
        //     addFundBalance(){
        //         var maxId = 0;
        //         for(var i=0; i<this.fundBalances.length; i++){
        //             if(maxId<this.fundBalances[i].id){
        //                 maxId = this.fundBalances[i].id;
        //             }
        //         }
        //         this.formNewFundBalance.id = maxId+1;
        //         this.fundBalances.push(this.formNewFundBalance);
        //         this.formNewFundBalance = {};
        //     },
        //     handleSubmit(name) {
        //         this.$refs[name].validate((valid) => {
        //             if (valid) {
        //                 this.$Message.success('提交成功!');
        //                 this.addFundBalance();
        //             } else {
        //                 this.$Message.error('表单验证失败!');
        //             }
        //         })
        //     }
        // }
    }
</script>
