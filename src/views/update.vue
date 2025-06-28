<template>
  <div>
    <h1>修改产品信息</h1>
    <form class="centered-form">
      <div><span>产品名称：</span><input type="text" v-model="deoEntry.productName"></div>
      <div><span>产品描述:</span><textarea v-model="deoEntry.productDesc"></textarea></div>
      <div><span>生产数量:</span><input type="text" v-model="deoEntry.productSum"></div>
      <div><span>产品价格：</span><input type="text" v-model="deoEntry.productPrice"></div>
      <div><span>生产日期：</span><input type="text" v-model="deoEntry.productDate">yyyy-MM-dd</div>
    </form>
    <div class="button-group">
      <button @click="this.update">提交</button>
      <button @click="this.return">返回</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      deoEntry: {
        productPrice: "",
        productDate: "",
        productSum: "",
        productName: this.$route.query.productName,
        productDesc: "",
      }
    };
  },

  components: {},

  computed: {},

  mounted() {
    this.queryById();
  },

  methods: {
    update: function () {
      axios({
        url: "http://localhost:8081/update",
        method: "post",
        params: {},
        data: this.deoEntry,

      }).then(res => {
        if (res.data.code == 200) {
          this.$router.push("/")
        }
        alert(res.data.msg)
      })
    },
    return: function () {
      this.$router.push("/")
    },
    queryById:function (){
      axios({
        url: "http://localhost:8081/queryById",
        method: "get",
        params: {productName:this.$route.query.productName},
        data: {},

      }).then(res => {
        this.deoEntry = res.data;
      })
    }
  }
}

</script>

<style scoped>
.centered-form {
  width: 500px;
  margin: 0 auto;
}

form div {
  margin: 10px 0;
  display: flex;
  align-items: flex-start;
}

form span {
  display: inline-block;
  width: 80px;
  text-align: right;
  margin-right: 10px;
}

input, textarea {
  width: 250px;
}

.button-group {
  text-align: center;
  margin-top: 15px;
}

.button-group button {
  margin: 0 10px;
}
</style>