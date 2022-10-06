<template>
  <div class="flex flex-column h-full wrapper">
    <Title>WOLF MANSION Analyzer - ログイン</Title>
    <div class="flex-1 p-2 w-full max-w-full mx-auto h-full overflow-auto">
      <div class="w-full h-full">
        <p>
          WOLF MANSIONのアカウントでログインしてください。<br />
          （5回間違えるとログインできなくなります）
        </p>
        <FormTextField
          id="username"
          v-model:value="username"
          :has-error="false"
          :required="true"
          label="ユーザID"
          error-message=""
        />
        <FormPasswordField
          id="password"
          v-model:value="password"
          :has-error="false"
          :required="true"
          label="パスワード"
          error-message=""
        />
        <div>
          <ButtonPrimary
            label="ログイン"
            :disabled="username.length <= 0 || password.length <= 0"
            @click="submit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { login } from '~/components/api/login'
import { setBan, setPlayer } from '../components/auth/auth-cookie'
const username = ref('')
const password = ref('')
const count = ref(0)

const submit = async () => {
  const player = await login(username.value, password.value)
  if (player == null) {
    count.value = count.value++
  }
  if (count.value > 4) {
    setBan()
    location.reload()
  }
  setPlayer(player!.id, player!.name)
  location.href = '/'
}
</script>

<style lang="scss">
html,
body,
.container,
.wrapper {
  height: 100vh;
}
</style>
