<template>
    <el-dialog
    v-model="openedDialog"
    :title="title"
    :width="windowWidth < 760 ? '100%' : '30%'"
    :before-close="handleClose"
  >
    <slot />
  </el-dialog>
</template>

<script>
import { ref, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router'
export default {
    props: {
        title: String
    },
    setup (props, context) {
        const { title } = toRefs(props)
        const openedDialog = ref(true)
        const router = useRouter()
        const handleClose = () => {
            router.go(-1)
        }
        return {
            openedDialog,
            title,
            handleClose,
            windowWidth: computed(() => window.innerWidth)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>