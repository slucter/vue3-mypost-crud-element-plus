<template>
    <mp-dialog title="Edit Post">
        <el-form
            label-position="top"
            label-width="100px"
            :model="form"
        >
            <el-form-item label="Title">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="Body">
                <el-input type="textarea" v-model="form.body" />
            </el-form-item>
            <el-space :size="15">
                <el-button @click="submitPost" type="primary" size="large">
                    Submit
                </el-button>
                <el-button type="default" size="large">
                    Cancel
                </el-button>
            </el-space>
        </el-form>
    </mp-dialog>
</template>

<script>
import MpDialog from '@/components/MpDialog/index.vue'
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter} from 'vue-router'
import { useStore } from 'vuex'

export default {
    components: { MpDialog },
    setup () {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        let form = reactive({
            userId: '',
            title: '',
            body: '',
            id: ''
        })
        
        const submitPost = async () => {
            try {
                await store.dispatch('global/editPostId', { id: route.params.id, field: form  } )
                ElNotification({
                    title: 'Success',
                    message: `Success Updating Post ${route.params.id}`,
                    type: 'success',
                })
                router.push({name: 'AdminPage'})
            } catch (error) {
                alert(error)
            }
        }

        onMounted(async () => {
            try {
                let res = (await store.dispatch('global/getPostDetail', route.params.id))
                for (let key in res) {
                    if (form.hasOwnProperty(key)) {
                        form[key] = res[key]
                    }
                }
            } catch (error) {
                alert(error)
            }
        })

        return {
            form,
            submitPost
        }
    }
}
</script>

<style lang="scss" scoped>

</style>