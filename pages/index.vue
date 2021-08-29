<template>
  <div class="container">
    <div>
      <Logo />
      <van-tabs v-model="active">
        <van-tab title="标签 1">
          内容 1
        </van-tab>
        <van-tab title="标签 2">
          内容 2
        </van-tab>
        <van-tab title="标签 3">
          内容 3
        </van-tab>
        <van-tab title="标签 4">
          内容 4
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  data () {
    return {
      active: 2
    }
  }
}
</script>

<style>
.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 30px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
