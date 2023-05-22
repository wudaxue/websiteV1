<script setup lang="ts">
import { tab } from './const/index'

const tabList = ref(tab)
const activeTab = ref(0)

const changeTab = (item: { value: number }) => {
  activeTab.value = item.value
}

const questionMess = ref('')

const messageList = ref([
  {
    message: '什么叫意难平啊？',
    from: 'me',
    rate: null,
  },
  {
    message:
      '意难平，出自宋朝孙应时的《阻风泊归舟游净众寺》：“愁边动寒角，夜久意难平”，现演变成一个网络流行语，多指不能释怀、放不下，不甘心的感觉，念念不忘却没有回响。常常被用于形容令人遗憾惋惜的cp，渐渐沦为了一个常见的“虐梗”。',
    from: 'you',
    rate: null,
  },
])
</script>

<template>
  <div class="app-box flex justify-center text-white">
    <div class="app-wrapper">
      <Header></Header>
      <div class="container mt-[20px]">
        <div class="tab grid grid-cols-12 gap-x-5 gap-y-6">
          <div
            v-for="(item, index) in tabList"
            :key="index"
            :class="[
              `h-[120px] relative w-[96px] flex justify-center items-center flex-col cursor-pointer ${
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
          <div class="h-[120px] relative w-[96px] flex justify-center items-center flex-col ml-[-25px] cursor-pointer">
            <img src="@/assets/more-tab.png" class="h-[120px]" alt="" />
            <img src="@/assets/next.png" alt="" class="absolute top-[90px] mx-auto w-[9px]" />
          </div>
        </div>
        <div class="mt-[30px] flex">
          <div
            class="w-[120px] h-[40px] rounded-3xl bg-gradient-to-b from-[#00FFF0] to-[#028FF2] flex justify-center items-center cursor-pointer"
          >
            解忧
          </div>
          <div class="w-[40px] h-[40px] rounded-full bg-white ml-5 flex justify-center items-center cursor-pointer">
            <img src="@/assets/plus.png" class="w-[14px]" alt="" />
          </div>
        </div>
      </div>
      <div class="relative chatbox mt-[24px] overflow-hidden w-full p-[48px] h-[400px] overflow-y-auto">
        <div>
          <div class="message-box">
            <div v-for="(item, index) in messageList" :key="index" class="flex items-center mb-[30px]">
              <div>
                <!--  -->
                <div
                  :class="[
                    `w-[60px] h-[60px] rounded-full mr-[22px]  border-2 border-[#00FFF0] bg-cover ${
                      item.from === 'me' ? 'bg-white' : 'bg-[url(@/assets/user-logo.png)]'
                    }`,
                  ]"
                ></div>
              </div>
              <div class="flex-auto">{{ item.message }}</div>
              <el-rate v-model="item.rate" class="ml-[20px]" void-color="#00FFF0" />
            </div>
          </div>
          <div class="relative mt-[40px]">
            <el-input v-model="questionMess" class="question" size="small" placeholder="输入..." />
            <img src="@/assets/telegram.svg" alt="" class="absolute right-[40px] top-[25px] w-[30px] cursor-pointer" />
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
</style>
