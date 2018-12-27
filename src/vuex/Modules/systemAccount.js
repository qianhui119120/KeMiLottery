import axios from '@/tools/axios'
import apis from '@/apis'

const loadData = (commit,mutationName,payload)=>{
    axios.get(payload.api,{pageSize:payload.pageSize,pageNo:payload.pageNo}).then((resp)=>{
        // console.log(resp.data);
        commit(mutationName,resp.data)
    })
}


export default {
    state:{
        //
        allUsers:[],
        allRoles:[],
        allPermissions:[]
    },
    getters:{
        allUsers(state){
            return state.allUsers;
        },
        allRoles(state){
            return state.allRoles;
        },
        allPermissions(state){
            return window.toTree(state.allPermissions);
        }
    },
    mutations:{
        LOADALLUSERS(state,payload){
            state.allUsers = payload.allUsers;
        },
        LOADALLROLES(state,payload){
            state.allRoles = payload.allRoles;
        },
        LOADALLPerMISSIONS(state,payload){
            state.allPermissions = payload.allPermission;
        }
    },
    actions:{
        //获取所有账户信息,在accountManage的两个组件中调用
        //
        loadAllUsers({commit},payload){
            axios.get(apis.findAllUsers).then((resp)=>{
                // console.log(resp.data);
                commit("LOADALLUSERS",resp.data)
            })
        },
        loadAllRoles({commit},payload){
            loadData(commit,"LOADALLROLES",payload)
        },
        loadAllPermissions({commit},payload){
            loadData(commit,"LOADALLPerMISSIONS",payload)
        }
    }
}