<script>
import PostComponent from "@/components/NewPostComponent.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ProfileNewPost",
  components: { PostComponent },

});
</script>

<template>
  <PostComponent />
</template>