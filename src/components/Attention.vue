<template>
	<div class="attention">
		<van-nav-bar title='我的关注' left-text="返回" left-arrow  @click-left="onClickLeft"
  @click-right="onClickRight">
			<van-icon name="edit" slot="right" />		
		</van-nav-bar>
		<el-row>
			
		<el-col  :span="23" :offset="1" v-for="(item,index) in attention" :key="index">
			<div v-show="isShow" @click="onOpen">
				<input type="checkbox" class="check_box tui-checkbox" ref="col">
				<label  class="title"></label >
					
			</div>
			<div class="inco box" >
							<img class="auto-img inco-bj" :src="attention[index].icon"/>
				</div>
				<div class="tile"><span class="title lf">{{attention[index].name}}</span>
					<div class='name out'>{{attention[index].title}}</div>
				
				</div>	
					<div class="attenti" >
				<el-button plain>已关注</el-button>
					</div>
		</el-col>	
	<div class="null">
			
		</div>
		<div class="hint" v-show="isHint">暂无记录</div>
		<div class="bottom" v-show="isShow">
			<div class="lt" ref="lt" @click="delArr">清空关注</div>
			<div class="rt" ref="rt" @click="del">删除</div>
		</div>
		
	</el-row>
	</div>
</template>

<script>
	import { NavBar,Icon,Dialog } from 'vant';
	export default{
		name:"Attention",
		components:{
			[NavBar.name]:NavBar,
			[Icon.name]:Icon,
			[Dialog.name]:Dialog
		},
		data(){
			return{
				attention:null,
				isShow:false,
				isOpen:false,
				isHint:false,
			}
		},
		created(){
			var attent=JSON.parse(localStorage.getItem("attention"))
			this.attention=attent
			if (this.attention.length==0) {
				this.isHint=true
			}
		},
		methods:{
			onClickLeft() {
				this.$router.go(-1)
			},
			onClickRight(){
				if (!this.isOpen) {
					this.isShow=true;
					this.isOpen=true
				}else if (this.isOpen) {
					this.isShow=false;
					this.isOpen=false
				}
				if (this.attention.length>=1) {
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
				var attention=JSON.parse(localStorage.getItem("attention"));
			
					for(var i=0;i<input.length;i++){
						if (input[i].checked) {
						this.attention.splice(i,1)
						attention.splice(i,1)
						}
						input[i].checked=false;
					}
					if (this.attention.length==0) {
				this.isHint=true
			}
					localStorage.setItem("attention",JSON.stringify(this.attention));
			},
			delArr(){
				var input=this.$refs.col
					input.checked=true;
				Dialog.confirm({
					
					message: '确定要删除所有吗？'
					}).then(() => {
					var x=input.length
					this.attention.splice(0,x)
					localStorage.setItem("attention",JSON.stringify(this.attention));
					if (this.attention.length==0) {
				this.isHint=true
			}
					}).catch(() => {
			
				});
				
				

			}
		}
	}
</script>

<style scoped="scoped">
	.van-icon{
		font-size: 1.5rem;
		
	}
	.title{
	padding-top: 0.181rem;
	font-size: .831rem;
	font-weight: 800;
	padding-bottom: 0.481rem;
}
.name{
	font-size: .731rem;
	padding-top: 0.481rem;
	padding-bottom: 0.481rem;
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
	.tile{
		float: left;
		padding-left: 0.743rem;
	}
	
	.attenti{
		float:right ;
	}
	.el-button{
		padding: 0.534rem ; 
	}
	.lf{
		padding: 0;
		display: block;
	}
	.hint{
		padding-top: 15.5rem;
		padding-left: 8rem;
		color: #909399; 
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
	.el-col-23{
		padding: 1.5rem 0;
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
				float: left;
				width: 1.5rem;
				height: 1.5rem;
				background-color: #ffffff;
				border: solid 1px #000;
				-webkit-border-radius: 50%;
				border-radius: 50%;
				font-size: 0.8rem;
				margin: 0;
				padding: 0;
				margin-right: .5rem;
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
</style>