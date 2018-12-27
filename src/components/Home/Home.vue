<template>
    <div id="Home">
        <el-container>
            <el-header style="height:64px;">
                <Topbar/>
            </el-header>
            <el-container>
                <el-aside width="200px">
                    <SlideBar/>
                </el-aside>
                <el-main>
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Topbar from './TopBar'
import SlideBar from './SlideBar'
export default {
    components:{Topbar,SlideBar}
}
</script>

<style lang="scss" scoped>
    #Home {
        width: 100%;
        height: 100%;
        .el-container {
            width: 100%;
            height: 100%;
            .el-header {
                background-color:#2a95af;
                text-align: center;
                line-height: 60px;
            }
            .el-aside {
                background-color: #D3DCE6;
                text-align: center;
                line-height: 100%;
            }
            .el-main {
                background-color: #E9EEF3;
                color: #333;
                text-align: center;
                line-height: 100%;
            }
        }
    }
   
  
  
</style>
