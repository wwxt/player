<template>
	<div class="classification">
		<el-row>
			<el-col :span="24">
				<div  class= "bj box" :style="{backgroundImage:'url('+ categoryInfo.headerImage +')'}">
					<div @click="goDatails"><i class="el-icon-arrow-left"></i></div>
					<div class="top-name">{{categoryInfo.name}}</div>
					<div class="top-title">{{categoryInfo.description}}</div>
					<van-button size="mini" class="top-btn">+关注</van-button>
				</div>
			</el-col>
		</el-row>
		<div></div>
		<van-row v-for="(item,index) in contentArr" :key="index"  @click.native="goClassifdata({name:'Classifdata',params:{pid:contentArr[index].data.id}})" >
			<van-col span="24" >
				<div  class= "bj box" :style="{backgroundImage:'url('+ contentArr[index].data.cover.feed +')'}">
				</div>
				
				<van-col span="22" offset="1">
				<div class="inco box" >
							<img class="auto-img inco-bj" :src="contentArr[index].data.author.icon"/>
		
				</div>
				<div class="tile"><p class="title">{{contentArr[index].data.title}}</p>
					<span class='name'>{{contentArr[index].data.author.name}}  &nbsp;/ &nbsp;#{{contentArr[index].data.category}}</span>
				</div>	
				</van-col>
				
			</van-col>
		<van-col span="1"></van-col>
		</van-row>
	</div>
</template>

<script>
	import { Button,Row, Col } from 'vant'
	export default{
		name:"Classification",
		data(){
			return{
				categoryInfo:{},
				contentArr:null,
				collect:[],
			}
		},
		created(){
			this.axios.get("/api/api/v4/categories/detail/tab?id=" + this.$route.params.pid).then(r=>{
				let xx =r.data.categoryInfo
				this.categoryInfo=xx
	
			})
			this.axios.get("/api/api/v4/discovery/category?start=1&num=200").then(j=>{

			for (var i = 0;i<j.data.itemList.length;i++) {
				if (this.$route.params.pid == j.data.itemList[i].data.header.id) {

					let jj =j.data.itemList[i].data.itemList
					this.contentArr=JSON.parse(JSON.stringify(jj))
					break;
				}
			}
			this.collect.push(this.contentArr)
			localStorage.setItem("collect",JSON.stringify(this.collect))
		
		})
		},
		components:{
			[Button.name]:Button,
			[Row.name]:Row,
			[Col.name]:Col,
		},
		methods:{
			goDatails(){
				this.$router.go(-1)
			},
			goClassifdata(path){
				this.$router.push(path)
			}
		}
	}
</script>

<style scoped="scoped">
	.box{
		background-repeat:no-repeat;
		background-size:100% 10.343rem;
		color: white;
		position: relative;
	}
	.bj{
		width: 100%;
		height: 150px;
	}
	.el-icon-arrow-left{
		padding-top: .381rem;
		padding-left: .43rem;
		font-size: 1.375rem;
	}
	.top-name{
		position: absolute;
		top: 2.381rem;
		left: 8.43rem;
		font-weight: 600;
		font-size: 1.375rem;
	}
	.top-title{
		position: absolute;
		top:4.681rem;
		left: 4.43rem;
		font-size: 0.875rem;
		width: 10.687rem;
		text-align:center;
	}
	.top-btn{
		position: absolute;
		bottom: .31rem;
		left: 8.43rem;
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
		color: #606266;
		font-size: 0.77rem;
	}
	.van-row{
		padding-top: 0.781rem;
	}
</style>