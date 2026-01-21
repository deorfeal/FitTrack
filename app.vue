<script setup lang="ts">
const { userId, initAuth } = useUser();

initAuth();
</script>

<template>
  <div>
    <div v-if="!userId">Загрузка</div>
    <div v-else>Есть</div>
    <div v-if="!userId">Не залогинен такой</div>
  </div>
  <NuxtPage />
</template>

<!-- <template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template> -->
