<template>
    <h2>決済フォーム</h2>
    <div id="payment_form"></div>
    <p>{{ data.result }}</p>
    <button type="button" @click="payment($event)">購入する</button>
  </template>
  
  <script setup>
  import { loadStripe } from '@stripe/stripe-js';
//   import { axios } from 'axios';
  import { reactive, onMounted } from 'vue';
  const props = defineProps({
    stripeKey: String
  });
  const data = reactive({
    stripe: null,
    cardForm: null,
    result: null,
  });
//   const payment = (event) => {
//     event.target.disabled = true;
//     event.target.innerText = '決済処理中';
    // data.stripe.createToken(data.cardForm).then((result) => {
    //   console.log(result)
    //   if(result.error) {
    //     data.result = result.error.message;
    //     event.target.disabled = false;
    //     event.target.innerText = '購入する';
    //   } else {
    //     axios.post('/api/*****', {
    //       token: result.token.id
    //     }).then(() => {
    //       event.target.remove();
    //     });
    //   }
    // }).then((error) => {
    //   return error;
    // });
//   }
  onMounted( async () => {
    data.stripe = await loadStripe(props.stripeKey);
    const stripeElements = data.stripe.elements();
    data.cardForm = stripeElements.create('card', { hidePostalCode: true });
    data.cardForm.mount('#payment_form');
  });
</script>
