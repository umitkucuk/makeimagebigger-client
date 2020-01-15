<template>
  <view class="container">
    <view class="welcome-message">
      <image class="welcome-image" :source="require('../assets/welcome.png')" />
      <view class="welcome-title" :style="{margin: 20}">
        <text :style="{fontSize: 18}">Hoşgeldiniz 👋🏼</text>
        <text :style="{fontSize: 18}">Başlamak için bir kanala katılın 👇🏼</text>
      </view>
      <button title="Bir kanala katıl" color="#195479" @press="navigation.navigate('JoinChannel')" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    navigation: { type: Object },
  },
  components: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style>
.container {
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.welcome-message {
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.welcome-image {
  width: 300px;
  height: 300px;
}

.welcome-title {
  align-items: center;
}

.button-primary {
  display: flex;
  border-radius: 20px;
  background-color: #195479;
  padding: 20px;
}
</style>
