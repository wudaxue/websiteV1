<script setup lang="ts">
import { tab, MessageItem } from './const/index'
import Message from './Message.vue'

const questionMess = ref('')
const messages = ref<MessageItem[]>([])
const tabList = ref(tab)
const activeTab = ref(0)

const changeTab = (item: { value: number }) => (activeTab.value = item.value)

const sendMessage = () => {
  let messageLen = messages.value.length
  messages.value.push({ from: 'me', rate: 0, message: questionMess.value, key: messageLen++ })
  questionMess.value = ''
}

const changeRate = (message: MessageItem) => {
  messages.value = messages.value.map((item) => ({
    ...item,
    rate: item.key === message.key ? message.rate : item.rate,
  }))
}
</script>

<template>
  <div class="app-box flex justify-center text-white">
    <div class="app-wrapper">
      <Header></Header>
      <div class="container mt-[30px]">
        <div class="tab grid grid-cols-10 gap-x-5 gap-y-6">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="[
              `h-[140] relative w-[112px] flex-xy-center flex-col cursor-pointer ${
                activeTab === item.value ? 'active-tab' : 'normal-tab'
              }`,
            ]"
            @click="changeTab(item)"
          >
            <div
              :class="[`w-[80px] h-[80px] rounded-full bg-cover`]"
              :style="{ backgroundImage: `url(${item.img})` }"
            ></div>
            <div class="mt-[14px]">{{ item.label }}</div>
          </div>
          <div class="h-[140] relative w-[112px] flex-xy-center flex-col ml-[-25px] cursor-pointer">
            <img src="@/assets/more-tab.png" class="h-[140px]" alt="" />
            <img src="@/assets/next.png" alt="" class="absolute top-[70px] mx-auto w-[9px]" />
          </div>
        </div>
        <div class="mt-[40px] flex">
          <div
            class="w-[120px] h-[40px] rounded-3xl bg-gradient-to-b from-[#00FFF0] to-[#028FF2] flex-xy-center cursor-pointer"
          >
            解忧
          </div>
          <div class="w-[40px] h-[40px] rounded-full bg-white ml-5 flex-xy-center cursor-pointer">
            <img src="@/assets/plus.png" class="w-[14px]" alt="" />
          </div>
        </div>
      </div>
      <div class="relative chatbox mt-[30px] overflow-hidden w-full">
        <Message :list="messages" @change-rate="changeRate"></Message>
        <div class="sticky bottom-0 z-10 input-box">
          <div class="relative">
            <el-input
              v-model="questionMess"
              class="question"
              size="small"
              placeholder="输入..."
              @keyup.enter="sendMessage"
            />
            <img
              src="@/assets/telegram.svg"
              class="absolute right-[40px] top-[25px] w-[30px] cursor-pointer"
              @click="sendMessage"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.active-tab {
  background-image: url(@/assets/active-tab.png);
  background-size: cover;
}
.normal-tab {
  background-image: url(@/assets/normal-tab.png);
  background-size: cover;
}
.chatbox {
  border-radius: 10px;
  background: rgba(121, 121, 121, 0.3);
  border: 4px solid;
  border-color: #00fff0;
  border-left: 4px solid linear-gradient(to bottom, #028ff2, #00fff0);
  height: calc(100vh - 76px - 140px - 30px - 40px - 30px - 60px);
}
.question {
  border-radius: 16px !important;
  .el-input__inner {
    padding: 40px !important;
    padding-right: 80px !important;
  }
  .el-input__wrapper {
    border-radius: 16px !important;
  }
}
.input-box {
  width: 100%;
  padding-bottom: 48px;
  & > div {
    width: calc(100% - 96px);
    margin: auto;
  }
}
.message-box {
  overflow-y: auto;
  height: calc(100vh - 76px - 140px - 30px - 30px - 60px - 180px);
}

.message-box::-webkit-scrollbar {
  display: none !important;
}
</style>
