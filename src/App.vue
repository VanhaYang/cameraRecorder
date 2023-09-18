<!-- <template >
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/logo.svg"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
</template> -->
<template>
  <div class="common-layout">
    <RouterView />
  </div>
</template>
<script setup>
import { RouterView } from 'vue-router';

// import { ref, onMounted } from 'vue';

// import sideBox from './views/aside-box.vue';
// let cameraList = ref([]);

// onMounted(() => {
// enumDevices().then((device) => {
//   cameraList = device;
// });
// });
// const enumDevices = () => {
//   return new Promise((resolve, reject) => {
//     navigator.mediaDevices
//       .enumerateDevices()
//       .then(function (devices) {
//         let videoArr = devices
//           .filter((device) => device?.kind == 'videoinput')
//           .map((device) => {
//             return {
//               label: device.label,
//               id: device.deviceId
//             };
//           });
//         resolve(videoArr);
//       })
//       .catch(function (err) {
//         layer.msg(err.name + ': ' + err.message);
//         reject();
//       });
//   });
// };
</script>
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
