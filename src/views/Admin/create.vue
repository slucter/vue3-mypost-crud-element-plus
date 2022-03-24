<template>
    <mp-dialog title="Create Post">
        <el-form
            label-position="top"
            label-width="100px"
            :model="form"
        >
            <el-form-item label="Title">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="Pos">
                <el-input type="textarea" v-model="form.body" />
            </el-form-item>
            <el-space :size="15">
                <el-button @click="submit" type="primary" size="large">
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
import { reactive } from 'vue'
import { useStore } from 'vuex'

export default {
    components: { MpDialog },
    setup () {
        let form = reactive({
            userId: '',
            title: '',
            body: ''
        })
        let store = useStore()
        const submit = async () => {
            form.userId = (JSON.parse(localStorage.userMyPost)).id
            try {
                await store.dispatch('global/createPost', form)
                ElNotification({
                    title: 'Success',
                    message: `Success Creating Post`,
                    type: 'success',
                })
            } catch (error) {
                alert(error)
            }
        }
        return {
            form,
            submit
        }
    }
}
</script>

<style lang="scss" scoped>

</style>