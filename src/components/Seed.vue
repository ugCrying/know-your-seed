<template>
  <div class="seed-comp">
    <div class="row salt">
      <span class="label salt-label">Salt:</span>
      <input class="input salt-input" type="text" placeholder="" v-model="salt" @keyup.enter="getSeed" />
    </div>
    <div class="row salt">
      <span class="label salt-label">Ciphertext:</span>
      <input class="input salt-input" type="text" placeholder="" v-model="ciphertext" @keyup.enter="getSeed" />
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
      <span class="label wrap">Your Seed: <span class="tip">(Click To Copy)</span></span>
      <div class="seed" @click="copySeed">
        {{ seed }}
        <div class="copy-tip" v-if="showCopyTip">Copied!</div>
      </div>
    </div>
  </div>
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
    const saltBase64Part = btoa(encodeURIComponent(salt.value)).replace(/=/g, '')
    const saltReverseBase64Part = btoa(encodeURIComponent(salt.value).split('').reverse().join('')).replace(/=/g, '')
    console.log('saltBase64Part', saltBase64Part);
    console.log('saltReverseBase64Part', saltReverseBase64Part);
    const mix2 = atob(ciphertext.value)

    const mix1Base64 = mix2.replace(saltReverseBase64Part, '')
    const mix1 = atob(mix1Base64)

    const seedBase64 = mix1.replace(saltBase64Part, '')

    seed.value = decodeURIComponent(atob(seedBase64))
  } catch (err) {
    alert(
      'Encoding error, please check whether the salt value or ciphertext is correct.'
    )
  }
}

let showCopyTip = ref(false)
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
  showCopyTip.value = true
  setTimeout(() => {
    showCopyTip.value = false
  }, 2000);
}
</script>

<style lang="less">
.seed-comp {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  // min-height: 600px;

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
      height: 40px;
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
