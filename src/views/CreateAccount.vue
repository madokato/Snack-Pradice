<script setup>
import { ref } from "vue";
import { CreateAccount } from "../api/login";

const name = ref("");
const eMail = ref("");
const passWord = ref("");

async function submit() {

  const newAccount = {
    name: name.value,
    eMail: eMail.value,
    passWord: passWord.value,
  };
  await CreateAccount(newAccount);
}
</script>

<template>
  <div class="m-24">
    <form class="text-center" @submit.prevent="submit">
      <div class="mb-2">Create account</div>
      <div>
        <input
          placeholder="First and last name"
          class="border-solid border-2 border-slate-200 mb-4"
          v-model="name"
        />
      </div>
      <div>
        <input
          placeholder="E-mail"
          class="border-solid border-2 border-slate-200 mb-4"
          v-model="eMail"
        />
      </div>
      <div>
        <input
          placeholder="Password"
          class="border-solid border-2 border-slate-200 mb-4"
          v-model="passWord"
        />
      </div>
      <div><button>Register</button></div>
    </form>
  </div>
</template>
