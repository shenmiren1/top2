import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

function login() {
	return new Promise((rejk, res) => {
		uni.login({
			success: function(e) {
				rejk(e);
			}
		});
	});
}
const store = new Vuex.Store({
	state: {
		map_particulars_index: 2, // 地图一件分析顶部 大tab index
		map_particulars_res: {}, //   地图一键分析， res 当用户的所咋地之的数据
		map_particulars_tabtow_header_index: -1, // tabtow index下标
		// wxUserMessage: {},
		/* 用户微信信息*/
		userinfo: {
			avatarUrl: '../../static/My/logo.jpg',
			nickName: '暂未登录',
			user_pone_Br:false, /* 是否登录*/
			role_name_Br:false, /* 是否you角色*/
			
		},
		bigPlate_tabIndex:-1,
		big_plate_threeIndex:0,  /* big-plate 中的three 的 第一个下拉 选的是那也tab*/ 
		big_plateThreePagesIndex:0,   /* big-plate 中的three 的 第一个下拉 选的是那也tab*/ 
		/*  登录成功后 后端返回的用户信息*/
	},
	mutations: {
		/* 排片上座页面tab——index */
		bigPlate_tab(state,index){
			console.log(index);
			state.bigPlate_tabIndex = index;
		},
		/* big-plate 中的three 的 第一个下拉*/ 
		big_plate_threeIndex_mutaions(state,index){
			state.big_plate_threeIndex = index
		},
		/* big-plate 中的three 的 第一个下拉*/ 
		big_plateThreepages(state,index){
			
			console.log(index)
			state.big_plateThreePagesIndex = index
		},
		/*  当前用户登录的信息 */
		userinfoMutations(state, data) {
			console.log(data,'userinfoMutations');
			state.userinfo = data;
		},
		// 一键分析， 两个大tab
		map_particulars_header_tap(state, data) {
			console.log(data);
			state.map_particulars_index = data

		},
		/* 当前一件分析的 res */
		map_particulars_res_state(state, data) {
			state.map_particulars_res = data;
		},
		/* 地图一件分析 tabtow 修改下标 */
		map_particulars_tabtow_header_index_mut(state, index) {
			console.log(index);
			state.map_particulars_tabtow_header_index = index;
		}
	},
	getters: {},
	actions: {
		/*进小程序判断登录 
		 如果token 还在有效期直接赋值，
		  没在有效期清除所有信息，重新登录*/
		async repetition_userinfo({
			commit
		}, sid) {
			let {
				data:res
			} = await this._vm.$http.get({
				url: '/topprogram/check-login',
				data: {
					sid,
				},
			})
			// console.log(res,'success');
			if (res.status != 200) return false;
			
			var JSON_data = JSON.parse(res.data)
			JSON_data['user_pone_Br'] = true;
			JSON_data['role_name_Br'] = true;
			// console.log(JSON_data);
			commit('userinfoMutations', JSON_data)
			
		},
		/* 用户点击登录 */
		async userinfo_actions(store, {
			e,code
		}) {
			// login().then(async dd => {
				console.log(e);
				console.log(code.code)
				var All_data = {
					...e.detail,
					code: code.code
				};
				/* 这个是 检测 用户是否绑定拓普数据库账号 */

				let {
					data: res
				} = await this._vm.$http.get({
					url: '/topprogram/login',
					data: All_data
				});
				
				if (res.status == -1) {
					uni.showToast({
						title:'请重新点击',
						icon:'none'
					})
					
					return false;
				}
				res.data =  JSON.parse(res.data)
				res.data.user_pone_Br = true;
				res.data['role_name_Br'] = true;
				store.commit('userinfoMutations', res.data) /* 保存用户信息， 以免直接绑定了手机号码*/
				
				uni.setStorage({ /* 存在本地方便 以后取*/
					key: 'sid',
					data: res.data.sid,
					success: (e) => {}
				})
				uni.setStorage({ /* 存在本地方便 以后取*/   /* 用户权限*/
					key: 'is_program_user',
					data: res.data.is_program_user,
					success: (e) => {}
				})
				/* 1 是小程序用户 
				 0 则是 数据库用户直接回我的详情页*/
				if (res.data.is_program_user == 1) {
					uni.navigateTo({
						url: '/pagesB/register/register_phone/register_phone'
					});
				} else {
					uni.showToast({
						title: '登录成功',
						icon: 'none',
						duration: 1000
					});
					uni.switchTab({
						url: '/pages/My/My'
					});
				}

			// });
		}
	}
})

export default store
