<template>
  <view class="wraper">
    <wd-cell-group>
      <wd-cell
        clickable
        size="large"
        v-for="item in dataList"
        :key="item.id"
        :title="item.nickname"
        :label="item.last_msg"
        :value="timeToStr(item.last_time)"
        @click="handleClick(item)"
      >
        <template #icon>
          <view class="cell-icon">
            <uv-image
              :src="item.avator"
              width="84rpx"
              height="84rpx"
              shape="circle"
            ></uv-image>
          </view>
        </template>
      </wd-cell>
    </wd-cell-group>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getList } from "@/apis/friends";

const dataList = ref([]);
const total = ref(0);

function handleClick(data: any) {
  console.log(data);
}

function timeToStr(timestamp: number): string {
  if (!timestamp) {
    return "";
  }

  // 将时间戳转换为日期对象
  const date = new Date(timestamp);
  const now = new Date();

  // 获取今天的00:00时间戳
  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();

  if (timestamp >= todayStart) {
    // 如果是今天的时间，返回时分
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  } else {
    // 如果不是今天的时间，返回日期
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}/${month}/${day}`;
  }
}

onMounted(async () => {
  const { code, data, msg } = await getList();
  if (code !== 0) {
    dataList.value = [];
    uni.showToast({
      title: msg,
      icon: "none",
      duration: 1500,
    });
    return;
  }
  console.log("data:", data);

  dataList.value = data.rows;
  total.value = data.total;
});
</script>

<style>
.cell-icon {
  display: block;
  box-sizing: border-box;
  margin-right: 16rpx;
}
</style>

<style lang="scss">
.wraper {
  height: calc(100vh - var(--window-top));
  height: calc(100vh - var(--window-top) - constant(safe-area-inset-bottom));
  height: calc(100vh - var(--window-top) - env(safe-area-inset-bottom));
}
</style>
