<template>
    <div id="roleManage">
        <div class="roleLeft">
            <div class="roleHeader">
                <span>角色管理</span>
                <el-button type='primary' size="mini" @click="showAddNew=true">新增</el-button>
            </div>
             <table>
                <tr>
                    <th>角色名</th> 
                    <th>角色描述</th>
                    <th>操作</th>
                </tr>
                <tr v-for="item in allRoles" :key="item._id">
                    <td>{{item.roleName}}</td>
                    <td>{{item.roleDesc}}</td>
                    <td>
                        <template v-if="item.roleName != 'admin'">
                            <span style="color:red" @click="deleteRole(item)">删除</span>
                            |
                            <span style="color:blue" @click="editRole=item">编辑</span>
                        </template>
                    </td>
                </tr>
            </table>
        </div>
        <div class="roleRight">
            <transition name="slideDown">
                <addRole  v-if="showAddNew"/>
            </transition>
            <transition name="slideUp">
                <template v-if="showAddNew">
                    父传子的方法传值(传到editRole组件)
                    <editRole :roleInfo="editRole"/>
                </template>
            </transition>
        </div>  
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import addRole from './addRole'
import editRole from './editRole'
export default {
    components:{addRole,editRole},
    data(){
        return{
            showAddNew:false,
            editRole:{}
        }
    },
   computed: {
       ...mapGetters(["allRoles"])
   },
   methods: {
       deleteRole(item){
           const action = () =>{
               this.post(this.$apis.deleteRole,{_id:item._id}).then(()=>{
                   this.$store.dispatch('loadAllRoles',{api:this.$apis.findAllRoles,pageSize:10,pageNo:1})
               })
           }
           this.operatorConfirm("删除该角色",action);
       }
   },

}
</script>

<style lang="scss" scoped>
    .slideDown-enter-active,.slideDown-leave-active {
        transition: all 0.5s;
    }
    .slideDown-enter,.slideDown-leave-to {
        transform: translateY(0);
        opacity: 0;
    }
     .slideUp-enter-active,.slideUp-leave-active {
        transition: all 0.5s;
    }
    .slideUp-enter,.slideUp-leave-to {
        transform: translateY(0);
        opacity: 0;
    }
    #roleManage {
        width: 100%;
        height: 80%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        .roleLeft {
            flex: 1;
            width: 100%;
            margin: 20px 20px 20px 0;
            box-shadow: 0 0 5px 5px #ccc;
            .roleHeader {
                width: 100%;
                height: 50px;
                border-bottom: 1px dashed black;
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                span {
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
        .roleRight {
            flex: 1;
            width: 100%;
            margin: 0 auto;
            margin-top: 20px;
        }
    }
</style>
