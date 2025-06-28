<template>
  <div>
    <div><span>产品名称：</span>
      <input type="text" name="productName" v-model="productName">
      <button @click="this.queryAllView">查询</button>
      <button @click="">添加</button>
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
          <td>{{edo.qualities.qualityDesc}}</td>
          <td>{{edo.productSum}}</td>
          <td>{{edo.productPrice}}</td>
          <td>
          <a href="" @click="">质检</a>
          <a href="" @click="">修改</a>
          </td>
        </tr>
      </template>
    </table>
    <a href="" @click="">首页</a>
    <a href="" @click="">上一页</a>
    <a href="" @click="">下一页</a>
    <a href="" @click="">末页</a>
    第？页/共？页
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      edos:[],
      productName:null
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.queryAllView()
  },

  methods: {
    queryAllView: function () {
      axios({
        url: "http://localhost:8081/queryAllView",
        method: "get",
        params: {productName: this.productName},
        data: {},

      }).then(res => {
this.edos=res.data;
      })
    }
  }
}

</script>

<style scoped>

</style>