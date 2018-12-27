<template>
    <div id="slidebar">
         <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
            <el-submenu v-for="(item,key) in accountPermissions" :index="key+' '" :key="item._id">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span @click="$router.push({name:item.permissionDesc})">{{item.permissionDesc}}</span>
                </template>
                <!-- 绑定的index 是上面index-这里元素的下标(插件里面的父子关系) -->
                <el-menu-item :index="key+'-'+index" v-for="(child,index) in item.children"
                :key="child._id" @click="$router.push({name:child.permissionDesc})">
                    {{child.permissionDesc}}
                </el-menu-item>
            </el-submenu>  
        </el-menu>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    computed:{
        ...mapGetters(['accountPermissions'])
    },
    methods:{
        
    }
}
</script>

<style lang="scss" scoped>
    #slidebar {
        width: 100%;
        height: 100%;
        .el-menu {
            border: none;
        }
    }
</style>
