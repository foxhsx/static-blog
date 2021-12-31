<template>
  <div>
     <footer class="page-edit">
      <a v-for="(item,index) in data.platform" :key="index" :href="item.href"><img class="imgIcon" :src="item.icon" ></a>
      </footer>
     <p class="platform"> Copyright &copy; 2020-2021 
       <a href="https://github.com/foxhsx">@foxhsx</a>
         ICP备案 
       <a href="https://beian.miit.gov.cn/" target="_blank">陕ICP备2021014688号-1</a>
     </p>
  </div>
</template>

<script>
import cnblogs from "../../images/cnblogs.png"
import jianshu from "../../images/jianshu.png"
import touch from "../../images/touch-icon.png"
import juejin from "../../images/juejin.png"
import csdn from "../../images/csdn.ico"
import wechat from "../../images/NTI4MWU5.ico"
import zhihu from "../../images/zhihu.png"
export default {
  setup(){
    const data = {
      platform:[
        {href:"https://www.zhihu.com/people/xiao-he-shang-14-8",icon:zhihu},
        // {href:"https://segmentfault.com/u/beishangriji",icon:touch},
        {href:"https://juejin.cn/user/4406498335130216",icon:juejin},
        // {href:"https://www.cnblogs.com/10ve/",icon:cnblogs},
        // {href:"https://www.jianshu.com/u/cdd6feed8104",icon:jianshu},
        {href:"https://blog.csdn.net/qq_42345237",icon:csdn},
        {href:"http://mp.weixin.qq.com/profile?src=3&timestamp=1625977695&ver=1&signature=8cOLLV1iVZQd5z4MUZdzIgVwTlyoNLqcZJnkMpaTID-Q0BQlpC1pzKu5pLAjLNvs1aoxpBeyB1F--mvqyT-vXg==",icon:wechat},
      ]
    }
    return{
      data
    }
  }
}
</script>

<style>
.platform{
  text-align: center;
  font-size: 14px;
}
.platform > a{
  color:  #2196f3;
}
.page-edit {
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.page-edit a {
  color: var(--text-color);
  margin-right: 0.25rem;
  display: inline-block;
  margin: 0 .2rem;
}
.imgIcon{
  width: 1.5rem;
  border-radius: 50%;
}
</style>
