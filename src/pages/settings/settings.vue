<template>
  <view>
    <wd-cell :title="data.nickname" :label="data.desc" size="large">
      <template #icon>
        <view class="avator">
          <uv-image
            :src="data.avator"
            width="128rpx"
            height="128rpx"
            shape="circle"
          ></uv-image>
        </view>
      </template>
    </wd-cell>
    <view style="margin-top: 30rpx">
      <wd-cell-group>
        <wd-cell title="注销" is-link @click="logout" icon="logout" />
      </wd-cell-group>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useAuthStore } from "@/store";

const authState = useAuthStore();

const data = ref({
  id: 1,
  username: "guang",
  nickname: "光",
  desc: "描述信息",
  avator: "/static/images/avator/avator-ex1.jpg",
});

function logout() {
  uni.showModal({
    title: "退出登录",
    content: "是否确认退出登录？",
    success: (res) => {
      if (res.confirm) {
        uni.showLoading({
          title: "正在退出",
        });

		authState.logout();
        uni.reLaunch({
          url: "/pages/login/login",
        });
        uni.hideLoading();
        console.log("退出登录");
      }
    },
  });
}
</script>

<style>
.avator {
  display: block;
  box-sizing: border-box;

  margin-right: 32rpx;
}
</style>
