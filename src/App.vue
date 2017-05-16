<template>
	<div>
        <HeaderView></HeaderView>
		<router-view></router-view>
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
    }
}
</script>

<style>
    .ivu-form-inline{
        margin: 100px auto;
    }
</style>
