<template>
	<div class="index">
		<van-nav-bar title="每日精选" >
  <van-icon name="search" slot="right" @click.native="goDatails({name:'Search'})"  />
</van-nav-bar>
		<van-row v-for="(item,index) in itemList" :key="index" @click.native="goDatails({name:'Details',params:{pid:itemList[index].data.id}})" >
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
	const ulr="/api/api/v4/tabs/selected"
	import { Row, Col ,NavBar,Icon } from 'vant';
	export default{
		name:'Index',
			data(){
				return {
					itemList:[]
				}
			},
		components:{
			[ Row.name]: Row,
			[ Col.name]: Col,
			[ NavBar.name]: NavBar,
			[ Icon.name]: Icon
		},
		created(){
			this.axios.get(ulr).then(result=>{
				var arr =[]
				for(let i=1;i<5;i++){
			var x= result.data.itemList[i]
			arr.push(x)
				}
				var arr1=[]
				for (var c = 10;c<14;c++) {
					var z= result.data.itemList[c]
					arr1.push(z)
				}
			var v =arr.concat(arr1)
				this.itemList=v
				localStorage.setItem("itemList",JSON.stringify(this.itemList))
			})
			
		},
		methods:{
			goDatails(path){
				this.$router.push(path)
			}
		}
	}
</script>

<style scoped="scoped">
	.h3{
		margin-left: 0.468rem;
		margin-bottom: 0.468rem;
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
	.van-icon-search:before{
		font-size: 1.8rem;
		padding-bottom: 0.25rem;
	}
	.van-nav-bar__title{
		font-size:1.468rem;
		font-weight: 600;
	}
</style>