<template>
  <app-navigator></app-navigator>
</template>

<script>
import { createAppContainer, createStackNavigator } from 'vue-native-router'

import Home from './screens/Home.vue'
import JoinChannel from './screens/JoinChannel.vue'
import Channel from './screens/Channel.vue'

const StackNavigator = createStackNavigator(
  {
    Home,
    JoinChannel,
    Channel: {
      screen: Channel,
      navigationOptions: {
        title: 'SEND IMAGES',
        headerLeft: null,
      },
    },
  },
  {
    initialRouteName: 'Home',
  }
)

const AppNavigator = createAppContainer(StackNavigator)

export default {
  components: { AppNavigator },
}
</script>
