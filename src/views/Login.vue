<script setup>
import { ref } from "vue";
import { Login } from "../api/login";

const eMail = ref("");
const passWord = ref("");
const loading = ref(false);
const loginFail=ref("")

async function login() {
  loading.value = true;
  const response = await Login({
    eMail: eMail.value,
    passWord: passWord.value,
  });
  if (response) {
    loginFail.value="Check Email or Password"
  }
  loading.value=false
  }
</script>

<template>
  <div class="w-64 text-center ml-auto mr-auto mt-12">
    <form action="" @submit.prevent="login">
      <div>
        <p class="text-2xl">WELCOME BACK</p>
        <p class="text-slate-300 pb-4">LOG IN TO YOUR ACCOUNT BELOW</p>
        <div>
          <input
            v-model="eMail"
            placeholder="Email"
            class="border-solid border-2 border-slate-200 mb-4"
          />
        </div>
        <div>
          <input
            v-model="passWord"
            placeholder="password"
            class="border-solid border-2 border-slate-200 mb-4"
          />
        </div>
        <div>
            <div class="text-red-500 text-sm">{{ loginFail }}</div>
            <RouterLink to="/SendEmail"><button><p class="text-xs underline decoration-1 ml-32">Forgot password?</p></button></RouterLink>
          <input
            type="submit"
            class="bg-slate-300 text-white mt-2 w-56"
            :value="loading ? 'Loading' : 'LOGIN'"
          />
        </div>
      </div>
    </form>
    <div class="text-center">
        <RouterLink to="/CreateAccount"
          ><button class="text-sm">Create New Account</button></RouterLink
        >
    </div>
    
  </div>
</template>
