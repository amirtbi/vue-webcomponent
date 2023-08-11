
<script lang="ts" setup>

interface IProps {
    showDown: boolean;
    showUp: boolean;
    showArrow: boolean
}

defineProps<IProps>()



</script>

<template>
    <div v-if="showArrow">

        <div v-if="showUp">
            <small id="arrow-up">Up</small>

        </div>

        <div v-else-if="showDown">
            <small id="arrow-down">Down</small>
        </div>
    </div>
</template>

<style scoepd>
#arrow-up {
    color: green;
    font-size: 12px;
    margin: 0 0.25rem;

}

#arrow-down {
    color: red;
    margin: 0 0.25rem;
    font-size: 12px;
}
</style>