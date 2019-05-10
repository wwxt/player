<template>
	<div class="classifdata">
	<el-row>
		<el-col :span="24">
			<div class="posit" @click="posit">
			<video id="myVideo" ref="sou"   autoplay="autoplay" controls class="video-js" width="100%" height="100%"  object-fit="fill" >
			<source  :src="dataitemList.playInfo[0].url" type="audio/mp4">
			
			</video>
			
	
			<div class="po-top"  v-show="isShow"><i class="el-icon-close" @click="goDatails({name:'Index'})"></i></div>
			<div class="po-lf" v-show="isLeft" ><i class="el-icon-arrow-left" @click="last"></i></div>
			<div class="po-rt" v-show="isShow" ><i class="el-icon-arrow-right" @click="next"></i></div>
			</div>
		</el-col>
		
	</el-row>
	
	<el-row  class="cole" >
		<el-col :span="22" :offset="1">
			<div class="title ">
				{{dataitemList.title}}
				</div>
				<div class="name ">
					<div>#{{dataitemList.category}} &nbsp; / &nbsp; {{dataitemList.author.name}}</div>
				</div>
				<div class="description">{{dataitemList.description}}</div>
				<el-row :gutter="20">
					<el-col :span="6" class="icon-1" ><van-icon name="like-o"  /><span class="sp" @click="collect"></span></el-col>
					<el-col :span="6" ><van-icon name="upgrade"  /><span class="sp" @click="collec">6</span></el-col>
					<el-col :span="6" ><van-icon name="chat-o"  /><span class="sp" @click="collec">0</span></el-col>
					<el-col :span="6" ><i class="el-icon-download"></i><span class="sp" @click="collec">缓存</span></el-col>
				</el-row>
			
		</el-col>

	</el-row>

		<el-row class="guangzhu">
			<el-col  :span="22" :offset="1">
				<div>
					<div class="inco box" >
						<img class="auto-img inco-bj" :src="dataitemList.author.icon"/>
					</div>
					<div class="tile">
						<span class="title lf">{{dataitemList.author.name}}</span>
						<div class='name out'>{{dataitemList.author.description}}</div>
					</div>	
					<div class="attention" @click="attent">
						<el-button type="danger" icon="el-icon-plus" >关注</el-button>
					</div>
				</div>
			</el-col>
	</el-row>

		<el-row  class="bottn">
			<el-col :span="22" :offset="1">
				<div class="xg">相关推荐</div>
			</el-col>
			<el-row v-for="(item,index) in recommend1" :key="index" @click.native="dsd(index)">
			<el-col :span="11" :offset="1" class="suiji">
				<img class="auto-img bottom-img"  :src="recommend1[index].data.cover.feed"/>
			</el-col>
			<el-col :span="10" :offset="1">
				<div class="title ">{{recommend1[index].data.title}}</div>
				<div class="name bottom">#{{recommend1[index].data.category}}</div>
			</el-col>
			</el-row>
			
			
		</el-row>
		<div class="null">
			<div class="end"><i class="el-icon-loading"></i><p class="p2">假装加载中</p></div>
		</div>
	</div>
</template>

