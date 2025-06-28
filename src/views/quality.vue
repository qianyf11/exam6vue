<template>
  <div>
    <div class="quality-title">质检操作</div>
    <div class="quality-form">
      <div class="form-item">
        <span>产品名称：</span>
        <input type="text" v-model="productName" disabled />
      </div>
      <div class="form-item">
        <span>质检结果：</span>
        <select v-model="quality.qualityDesc">
          <option value="全部">全部</option>
          <option value="合格">合格</option>
          <option value="不合格">不合格</option>
        </select>
      </div>
      <div class="form-item">
        <span>质检备注：</span>
        <input type="text" v-model="quality.score" />
      </div>
      <div class="form-buttons">
        <button @click="submitQuality">提交</button>
        <button @click="goBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      productId: null,
      productName: "",
      quality: {
        productId: null,
        qualityDesc: "全部",
        score: ""
      }
    };
  },

  mounted() {
    // 获取URL参数中的产品名称
    this.productName = this.$route.query.productName;

    // 根据产品名称查询产品信息
    this.getProductInfo();
  },

  methods: {
    // 获取产品信息
    getProductInfo() {
      const productName = decodeURIComponent(this.$route.query.productName);
      const productId = this.$route.query.productId;

      console.log("查询参数:", { productName, productId });

      // 优先使用ID查询，如果有的话
      if (productId) {
        axios({
          url: "http://localhost:8081/getProductById",  // 需要后端实现此接口
          method: "get",
          params: { id: productId }
        }).then(this.handleProductResponse)
            .catch(this.handleProductError);
      } else {
        // 使用名称查询
        axios({
          url: "http://localhost:8081/queryById",
          method: "get",
          params: { productName }
        }).then(this.handleProductResponse)
            .catch(this.handleProductError);
      }
    },
// 处理产品响应
    handleProductResponse(res) {
      console.log("查询结果:", res.data);

      if (res.data && res.data.id) {
        this.productId = res.data.id;
        this.quality.productId = res.data.id;
        this.productName = res.data.productName || this.productName;
      } else {
        alert("获取产品信息失败: 未找到产品");
        this.$router.push("/");
      }
    },

// 处理错误
    handleProductError(error) {
      console.error("获取产品信息错误:", error);
      alert("获取产品信息失败: " + (error.response ? error.response.data : error.message));
      this.$router.push("/");
    },
    submitQuality() {
// 非空验证
      if (this.quality.qualityDesc === "全部") {
        alert("质检结果必选！");
        return;
      }

      // 将输入框值转换为数字
      if (this.quality.score === "" || this.quality.score === null || this.quality.score === undefined) {
        this.quality.score = 0; // 设置默认值
      } else {
        // 确保是数字类型
        this.quality.score = Number(this.quality.score);
      }

      // 确保productId已设置
      if (!this.quality.productId) {
        alert("产品信息未加载完成，请重试");
        return;
      }

      console.log("提交质检数据:", this.quality); // 添加日志

      axios({
        url: "http://localhost:8081/saveQuality",
        method: "post",
        data: this.quality,
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        console.log("提交结果:", res.data); // 添加日志
        if (res.data.success) {
          alert("质检提交成功");
          this.$router.push("/");
        } else {
          alert("质检提交失败：" + res.data.message);
        }
      }).catch(error => {
        console.error("提交质检错误:", error);
        alert("质检提交失败，请稍后重试: " + (error.response ? error.response.data : error.message));
      });
    },

    goBack() {
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
.quality-title {
  background-color: pink;
  padding: 10px;
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
}
.quality-form {
  width: 100%;
  border: 1px solid #ccc;
}
.form-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
}
.form-item span {
  width: 100px;
  text-align: right;
  margin-right: 10px;
}
.form-buttons {
  padding: 10px;
  text-align: center;
}
button {
  margin: 0 10px;
  padding: 5px 15px;
}
</style>