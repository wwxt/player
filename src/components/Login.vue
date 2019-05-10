<template>
	<div class="login">
		<van-icon name="cross" class="top-icon" @click.native="goData" />
	
				<div class="logo" ><img class="auto-img max" src="https://tvax3.sinaimg.cn/crop.113.119.796.796.180/0065kqVkly8fkjuxfjwshj30sg0sgtao.jpg"/></div>
				<div class="middle">
					<p class="me-p">登录后即可关注作者、</p>
					<span class="me-s">发表评论、同步 喜欢视频和播放记录</span>
				</div>
				<van-row>
			<van-col offset="1" span="22">
				
				<van-cell-group>

					<van-field label="手机号" placeholder="输入手机号" v-model="userInfo.phone" />
					<van-field type="password" label="密码" placeholder="密码(8-16位)" v-model="userInfo.pwd" />
					
				</van-cell-group>

				<van-button class="login-btn" size="large" type="info" @click="loin">登录</van-button>

			</van-col>
		</van-row>
		
	</div>
</template>

<script>
	import { Icon,CellGroup,Field,Button,Row, Col ,Toast  } from 'vant';
	export default{
		name:"Login",
		components:{
			[Icon.name]:Icon,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Button.name]: Button,
			[Row.name]: Row,
			[Col.name]: Col,
			[Toast.name]: Toast,
		},
		data() {

			return {

				//用户列表
				users: [],

				//用户信息
				userInfo: {
					phone: '',
					pwd: ''
				}

			};

		},
		methods:{
			loin(){
				if (this.userInfo.phone==''||this.userInfo.pwd=='') {
					this.$toast('请输入账号和密码');
				}else if (!this.userInfo.phone==''&& !this.userInfo.pwd=='') {
					localStorage.setItem('userLogin', JSON.stringify({userId: this.userInfo.phone, loginStatus: true}));
					return this.$router.go(-1);
				}
			},
			goData(){
				this.$router.go(-1)
			}
		}
	}
</script>

<style scoped="scoped">
	.login{
		width: 100%;
		height: 100vh;
		background: url("http://img0.imgtn.bdimg.com/it/u=2233345942,2722822722&fm=11&gp=0.jpg") no-repeat;
		background-size: cover;
		background-position: top center;
		color: white;
	}
	.top-icon{
		font-size: 1.8rem;
	}
	.logo{
		border-break: 50%;
		width: 4.562rem;
		padding-left: 7.5rem;
		padding-top: 2.5rem;
	}
	.max{
		border-radius: 50%;
	}
	.middle{
		padding-top: 0.65rem;
		font-size:.92rem;
	/*	color: #1989FA;*/
	}
	.me-p{
		padding-left: 5.781rem;
	}
	.me-s{
		padding-left: 2.468rem;
	}
	.van-col--22{
		padding-top: 5.4rem;
	}
	.van-button--large{
		margin-top: 3.2rem;
	}
	.van-cell-group{
	background-color:transparent;
	color: white;
	}
	.van-cell{
		background-color:transparent;
		color: white;
	}
	.van-field__control{
		color: white !important;
	}
	.van-cell__value{
		color: white !important;
	}
	input{
		color: white !important;
	}
</style>