<template>
  <div>
    <div><span>产品名称：</span>
      <input type="text" name="productName" v-model="productName">
      <button @click="this.queryAllView(1)">查询</button>
      <button @click="this.toAdd">添加</button>
    </div>
    <table>
      <tr>
        <td colspan="7">产品信息列表</td>
      </tr>
      <tr>
        <th>产品名称</th>
        <th>生产日期</th>
        <th>产品描述</th>
        <th>质检结果</th>
        <th>生产数量</th>
        <th>产品价格</th>
        <th>操作</th>
      </tr>
      <template v-for="edo in edos">
        <tr>
          <td>{{edo.productName}}</td>
          <td>{{edo.productDate}}</td>
          <td>{{edo.productDesc}}</td>
          <td>{{edo.qualities?edo.qualities.qualityDesc:"暂无质检"}}</td>
          <td>{{edo.productSum}}</td>
          <td>{{edo.productPrice}}</td>
          <td>
          <a href="" @click="this.toQuality(edo)">质检</a>
          <a href="" @click="this.toUpdate(edo.productName)">修改</a>
          </td>
        </tr>
      </template>
    </table>
    <a href="javascript:;" @click="this.queryAllView(1)">首页</a>
    <a href="javascript:;" @click="this.queryAllView(2)">上一页</a>
    <a href="javascript:;" @click="this.queryAllView(3)">下一页</a>
    <a href="javascript:;" @click="this.queryAllView(4)">末页</a>
    第{{pageInfo.pageNum}}页/共{{pageInfo.pages}}页
    <select v-model="pageInfo.pageSize" @change="queryAllView(1)">
      <option value="1">1</option>
      <option value="5">5</option>
      <option value="10">10</option>
    </select>
    <span>条/页</span>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      pageInfo:{
        pageNum:1,
        pages:"",
        pageSize:1,
        prePage:"",
        nextPage:"",

      },
      edos:[],
      productName:null
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.queryAllView(1)
  },

  methods: {
    queryAllView: function (i) {
      var curPage=""
      switch (i){
        case 1:
          curPage=1;
          break;
        case 2:
          curPage=this.pageInfo.prePage
          break;
        case 3:
          curPage=this.pageInfo.nextPage
          break;
        case 4:
          curPage=this.pageInfo.pages
          break;
        default:

      }
      axios({
        url: "http://localhost:8081/queryAllView",
        method: "get",
        params: {productName: this.productName,curPage:curPage,pageSize:this.pageInfo.pageSize},
        data: {},

      }).then(res => {
this.edos=res.data.list;
this.pageInfo=res.data;
      })
    },
    toAdd:function (){
      this.$router.push("/add?productName="+this.productName)
    },
    toUpdate:function (productName){
      this.$router.push("/update?productName="+productName)
    },
    toQuality: function (edo) {
      // 数据验证
      if (!edo || !edo.productName) {
        alert("产品信息不完整，无法进行质检");
        return;
      }

      // 使用encodeURIComponent确保特殊字符正确传递
      const encodedName = encodeURIComponent(edo.productName);

      // 同时传递ID和名称，增加查询的可靠性
      this.$router.push({
        path: "/quality",
        query: {
          productName: encodedName,
          productId: edo.id  // 如果有ID也一并传递
        }
      });
    }
  }
}

</script>

<style scoped>

</style>