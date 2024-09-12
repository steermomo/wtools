<template>
  <div id="home">
    <h1>导航页</h1>
    <ul>
      <li>
        <router-link to="/image-processor">图片灰度转换与二值化</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
};
</script>

<style>
#home {
  text-align: center;
  margin-top: 50px;
}

ul {
  list-style-type: none;
}

li {
  margin: 10px 0;
  font-size: 20px;
}
</style>
