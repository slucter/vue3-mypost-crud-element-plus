<template>
  <el-container>
      <el-header class="bg-primary">
          <div class="mp-container">
              <el-row class="h-full">
                <el-col :span="12" class="d-flex items-center justify-start">
                    <router-link to="/"><div class="text-common text-light font-bold">{{ titlePage }}</div></router-link>
                </el-col>
                <el-col :span="12" class="d-flex items-center justify-end">
                    <el-space :size="20" wrap>
                        <router-link to="/liked-post">
                            <el-button type="text">
                                <el-space :size="10">
                                    <el-icon color="white" :size="20">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                        <g><path d="M498.8,148c18-14.4,34.2-29.4,52.4-41.7c58.1-39.2,122.5-55.1,192-44.5c97.1,14.9,167.5,68.5,213.3,154.3c24.9,46.7,34.4,97.1,33.5,150.2c-1,50-16.5,95.1-39.6,138.3c-22.2,41.4-49.7,79.1-79.6,115.2c-47.1,56.8-99.2,108.7-153.9,158.3c-59.1,53.5-121.2,103.4-184.9,151.3c-13.9,10.5-29,15.1-45.9,10c-6.4-2-12.7-5.3-18.1-9.3c-92.4-68.4-180.4-141.8-261.3-223.5c-46.9-47.4-91-97.1-128.2-152.8c-22.8-34.1-42.2-69.9-55.2-109c-8.8-26.6-11.8-54-12.9-81.9C5.3,239.2,81,121.3,196.8,77.4c87.3-33,170.9-22.7,249.8,27.2c18.1,11.3,34.3,25.1,49.2,40.6C497,146.5,498.5,147.7,498.8,148"/></g>
                                        </svg>
                                    </el-icon>
                                    <div class="text-common text-light font-medium">
                                        Favorite
                                    </div>
                                </el-space>
                            </el-button>
                        </router-link>
                        <router-link to="/admin" v-if="isAuthenticated">
                            <el-button type="primary" size="large">
                                <div class="text-common text-light font-medium">
                                    Admin
                                </div>
                            </el-button>
                        </router-link>
                        <router-link to="#" v-if="isAuthenticated">
                            <el-button @click.prevent="logout" type="primary" size="large">
                                <div class="text-common text-light font-medium">
                                    Logout
                                </div>
                            </el-button>
                        </router-link>
                        <router-link to="login" v-else>
                            <el-button type="primary" size="large">
                                <div class="text-common text-light font-medium">
                                    Login
                                </div>
                            </el-button>
                        </router-link>
                    </el-space>
                </el-col>
            </el-row>
          </div>
      </el-header>
      <el-main>
          <router-view />
      </el-main>
  </el-container>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { RouterView, RouterLink, useRouter, useRoute } from 'vue-router'

export default {
    setup () {
        let router = useRouter()
        let route = useRoute()
        let isAuthenticated = ref(true)

        onMounted(() => {
            isAuthenticated.value = localStorage.getItem('userMyPost') !== null ? true : false
        })
        const logout = () => {
            localStorage.clear()
            router.go()
        }
        let titlePage = computed(() => route.fullPath === '/admin' ? 'Admin' : 'Homepage')
        return {
            isAuthenticated,
            logout,
            titlePage
        }
    }
}
</script>

<style scoped>
</style>