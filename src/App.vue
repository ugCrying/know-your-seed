<!--
 * @Author: PX
 * @Date: 2022-11-28 14:31:52
 * @LastEditTime: 2022-11-29 16:09:21
 * @LastEditors: PX
 * @Description:  
-->

<template>
  <div class="app-container">
    <div class="header">
      <span :class="[curType === 1 ? 'active' : '']" @click="changeType(1)"
        >Generate Ciphertext</span
      >
      <span :class="[curType === 2 ? 'active' : '']" @click="changeType(2)"
        >Get Seed</span
      >
    </div>
    <keep-alive>
      <Ciphertext v-if="curType === 1" />
      <Seed v-else />
    </keep-alive>
  </div>
  <!-- <RouterView /> -->
</template>
<script setup>
import { ref } from 'vue'
import Seed from '@/components/Seed.vue'
import Ciphertext from '@/components/Ciphertext.vue'

let curType = ref(1)

function changeType(type) {
  curType.value = type
}
</script>

<style lang="less">
.app-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  .header {
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (min-width: 962px) {
      font-size: 20px;
      margin-bottom: 30px;
      width: 600px;
    }
    @media screen and (max-width: 962px) {
      font-size: 20px;
      margin-bottom: 20px;
      width: 100%;
    }

    span {
      height: 100%;
      align-items: center;
      color: grey;
      cursor: pointer;
      flex: 0 0 50%;
      display: flex;
      text-align: center;
      justify-content: center;
      flex-wrap: wrap;
    }
    .active {
      font-size: 25px;
      font-weight: bold;
      color: #000;
    }
  }
}
</style>
