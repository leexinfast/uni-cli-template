const state = {
	tabBar: [{
			"pagePath": "/pages/index/index",
			"text": "首页",
			"icon": "icon_home-in"
		},
		{
			"pagePath": "/pages/type/index",
			"text": "分类",
			"icon": "icon_classify-in"
		},
		{
			"pagePath": "/pages/goto/index",
			"text": "",
			"icon": "/static/img/icon_contact.png",
			"selectedIcon": "/static/img/icon_contact-in.png"
		},
		{
			"pagePath": "/pages/cart/index",
			"text": "购物车",
			"icon": "icon_cart-in",
			"num": 0
		},
		{
			"pagePath": "/pages/user/index",
			"text": "个人中心",
			"icon": "icon_my-in"
		}
	],
	tabBarIndex: 0
}

const mutations = {
	'changeTabBar'(state, tabBarIndex) {
		state.tabBarIndex = tabBarIndex
	},
	'UPDATE_CART_COUNT'(state, num) {
		state.tabBar[3].num = num
	}
}

export default {
	state,
	mutations
}