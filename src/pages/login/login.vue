<template>
  <view class="content">
    <view class="head-box">
      <view class="head-title">登陆</view>
    </view>
    <view class="body-box">
      <uv-form ref="formRef" :model="formData" :rules="formRules">
        <uv-form-item prop="username">
          <uv-input
            v-model="formData.username"
            placeholder="请输入用户名"
            border="bottom"
            clearable
          />
        </uv-form-item>
        <uv-form-item prop="password">
          <uv-input
            password
            v-model="formData.password"
            placeholder="请输入密码"
            border="bottom"
            clearable
          />
        </uv-form-item>
        <uv-form-item style="margin-top: 68rpx">
          <uv-button
            :disabled="submitDisable"
            color="#00BE8C"
            shape="circle"
            :customStyle="{
              height: '80rpx',
              width: '630rpx',
              fontSize: '32rpx',
            }"
            @click="handleSubmit"
          >
            立即登陆
          </uv-button>
        </uv-form-item>
      </uv-form>
    </view>
  </view>
</template>

<script setup lang="ts">
import { ref, reactive, watch, getCurrentInstance } from "vue";
import { formRules } from "./utils/rule";
import { useAuthStore } from "@/store";

const router = useRouter();
const authState = useAuthStore();


const { ctx } = getCurrentInstance();
const treaty = ref([]);
const formRef = ref();
const formData = reactive({
  username: "",
  password: "",
});


const submitDisable = ref(true);


watch(formData, () => {
  submitDisable.value = !formData.username || !formData.password;
});


async function handleSubmit() {
  console.log("提交表单");
  await formRef.value.validate().then((valid) => {
    if (valid) {
      console.log("data: ", formData);
      uni.showLoading({
        title: "正在登陆",
      });

      authState.login(formData).then((res) => {
        uni.hideLoading();
        console.log("res: ", res);
        if (res) {
          ctx.$uv.toast("登陆成功");
          router.pushTab({ path: "pages/index/index" });
        }
      }).catch((e) => {
        uni.hideLoading();
        ctx.$uv.toast("登陆失败:" + e);
      });

      // setTimeout(() => {
      //   uni.hideLoading();
      //   ctx.$uv.toast("登陆成功");
      //   router.push({ name: "home" });
      // }, 1000);
    }
  });
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.head-box {
  width: 80%;
  margin-top: 100rpx;
  margin-bottom: 50rpx;
}

.head-title {
  font-size: 56rpx;
  color: #333333;
}

.head-desc {
  font-size: 26rpx;
  color: #999999;
}

.body-box {
  width: 80%;
}

.bottom {
  margin-top: 240rpx;
  width: 662rpx;
}
</style>
