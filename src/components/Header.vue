<template>
  <div class="header flex justify-between w-full text-white py-[24px] text-base font-medium">
    <div class="flex">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        :class="[`cursor-pointer ${index === 0 ? '' : 'ml-[190px]'} ${activeTab === item.value ? 'text-lg' : ''}`]"
      >
        {{ item.label }}
      </div>
    </div>
    <div class="flex">
      <span class="cursor-pointer">登录</span>
      <span class="mx-[20px]">|</span>
      <span class="cursor-pointer">注册</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
const tabList = ref([
  {
    value: 'ai',
    label: 'WILLINK.AI',
  },
  {
    value: 'home',
    label: '首页',
  },
  {
    value: 'about',
    label: '关于我们',
  },
])

const activeTab = ref('ai')
</script>
