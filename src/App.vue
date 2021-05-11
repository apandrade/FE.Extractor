<template>
    <div id="nav">
      <Menubar :model="items" >
        <template #start>
          <div class="logo"><span id="black">EXTR</span><span id="yellow">ACTOR</span></div>
        </template>
      </Menubar>
    </div>
    <router-view />
</template>

<script>

export default {
    data: function() {
        return {
            items: [
                    {
                        label: 'Home',
                        icon: 'pi pi-home',
                        to: '/'
                    },
                    {
                        label: 'About',
                        icon: 'pi pi-info-circle',
                        to: '/about'
                    },
                ]
        }
    }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding-top: 60px;
}

#nav {
  position: fixed;
  width: 100%;
  top: 0;
  left:0;
  z-index: 9998;
}
#yellow {
  font-size: 28px;
  color: rgb(250, 187, 26);
}
#black {
  font-size: 28px;
  color: rgb(0, 0, 0);
}
.logo{
  margin-right: 30px;
  font-weight: bold;
}

#nav .p-menuitem-icon {
  font-weight: bold;
  color: rgb(250, 187, 26);
}
#nav .p-menuitem-text {
  font-weight: bold;
  color: black
}

.p-menubar-button {
  position: absolute;
  right: 0;
}
</style>
