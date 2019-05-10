<template>
	<div class="discover">
		<van-tabs v-model="active" sticky >
			<van-tab title="分类">
				<el-row :gutter="5">
					<el-col :span="12" v-for="(item,index) in classi" :key="index" @click.native="goDatails({name:'Classification',params:{pid:classi[index].id}})">
					<div class="top-img">
						<img  class="auto-img" :src="classi[index].bgPicture"/>
						<div class="top-name">#{{classi[index].name}}</div>
					</div>
					</el-col>
				</el-row>
				<div class="null"></div>
			</van-tab>
			<van-tab title="热门排行">
				<el-row class="r-top">
					<el-col :span="22" :offset="1">
						<span class="r-lt" >日排行</span>
						<span class="r-rt" @click="goDatails({name:'Ranking',params:{pid:1}})">查看全部
							<i class="el-icon-arrow-right"></i>
						</span>
					</el-col>	
				</el-row>
						<div class="ks"  id="list"  @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend" >
					<img  class="auto-img img" v-for="(item,index) in dayRank"   :src="dayRank[index].data.cover.feed" :key="index"/>
					<!--@click="goDatails({name:'Rankingdata',params:{pid:dayRank[index].data.id,are:1}})"-->
				</div>
			<el-row class="r-top">
					<el-col :span="22" :offset="1">
						<span class="r-lt">周排行</span>
						<span class="r-rt" @click="goDatails({name:'Ranking',params:{pid:0}})">查看全部
							<i class="el-icon-arrow-right"></i>
						</span>
					</el-col>	
				</el-row>
				<div class="ps" id="opps"  @touchstart="touchstart1" @touchmove="touchmove1" @touchend="touchend1">
					<img  class="auto-img img" v-for="(item,index) in weekRank"  :src="weekRank[index].data.cover.feed"    :key="index"/>
				</div>
					<!--月-->
					<el-row class="r-top">
					<el-col :span="22" :offset="1">
						<span class="r-lt">月排行</span>
						<span class="r-rt" @click="goDatails({name:'Ranking',params:{pid:2}})">查看全部
							<i class="el-icon-arrow-right"></i>
						</span>
					</el-col>	
				</el-row>
				<div class="ds" id="his"  @touchstart="touchstart2" @touchmove="touchmove2" @touchend="touchend2">
					<img  class="auto-img img" v-for="(item,index) in monthRank"  :src="monthRank[index].data.cover.feed"   :key="index" />
				<!--@click="goDatails({name:'Rankingdata',params:{pid:dayRank[index].data.id,are:2}})"-->
				</div>
				<div class="null"></div>
			</van-tab>
</van-tabs>
	</div>
</template>

