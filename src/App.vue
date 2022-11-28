<!--
 * @Author: PX
 * @Date: 2022-11-28 14:31:52
 * @LastEditTime: 2022-11-28 16:39:58
 * @LastEditors: PX
 * @Description:  
-->

<template>
  <div class="app-wrap">
    <div class="row salt">
      <span class="label salt-label">Salt:</span>
      <input
        class="input salt-input"
        type="text"
        placeholder=""
        v-model="salt"
      />
    </div>
    <div class="row salt">
      <span class="label salt-label">Ciphertext:</span>
      <input
        class="input salt-input"
        type="text"
        placeholder=""
        v-model="ciphertext"
      />
    </div>
    <div class="row">
      <button :class="['btn', btnDisabled ? 'disabled' : '']" @click="getSeed">
        {{
          btnDisabled
            ? 'Please enter salt value and ciphertext'
            : 'Click To Get Your Seed'
        }}
      </button>
    </div>
    <div class="row">
      <span class="label wrap"
        >Your Seed: <span class="tip">(Click To Copy)</span></span
      >
      <div class="seed" @click="copySeed">
        {{ seed }}
      </div>
    </div>
  </div>

  <!-- <RouterView /> -->
</template>
<script setup>
import { ref, computed } from 'vue'

let salt = ref('')
let ciphertext = ref('')
let seed = ref('')

const btnDisabled = computed(() => !salt.value || !ciphertext.value)

function getSeed() {
  if (btnDisabled.value) return
  try {
    let decode1 = atob(ciphertext.value)
    console.log(1, decode1)
    let decode1Filter = decode1.replace(salt.value, '')
    console.log(2, decode1Filter)
    seed.value = atob(decode1Filter)
    console.log(3, seed.value)
  } catch (err) {
    alert(err.message)
  }
}

function copySeed() {
  if (!seed.value) {
    alert('Please get your seed first.')
    return
  }
  var tag = document.createElement('input')
  tag.setAttribute('id', 'cp_zdy_input')
  tag.value = seed.value
  document.getElementsByTagName('body')[0].appendChild(tag)
  document.getElementById('cp_zdy_input').select()
  document.execCommand('copy')
  document.getElementById('cp_zdy_input').remove()
  alert('Successfully Copied')
}
</script>

<style lang="less">
.app-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (min-width: 962px) {
      margin-bottom: 30px;
      width: 600px;
    }
    @media screen and (max-width: 962px) {
      margin-bottom: 20px;
      flex-direction: column;
      width: 100%;
    }
    .label {
      font-size: 20px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      @media screen and (min-width: 962px) {
        flex: 0 0 120px;
      }
      @media screen and (max-width: 962px) {
        width: 100%;
        margin-bottom: 5px;
      }
    }
    .input {
      padding: 0 10px;
      outline: none;
      font-size: 20px;
      height: 40px;
      border: 1px solid #000;
      border-radius: 12px;
      @media screen and (min-width: 962px) {
        flex: 1;
      }
      @media screen and (max-width: 962px) {
        width: 100%;
      }
    }
    .btn {
      font-size: 20px;
      height: 40px;
      cursor: pointer;
      border-radius: 12px;
      outline: none;
      @media screen and (min-width: 962px) {
        flex: 1;
      }
      @media screen and (max-width: 962px) {
        width: 100%;
      }
      &:active {
        background-color: #fff;
        outline: none;
      }
    }
    .disabled {
      cursor: not-allowed;
      border-color: rgba(0, 0, 0, 0.623) !important;
      color: rgba(0, 0, 0, 0.574);
      font-size: 16px;
      &:active {
        background-color: rgb(239, 239, 239);
      }
    }
    .wrap {
      flex-wrap: wrap;
      .tip {
        white-space: nowrap;
        font-size: 15px;
      }
    }
    .seed {
      background-color: rgb(239, 239, 239);
      border-radius: 12px;
      cursor: pointer;
      border: 1px solid #000;
      padding: 12px;
      min-height: 40px;
      @media screen and (min-width: 962px) {
        flex: 1;
      }
      @media screen and (max-width: 962px) {
        width: 100%;
      }
    }
  }
}
</style>
