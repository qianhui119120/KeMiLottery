<template>
    <div id="TopBar">
        <div class="logoBox">
            <div>
                <img src="../../../assets/logo.jpg" alt="">
            </div>
            <div>可米彩票</div>
        </div>
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
        .logoBox {
            width: 200px;
            height: 64px;
            color: wheat;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            div {
                flex: 1;
                width: 100px;
                height: 100%;
                img {
                    width: 85%;
                }
            }
        }
    }
</style>
