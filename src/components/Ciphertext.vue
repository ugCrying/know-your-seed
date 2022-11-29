<template>
  <div class="cipher-comp">
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
      <span class="label salt-label">Seed:</span>
      <input
        class="input salt-input"
        type="text"
        placeholder=""
        v-model="seed"
      />
    </div>
    <div class="row">
      <button
        :class="['btn', btnDisabled ? 'disabled' : '']"
        @click="getCiphertext"
      >
        {{
          btnDisabled
            ? 'Please enter salt value and seed'
            : 'Click To Get Your Ciphertext'
        }}
      </button>
    </div>
    <div class="row">
      <span class="label wrap"
        >Your Ciphertext: <span class="tip">(Click To Copy)</span></span
      >
      <div class="seed" @click="copySeed">
        {{ ciphertext }}
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'

let salt = ref('')
let seed = ref('')
let ciphertext = ref('')

const btnDisabled = computed(() => !salt.value || !seed.value)

function getCiphertext() {
  if (btnDisabled.value) return
  try {
    const seedBase64 = btoa(encodeURIComponent(seed.value))
    const saltBase64Part = btoa(encodeURIComponent(salt.value)).replace('==', '')
    const seedBase64FlagIndex = Math.floor(Math.random() * 10) % seedBase64.length
    let mixBase64 = seedBase64.slice(0, seedBase64FlagIndex) + saltBase64Part + seedBase64.slice(seedBase64FlagIndex)
    console.log('mixBase64', mixBase64)
    ciphertext.value = btoa(mixBase64)
  } catch (err) {
    alert(err.message)
  }
}

function copySeed() {
  if (!ciphertext.value) {
    alert('Please get your ciphertext first.')
    return
  }
  var tag = document.createElement('input')
  tag.setAttribute('id', 'cp_zdy_input')
  tag.value = ciphertext.value
  document.getElementsByTagName('body')[0].appendChild(tag)
  document.getElementById('cp_zdy_input').select()
  document.execCommand('copy')
  document.getElementById('cp_zdy_input').remove()
  alert('Successfully Copied')
}
</script>

<style lang="less">
.cipher-comp {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
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
        flex: 0 0 170px;
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
      color: #fff;
      cursor: pointer;
      border-radius: 12px;
      outline: none;
      background-color: #000;
      @media screen and (min-width: 962px) {
        flex: 1;
      }
      @media screen and (max-width: 962px) {
        width: 100%;
      }
      &:active {
        background-color: #fff;
        outline: none;
        color: #000;
      }
    }
    .disabled {
      cursor: not-allowed;
      border-color: #000 !important;
      font-size: 16px;
      @media screen and (max-width: 962px) {
        font-size: 14px;
      }
      &:active {
        background-color: #000;
        color: #fff;
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
      word-break: break-all;
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
