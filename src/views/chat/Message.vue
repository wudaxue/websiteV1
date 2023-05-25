<script lang="ts" setup>
import { MessageItem } from './const/index'

const messageEle = ref<HTMLDivElement | null>(null)
const emits = defineEmits(['change-rate'])

const props = defineProps({
  messageMap: {
    type: Object,
    default: () => {},
  },
})
watch(
  () => props.messageMap,
  () => scrollToBottom(),
)

onMounted(() => {
  scrollToBottom()
})

const scrollToBottom = async () => {
  await nextTick()
  if (!messageEle.value) return
  messageEle.value.scrollTo({ top: messageEle.value.offsetHeight }) // scroll to bottom
}

const changeRate = (item: MessageItem) => emits('change-rate', item)
</script>

<template>
  <div ref="messageEle" class="message-box px-[48px] pt-[48px]">
    <div v-for="(item, index) in Object.values(props.messageMap)" :key="index" class="flex items-center mb-[30px]">
      <div>
        <div
          :class="[
            `w-[60px] h-[60px] rounded-full mr-[22px]  border-2 border-[#00FFF0] bg-cover ${
              item.from === 'me' ? 'bg-white' : 'bg-[url(@/assets/user-logo.png)]'
            }`,
          ]"
        ></div>
      </div>
      <div class="flex-auto">{{ item.message }}</div>
      <el-rate v-model="item.rate" class="ml-[20px]" void-color="#00FFF0" @change="changeRate(item)" />
    </div>
  </div>
</template>
