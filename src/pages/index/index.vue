<template>
	<view class="wraper">
		<wd-cell-group>
			<wd-cell clickable size="large" v-for="item in dataList" :key="item.id" :title="item.nickname" :label="item.last_msg"
				:value="timeToStr(item.last_time)" @click="handleClick(item)">
				<template #icon>
					<view class="cell-icon">
						<uv-image :src="item.avator" width="84rpx" height="84rpx" shape="circle"></uv-image>
					</view>
				</template>
			</wd-cell>
		</wd-cell-group>
	</view>
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	const dataList = ref([
		{
			id: 1,
			nickname: "光1",
			username: "g",
			avator: '/static/images/avator/avator-ex1.jpg',
			last_time: 1718615859000,
			last_msg: "111"
		},
		{
			id: 2,
			nickname: "光2",
			username: "g",
			avator: '/static/images/avator/avator-ex1.jpg',
			last_time: 1718481840000,
			last_msg: "222"
		},
		{
			id: 3,
			nickname: "光3",
			username: "g",
			avator: '/static/images/avator/avator-ex1.jpg',
			last_time: 1718151185000,
			last_msg: "331"
		},
		{
			id: 4,
			nickname: "光4",
			username: "g",
			avator: '/static/images/avator/avator-ex1.jpg',
			last_time: 1717298165000,
			last_msg: "5555"
		}

	])
	
	function handleClick(data: any) {
		console.log(data)
	}

	function timeToStr(timestamp : number) : string {
		const date = new Date(timestamp);
		const now = new Date();

		// 获取今天的00:00时间戳
		const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

		if (timestamp >= todayStart) {
			// 如果是今天的时间，返回时分
			const hours = date.getHours().toString().padStart(2, '0');
			const minutes = date.getMinutes().toString().padStart(2, '0');
			return `${hours}:${minutes}`;
		} else {
			// 如果不是今天的时间，返回日期
			const year = date.getFullYear();
			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const day = date.getDate().toString().padStart(2, '0');
			return `${year}/${month}/${day}`;
		}
	}
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