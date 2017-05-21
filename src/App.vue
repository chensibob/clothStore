<template>
	<div id="root">
        <HeaderView></HeaderView>
		<router-view class="router"></router-view>
        <FooterView></FooterView>
	</div>
</template>

<script>
import HeaderView from './components/header.vue'
import FooterView from './components/footer.vue'

export default {
    data() {
        return {

        }
    },
    components: {
        HeaderView,
        FooterView
    },
    // created() {
    //     this.checkLogin();
    // },
    // methods: {
    //     checkLogin() {
    //         if(!sessionStorage.get('token')){
    //             this.$router.push('/login');
    //         } else {
    //             this.$router.push('/')
    //         }
    //     }
    // }
}
</script>

<style>
    #root {
        max-width: 1400px;
        margin: 0 auto;
    }
    /*#root .ivu-table-wrapper{
        max-width: 1000px;
        margin: 0 auto;
    }*/
    /*.router{
        max-width: 1200px;
        margin: 0 auto;
    }*/
    .ivu-form-inline{
        margin: 100px auto;
    }
</style>
