<template>
  <RouterView />
  <button @click="changeLanguage">RU | EN</button>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import { languageStore, PossibleLanguages } from './stores/lang'
const store = languageStore();

// Настройка языка
function changeLanguage() {
  store.language = store.language === PossibleLanguages.EN ? PossibleLanguages.RU : PossibleLanguages.EN;
}
</script>

<style>

</style>