<template>
	 <div id="members">
        <table>
            <tr>
                <th>会员编号</th>
                <th>会员姓名</th>
                <th>身份证号</th>
                <th>联系方式</th>
                <th>操作</th>
            </tr>
            <tr v-for="(member,index) in members">
                <td>{{member.id}}</td>
                <td>{{member.name}}</td>
                <td>{{member.idNumber}}</td>
                <td>{{member.tel}}</td>
                <td>
                    <button @click="delMember(index)">删除</button>
                </td>
            </tr>
        </table>

        <fieldset>
            <legend>添加会员</legend>
            <p>会员姓名：<input type="text" v-model="newMember.name"></p>
            <p>身份证号：<input type="text" v-model="newMember.idNumber"></p>
            <p>联系方式：<input type="text" v-model="newMember.tel"></p>
            <p><button @click="addMember">添加</button></p>
        </fieldset>
    </div>
</template>

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

<script>
    export default {
        data() {
            return {
                members:[
                    {id:1, name:'张三', idNumber:'330802198001014404', tel:'13812345678'},
                    {id:2, name:'李四', idNumber:'330802198002024404', tel:'13987654321'},
                ],
                newMember:{
                    id:0,
                    name:'',
                    idNumber:'',
                    tel:'',
                }
            }
        },
        methods:{
            delMember:function(idx){
                this.members.splice(idx, 1);
            },
            addMember:function(){
                var maxId = 0;
                for(var i=0; i<this.members.length; i++){
                    if(maxId<this.members[i].id){
                        maxId = this.members[i].id;
                    }
                }
                this.newMember.id = maxId+1;
                this.members.push(this.newMember);
                this.newMember = {};
            }
        }
    }
</script>
