<template>
    <div id="header">
        <Menu id="nav" mode="horizontal" :theme="light" active-name="1">
            <Menu-item name="1">
                <Icon type="ios-people"></Icon>
                <router-link to="/member">会员信息</router-link>
            </Menu-item>

            <Menu-item name="2">
                <Icon type="ios-list"></Icon>
                <router-link to="/soldNote">销售记录</router-link>
            </Menu-item>

            <Menu-item name="3">
                <Icon type="social-yen"></Icon>
                <router-link to="/fundBalance">资金余额</router-link>
            </Menu-item>

            <Menu-item name="4">
                <Icon type="ios-cart"></Icon>
                <router-link to="/spot">门店现货</router-link>
            </Menu-item>

<!--             <Menu-item name="5">
                <Icon type="ios-download"></Icon>
                <router-link to="/instock">入库记录</router-link>
            </Menu-item> -->

            <Menu-item name="6">
                <Icon type="ios-home"></Icon>
                <router-link to="/stock">库存管理</router-link>
            </Menu-item>

<!--             <Menu-item name="7">
                <Icon type="ios-upload"></Icon>
                <router-link to="/outstock">出库记录</router-link>
            </Menu-item> -->

            <Menu-item name="8">
                <Icon type="person-stalker"></Icon>
                <router-link to="/admin">管理员信息</router-link>
            </Menu-item>

            <Menu-item name="9">
                <Icon type="ios-locked-outline"></Icon>
                <router-link to="/login">登录</router-link>
            </Menu-item>
        </Menu>
        <div class="sticky"></div>
    </div>
</template>

<script>
    import Login from './login.vue'
	export default {
        data() {
            return {

            }
        },
        components: {
            Login
        }
    }
</script>

<style>
    #header .sticky{
        position:relative; 
        display:block; 
        height:60px;
        margin-bottom: 20px;
    }
    #nav{
        position: absolute;
        width: 100%;
    }
    #nav li{
        border:1px solid #cccccc;
        width:10%;  
        text-align: center;
    }
</style>
