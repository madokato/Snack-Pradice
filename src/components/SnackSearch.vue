<script setup>
import { GetItem } from "../api/getItem";
import { PostCartItem } from "../api/postItem";
import { ref, computed } from "vue";
import SimpleTypeahead from "vue3-simple-typeahead";

let Snacks = ref([]);
let input = ref("");

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
const filteredList = computed(() => {
  return Snacks.value.filter((snack) => {
    return snack.name.toLowerCase().includes(input.value);
  });
});
</script>

<template>
  <!-- {{ Snacks.map((snack)=>snack.name) }} -->
  <!-- {{ Snacks }} -->
  <div class="w-1/6 mr-auto ml-auto mt-8">
    <vue3-simple-typeahead
      id="typeahead_id"
      placeholder="Search snacks..."
      :items="Snacks.map((snack) => snack.name)"
      :minInputLength="1"
      v-model="input"
      class="border-solid border-2 bg-white mt-2"
    >
    </vue3-simple-typeahead>
  </div>

  <div class="flex flex-wrap justify-center m-10">
    <div v-for="snack in filteredList" class="pr-10 pt-14">
      <div class="w-400 h-300">
        <p class="text-2xl text-center font-serif mb-2">{{ snack.name }}</p>
        <div class="w-60"><img :src="snack.img" class="h-40" /></div>
        <div class="flex justify-center mt-2">
          <span class="inline-block align-middle text-lg mr-2 mt-1"
            >${{ snack.price }}</span
          >
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
