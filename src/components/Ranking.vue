<template>
	<div class="ranking">
		<van-nav-bar :title="titl" left-text="返回" left-arrow  @click-left="onClickLeft">
			<van-icon name="search" slot="right"   @click.native="goDatails({name:'Search'})"/>
</van-nav-bar>

		<van-row v-for="(item,index) in itemList" :key="index" @click.native="goDatails({name:'Rankingdata',params:{pid:itemList[index].data.id,are:indexo}})" >
			<van-col span="22" offset="1">
				<div  class= "bj box" :style="{backgroundImage:'url('+ itemList[index].data.cover.feed +')'}">
				</div>
				
				<van-col span="22" offset="1">
				<div class="inco box" >
							<img class="auto-img inco-bj" :src="itemList[index].data.author.icon"/>
		
				</div>
				<div class="tile"><p class="title">{{itemList[index].data.title}}</p>
					<span class='name'>{{itemList[index].data.author.name}}  &nbsp;/ &nbsp;#{{itemList[index].data.category}}</span>
				</div>	
				</van-col>
				
			</van-col>
		<van-col span="1"></van-col>
		</van-row>
		<div class="null"></div>
	</div>
</template>

<script>
	
	import { Row, Col,NavBar,Icon } from 'vant';
	export default{
		name:'Ranking',
			data(){
				return {
					itemList:[],
					titl:"日排行",
					indexo:null,
				}
			},
		components:{
			[ Row.name]: Row,
			[ Col.name]: Col,
			[ NavBar.name]: NavBar,
			[ Icon.name]: Icon,
		},
		created(){
			var arrHis=JSON.parse(localStorage.getItem("arrHot1"));
			var i=this.$route.params.pid
			this.indexo=this.$route.params.pid
			this.itemList=arrHis[i].itemList
			if (i==1) {
				this.titl="日搜索排行"
			}else if(i==0){
				this.titl="周搜索排行"
			}else if(i==2){
				this.titl="月搜索排行"
			}
		},
		methods:{
			goDatails(path){
				this.$router.push(path)
			},
			onClickLeft(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped="scoped">
	.h3{
		margin-left: 5.468rem;
		margin-bottom: 0.468rem;
		margin-top: 0.468rem;
		
	}
	.box{
		background-repeat:no-repeat;
		background-size:100% 10.343rem;
	}
	.bj{
		width: 100%;
		height: 150px;
		border-radius: 0.493rem;
	}
	.inco{
		display: inline-block;
		width: 2.35rem;
		height: 2.35rem;
		float: left;
	}
	.inco-bj{
		border-radius: 50%;
	}
	.van-col--22{
		margin-top: 0.612rem;
	}
	.van-col--23{
		padding-bottom: 1.281rem;
	}
	.tile{
		padding-left: 3.043rem;
	}
	.title{
		color: #303133;
		font-size: 0.85rem;
		font-weight: 800;
	}
	.name{
		color: #C0C4CC;
		font-size: 0.77rem;
	}
	.el-divider--horizontal{
		margin: 1.068rem 0;

	}
	.null{
		padding-bottom: 4.468rem;
	}
	.van-icon{
		font-size: 1.468rem;
	}
</style>