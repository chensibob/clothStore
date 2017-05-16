<template>
    <Menu mode="horizontal" :theme="theme1" active-name="1">
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

        <Menu-item name="5">
            <Icon type="ios-download"></Icon>
            <router-link to="/instock">入库记录</router-link>
        </Menu-item>

        <Menu-item name="6">
            <Icon type="ios-home"></Icon>
            <router-link to="/stock">仓库存货</router-link>
        </Menu-item>

        <Menu-item name="7">
            <Icon type="ios-upload"></Icon>
            <router-link to="/outstock">出库记录</router-link>
        </Menu-item>

        <Menu-item name="8">
            <Icon type="person-stalker"></Icon>
            <router-link to="/admin">管理员信息</router-link>
        </Menu-item>
    </Menu>
</template>

<script>
	
</script>

<style>
    ul{
        width:1400px; 
    }
    li{
        border:1px solid #cccccc;
        width:171px;  
        text-align: center;
    }
</style>
