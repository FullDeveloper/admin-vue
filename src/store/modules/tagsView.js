const tagsView = {
  state: {
    visitedViews: [],
    cachedViews: []
  },
  // 定义转变
  mutations: {
    // 添加访问的页面
    ADD_VISITED_VIEWS: (state, view) => {
      // 如果传进来的页面的路径 等于已经访问的页面数组的路径 代表已经存在 不需要做任何操作 直接返回
      if (state.visitedViews.some(v => v.path === view.path)) return
      // 否则将该页面添加到拜访的页面数组中
      state.visitedViews.push({
        name: view.name,
        path: view.path,
        title: view.meta.title || 'no-name'
      })
      // 判断该页面是否需要进行缓存操作 如果需要将他的name缓存到缓存集合中
      if (!view.meta.noCache) {
        state.cachedViews.push(view.name)
      }
    },
    // 删除访问的页面
    DEL_VISITED_VIEWS: (state, view) => {
      // 遍历这个访问的页面数组
      for (const [i, v] of state.visitedViews.entries()) {
        // 如果当前访问的页面路径在改数组中存在
        if (v.path === view.path) {
          // 调用数组的splice方法 删除指定位置的元素 从数组中添加/删除项目，然后返回被删除的项目。
          // 第一个参数： 必需。规定添加/删除项目的位置，使用负数可从数组结尾处规定位置。
          // 第二个参数： 必需。要删除的项目数量。如果设置为 0，则不会删除项目。
          // 第三个参数： 可选。向数组添加的新项目。
          state.visitedViews.splice(i, 1)
          break
        }
      }
      // 遍历缓存的数组集合
      for (const i of state.cachedViews) {
        if (i === view.name) {
          // 拿到该访问的页面的名称对应数组的位置索引
          const index = state.cachedViews.indexOf(i)
          // 删除该元素
          state.cachedViews.splice(index, 1)
          break
        }
      }
    },

    // 删除其他的访问的页面
    DEL_OTHERS_VIEWS: (state, view) => {
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          // 删除当前访问的页面后面的所有元素
          state.visitedViews = state.visitedViews.slice(i, i + 1)
          break
        }
      }
      for (const i of state.cachedViews) {
        if (i === view.name) {
          const index = state.cachedViews.indexOf(i)
          state.cachedViews = state.cachedViews.slice(index, i + 1)
          break
        }
      }
    },

    // 删除所有的访问的页面
    DEL_ALL_VIEWS: (state) => {
      state.visitedViews = []
      state.cachedViews = []
    }
  },

  // 定义的操作
  actions: {
    addVisitedViews({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delOthersViews({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_OTHERS_VIEWS', view)
        resolve([...state.visitedViews])
      })
    },
    delAllViews({ commit, state }) {
      return new Promise((resolve) => {
        commit('DEL_ALL_VIEWS')
        resolve([...state.visitedViews])
      })
    }
  }
}

export default tagsView
