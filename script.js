Vue.component("player", {
  data: function () {
    return {
      buttonText: this.name, 
      codeNameFront: false 
    };
  },
  props: ["name", "Cname", "flipped"],
  methods: {
    flipFunction: function () {
      if (this.codeNameFront) {
        this.buttonText = this.name;
      } else {
        this.buttonText = this.Cname;
      }
      this.codeNameFront = !this.codeNameFront; 
      this.flipped = !this.flipped; 
    }
  },
  template: `<button v-on:click="flipFunction" v-bind:class="{backgroundFlip: flipped}">{{buttonText}}</button>` 
});


var app = new Vue({
  el: "#app",
  data: {
    name: "",
    age: "",
    email: "",
    comments: "",
    isNameValid: false,
    isAgeValid: false,
    isEmailValid: false,
    isCommentValid: true,
    message: "",
    nameMessage: "",
    ageMessage: "",
    emailMessage: "",
     list: [
      { name: "Protagonist", codename: "Joker", flipped: false },
      { name: "Anne", codename: "Panther", flipped: false },
      { name: "Ryuji", codename: "Skull", flipped: false }
    ]
  },
  methods: {
    validateEmail: function(email) {
      var emailvalid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailvalid.test(String(email).toLowerCase());
    }
  },
computed: {
    validate: function () {
      if (this.isNameValid && this.isAgeValid && this.isEmailValid && this.isCommentValid) {
        return this.message = "SUbmitted";
      } else {
        return this.message = "Not Submitted"
      }
    }
  },
  watch: {
    name: function() {
      console.log("name");
      if (this.name.length < 2) {
        // invalid
        this.isNameValid = false;
        this.nameMessage = "Must be at least 2 characters long.";
      } else {
        // valid
        this.isNameValid = true;
        this.nameMessage = "";
      }
    },
    age: function() {
      if (isNaN(this.age)) {
        this.isAgeValid = false;
        this.ageMessage = "Please enter a number.";
      } else {
        if (this.age < 18) {
          this.isAgeValid = false;
          this.ageMessage = "Must be 18 years old or older.";
        } else {
          this.isAgeValid = true;
          this.ageMessage = "";
        }
      }
    },
    email: function() {
      if(this.validateEmail(this.email)) {
        this.emailMessage = "";
      } else {
        this.emailMessage = "Please enter a valid email address.";
      }
      this.isEmailValid = this.validateEmail(this.email);
    }
  }
});