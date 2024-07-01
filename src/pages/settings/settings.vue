<template>
	<view>
		<wd-cell :title="data.nickname" :label="data.desc" size="large">
			<template #icon>
				<view class="avator">
					<uv-image :src="data.avator" width="128rpx" height="128rpx" shape="circle"></uv-image>
				</view>
			</template>
		</wd-cell>
	</view>
</template>

<script lang="ts" setup>
	import { ref } from 'vue'

	const data = ref({
		id: 1,
		username: "guang",
		nickname: "光",
		desc: "描述信息",
		avator: '/static/images/avator/avator-ex1.jpg'
	})
</script>

<style>
	.avator {
		display: block;
		box-sizing: border-box;

		margin-right: 32rpx;
	}
</style>