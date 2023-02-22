<script setup>
import { GetCartItem } from "../api/getItem";
import { DeleteItem } from "../api/postItem";
import SnackQuantity from "../components/SnackQuantity.vue";
import { ref, reactive, computed } from "vue";
import router from "@/router";


const carts = ref([]);

const GetCart = async () => {
  carts.value = await GetCartItem();
};
GetCart();

const ChangeQuantity = (val) => {
  const findItem = carts.value.find((item) => item.id === val.tourId);

  findItem.quantity = val.quantity;
};
const caluculateTotal = computed(() => {
  return carts.value.reduce(
    (prev, current) => current.itemId.price * current.quantity + prev,
    0
  );
});

async function deleteItem(id) {
  await DeleteItem(id);
  carts.value=carts.value.filter((item) => item.id !== id);
}
</script>

<template>
  <div class="text-4xl mt-4 text-center">Cart</div>
  <div class="flex flex-wrap justify-between ml-20 mr-20 mt-10">
    <div
      v-for="cart in carts"
      class="flex border-solid border-2 m-2 w-128 p-3"
      :key="cart.id"
    >
      <div class="w-400 h-300 ml-10">
        <p class="text-xl">{{ cart.itemId.name }}</p>
        <div class="w-40"><img :src="cart.itemId.img" class="h-20" /></div>
      </div>
      <div>
        <p>Subtotal:${{ cart.itemId.price * cart.quantity }}</p>
        <div class="flex mt-6 ml-2">
          <SnackQuantity
            class="h-18 w-12 border-solid border-4 border-slate-200 bg-white p-1"
            :quantity="cart.quantity"
            :tourId="cart.id"
            @eventEmit="ChangeQuantity"
          />
          <div>
            <button
              class="border-solid rounded-lg bg-stone-200 ml-6 p-2"
              @click="deleteItem(cart.id)"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-2xl w-32 mx-auto text-center">
    Total:${{ caluculateTotal }}
  </div>

  <div class="w-32 mx-auto m-10">
    <router-link to="/payconfirm">
      <button class="border-solid rounded-md bg-emerald-400 w-32 p-2">
        Check
      </button>
    </router-link>
  </div>
</template>
