<template>
    <mp-dialog title="Edit Post">
        <el-form
            ref="ruleFormRef"
            label-position="top"
            label-width="100px"
            :model="form"
            :rules="rules"
        >
            <el-form-item label="Title" prop="title">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item label="Body" prop="body">
                <el-input type="textarea" v-model="form.body" />
            </el-form-item>
            <el-space :size="15">
                <el-button @click="submit(ruleFormRef)" type="primary" size="large">
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
        const ruleFormRef = ref(null)
        let form = reactive({
            userId: '',
            title: '',
            body: '',
            id: ''
        })
        let rules = reactive({
            title: [
                {
                    required: true,
                    message: 'Field Is Required',
                    trigger: 'blur'
                }
            ],
            body: [
                {
                    required: true,
                    message: 'Field Is Required',
                    trigger: 'blur'
                }
            ]
        })
        const submit = async (elmref) => {
            if (!elmref) return
            await elmref.validate(async (valid, fields) => {
                if (valid) {
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
            })
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
            submit,
            ruleFormRef,
            rules
        }
    }
}
</script>

<style lang="scss" scoped>

</style>