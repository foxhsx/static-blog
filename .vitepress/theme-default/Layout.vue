<template>
  <div id="containerColor" :class="[pageClasses, themeMode]">
    <header class="navbar" v-if="showNavbar">
      <NavBar>
        <template #search>
          <slot name="navbar-search" />
        </template>
      </NavBar>
      <ToggleSideBarButton @toggle="toggleSidebar" />
    </header>
    <aside :class="{ open: openSideBar }">
      <SideBar>
        <template #top>
          <slot name="sidebar-top" />
        </template>
        <template #bottom>
          <slot name="sidebar-bottom" />
        </template>
      </SideBar>
    </aside>
    <HomeBg v-if="enableHome" />
    <!-- TODO: make this button accessible -->
    <div class="sidebar-mask" @click="toggleSidebar(false)" />
    <main class="home" aria-labelledby="main-title" v-if="enableHome">
      <Home>
        <template #hero>
          <slot name="home-hero" />
        </template>
        <template #features>
          <slot name="home-features" />
        </template>
        <template #footer>
          <slot name="home-footer" />
        </template>
      </Home>
    </main>
    <main v-else>
      <Page>
        <template #top>
          <slot name="page-top" />
        </template>
        <template #bottom>
          <slot name="page-bottom" />
        </template>
      </Page>
    </main>
      <div class="theme-select">
    <ul>
      <li @click="modeSelect('theme')" :class="themeMode == 'theme' ? 'active' : ''"> ☀️ </li>
      <li @click="modeSelect('theme themeDark')" :class="themeMode !== 'theme' ? 'active' : ''"> 🌑 </li>
    </ul>
  </div>
  </div>
  <Debug />
</template>

<script>
import { ref, computed, watch } from "vue";
import NavBar from "./components/NavBar.vue";
import Home from "./components/Home.vue";
import HomeBg from "./components/HomeBg.vue";
import ToggleSideBarButton from "./components/ToggleSideBarButton.vue";
import SideBar from "./components/SideBar.vue";
import Page from "./components/Page.vue";
import {
  useRoute,
  usePageData,
  useSiteData,
  useSiteDataByRoute,
} from "vitepress";

export default {
  updated() {
    this.modeSelect(localStorage.getItem("mode"));
  },
  mounted() {
    this.modeSelect(localStorage.getItem("mode"));
  },
  components: {
    Home,
    NavBar,
    ToggleSideBarButton,
    SideBar,
    Page,
    HomeBg
  },
  data() {
    return {
      themeMode: "theme",
    };
  },
  methods: {
    modeSelect(mode) {
      if (!!mode) {
        this.themeMode = mode;
        localStorage.setItem("mode", mode);
        document
          .querySelector("html")
          .style.setProperty(
            "background-color",
            this.themeMode === "theme" ? "#fff" : "#0d1117"
          );
      }
    },
  },
  setup() {
    const route = useRoute();
    const pageData = usePageData();
    const siteData = useSiteData();
    const siteRouteData = useSiteDataByRoute();

    const openSideBar = ref(false);
    const enableHome = computed(() => !!pageData.value.frontmatter.home);

    const showNavbar = computed(() => {
      const { themeConfig } = siteRouteData.value;
      const { frontmatter } = pageData.value;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        siteData.value.title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav
      );
    });

    const showSidebar = computed(() => {
      const { frontmatter } = pageData.value;
      const { themeConfig } = siteRouteData.value;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        ((typeof themeConfig.sidebar === "object" &&
          Object.keys(themeConfig.sidebar).length != 0) ||
          (Array.isArray(themeConfig.sidebar) &&
            themeConfig.sidebar.length != 0))
      );
    });

    const pageClasses = computed(() => {
      return [
        {
          "no-navbar": !showNavbar.value,
          "sidebar-open": openSideBar.value,
          "no-sidebar": !showSidebar.value,
        },
      ];
    });

    const toggleSidebar = (to) => {
      openSideBar.value = typeof to === "boolean" ? to : !openSideBar.value;
    };

    const hideSidebar = toggleSidebar.bind(null, false);
    // close the sidebar when navigating to a different location
    watch(route, hideSidebar);
    // TODO: route only changes when the pathname changes
    // listening to hashchange does nothing because it's prevented in router

    return {
      showNavbar,
      showSidebar,
      openSideBar,
      pageClasses,
      enableHome,
      toggleSidebar,
    };
  },
};
</script>
<style scoped>
.theme-select{
  width: 5rem;
  height: 2rem;
  display: inline-block;
  position: fixed;
  top: .7rem;
  right: .5rem;
  z-index: 10;
}
ul , li {
  list-style: none;
  margin: 0;
  padding: 0;
}
.theme-select li{
  flex: 1;
  text-align: center;
  line-height: 2rem;
  cursor: pointer;
  border-radius: .5rem 0 0 .5rem;
}
.theme-select li:nth-child(2n){
  border-left: 1px solid var(--border-color);
  border-radius:  0 .5rem .5rem 0 ;
}
.theme-select ul{
  overflow: hidden;
  width: 100%;
  height: 2rem;
  border-radius:.5rem;
  display: flex;
  border: 1px solid var(--border-color);
}
.active{
  background-color: antiquewhite;
}
</style>