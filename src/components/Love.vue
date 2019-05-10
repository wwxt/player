<template>
	<div class="love">
		<van-nav-bar title="我的喜欢" left-text="返回" left-arrow  @click-left="onClickLeft"
@click-right="onClickRight">
			<van-icon name="edit" slot="right" />
			
		</van-nav-bar>
		<el-row v-for="(item,index) in loveData" class="top" @click.native="goDatails({name:'Lovedata',params:{pid:item.id}})" :key="index">
			<el-col :span="1"  v-show="isShow" @click.native="onOpen()" class="inpt">
				<input type="checkbox" class="check_box tui-checkbox" ref="col">
				<label  class="title"></label >
			</el-col>
			<el-col :span="12" :offset="1">
				<img class="auto-img bor" :src="item.cover.feed"/>
			</el-col>
			<el-col :span="9" :offset="1">
				<div class="tilte">{{item.title}}</div>
				<div class="name">#{{item.category}}</div>
			</el-col>
		</el-row>
		<div class="null">
			
		</div>
		<div class="bottom" v-show="isShow">
			<div class="lt" ref="lt" @click="delArr">清空喜欢视频</div>
			<div class="rt" ref="rt" @click="del">删除</div>
		</div>
	</div>
</template>

<script>
	import { NavBar,Icon,Dialog } from 'vant';
	export default{
		name:'Love',
		components:{
			[NavBar.name]:NavBar,
			[Icon.name]:Icon,
			[Dialog.name]:Dialog
		},
		data(){
			return{
				loveData:null,
				isShow:false,
				isOpen:false,
				checked: false,
			}
		},
		created(){
			var love=JSON.parse(localStorage.getItem("loveData"))
			this.loveData=love
		},
		methods:{
			onClickLeft() {
				this.$router.go(-1)
			},
			goDatails(path){
				this.$router.push(path)
			},
			onClickRight() {
				if (!this.isOpen) {
					this.isShow=true;
					this.isOpen=true
				}else if (this.isOpen) {
					this.isShow=false;
					this.isOpen=false
				}
				if (this.loveData.length>=1) {
					this.$refs.lt.style.color="#2983D8";
				}else{
					this.$refs.rt.style.color=" #909399";
				}
				
				
			},
			onOpen(){
				var input=this.$refs.col
				for (var i =0;i<input.length;i++) {
						if (input[i].checked==true) {
						this.$refs.rt.style.color="#2983D8";
						return;
					}else if (input[i].checked ==false) {
						this.$refs.rt.style.color=" #909399";

					}
							
				}
			
			},
			del(){
				var input=this.$refs.col
				var loveData=JSON.parse(localStorage.getItem("loveData"));
			
					for(var i=0;i<input.length;i++){
						if (input[i].checked) {
						this.loveData.splice(i,1)
						loveData.splice(i,1)
						}
						input[i].checked=false;
					}
					localStorage.setItem("loveData",JSON.stringify(this.loveData));
			},
			delArr(){
				var input=this.$refs.col
					input.checked=true;
				Dialog.confirm({
					
					message: '确定要删除所有吗？'
					}).then(() => {
					var x=input.length
					this.loveData.splice(0,x)
					localStorage.setItem("loveData",JSON.stringify(this.loveData));
					}).catch(() => {
			
				});
				
				

			}
			
		}
	}
</script>

<style scoped="scoped">
	.tilte{
		padding-top: .3rem;
		font-size: 0.781rem;
		font-weight: 600;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.bor{
		border-radius: 0.368rem;
	}
	.top{
		padding-top: .65rem;
		/*padding-top: 1.25rem;*/
	}
	.inpt{
		padding-top: 2.05rem;
	}
	.name{
		padding-top: 1.87rem;
		font-size: .8rem;
		color: #909399;
	}
	.van-icon{
		font-size: 1.5rem;
		
	}
	.el-checkbox{
		padding-top: 1.781rem;
	}
	.el-checkbox__inner{
		width: 0.781rem;
		height: 0.781rem;
	}
	.bottom{
		position: fixed;
		bottom: 0;
		z-index: 999;
		overflow: hidden;
		font-size: .9rem;
		color: #909399;
		text-align: center;
		background: white;
		width: 100%;
		line-height: 46px;
		border-top: 1px solid #909399;
	}
	.rt{
		float: right;
		width: 50%;
	}
	.lt{
		float: left;
		width: 50%;
	}
	.tui-checkbox:checked {
		background: #1673ff;
		border: solid 1px #1673ff;
	}
	.tui-checkbox {
		width: 1.5rem;
		height: 1.5rem;
		background-color: #ffffff;
		border: solid 1px #000;
		-webkit-border-radius: 50%;
		border-radius: 50%;
		font-size: 0.8rem;
		margin: 0;
		padding: 0;
		position: relative;
		display: inline-block;
		vertical-align: top;
		cursor: default;
		-webkit-appearance: none;
		-webkit-user-select: none;
		user-select: none;
		-webkit-transition: background-color ease 0.6s;
		transition: background-color ease 0.6s;
	}
	.tui-checkbox:checked::after {
		content: '';
		top: 0.1rem;
		left: 0.09rem;
		position: absolute;
		background: transparent;
		border: #fff solid 2px;
		border-top: none;
		border-right: none;
		height: 0.52rem;
		width: 1.25rem;
		-moz-transform: rotate(-45deg);
		-ms-transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
		transform: rotate(-45deg);
	}
	.null{
		padding-bottom: 3.937rem;
	}
</style>