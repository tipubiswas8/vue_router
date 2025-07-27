<template>
  <div class="customer-layout">
    <!-- Sidebar -->
    <aside class="sidebar" :class="{ 'sidebar-collapsed': isSidebarCollapsed }">
      <div class="sidebar-header">
        <h2 v-if="!isSidebarCollapsed">Customer Panel</h2>
        <button @click="toggleSidebar" class="sidebar-toggle">
          <i :class="isSidebarCollapsed ? 'fas fa-angle-double-right' : 'fas fa-angle-double-left'"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link v-for="route in customerRoutes" :key="route.path" :to="`${basePath}/${route.path}`"
          active-class="active">
          <i :class="route.meta.icon"></i>
          <span v-if="!isSidebarCollapsed">{{ route.name }}</span>
        </router-link>
      </nav>

      <router-link style="display: flex; align-items: center; justify-content: center;"
        class="sidebar-header sidebar-nav" to="/">Go to Layout One</router-link>
      <router-link style="display: flex; align-items: center; justify-content: center;"
        class="sidebar-header sidebar-nav" to="/page-one">Go to Page One</router-link>
      <router-link style="display: flex; align-items: center; justify-content: center;"
        class="sidebar-header sidebar-nav" to="/page-two">Go to Page Two</router-link>
    </aside>

    <!-- Main Content -->
    <div class="main-content" :class="{ 'content-expanded': isSidebarCollapsed }">
      <!-- Navbar -->
      <header class="navbar">
        <div class="navbar-left">
          <button @click="toggleSidebar" class="menu-toggle">
            <i class="fas fa-bars"></i>
          </button>
          <h3>{{ currentRouteName }}</h3>
        </div>
        <div class="navbar-right">
          <div class="user-dropdown">
            <img src="../../assets//images//images.jpeg" height="50px" width="40px" alt="User">
            <span>{{ userName }}</span>
            <i class="fas fa-caret-down"></i>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <main class="content">
        <h6>Welcome to Customer Dashboard</h6>
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <!-- Footer -->
      <footer class="footer">
        <p>&copy; {{ currentYear }} Your Company. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const basePath = computed(() => {
  return route.matched[0]?.path || '';
});


const router = useRouter()
const route = useRoute()

const isSidebarCollapsed = ref(false)
const currentYear = new Date().getFullYear()
const userName = 'Customer User' // Replace with real user data

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value
}

const currentRouteName = computed(() => {
  return route.meta.title || route.name
})

// Define your customer routes here or import from your router config
const customerRoutes = computed(() => {
  return router.options.routes.find(r => r.path === '/layout-two')?.children || []
})
</script>

<style scoped>
.customer-layout {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* Sidebar Styles */
.sidebar {
  width: 250px;
  background-color: #e4f7b0;
  color: rgb(17, 240, 65);
  transition: all 0.3s ease;
  height: 100vh;
  position: fixed;
  overflow-y: auto;
}

.sidebar-collapsed {
  width: 70px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-toggle {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.2rem;
}

.sidebar-nav {
  padding: 10px 0;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: rgba(223, 21, 21, 0.8);
  text-decoration: none;
  transition: all 0.3s;
}

.sidebar-nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: rgb(117, 248, 10);
}

.sidebar-nav a i {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.sidebar-nav a.active {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
}

/* Main Content Styles */
.main-content {
  margin-left: 250px;
  flex: 1;
  transition: all 0.3s ease;
}

.content-expanded {
  margin-left: 70px;
}

.navbar {
  background-color: rgb(160, 107, 245);
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 15px;
}

.menu-toggle {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #555;
}

.user-dropdown {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.content {
  padding: 25px;
  min-height: calc(100vh - 120px);
}

.footer {
  padding: 15px 25px;
  text-align: center;
  color: #777;
  border-top: 1px solid #eee;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
