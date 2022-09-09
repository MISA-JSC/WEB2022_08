<template>
    <button class="btn btn-test">{{text}}</button>
</template>
<script>
export default {
   name:"MButton",
   props:["text"]
}
</script>
<style scoped>
.btn{
    border-radius: 4px;
    background-color: #019160;
}
.btn-test{
    border: none;
}
</style>
