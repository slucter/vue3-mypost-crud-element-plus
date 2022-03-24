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
        <router-view />
    </div>
</template>

<script>
import MpCard from '@/components/MpCard/index.vue'
import CardSkeleton from '@/components/CardSkeleton/index.vue'
import { RouterView } from 'vue-router'
import { useStore } from 'vuex'
import { computed, onMounted, ref } from 'vue'
export default {
    components: { MpCard, CardSkeleton },
    name: 'Homes',
    setup () {
        const store = useStore()
        const isFetching = ref(true)
        const isNoData = ref(false)
        onMounted(() => {
            store.commit('global/OVERIDE_POSTS', [])
            loadData()
        })
        const loadData = async () => {
            try {
                await store.dispatch('global/getPostHome')
            } catch (error) {
                alert(error)
            } finally {
                isFetching.value = false
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
            loadData
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