<script setup>
import { GetItem } from "../api/getItem";
import { PostCartItem } from "../api/postItem";
import { ref } from "vue";
import router from "@/router";

let Snacks = ref([]);
let input=ref("")

const GetSnacks = async () => {
  Snacks.value = await GetItem();
};
GetSnacks();

async function addCart(val) {
  await PostCartItem(val);
}

// function filterdList(){
//   return Snacks.value.filter((snack)=>
//   snack.includes(input.value)
//   )
// }
async function filteredList() {
  Snacks.value = await GetItem();
  return  Snacks.value.filter((snack) =>
    snack.toLowerCase().includes(input.value.toLowerCase())
  )
}
console.log("snack",Snacks.value)
// console.log(filteredList())
</script>

<template>
<div class="w-1/6 mr-auto ml-auto mt-8">
  <input type="text" v-model="input" placeholder="Search snacks" class="border-solid border-2 bg-white">

</div>

<!-- {{ filteredList() }} -->
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
