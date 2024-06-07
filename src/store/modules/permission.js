import { asyncRouterMap, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param role
 * @param route
 */
function hasPermission(role, route) {
    if (route.meta && route.meta.role) {
        // return roleArr.some(role => route.meta.role.includes(role))  //当给的角色权限为数组形式可采取该方式判断返回值
        return route.meta.role.includes(role)?true:false  //当角色权限为字符串时，采用该方式判断
    } else {
        return true
    }
}

/**
 * 将符合相应权限的路由表筛选出来
 * @param routes asyncRouterMap
 * @param role
 */
export function filterasyncRouterMap(routes, role) {
    const res = []
    routes.forEach(route => {
        const tmp = { ...route }
        if (hasPermission(role, tmp)) {
            if (tmp.children) {
                tmp.children = filterasyncRouterMap(tmp.children, role)
            }
            res.push(tmp)
        }
    })

    return res
}

const permission = {
    state: {
        routes: [],
        addRoutes: []
    },
    mutations: {
        SET_ROUTES: (state, routes) => {
            state.addRoutes = routes
            state.routes = constantRoutes.concat(routes)
        }
    },
    actions: {
        generateRoutes({ commit }, role) {
            return new Promise(resolve => {
                let accessedRoutes
                //如果角色是admin
                if (role.includes('BOSS')) {
                //将route.js中的admin权限人员可见的路由表加入，此处我们只有admin和editor两个角色
                    accessedRoutes = asyncRouterMap || []
                } else {
                    accessedRoutes = filterasyncRouterMap(asyncRouterMap, role) || []
                }
                commit('SET_ROUTES', accessedRoutes)
                resolve(accessedRoutes)
            })
        }
    }

}

export default permission
