const state = {
	userData: null, // 用户数据
}

const mutations = {
	updateUserData(state, newVal) {
		state.userData = newVal
	}
}

export default {
	state,
	mutations
}
