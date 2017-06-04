<template>
    <div id="header">
        <Menu id="nav" mode="horizontal" :theme="light" active-name="1" @on-select="onSelect">
            <Menu-item name="member">
                <Icon type="ios-people"></Icon>
                会员信息
            </Menu-item>

            <Menu-item name="spot">
                <Icon type="ios-cart"></Icon>
                门店现货
            </Menu-item>

            <Menu-item name="soldNote">
                <Icon type="ios-list"></Icon>
                销售记录
            </Menu-item>

            <Menu-item name="fundBalance">
                <Icon type="social-yen"></Icon>
                资金余额
            </Menu-item>

<!--             <Menu-item name="5">
                <Icon type="ios-download"></Icon>
                入库记录
            </Menu-item> -->

            <Menu-item name="stock">
                <Icon type="ios-home"></Icon>
                库存管理
            </Menu-item>

<!--             <Menu-item name="7">
                <Icon type="ios-upload"></Icon>
                出库记录
            </Menu-item> -->

            <Menu-item name="admin">
                <Icon type="person-stalker"></Icon>
                管理员信息
            </Menu-item>

            <Menu-item name="login" v-if="!this.login">
                <Icon type="log-in"></Icon>
                登录
            </Menu-item>

            <Menu-item name="logout" v-if="this.login">
                <Icon type="log-out"></Icon>
                {{this.user}},退出
            </Menu-item>   
        </Menu>
        <div class="sticky"></div>
    </div>
</template>

<script>
    import {HTTP} from '../http-common';
    import bus from '../assets/eventBus';

	export default {
        data() {
            return {
                login: this.$parent.login,
                user: this.$parent.user
            }
        },
        created() {
            this.loadStatus();
        },
        // updated() {
        //     this.loadStatus();
        // },
        mounted() {
            bus.$on('loginEvent', this.loadStatus);
        },
        methods: {
            loadStatus() {
                console.log('LOGSTATUS', this.login, this.user);
                var token = sessionStorage.getItem('token');
                var user = sessionStorage.getItem('username');
                if (token && user ) {
                    this.login = true;
                    this.user = user;
                }
                console.log('LOGSTATUS', this.login, this.user);
            },
            logout() {
                HTTP.get(`user/logout`)
                .then(res => {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('username');
                    this.login = false;
                    this.user = null;
                    console.log('Logout!');
                    this.$router.push('/');
                })
                .catch(e => {
                    this.$Message.error('注销失败!');
                    this.errors.push(e)
                })
            },
            onSelect(name) {
                console.log(name);
                switch(name) {
                    case 'member':
                    case 'spot':
                    case 'soldNote':
                    case 'fundBalance':
                    case 'stock':
                    case 'admin':
                    case 'login':
                        this.$router.push(name);
                        break;
                    case 'logout':
                        this.logout();
                        break;
                    default:
                }
            }
        },
        events: {
            'login-broadcast': function() {
                this.loadStatus();
            }
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
        /*border:1px solid #cccccc;*/
        width:10%;  
        text-align: center;
    }
</style>
