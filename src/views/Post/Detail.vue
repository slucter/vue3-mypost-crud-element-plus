<template>
    <mp-dialog title="">
        <el-skeleton style="--el-skeleton-circle-size: 20px" class="w-full" :loading="isFetching" animated>
            <template #template>
                <el-space :size="10" wrap>
                    <el-skeleton-item variant="text" style="width: 100px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 500px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 120px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 120px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 120px; height: 20px"/>
                    <el-skeleton-item variant="text" style="width: 120px; height: 20px"/>
                </el-space>
            </template>
            <template #default>
                <el-space :size="10" wrap>
                    <div class="text-2xl text-dark font-bold">
                        {{ detail.title }}
                    </div>
                    <div class="text-commont text-gray font-medium">
                        {{ detail.body }}
                    </div>
                </el-space>
                <br><br>
                <el-divider content-position="left">Comments</el-divider>
                <el-space direction="vertical" alignment="start" :size="10">
                    <el-space 
                        :size="2" 
                        direction="vertical" 
                        alignment="start" 
                        class="border-bottom"
                        v-for="(data, index) in comments"
                        :key="index"
                        >
                        <el-space spacer="|">
                            <div class="text-common text-dark font-bold">
                                {{ data.nameClip }}
                            </div>
                            <a class="text-dark font-normal">
                                {{ data.email }}
                            </a>
                        </el-space>
                        <div class="text-commont text-gray font-medium">
                            {{ data.body }}
                        </div>
                    </el-space>
                </el-space>
            </template>
        </el-skeleton>
    </mp-dialog>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { ref, reactive, onMounted, computed } from 'vue'
import MpDialog from '@/components/MpDialog/index.vue'
export default {
    components: { MpDialog },
    setup () {
        const store  = useStore()
        const route = useRoute()
        const isFetching = ref(true)

        onMounted(async () => {
            loadData ()
        })
        const loadData = async () => {
            try {
                await store.dispatch('global/getPostDetail', route?.params?.id ?? 0)
                await store.dispatch('global/getCommentsByPost', route?.params?.id ?? 0)
            } catch (error) {
                alert(error)
            } finally {
                isFetching.value = false
            }
        }

        const detail = computed(() => store.state.global.postDetail)
        const comments = computed(() => store.state.global.comments)

        return {
            loadData,
            detail,
            comments,
            isFetching
        }
    }
}
</script>

<style lang="scss" scoped>

</style>