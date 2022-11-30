<template>
  <div class="cipher-comp">
    <div class="row salt">
      <span class="label salt-label">Salt:</span>
      <input class="input salt-input" type="text" placeholder="" v-model="salt" @keyup.enter="getCiphertext" />
    </div>
    <div class="row salt">
      <span class="label salt-label">Seed:</span>
      <input class="input salt-input" type="text" placeholder="" v-model="seed" @keyup.enter="getCiphertext" />
    </div>
    <div class="row">
      <button :class="['btn', btnDisabled ? 'disabled' : '']" @click="getCiphertext">
        {{
            btnDisabled
              ? 'Please enter salt value and seed'
              : 'Click To Get Your Ciphertext'
        }}
      </button>
    </div>
    <div class="row">
      <span class="label wrap">Your Ciphertext: <span class="tip">(Click To Copy)</span></span>
      <div class="seed" @click="copySeed">
        {{ ciphertext }}
        <div class="copy-tip" v-if="showCopyTip">Copied!</div>
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
    const saltBase64Part = btoa(encodeURIComponent(salt.value)).replace(/=/g, '')
    const saltReverseBase64Part = btoa(encodeURIComponent(salt.value).split('').reverse().join('')).replace(/=/g, '')

    const splitIndex1 = Math.floor(Math.random() * 1000) % seedBase64.length
    const mix1 = seedBase64.slice(0, splitIndex1) + saltBase64Part + seedBase64.slice(splitIndex1)
    const mix1Base64 = btoa(mix1)

    const splitIndex2 = Math.floor(Math.random() * 1000) % mix1Base64.length
    const mix2 = mix1Base64.slice(0, splitIndex2) + saltReverseBase64Part + mix1Base64.slice(splitIndex2)

    ciphertext.value = btoa(mix2)
  } catch (err) {
    alert(err.message)
  }
}

let showCopyTip = ref(false)
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
  showCopyTip.value = true
  setTimeout(() => {
    showCopyTip.value = false
  }, 2000);
}
</script>

<style lang="less">
.cipher-comp {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 600px;
  .row {
    display: flex;
    // align-items: center;
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
      height: 40px;
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
      position: relative;

      @media screen and (min-width: 962px) {
        flex: 1;
      }

      @media screen and (max-width: 962px) {
        width: 100%;
      }

      .copy-tip {
        position: absolute;
        left: 0;
        bottom: -30px;
      }
    }
  }
}
</style>
