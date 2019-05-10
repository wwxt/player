<template>
  <div class="main">
  <!--二级路由-->
			<router-view></router-view>
	<van-tabbar v-model="active" active-color="#409EFF">
  <van-tabbar-item icon="home-o" @click="goThb({name:'Index'})" >每日精选</van-tabbar-item>
  <van-tabbar-item icon="bulb-o" @click="goThb({name:'Discover'})" >发现</van-tabbar-item>
  <van-tabbar-item icon="contact" @click="goThb({name:'My'})">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
	
	import { Tabbar, TabbarItem } from 'vant';
	export default {
  name: 'Main',
  components:{
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem,
  },
  data(){
		return{
			active:0,
		}
  },
  methods:{
		goThb(path){
			this.$router.push(path)
		}
	}
}
</script>


<style scoped>

</style>
