<template>
  <div id="encryptComp">
    <div id="encryptContainer">
      <fieldset>
        <legend>seed encrypt</legend>
        <ul>
          <li>
            Plain Hex Text:
            <input
              v-model="plain"
              type="text"
              name="plain"
              placeholder="Input a plain text"
            />
          </li>
          <li>
            mode:
            <select v-model="mode" @change="changeMode">
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
              <option value="Iso97971">Iso97971</option>
              <option value="AnsiX923">AnsiX923</option>
              <option value="Iso10126">Iso10126</option>
              <option value="ZeroPadding">ZeroPadding</option>
              <option value="NoPadding">NoPadding</option>
            </select>
          </li>
          <li>KEY: <input v-model="key" type="text" name="key" /></li>
          <li>IV: <input v-model="iv" type="text" name="iv" /></li>
          <li>
            Result: <span>{{ result }}</span>
          </li>
        </ul>
      </fieldset>
      <fieldset><button @click="encrypt">Encrypt</button></fieldset>
    </div>
  </div>
</template>

<script>
var selectMode = mode => {
  if (mode === "CBC") return CryptoJS.mode.CBC;
  else if (mode === "CFB") return CryptoJS.mode.CFG;
  else if (mode === "CTR") return CryptoJS.mode.CTR;
  else if (mode === "OFB") return CryptoJS.mode.OFB;
  else return CryptoJS.mode.ECB;
};

var selectPadding = padding => {
  if (padding === "PKCS5") return CryptoJS.pad.Pkcs5;
  else if (padding === "PKCS7") return CryptoJS.pad.Pkcs7;
  else if (padding === "Iso97971") return CryptoJS.pad.Iso97971;
  else if (padding === "AnsiX923") return CryptoJS.pad.AnsiX923;
  else if (padding === "Iso10126") return CryptoJS.pad.Iso10126;
  else if (padding === "ZeroPadding") return CryptoJS.pad.ZeroPadding;
  else return CryptoJS.pad.NoPadding;
};

export default {
  name: "encryptComp",
  data() {
    return {
      plain: "1234",
      mode: "CBC",
      padding: "PKCS7",
      key: "1234567890123456",
      iv: "",
      result: ""
    };
  },
  methods: {
    encrypt: function() {
      console.log("aaa");
      this.result = CryptoJS.SEED.encrypt(
        CryptoJS.enc.Hex.parse(this.plain),
        this.key,
        {
          iv: this.key,
          mode: selectMode(this.mode),
          padding: selectPadding(this.padding)
        }
      ).toString();
      this.$store.commit("setEncryptedStr", this.result);
      console.log(this.result);
    },
    changeMode: function() {
      this.mode === "ECB" && (this.padding = "NoPadding");
    }
  }
};
</script>

<style scoped>
#encryptComp {
  display: inline-block;
}
#encryptContainer {
  text-align: left;
}
ul {
  list-style-type: none;
}

fieldset {
  margin: 5px 2px;
  align-items: left;
  width: 450px;
}
</style>
