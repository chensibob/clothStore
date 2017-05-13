<template>
	<div id="goods">
        <table>
            <tr>
                <th>商品编号</th>
                <th>商品名称</th>
                <th>商品种类</th>
                <th>商品尺码</th>
                <th>商品颜色</th>
                <th>商品面料</th>
                <th>商品数量</th>
                <th>商品进价</th>
                <th>出厂日期</th>
                <th>生产厂家</th>
                <th>操作</th>
            </tr>
            <tr v-for="(good,index) in goods">
                <td>{{good.id}}</td>
                <td>{{good.name}}</td>
                <td>{{good.type}}</td>
                <td>{{good.size}}</td>
                <td>{{good.color}}</td>
                <td>{{good.material}}</td>
                <td>{{good.amount}}</td>
                <td>{{good.buyingPrice}}</td>
                <td>{{good.birthday}}</td>
                <td>{{good.manufacturer}}</td>
                <td>
                    <button @click="delGood(index)">删除</button>
                </td>
            </tr>
        </table>

        <fieldset>
            <legend>添加商品</legend>
            <p>商品名称：<input type="text" v-model="newGood.name"></p>
            <p>商品种类：<input type="text" v-model="newGood.type"></p>
            <p>商品尺码：<input type="text" v-model="newGood.size"></p>
            <p>商品颜色：<input type="text" v-model="newGood.color"></p>
            <p>商品面料：<input type="text" v-model="newGood.material"></p>
            <p>商品数量：<input type="text" v-model="newGood.amount"></p>
            <p>商品进价：<input type="text" v-model="newGood.buyingPrice"></p>
            <p>出厂日期：<input type="text" v-model="newGood.birthday"></p>
            <p>生产厂家：<input type="text" v-model="newGood.manufacturer"></p>
            <p><button @click="addGood">添加</button></p>
        </fieldset>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                goods:[
                    {id:1, name:'乐町', type:'长裙', size:'M', color:'blue', material:'棉', amount:'10', buyingPrice:'199', birthday:'2017-4', manufacturer:'宁波乐町时尚服饰有限公司'},
                    {id:2, name:'乐町', type:'短裙', size:'S', color:'black', material:'棉', amount:'12', buyingPrice:'159', birthday:'2017-4', manufacturer:'宁波乐町时尚服饰有限公司'},
                ],
                newGood:{
                    id:0,
                    name:'',
                    type:'',
                    size:'',
                    color:'',
                    material:'',      
                    amount:'',
                    buyingPrice:'',
                    birthday:'',
                    manufacturer:''
                }
            }
        },
        methods:{
            delGood:function(idx){
                this.goods.splice(idx, 1);
            },
            addGood:function(){
                var maxId = 0;
                for(var i=0; i<this.goods.length; i++){
                    if(maxId<this.goods[i].id){
                        maxId = this.goods[i].id;
                    }
                }
                this.newGood.id = maxId+1;
                this.goods.push(this.newGood);
                this.newGood = {};
            }
        }
    }
</script>

<style>
    /**{margin:0;padding:0}*/
    table,td{
        border:1px solid #cccccc;
        border-collapse:collapse;
    }
    table{
        width: 1000px;
        margin:20px auto;
    }
    tr{
        line-height: 30px;
    }
    td{
        text-align: center;
    }
    button{
        width: 40px;
        height: 25px;
        border: 1px solid orange;
    }
    fieldset{
        width: 280px;
        margin:0 auto;
        padding:25px;
    }
    fieldset p{
        line-height: 30px;
    }
</style>
