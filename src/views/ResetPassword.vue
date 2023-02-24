<script setup>
import { ref } from "vue";
import { supabase } from "../supabase";
const passWord = ref("");
const submit = ref("Reset Password");
async function changePassword() {
  const { data, error } = await supabase.auth.updateUser({
    password: passWord.value
    
  });
}
</script>

<template>
  <div class="w-64 mr-auto ml-auto mt-32">
      <div class="text-center mb-2">NewPassword</div>
      <form action="" @submit.prevent="changePassword">
        <div class="text-center">
            <input
              v-model="passWord"
              placeholder="password"
              class="border-solid border-2 border-slate-200 mb-4 text-center w-48 "
            />
        </div>
        <div class="text-center"><input type="submit" class="border-solid bg-slate-300 text-white mb-4 p-1 w-48" v-model="submit" /></div>
      </form>
  </div>
</template>
