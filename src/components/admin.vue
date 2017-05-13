<template>
	<div id="admins">
        <table>
            <tr>
                <th>管理员编号</th>
                <th>会员姓名</th>
                <th>联系方式</th>
                <th>帐号</th>
                <th>密码</th>
                <th>操作</th>
            </tr>
            <tr v-for="(admin,index) in admins">
                <td>{{admin.id}}</td>
                <td>{{admin.name}}</td>
                <td>{{admin.tel}}</td>
                <td>{{admin.account}}</td>
                <td>{{admin.password}}</td>
                <td>
                    <button @click="delAdmin(index)">删除</button>
                </td>
            </tr>
        </table>

        <fieldset>
            <legend>添加管理员</legend>
            <p><label>管理员姓名：</label><input type="text" v-model="newAdmin.name"></p>
            <p><label>联系方式：</label><input type="text" v-model="newAdmin.tel"></p>
            <p><label>帐号：</label><input type="text" v-model="newAdmin.account"></p>
            <p><label>密码：</label><input type="text" v-model="newAdmin.password"></p>
            <button @click="addMember">添加</button>
        </fieldset>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                admins:[
                    {id:1, name:'张三', tel:'13812345678', account:'', password:''},
                    {id:2, name:'李四', tel:'13987654321', account:'', password:''},
                ],
                newAdmin:{
                    id:0,
                    tel:'',
                    account:'',
                    password:'',
                }
            }
        },
        methods:{
            delAdmin:function(idx){
                this.admins.splice(idx, 1);
            },
            addAdmin:function(){
                var maxId = 0;
                for(var i=0; i<this.admins.length; i++){
                    if(maxId<this.admins[i].id){
                        maxId = this.admins[i].id;
                    }
                }
                this.newAdmin.id = maxId+1;
                this.admins.push(this.newAdmin);
                this.newAdmin = {};
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
        width: 300px;
        margin:0 auto;
        padding:25px;
    }
    fieldset p{
        line-height: 30px;
        text-align:right;
    }
    fieldset label{
        text-align: center;
        display:inline-block;
    }
</style>
