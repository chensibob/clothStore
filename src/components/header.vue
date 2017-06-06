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

            <Menu-item name="user">
                <Icon type="person-stalker"></Icon>
                用户信息
            </Menu-item> 
        </Menu>

        <Button type="default" class="log-button" @click="login" v-if="!loggedIn">
            <Icon type="log-in"></Icon>
            登录
        </Button> 

        <Button type="default" class="log-button" @click="logout" v-if="loggedIn">
            <Icon type="log-out"></Icon>
            {{user}},退出
        </Button>
        <div class="sticky"></div>
    </div>
</template>

<script>
    import {HTTP} from '../http-common';
    import bus from '../assets/eventBus';

	export default {
        data() {
            return {
                loggedIn: false,
                user: ''
            }
        },
        created() {
            this.loadStatus();
        },
        mounted() {
            bus.$on('loginEvent', this.loadStatus);             //监听登录事件，若事件触发则调用loadStatus方法
        },
        methods: {
            loadStatus() {
                console.log('LOGSTATUS', this.loggedIn, this.user);
                var token = sessionStorage.getItem('token');
                var user = sessionStorage.getItem('username');
                if (token && user) {
                    this.loggedIn = true;
                    this.user = user;
                }
                console.log('LOGSTATUS', this.loggedIn, this.user);
            },
            login(){
                this.$router.push('login');
            },
            logout() {
                HTTP.get(`user/logout`)
                .then(res => {
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('username');
                    this.loggedIn = false;
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
                    case 'user':
                        this.$router.push(name);
                        break;
                    default:
                }
            }
        }
        // ,
        // events: {
        //     'login-broadcast': function() {
        //         this.loadStatus();
        //     }
        // }
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
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 998;
    }
    #nav li{
        width:12%;
        text-align: center;
    }

    #header .log-button{
        position: fixed;
        top: 0;
        right: 0;
        min-width: 10%;
        height: 60px;
        z-index: 999;
    }
</style>
