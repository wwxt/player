<template>
	<div class="search">
		<!--<van-nav-bar title="" left-text="返回"  left-arrow @click-left="onClickLeft" 
/>	-->
<div>
		<van-icon name="arrow-left"  class="top-left" @click.native="onClickLeft"
			/>
		<van-search v-model="value" placeholder="请输入搜索关键词" show-action shape="round" @search="onSearch()"  @focus="focusFn">
			
<div slot="action" @click="onSearch(value)">搜索</div>
</van-search>
</div>
<!--	<van-search placeholder="请输入搜索关键词" v-model="value"  @search="onSearch(value)" />-->
		<el-row v-show="isShow" class="history">
			<el-col :span="10" :offset="2" >
				搜索历史
			</el-col>
			<el-col :span="8" :offset="4" @click.native="dle" >
				清除历史记录
			</el-col>
				<ul class="tag-row clearfix" v-show="isFue">
					<li class="tag-col fl" v-for="(item,index) in historyarr" @click="count(item)" :key="index">{{item}}</li>
				</ul>
		</el-row>
		<el-row v-show="isTitle">
			<el-col ref="title" :span="22" :offset="1" class="tilte" v-for="(item,index) in titleData" :key="index" v-html='titleData[index].data.title' @click.native="goTitie({name:'Titledata',params:{pid:titleData[index].data.id}})" >

			</el-col>
			
		</el-row>
	</div>

</template>

<script>
	import { Search ,Icon, NavBar } from 'vant';
	export default{
		name:"Search",
		components:{
			[Search.name]:Search,
			[Icon.name]:Icon,
			[NavBar.name]:NavBar,
		},
		data(){
			return{
				value:'',
				titleData:null,
				isShow:false,
				historyarr:[],
				isFue:true,
				isTitle:true,
			}
		},
		created(){
			
		var historysData=localStorage.getItem("historyarr");
		this.historyarr= historysData == undefined ? [] : JSON.parse(historysData);
		
		},
		methods:{
			onSearch() {
				if (this.historyarr.indexOf(this.value) === -1) {
					this.historyarr.push(this.value);
					localStorage.setItem('historyarr', JSON.stringify(this.historyarr));
				}
				this.isShow=false;
				this.axios.get("/api/api/v1/search?num=13&query=" +this.value +"&start=10").then(r=>{
				this.titleData = r.data.itemList
				localStorage.setItem('titleData', JSON.stringify(this.titleData));
//			var search = this.$refs.title;
//			var titleString=null;
			r.data.itemList.map((itme,index)=>{
				if( this.value && this.value.length>0){
						var match = new RegExp('(' + this.value + ')', 'img');
						var repla ='<span class="search-text" style="color:#278BF4;">' + this.value + '</span>'
						 r.data.itemList[index].data.title=itme.data.title.replace(match,repla);

					}
			})
		this.titleData=r.data.itemList
			
		})
			
			},
			focusFn(){
				this.isShow=true;
				
					this.isFue=true;
			},
			dle(){
				this.isFue=false;
				localStorage.removeItem('historyarr');
			},
			count(name){
				this.value=name
			},
			onClickLeft(){
				this.$router.go(-1)
			},
			goTitie(path){
				this.$router.push(path)
			}
		},

	}
</script>

<style scoped="scoped">
	.tilte{
		border-bottom: 1px solid #D6D6D6;
		padding-bottom:0.312rem;
		padding-left: 0.312rem;
		padding-top: 0.625rem;
	}
	.tag-row{
		text-align: center;
		padding-left: 2.468rem;
		padding-top: 1.85rem;
	}
	.tag-col{
		float: left;
			margin-right: 1.4rem;
			background-color: #f2f2f2;
			max-width: 260px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			margin-top: 0.2rem;
			padding: 0.4rem;
		}
	.el-col-8{
		color: #278BF4;
	}
	.history{
		padding-bottom: 1.562rem;
	}
	.top-left{
	float: left;
	padding-top: 0.7rem;
	font-size: 1.8rem;
	color: #2983D8;
	}
</style>