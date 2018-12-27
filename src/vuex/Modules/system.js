
const toTree = (item)=>{
    var obj = {};
    var length = item.length;
    for(let i=0;i<length;i++){
      //获取单个权限对应的元素
      var permission = item[i];
      //如果该权限的id为0,那么他就是顶层权限,应该有子权限
      if (!permission.parentid) {//permission.parentid == 0
        // 为该权限创建子权限
        permission.children = [];
        //以改权限的id为属性名,该权限作为值,存储到obj中
        // 为了子权限可以通过该属性名来找到父级权限
        obj[permission._id] = permission;
      }
    }
    for (let i = 0; i < length; i++) {
      var permission = item[i];
      for(let key in obj){
        if (permission.parentid == key) {
          obj[key].children.push(permission);
        }
      }
    }
    var arr = [];
    for(let key in obj){
      arr.push(obj[key]);
    }
    return arr;
  }
//注册全局的函数toTree
  window.toTree = toTree;
export default {
    state: {
        accountPermissions:[],
        accountRoles:[]
      },
      getters:{
        accountPermissions(){
          return toTree(JSON.parse(localStorage.getItem('accountInfo')).permissions);
        },
        accountRoles(){
          return JSON.parse(localStorage.getItem('accountInfo')).roles;
        }
      },
    mutations:{

    },
    actions:{

    }
}