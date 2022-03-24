<template>
    <el-skeleton style="--el-skeleton-circle-size: 20px" class="w-full" :loading="!cardDataCp ? true : false" animated>
        <template #template>
            <card-skeleton />
        </template>
        <template #default>
            <el-card shadow="hover">
                <el-row :gutter="20" class="mobile-gap">
                    <el-col :xs="24" :sm="8" :md="5">
                        <div class="mp-thumb-wrap">
                            <img src="http://staiyapistakalar.ac.id/wp-content/plugins/penci-pennews-portfolio/images/no-thumbnail.jpg" alt="thubnail">
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="11">
                        <el-space :size="10" wrap>
                            <router-link :to="navigate" class="text-2xl text-dark font-bold">
                                {{ cardDataCp.title }}
                            </router-link>
                            <div class="text-commont text-gray font-medium">
                                {{ cardDataCp.body }}
                            </div>
                        </el-space>
                    </el-col>
                    <el-col :xs="24" :sm="4" :md="8" class="d-flex justify-end items-center">
                        <el-space :size="15">
                            <el-button type="text" @click="addToFav">
                                <el-icon :color="handleColorFav" :size="30">
                                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">
                                    <g><path d="M498.8,148c18-14.4,34.2-29.4,52.4-41.7c58.1-39.2,122.5-55.1,192-44.5c97.1,14.9,167.5,68.5,213.3,154.3c24.9,46.7,34.4,97.1,33.5,150.2c-1,50-16.5,95.1-39.6,138.3c-22.2,41.4-49.7,79.1-79.6,115.2c-47.1,56.8-99.2,108.7-153.9,158.3c-59.1,53.5-121.2,103.4-184.9,151.3c-13.9,10.5-29,15.1-45.9,10c-6.4-2-12.7-5.3-18.1-9.3c-92.4-68.4-180.4-141.8-261.3-223.5c-46.9-47.4-91-97.1-128.2-152.8c-22.8-34.1-42.2-69.9-55.2-109c-8.8-26.6-11.8-54-12.9-81.9C5.3,239.2,81,121.3,196.8,77.4c87.3-33,170.9-22.7,249.8,27.2c18.1,11.3,34.3,25.1,49.2,40.6C497,146.5,498.5,147.7,498.8,148"/></g>
                                    </svg>
                                </el-icon>
                            </el-button>
                            <router-link :to="editNavigate" v-if="myData">
                                <el-button type="warning" circle>
                                    <el-icon color="white" :size="15">
                                        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"></path><path fill="currentColor" d="m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"></path></svg>
                                    </el-icon>
                                </el-button>
                            </router-link>
                            <el-popconfirm title="Are you sure to delete this?" @confirm="deleteAction">
                                <template #reference>
                                    <el-button type="danger" circle v-if="myData">
                                        <el-icon color="white" :size="15">
                                            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-ba633cb8=""><path fill="currentColor" d="M352 192V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64H96a32 32 0 0 1 0-64h256zm64 0h192v-64H416v64zM192 960a32 32 0 0 1-32-32V256h704v672a32 32 0 0 1-32 32H192zm224-192a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32zm192 0a32 32 0 0 0 32-32V416a32 32 0 0 0-64 0v320a32 32 0 0 0 32 32z"></path></svg>
                                        </el-icon>
                                    </el-button>
                                </template>
                            </el-popconfirm>
                        </el-space>
                    </el-col>
                </el-row>
            </el-card>
        </template>
    </el-skeleton>
</template>

<script>
import { ref, toRefs, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { RouterLink } from 'vue-router'
import CardSkeleton from '@/components/CardSkeleton/index.vue'
export default {
    components: { CardSkeleton },
    name: 'MpCardz',
    props: {
        cardData: Object || Null,
        myData: Boolean || Null,
        navigate: String || Null,
        editNavigate: String || Null,
    },
    setup (props, { emit }) {
        const cardDataCp = ref(null); 
        const store = useStore()

        let { myData, navigate, editNavigate } = toRefs(props)
        watch(
            () => props.cardData,
            (val) => cardDataCp.value = val,
            {
                immediate: true
            }
        )
        const handleColorFav = computed(() => cardDataCp?.value?.liked ?? false ?  'red' : 'gray')
        
        const addToFav = () => {
            if (cardDataCp?.value?.liked ?? false) {
                cardDataCp.value = {...cardDataCp.value, liked: false}
                let favItems = localStorage.getItem('favItems') || null
                let existingFav = !favItems ? [] : JSON.parse(favItems)
                let findIndex = existingFav.findIndex((x) => x.id === cardDataCp.value.id)
                existingFav.splice(findIndex, 1)
                localStorage.setItem('favItems', JSON.stringify(existingFav))
                emit('refresh')

            } else {
                cardDataCp.value = {...cardDataCp.value, liked: true}
                let favItems = localStorage.getItem('favItems') || null
                let existingFav = !favItems ? [] : JSON.parse(favItems)
                let news = [...existingFav, { ...cardDataCp.value, liked: true }]
                localStorage.setItem('favItems', JSON.stringify(news))
            }
        }

        const deleteAction = async () => {
            try {
                await store.dispatch('global/deletePostById', cardDataCp.value.id)
                ElNotification({
                    title: 'Success',
                    message: `Success Deleting Post ${cardDataCp.value.id}`,
                    type: 'success',
                })
            } catch (error) {
                alert(error)
            }
        }

        return {
            handleColorFav, 
            myData, 
            navigate, 
            editNavigate, 
            addToFav, 
            cardDataCp,
            deleteAction
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