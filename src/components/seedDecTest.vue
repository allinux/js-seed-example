<template>
  <div id="decryptComp">
    <div id="decryptContainer">
      <fieldset>
        <legend>seed decrypt</legend>
        <ul>
          <li>
            Encrypted Text:
            <input
              v-model="enccryptedStr"
              type="text"
              name="plain"
              placeholder="Encrypted Text"
            />
          </li>
          <li>
            mode:
            <select v-model="mode">
              <option value="CBC">CBC</option>
              <option value="CFB">CFB</option>
              <option value="CTR">CTR</option>
              <option value="OFB">OFB</option>
              <option value="ECB">ECB</option>
            </select>
          </li>
          <li>
            padding:
            <select v-model="padding">
              <option value="PKCS5">PKCS5</option>
              <option value="PKCS7">PKCS7</option>
            </select>
          </li>
          <li>KEY: <input v-model="key" type="text" name="key" /></li>
          <li>IV: <input v-model="iv" type="text" name="iv" /></li>
          <li>
            Result: <span>{{ result }}</span>
          </li>
        </ul>
      </fieldset>
      <fieldset><button @click="decrypt">Decrypt</button></fieldset>
    </div>
  </div>
</template>

<script>
var selectMode = function(mode) {
  if (mode === "CBC") return CryptoJS.mode.CBC;
  else if (mode === "CFB") return CryptoJS.mode.CFG;
  else if (mode === "CTR") return CryptoJS.mode.CTR;
  else if (mode === "OFB") return CryptoJS.mode.OFB;
  else return CryptoJS.mode.ECB;
};

export default {
  name: "decryptComp",
  data() {
    return {
      mode: "CBC",
      padding: "PKCS7",
      key: "1234567890123456",
      iv: "",
      result: ""
    };
  },
  computed: {
    enccryptedStr: {
      get() {
        return this.$store.getters.getEncryptedStr;
      },
      set(value) {
        this.$store.commit("setEncryptedStr", value);
      }
    }
  },
  methods: {
    decrypt: function() {
      this.result = CryptoJS.SEED.decrypt(this.enccryptedStr, this.key, {
        iv: this.key,
        mode: selectMode(this.mode),
        padding:
          this.padding === "PKCS5" ? CryptoJS.pad.Pkcs5 : CryptoJS.pad.Pkcs7
      }).toString();
      console.log(this.result);
    }
  }
};
</script>

<style scoped>
#decryptComp {
  display: inline-block;
}
#decryptContainer {
  text-align: left;
}
ul {
  list-style-type: none;
}

fieldset {
  margin: 5px 2px;
  align-items: left;
  width: 350px;
}
</style>
