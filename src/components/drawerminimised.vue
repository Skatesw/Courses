<script setup>
import Drawer_minimised_item_list from "./drawer_minimised_item_list.vue";
import { inject } from "vue";

const changeTab = inject('changeTab');

</script>

<template>
      <div class="bg-white w-auto h-full fixed left-0 top-0 rounded-r-xl z-2">
        <div class="flex justify-self items-center pt-5">
          <img src="/emb_csu.png" alt="CSU" />
        </div>
        <Drawer_minimised_item_list @tab-change="$emit('tab-change', $event)" />
  </div>
</template>