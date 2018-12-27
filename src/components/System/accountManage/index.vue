<template>
    <div id="accountManage">
        <div class="accountContent">
            <div class="accountTop">
                <span>用户管理</span>
                <el-button type="primary" size="mini" @click="$router.push({name:'新增用户'})">新增</el-button>
            </div>
            <table>
                <tr>
                    <th>账号</th>
                    <th>id</th>
                    <th>操作</th>
                </tr>
                <tr v-for="(item,key) in allUsers" :key="key">
                    <td>{{item.username}}</td>
                    <td></td>
                    <td>
                        <template v-if="item.username != 'zmt'">
                           <span @click="deleteUser(item)" style="color:red">删除</span>
                            |
                            <span @click="editUser" style="color:blue">编辑</span>
                        </template>
                    </td>
                </tr>
            </table>
        </div>
        <router-view/>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    methods:{
        deleteUser(item){
            const action = () =>{
                this.post(this.$apis.deleteUser,{_id:item._id})
                .then(()=>{
                    this.$store.dispatch('loadAllUsers')
                })
                // this.$http.post(this.$apis.deleteUser,{_id:item._id})
                // .then((resp)=>{
                //     this.$store.dispatch('loadAllUsers')
                // })
            }
            this.operatorConfirm("删除该账号",action);
        },
        editUser(){}
    },
    computed:{
        ...mapGetters(["allUsers"])
    },
    created(){
        this.$store.dispatch("loadAllUsers")
    }
}
</script>

<style lang="scss" scoped>
    #accountManage {
        width: 100%;
        .accountContent {
            width: 80%;
            margin: 0 auto;
            box-shadow: 0 0 5px 5px #ccc;
            margin-top: 20px;
            .accountTop {
                width: 100%;
                height: 50px;
                border-bottom: 1px dashed black;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                span {
                    cursor: pointer;
                    flex: 3;
                    font-weight: bold;
                }
            }
            table {
                width: 100%;
                height: auto;
                tr{
                    height:50px;
                    line-height: 50px;
                    border-bottom: 1px solid rgb(112, 110, 110);
                    display: flex;
                    flex-direction: row;
                    th {
                        font-weight: bold;
                        flex: 1;
                    }
                    td {
                        flex: 1;
                        span {
                            cursor: pointer;
                        }
                    }
                }
            }
        }
    }
</style>
