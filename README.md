<!--
 * @Author: PX
 * @Date: 2022-11-28 14:31:52
 * @LastEditTime: 2022-11-29 10:23:20
 * @LastEditors: PX
 * @Description:  
-->
# Know Your Seed

This project is used to encrypt and decrypt important strings such as passwords and mnemonics, and store your own passwords safely by backing up ciphertexts.
## Coding Principle

The salt value is mixed through Base64, and the encryption and decryption are performed twice to obtain the ciphertext and the real password in both directions.

## Instructions

The project is a pure script without using any requests and network connections.

### Get Ciphertext

* First find a salt value that you can remember.
* Fill in the salt value and the real password or mnemonic.
* Generate ciphertext.
* Backup your own ciphertext.

### Parse the ciphertext back to a password or mnemonic

* Fill in the salt value and back up the ciphertext.
* Parse the real password or mnemonic.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
