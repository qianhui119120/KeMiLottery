<template>
    <div id="TopBar">
        <span>可米彩票</span>
        <el-button type="danger" size='mini' @click="loginOut">退出</el-button>
    </div>
</template>

<script>
export default {
    methods:{
        loginOut(){
            this.$confirm('您确定要退出吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
                this.$router.push({path:'/logIn'});
                this.$message({
                    type: 'success',
                    message: '退出成功!'
                });
            }).catch(() => {
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    #TopBar {
        width: 100%;
        height: 64px;
        color: rgb(214, 243, 84);
        font-size: 20px;
        background: rgb(42, 149, 175);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 20px;
        box-sizing: border-box;
    }
</style>
