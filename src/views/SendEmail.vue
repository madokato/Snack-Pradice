<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";

const mail = ref("");
const submit = ref("Send Mail");

async function sendEmail() {
  console.log(mail.value)
  try {
    const { error } = await supabase.auth.api.resetPasswordForEmail(
      'maka7816@yahoo.co.jp',
      {
        redirectTo: 'http:localhost:5173/SendEmail',
      }
    );
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div class="w-64 text-center ml-auto mr-auto mt-12">
    <div class="text-2xl mb-6 font-serif">Forgot Your Password?</div>
    <form action="" @submit.prevent="sendEmail">
      <div>
        <input
          v-model="mail"
          placeholder="Email"
          class="border-solid border-2 border-slate-200 mb-4"
        />
      </div>
      <input
        type="submit"
        class="bg-slate-300 text-white mt-2 w-56"
        :value="submit"
      />
    </form>
  </div>
</template>
