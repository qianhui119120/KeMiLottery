<template>
    <div id="system">
        <ul>
            <li v-for="(item,key) in permissionList.children"
            @click="$router.push({name:item.permissionDesc})"
             :key="item._id">
                <i :class="['fa',manageIcons[key]]"></i>
                <span>{{item.permissionDesc}}</span>
            </li>
        </ul>
        <transition name="fade">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
    data(){
        return{
            manageIcons:['fa-user','fa-address-card','fa-lock']
        }
    },
    computed:{
        permissionList(){
            var permissionList = this.$store.getters['accountPermissions'];
            var obj = {};
            permissionList.forEach((ele) => {
                if (ele.permissionDesc == "系统管理") {
                    obj = ele;
                    return;
                }
            });
            return obj;
        }
    },
    created() {
        this.$store.dispatch('loadAllRoles',{api:this.$apis.findAllRoles,pageSize:10,pageNo:1});
        this.$store.dispatch('loadAllPermissions',{api:this.$apis.findAllPermission,pageSize:10,pageNo:1});
    },
}
</script>

<style lang="scss" scoped>
    #system {
        width: 100%;
        height: 100%;
        .fade-enter-active,.fade-leave-active{
            transition: all 0.5s;
        }
        .fade-enter,.fade-leave-to {
            transform: translateY(0);
            opacity: 0;
        }
        ul {
            width: 100%;
            display: flex;
            flex-direction: row;
            li {
                width: 100%;
                height: 140px;
                cursor: pointer;
                border-radius: 5px;
                margin: 5px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                &:nth-child(1){
                    background: linear-gradient(to right, rgb(168, 105, 54),rgb(164, 212, 32))
                }
                &:nth-child(2){
                    background: linear-gradient(to right, rgb(195, 91, 155),rgb(96, 117, 211))
                }
                &:nth-child(3){
                    background: linear-gradient(to right, rgb(219, 135, 109),rgb(74, 139, 192))
                }
                i {
                    font-size: 80px;
                    color: rgba(185, 221, 22, 0.746)
                }
                span {
                    color: rgb(143, 62, 62);
                    font-size: 20px;
                    font-weight: bold;
                }
            }
        }
    }
</style>
