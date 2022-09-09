<template>
  <div>
    <div>
      <label for="">Họ và tên 1:</label>
      <input id="inputName" class="nvmanh" :class="{'border-red':!isValid}" @input="inputOnChange" type="text" v-model="name" /><br />
    
    </div>
    <div>
        {{upperCaseFullName}}<br/>
        {{methodUpperCaseFullName()}}
    </div>
    <ul>
        <li v-for="(customer,index) in customers" :key="customer.CustomerCode">{{index}} -- {{customer.CustomerCode}} - {{methodUpperCaseFullName(customer.FullName)}}</li>
       
    </ul>
    <!-- <div>
      <label for="">Họ và tên 2:</label>
      <input type="text" v-model="name" />
    </div> -->

    <div>
      <button @click="btnSaveOnClick">Lưu</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "CustomerList",
  components: {},
  props: ["fullName"],
  //1. beforeCreate
  beforeCreate() {
    console.log("1. beforeCreate");
  },
  created() {
    console.log("2. created");
    console.log(this.name);
    console.log(this.btnSaveOnClick);
  },
  beforeMount() {
    console.log("3. beforeMount");
    console.log(this.name);
    console.log(this.btnSaveOnClick);
  },
  mounted() {
    console.log("4. mounted");
    console.log(this.name);
    console.log(this.btnSaveOnClick);
    console.log(document.getElementById("inputName"));
  },
  beforeUpdate(){
    console.log("5. beforeUpdate");
    console.log(this.name);
    console.log(this.btnSaveOnClick);
  },

  updated() {
    console.log("6. updated");
    console.log(this.name);
    console.log(this.btnSaveOnClick);
  },

  beforeUnmount() {
    alert("beforeUnmount: "+ this.name)
  },

  unmounted() {
    alert("unmounted: "+ this.name)
  },
  methods: {
    btnSaveOnClick() {
     this.isShow = !this.isShow;
    },
    inputOnChange(){
        var name = this.name;
        if(name == "Hồ chí minh")
            this.isValid = false;
    },
    methodUpperCaseFullName(){
        // return this.name.toUpperCase();
    }
  },
  watch: {
    name: function(newValue, oldValue){
        console.log("Giá trị mới: "+newValue)
        console.log("Giá trị cũ: "+oldValue)
    }
  },
  computed: {
    upperCaseFullName:function(){
        return this.name.toUpperCase();
    },
   
  },
  data() {
    return {
      customers: [
        {CustomerCode:"KH001", FullName: "Nguyễn Văn Mạnh 1"},
        {CustomerCode:"KH002", FullName: "Nguyễn Văn Mạnh 2"},
        {CustomerCode:"KH003", FullName: "Nguyễn Văn Mạnh 3"},
        {CustomerCode:"KH004", FullName: "Nguyễn Văn Mạnh 4"},
      ],
      titlePage: "Danh sách khách hàng 2",
      number: 1,
      name: "Hồ chí minh",
      isShow: false,
      isValid: true,
    };
  },
};
</script>
<style scoped>
.border-red{
    border:1px solid #ff0000;
}
input{
    outline: none;
}
</style>