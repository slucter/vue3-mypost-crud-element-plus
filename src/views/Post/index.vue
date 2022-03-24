<template>
    <div class="mp-container">
        <el-skeleton class="w-full" :loading="isFetching" animated>
            <template #template>
                <el-row :gutter="20">
                    <el-col :span="24" v-for="index of 4" :key="index" style="padding-top: 10px;">
                        <card-skeleton />
                    </el-col>
                </el-row>
            </template>
            <template #default>
                <el-row v-if="isNoData">
                    <el-col :span="24">
                        <el-space direction="vertical" alignment="center">
                            <div class="text-common font-bold text-dark">
                                NO DATA FOUND
                            </div>
                        </el-space>
                    </el-col>
                </el-row>
                <el-row v-else :gutter="20">
                    <el-col :span="24" v-for="(data,index) in posts" :key="index" style="padding-top: 10px;">
                        <mp-card 
                            :card-data="data"
                            :my-data="false" 
                            edit-navigate="#"
                            :navigate="`/post/${data.id}`"
                        />
                    </el-col>
                </el-row>
            </template>
        </el-skeleton>
        <div ref="infiniteTrigger" style="height: 50px; width: 100%;"></div>
        <div class="w-full d-flex justify-center items-center" v-if="showPreloader">
            <el-icon class="is-loading" color="#0F6CC8" :size="40">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"></path></svg>
            </el-icon>
        </div>
        <router-view />
    </div>
</template>

<script>
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, ref, reactive } from 'vue'

import MpCard from '@/components/MpCard/index.vue'
import CardSkeleton from '@/components/CardSkeleton/index.vue'
export default {
    components: { MpCard, CardSkeleton },
    name: 'Homes',
    setup () {
        const store = useStore()
        const isFetching = ref(true)
        const isNoData = ref(false)
        let infiniteTrigger = ref(null)
        let showPreloader = ref(false)
        const params = reactive({
            _page: 0,
            _limit: 10,
        })
        onMounted(() => {
            store.commit('global/OVERIDE_POSTS', [])
            scrollTrigger()
        })

        const scrollTrigger = () => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.intersectionRatio > 0 && store.state.global.posts.length < 100) {
                        showPreloader.value = true
                        params._page += 1
                        loadData ()
                    } else {
                        showPreloader.value = false
                    }
                })
            })

            observer.observe(infiniteTrigger.value)
        }

        const loadData = async () => {
            try {
                await store.dispatch('global/getPostHome', params)
            } catch (error) {
                alert(error)
            } finally {
                isFetching.value = false
                showPreloader.value = false
                if (!store.state.global.posts || !store.state.global.posts.length) {
                    isNoData.value = true
                }
            }
        }
        const posts = computed(() => store.state.global.posts)
        return {
            posts,
            isFetching,
            isNoData,
            loadData,
            infiniteTrigger,
            scrollTrigger,
            showPreloader
        }
    }
}
</script>

<style scoped>
.mp-thumb-wrap {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
}
.mp-thumb-wrap > img {
    width: 100%;
    height: 100%;
}
</style>