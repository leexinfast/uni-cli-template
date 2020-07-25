// import user from '@/apis/user'
// import config from '@/apis/config'
// // 获取用户模型
// export const getUserData = ({
// 	commit
// }) => {
// 	return new Promise((resolve, reject) => {
// 		user.getUserInfo()
// 			.then(res => {
// 				commit('updateUserData', res)
// 				resolve(Object.assign({}, res))
// 			})
// 			.catch(e => {
// 				console.warn(e)
//                 reject()
// 			})
// 	})
// }
// // === ** 项目 action ** === //
//
// export const getConfig = ({
// 	commit
// }) => {
// 	return new Promise((resolve, reject) => {
// 		config.getConfig()
// 		.then(res =>{
// 			commit('updateConfig', res)
// 			resolve(Object.assign({}, res))
// 		})
// 	})
// }
