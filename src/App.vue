<script setup>
import { RouterLink, RouterView } from "vue-router";
import { supabase } from "./supabase";
import { useAuthStore } from "./stores/auth";
import { watchEffect } from "vue";
const auth = useAuthStore();

supabase.auth.onAuthStateChange((event, session) => {
  if (event == "SIGNED_IN") auth.setUser(session.user);
  if (event == "SIGNED_OUT") auth.clearUser();
});

watchEffect(async () => {
  console.log("getsesstion");
  const {
    data: { session },
  } = await supabase.auth.getSession();

  
});

async function logout() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <header>
    <div class="flex">
      <p class="text-5xl mr-12 ml-10 mt-6">Snack Paradice</p>
      <nav class="mt-10">
        <ul class="flex">
          <li>
            <RouterLink to="/">Home|</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">About|</RouterLink>
          </li>
          <li v-if="!auth.isLoggedIn">
            <RouterLink to="/login">Login|</RouterLink>
          </li>
          <li v-if="auth.isLoggedIn">
            <RouterLink to="/login" @click="logout">Logout|</RouterLink>
          </li>
          <li>
            <RouterLink to="/cart"
              >
              <div class="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </div>
              </RouterLink>
          </li>
        </ul>
      </nav>
 
      <p class="mt-10 ml-40 text-2xl" v-if="auth.isLoggedIn">
        Hello {{ auth.user.user_metadata.name }}!!
      </p>
    </div>

  </header>

  <RouterView />
</template>
