<template>
	<view class="wraper">
		<wd-index-bar sticky>
			<view v-for="item in dataList" :key="item.index">
				<wd-index-anchor :index="item.index" />
				<wd-cell border clickable size="large" v-for="user in item.data" :key="user.id" :title="user.username"
					label="描述信息" @click="handleClick(user.id)">
					<template #icon>
						<view class="cell-icon">
							<uv-image :src="user.avator" width="84rpx" height="84rpx" shape="circle"></uv-image>
						</view>
					</template>
				</wd-cell>
			</view>
		</wd-index-bar>
	</view>
</template>

<script lang="ts" setup>
	import { ref, onMounted } from "vue";
	import { getList } from "@/apis/friends";
	const dataList = ref([
		{
			index: 'A',
			data: [{
				id: 1,
				username: 'Aaron',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 2,
				username: 'Alden',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 3,
				username: 'Austin',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 4,
				username: 'Avery',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 5,
				username: 'Agustin',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 6,
				username: 'Alan',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 7,
				username: 'Andrew',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 8,
				username: 'Adrian',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 9,
				username: 'Allen',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 10,
				username: 'Albert',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 11,
				username: 'Antonio',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 12,
				username: 'Arthur',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 13,
				username: 'Abraham',
				avator: '/static/images/avator/avator-ex1.jpg',
			},
			{
				id: 14,
				username: 'Alexander',
				avator: '/static/images/avator/avator-ex1.jpg',
			}]
		},
		{
			index: 'B',
			data: [{
				id: 15,
				username: 'Bart',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 16,
				username: 'Bernard',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 17,
				username: 'Barry',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 18,
				username: 'Bruce',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 19,
				username: 'Bernard',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 20,
				username: 'Barry',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 21,
				username: 'Bruce',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 22,
				username: 'Bernard',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 23,
				username: 'Barry',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 24,
				username: 'Bruce',
				avator: '/static/images/avator/avator-ex1.jpg'
			}]
		},
		{
			index: 'C',
			data: [{
				id: 25,
				username: 'Bart',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 26,
				username: 'Bernard',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 27,
				username: 'Barry',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 28,
				username: 'Bruce',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 29,
				username: 'Bernard',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 30,
				username: 'Barry',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 31,
				username: 'Bruce',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 32,
				username: 'Bernard',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 33,
				username: 'Barry',
				avator: '/static/images/avator/avator-ex1.jpg'
			}, {
				id: 34,
				username: 'Bruce',
				avator: '/static/images/avator/avator-ex1.jpg'
			}]
		},
	]);

	function handleClick(id : number) {
		console.log('点击了', id);

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