<script>
	import { Icon, Toast ,NavBar } from 'vant';
	export default{
		
		name:'Classifdata',
		data(){
			return{
				dataitemList:null,
				recommend:[],
				recommend1:[],
				isShow:false,
				isLeft:false,
				i:-1,
				str:0,
				userLogin:null,
				loveData:[],
				attention:[],
			}
		},
		created(){
			var userLogin=localStorage.getItem("userLogin");
			this.userLogin= userLogin == undefined ? [] : JSON.parse(userLogin);
			var love=localStorage.getItem("loveData");
			this.loveData= love == undefined ? [] : JSON.parse(love);
			var attent=localStorage.getItem("attention");
			this.attention= attent == undefined ? [] : JSON.parse(attent);
				var itemList=JSON.parse(localStorage.getItem("collect"))[0];
					for(var i =0 ;i<itemList.length;i++){
						if(this.$route.params.pid == itemList[i].data.id  ){
							this.dataitemList=itemList[i].data
							break;
						}
						
			}
			//点击进来根据ID获取的数据
		
		//相关推荐的数据
		this.axios.get("/api/api/v4/discovery/hot").then(r=>{
			for (var i =0;i<r.data.itemList.length;i++) {
				
				if (r.data.itemList[i].type == "video") {				
					this.recommend.push(r.data.itemList[i])	
				}
				
			}
			var a =JSON.parse(JSON.stringify(this.recommend))
			var arr=[]
					for (var x =0;x<10;x++) {
						arr[x]=parseInt(Math.random() * 25);
						this.recommend1.push(a[arr[x]])
						
					}

		})
	
		
	
	
		},
			components:{
			[ Icon.name]: Icon,
			[ Toast.name]: Toast,
			[NavBar.name]:NavBar,
		},
			
		methods: {
			posit(){
				this.isShow=true
				if(this.i>=0){
					this.isLeft=true;
				}
				setTimeout(()=>{
					this.isShow=false;
					this.isLeft=false;
				},3000)
			
			},
			goDatails(path){
				this.$router.push(path)
			},
			next(){
				if (this.i<9) {
					this.i++
				}else{
					Toast('已经看完了，想看更多，请移步到发现！');
				}
				this.recommend1[this.i]
				this.dataitemList=this.recommend1[this.i].data
				var vdo = document.getElementById("myVideo");
				vdo.src=this.dataitemList.playInfo[0].url
			},
			last(){
				if (this.i>0) {
					this.i--
				}else{
				this.isLeft=false
				}
				this.recommend1[this.i]
				this.dataitemList=this.recommend1[this.i].data
				var vdo = document.getElementById("myVideo");
				vdo.src=this.dataitemList.playInfo[0].url
			},
			dsd(name){
				this.dataitemList=this.recommend1[name].data
					var vdo = document.getElementById("myVideo");
				vdo.src=this.dataitemList.playInfo[0].url
				document.documentElement.scrollTop=0;
				
			},
			collect(){
				if (this.userLogin.loginStatus) {
			
					for(var i =0;i<this.loveData.length;i++){
						if (this.loveData[i].id == this.dataitemList.id) {
							Toast('已经添加到喜欢列表,请不要重复操作');
							return
						}
					}
					Toast.success('添加成功');
					this.loveData.push(this.dataitemList)
						
				localStorage.setItem('loveData', JSON.stringify(this.loveData));
				}else if (!this.userLogin.loginStatus) {
					return this.$router.push({name: 'Login'});
				}
			},
			collec(){
				if (this.userLogin.loginStatus) {
					Toast.fail('不好意思，正在开发中');
				}else if (!this.userLogin.loginStatus) {
					return this.$router.push({name: 'Login'});
				}
			},
			attent(){
			
				if (this.userLogin.loginStatus) {
					for(var i=0;i<this.attention.length;i++){
						if (this.attention[i].id == this.dataitemList.id) {
							Toast('已经添加到关注列表,请不要重复操作');
							return
						}
					}
					var a={
						id:this.dataitemList.id,
						icon:this.dataitemList.author.icon,
						title:this.dataitemList.author.description,
						name:this.dataitemList.author.name,
					}
					this.attention.push(a)
					localStorage.setItem('attention', JSON.stringify(this.attention));
					Toast.success('添加成功');
				}else if (!this.userLogin.loginStatus) {
					return this.$router.push({name: 'Login'});
				}
			}

		}

	}
	
</script>

<style scoped="scoped">
.classifdata{
	/*background: #000000;*/
	color: white;
}
.video-js{
	width: 100%;
}
.titler{
	text-align:center
}
.title{
	padding-top: 0.881rem;
	font-size: .831rem;
	font-weight: 800;
	padding-bottom: 0.481rem;
	
}
.coler{
	text-align:center
}
.cole{
	color: #000000;
	
}
.name{
	font-size: .731rem;
	padding-top: 0.481rem;
	padding-bottom: 0.481rem;
}
.description{
	font-size:.731rem ;
	padding-bottom:0.481rem;
}
.icon-1{
	font-size: 18px;
}
.sp{
	padding-left: 0.534rem;
	font-size: 0.787rem;
	margin-bottom: 10px;
}
.el-divider--horizontal{
	margin: 12px 0 12px 0;
}
.inco{
		display: inline-block;
		width: 3.05rem;
		height: 3.05rem;
		float: left;
	}
	.inco-bj{
		border-radius: 50%;
	}
	.tile{
		float: left;
		padding-left: 0.743rem;
	}
	
	.attention{
		float:right ;
	}
	.el-button{
		padding: 0.534rem ; 
	}
	.xg{
		font-weight: 600;
		padding-bottom: 0.781rem;
		padding-top: 0.5rem;
	}
	
	.lf{
		padding: 0;
		display: block;
	}
	.el-col-11{
		padding-bottom: 0.468rem;
	}
	.null{
		padding-bottom: 0.162rem;
		color: #000000;
	}
	.end{
		margin: 2.781rem 4.781rem;
		font-size: 18px;
	}
	.el-icon-loading{
		font-size: 24px;
	}
	.p2{
		display: inline-block;
		padding-left: .668rem;
	}
	.posit{
		/*position: relative;*/
	}
	.po-top{
		position: absolute;
		top: 0;
		right: 0;
	}
	.el-icon-close{
		padding-right: .587rem;
		padding-top:  .587rem;
		font-size: 1.512rem;
	}
	.po-lf{
		position: absolute;
		top:2.881rem;
		left: 0;
		font-size: 1.512rem;
	}
	.po-rt{
		position: absolute;
		top: 2.881rem;
		right: 0;
		font-size: 1.512rem;
	}
	.out{
		width: 9.343rem;
		height: 1.468rem;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.bottom-img{
		border-radius: 0.356rem;
	}
	.guangzhu{
		background: #ededed;
		color: #000000;
		padding-top: 1.25rem;
		padding-bottom: 0.468rem;
	}
	.bottn{
		color: #000000;
	}
	.el-button{
		margin-top: 0.68rem;
	}
</style>