<script>
	import { Tab, Tabs } from 'vant'
	export default{
		name:'Discover',
		components:{
			[Tab.name]:Tab,
			[Tabs.name]:Tabs,
		},
		data() {
				return {
				active: 0,
				classi:null,
				startPointX: 0,
				changePointX: 0,
				showIndex: 0,
				slider: null,
				originMargin: 0,
				startPointX1: 0,
				changePointX1: 0,
				showIndex1: 0,
				slider1: null,
				originMargin1: 0,
				
				dayRank:[],
				weekRank:[],
				monthRank:[],
				startPointX2: 0,
				changePointX2: 0,
				showIndex2: 0,
				slider2: null,
				originMargin2: 0,
				arrHot1:[],
			};
		},
		methods: {
			goDatails(path){
				this.$router.push(path)
			},
			touchstart(e){
				this.startPointX = e.changedTouches[0].pageX;
				let slider = document.getElementById('list');
				this.slider = slider;
				this.originMargin = slider.style.marginLeft;
			},
			touchmove(e){
				if(this.startPointX==this.changePointX){
				return ;
				}
				let currPointX = e.changedTouches[0].pageX;
				let leftSlide = this.startPointX-currPointX;
				if(!this.originMargin){
				this.slider.style.marginLeft = `-${leftSlide}px`;
				}else{
				let currentMargin = parseInt(this.originMargin) - leftSlide;
				this.slider.style.marginLeft = `${currentMargin}px`;
				}
			},
			touchend(e){
				let originMargin = parseInt(this.slider.style.marginLeft);	
				if(originMargin>0){
						this.slider.style.marginLeft=0;
						return;
					}
				if(originMargin<-1681){
						this.slider.style.marginLeft=`-${1681}px`;
						return;
					}
			},
			//周
			touchstart1(e){
				this.startPointX1 = e.changedTouches[0].pageX;
				let slider = document.getElementById('opps');
				this.slider1 = slider;
				this.originMargin1 = slider.style.marginLeft;
			},
			touchmove1(e){
				if(this.startPointX1==this.changePointX1){
				return ;
				}
				let currPointX = e.changedTouches[0].pageX;
				let leftSlide = this.startPointX1-currPointX;
				if(!this.originMargin1){
				this.slider1.style.marginLeft = `-${leftSlide}px`;
				}else{
				let currentMargin = parseInt(this.originMargin1) - leftSlide;
				this.slider1.style.marginLeft = `${currentMargin}px`;
				}
			},
			touchend1(e){
				let originMargin = parseInt(this.slider1.style.marginLeft);	
				if(originMargin>0){
						this.slider1.style.marginLeft=0;
						return;
					}
				if(originMargin<-1681){
						this.slider1.style.marginLeft=`-${1681}px`;
						return;
					}
			},
			//月
			touchstart2(e){
				this.startPointX2 = e.changedTouches[0].pageX;
				let slider = document.getElementById('his');
				this.slider2 = slider;
				this.originMargin2 = slider.style.marginLeft;
			},
			touchmove2(e){
				if(this.startPointX2==this.changePointX2){
				return ;
				}
				let currPointX = e.changedTouches[0].pageX;
				let leftSlide = this.startPointX2-currPointX;
				if(!this.originMargin2){
				this.slider2.style.marginLeft = `-${leftSlide}px`;
				}else{
				let currentMargin = parseInt(this.originMargin2) - leftSlide;
				this.slider2.style.marginLeft = `${currentMargin}px`;
				}
			},
			touchend2(e){
				let originMargin = parseInt(this.slider2.style.marginLeft);	
				if(originMargin>0){
						this.slider2.style.marginLeft=0;
						return;
					}
				if(originMargin<-1681){
						this.slider2.style.marginLeft=`-${1681}px`;
						return;
					}
			}
		},
		created(){
			this.axios.get("/api/api/v4/categories").then(r=>{
				var a=[]
				for (var i=0;i<2;i++) {
					var z=r.data[i]
					a.push(z) 
				}
				var b=[]
				for(var ii=3;ii<7;ii++){
					var x=r.data[ii]
					b.push(x)
				}
				var v =a.concat(b)
				var c=[]
				for(var iii=8;iii<11;iii++){
					var xx=r.data[iii]
					c.push(xx)
				}
				var v1 =v.concat(c)
				var d=[]
				for(var iiii=12;iiii<17;iiii++){
					var xxx=r.data[iiii]
					d.push(xxx)
				}
				var v2 =v1.concat(d)		
				this.classi=v2
			})
			this.axios.get("/api/api/v3/ranklist?num=10&strategy=monthly&udid=26868b32e808498db32fd51fb422d00175e179df&vc=83").then(ji=>{
			var v2=[]
			v2=ji.data
			this.arrHot1.push(v2)
				for(var i=0;i<7;i++){
					var oo=ji.data.itemList[i]
					this.dayRank.push(oo)
				}
				
			})
		this.axios.get("/api/api/v3/ranklist?num=10&strategy=weekly&udid=26868b32e808498db32fd51fb422d00175e179df&vc=83").then(zhou=>{
			var v3=[]
			v3=zhou.data
			this.arrHot1.push(v3)
			for(var i=0;i<7;i++){
					var oo=zhou.data.itemList[i]
					this.weekRank.push(oo)
				}
			
		})
		this.axios.get("/api/api/v3/ranklist?num=10&strategy=historical&udid=26868b32e808498db32fd51fb422d00175e179df&vc=83").then(his=>{
			var v5=[]
			v5=his.data
			this.arrHot1.push(v5)
			for(var i=0;i<7;i++){
					var oo=his.data.itemList[i]
					this.monthRank.push(oo)
			}

			localStorage.setItem("arrHot1",JSON.stringify(this.arrHot1))
		})
		
	}
		
	}
</script>

<style scoped="scoped">
	.el-col-12{
		padding-bottom:0.256rem ;
	}
	.el-row{
		padding-top: 0.468rem;
	}
	.top-img{
		position: relative;
	}
	.top-name{
		position: absolute;
		top: 4rem;
		left: 3rem;
		font-size: 1.2rem;
		color: white;
	}
	.null{
		padding-bottom: 3.562rem;
	}
	.r-top{
		padding-top: 0.781rem;
		overflow: hidden;
	}
	.r-lt{
		font-size: 1.268rem;
		font-weight: 600;
		display: inline-block;
		padding-bottom: 0.634rem;
	}
	.r-rt{
		float: right;
		color: #409EFF;
		display: inline-block;
		padding-top: 0.356rem;
	}
	.el-icon-arrow-right{
		padding-left: 0.068rem;
		
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
	.ks{
		overflow: hidden;
		white-space: nowrap;
	}
	.img{
		height: 10.812rem;
		width: 17.812rem;
		display: inline;
		margin-right: 0.381rem;
		padding-left: 0.781rem;
	}
	.ps{
		overflow: hidden;
		white-space: nowrap;
	}
	.ds{
		overflow: hidden;
		white-space: nowrap;
	}
</style>