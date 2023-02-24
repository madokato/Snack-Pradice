<script setup>
import { GetItem } from "../api/getItem";
import { PostCartItem } from "../api/postItem";
import { ref } from "vue";
import router from "@/router";

let Snacks = ref([]);

const GetSnacks = async () => {
  Snacks.value = await GetItem();
};
GetSnacks();

async function addCart(val) {
  await PostCartItem(val);
  
}


</script>

<template>
  <div class="flex flex-wrap justify-center m-10">
    <div v-for="snack in Snacks" class="pr-10 pt-14">
      <div class="w-400 h-300">
        <p class="text-2xl text-center font-serif mb-2">{{ snack.name }}</p>
        <div class="w-60"><img :src="snack.img" class="h-40" /></div>
        <div class="flex justify-center mt-2">
          <span class="inline-block align-middle text-lg mr-2 mt-1">${{ snack.price }}</span>
          <div>
            <button
              to="/cart"
              @click="addCart(snack.id)"
              class="border-solid border-2 bg-slate-200 rounded-lg p-1"
            >
              AddCart
            </button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>
