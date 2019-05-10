<template>
	<div class="my">
		<div class="logo" >
				<img class="auto-img max" src="https://tvax3.sinaimg.cn/crop.113.119.796.796.180/0065kqVkly8fkjuxfjwshj30sg0sgtao.jpg"/>
		</div>
		<div class="my-p" @click="goLogin({name:'Login'})" v-show="isShow">
			<p>点击登录即可评论和发布视频</p>
		</div >
		<div class="my-p min" v-show="isHow">账号：&nbsp;{{historyarr.userId	}}
			<div class="my-i" @click="dle">退出登录<i class="el-icon-arrow-right"></i></div>
		</div>
		<el-row class="my-row"  ref="op" >
			<el-col :span="6" :offset="4">
				<div @click="goLove" ref="div">
					<van-icon name="like-o" />喜欢
				</div>
				
			</el-col>
			<el-col :span="2">|</el-col>
			<el-col :span="6" :offset="6">
				<i class="el-icon-download"></i>缓存
			</el-col>
		</el-row>
		<el-divider></el-divider>
		<div class="wrapper" id="wrapper" ref="wrappert">
			<div>
				<p @click="onCl">我的关注</p>
				<p>观看记录</p>
				<p>意见反馈</p>
				<p>通知开关</p>
				<p>给个好评</p>
				
				<span>Vershon 5.3.481</span>
			</div>
		</div>
		<div class="null"></div>
	</div>
	
		
</template>

<script>
	import { Icon } from 'vant';
	import BScroll from 'better-scroll'
	export default{
		name:"My",
		data(){
			return{
				historyarr:null,
				isShow:true,
				isHow:false,
				scroll:null,
			}
			
		},
		methods:{
			goLogin(path){
				this.$router.push(path)
			},
			goLove(){
				if(this.historyarr.loginStatus){
					return this.$router.push({name:'Love'})
				}else if(!this.historyarr.loginStatus){
					return this.$router.push({name:'Login'})
				}
			},
			dle(){
				localStorage.removeItem('userLogin');
				this.isShow=true;
				this.isHow=false
				
			},
			onCl(){
				if(this.historyarr.loginStatus){
					return this.$router.push({name:'Attention'})
				}else if(!this.historyarr.loginStatus){
					return this.$router.push({name:'Login'})
				}
			}
		},
		mounted () {
			this.scroll = new BScroll(this.$refs.wrappert,{
				click:true,
			})
		},
		components:{
			[Icon.name]:Icon,
		},
		created(){
		var userLogin=localStorage.getItem("userLogin");
		this.historyarr= userLogin == undefined ? [] : JSON.parse(userLogin);
			if(this.historyarr.loginStatus){
				this.isShow=false;
				this.isHow=true
			}else if(!this.historyarr.loginStatus){
				this.isShow=true;
				this.isHow=false
			}
			
		},
	}
</script>

<style scoped="scoped">
	.logo{
		border-break: 50%;
		width: 6.562rem;
		padding-left: 6.5rem;
		padding-top: 2.5rem;
	}
.max{
		border-radius: 50%;
	}
	.my-p{
		font-size: 0.781rem;
		padding-left: 5rem;
		padding-top: .5rem;
	}
	.my-row{
		padding-top: 2.2rem;
	}
	.van-icon-like-o{
		padding-right:0.412rem ;
	}
	.el-icon-download{
		padding-right:0.412rem ;
	}
	.el-col-2{
		padding-left: 1.481rem;
	}
	.min{
		padding-left: 6.687rem;
	}
	.my-i{
		padding-left: 0.8rem;
		padding-top: 0.6rem;
		color: blue;
	}
	.el-icon-arrow-right{
		padding-left: 0.5rem;
	}
	.wrapper{
		width: 100%;
		height: 242PX;
		overflow: hidden;
	}
	.wrapper div{
	margin: 0px auto;
	width: 80%;
	text-align: center;
	}
	.wrapper div p{
		margin: 3.8rem 0;
	}
	.wrapper div span{
		margin: 3.8rem 0;
		color:#909399 ;  
	}
	.null{
		padding-bottom: 3.5rem;
	}
</style>