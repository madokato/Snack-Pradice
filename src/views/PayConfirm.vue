<script setup>
import { GetCartItem } from "../api/getItem";
import {Postpayment} from "../api/postItem"
import { ref,computed } from "vue";

const carts = ref([]);

const GetCart = async () => {
  carts.value = await GetCartItem();
};
GetCart();


const caluculateTotal = computed(() => {
  return carts.value.reduce(
    (prev, current) => current.itemId.price * current.quantity + prev,
    0
  );
});

async function ClickPayment(){
await Postpayment(carts.value)
}

</script>

<template>
  <p class="text-2xl text-center mt-10 mb-5">Payment confirmation</p>
  <div class="w-1/2 ml-auto mr-auto border-2">
  <div
      v-for="cart in carts"
      class="w-1/2  ml-auto mr-auto"
      :key="cart.id"
    >
    <p class="text-xl text-center">{{ cart.itemId.name }}</p>
      <div class="flex p-3">
          <div class="w-400 h-300 ml-10">
            <div class="w-40"><img :src="cart.itemId.img" class="h-20" /></div>
              </div>
              <div>
                <span>
                <p>Quantity:{{ cart.quantity }}</p>
                            <p>Subtotal:${{ cart.itemId.price * cart.quantity }}</p>
                          
                          </span>
              </div>
      </div>
    </div>
    <div class="text-2xl w-32 mx-auto text-center">
    Total:${{ caluculateTotal }}
  </div>

</div>
<div class="w-32 mx-auto mt-4" @click="ClickPayment"><button class="bg-slate-400 rounded-xl text-white p-2 w-32">CHECK</button></div>
</template>
