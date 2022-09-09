<template>
  <div class="content">
    <router-view></router-view>
    <!-- <MCombobox
      :url="'https://cukcuk.manhnv.net/api/v1/CustomerGroups'"
      propValue="CustomerGroupId"
      propText="CustomerGroupName"
    ></MCombobox> -->
  </div>
</template>
<script>
export default {
  name: "TheContent",
  props: [],
  data() {
    return {};
  },
  components: {},
};
</script>
<style scoped>
@import url(../../css/layout/content.css);
</style>
