<script setup>
import { ref } from "vue";

const mail = ref("");
const submit=ref("Send Mail")
</script>

<template>
  <div class="w-64 text-center ml-auto mr-auto mt-12">
      <div class="text-2xl mb-6 font-serif">Forgot Your Password?</div>
      
      <div>
          <input v-model="mail"  placeholder="Email"
                    class="border-solid border-2 border-slate-200 mb-4" />
      </div>
      <input
        type="submit"
        class="bg-slate-300 text-white mt-2 w-56"
        :value="submit"
      />
  </div>
</template>
