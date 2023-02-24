<script setup>
import { GetCartItem } from "../api/getItem";
import { DeleteItem, FinalCartItem } from "../api/postItem";
import { RouterLink } from "vue-router";
import SnackQuantity from "../components/SnackQuantity.vue";
import { ref, computed } from "vue";

const carts = ref([]);

const GetCart = async () => {
  // console.log("getcart")
  carts.value = await GetCartItem();
};
GetCart();

const ChangeQuantity = (val) => {
  const findItem = carts.value.find((item) => item.id === val.tourId);
  findItem.quantity = val.quantity;
  // console.log(carts.value)
};
const caluculateTotal = computed(() => {
  return carts.value.reduce(
    (prev, current) => current.itemId.price * current.quantity + prev,
    0
  );
});

async function deleteItem(id) {
  await DeleteItem(id);
  carts.value = carts.value.filter((item) => item.id !== id);
}

async function postCart() {
  // console.log("id",carts.value)
  await FinalCartItem(carts.value);
}
</script>

<template>
  <div
    v-if="carts.length === 0"
    class="w-1/2 mr-auto ml-auto text-center mt-24 text-2xl"
  >
    <p>Your Cart is empty</p>

    <RouterLink to="/"
      ><div class="underline underline-offset-1 pt-4">
        Seach Snacks
      </div></RouterLink
    >
  </div>
  <div v-else>
    <div class="text-4xl mt-4 text-center">Cart</div>
    <div class="flex flex-wrap justify-center ml-20 mr-20 mt-10">
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
      <router-link to="/payconfirm" @click="postCart">
        <button class="border-solid rounded-md bg-emerald-400 w-32 p-2">
          Check
        </button>
      </router-link>
    </div>
  </div>
</template>
