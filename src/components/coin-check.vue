<script lang="ts" setup>
import { toRefs, ref, watch } from 'vue'
import ArrowCheck from "./arrow-checkrer.vue"
interface IPriceInfo {
    money: number;
    formatted: string;
    name: string;
}

interface ICoin {
    coin: IPriceInfo
    background?: string
}


const showUp = ref(false)
const showDown = ref(true)

const showArrows = ref(false)
const props = defineProps<ICoin>()

const { coin } = toRefs(props)

watch(() => props.coin.money, (newValue, oldValue) => {
    showArrows.value = true
    if (newValue > oldValue) {
        showDown.value = false
        showUp.value = true
        showArrows.value = true
    } else if (newValue < oldValue) {
        showDown.value = true
        showUp.value = false
        showArrows.value = true
    } else if (newValue === oldValue) {
        showArrows.value = false
        showUp.value = false
        showDown.value = false
    }
})
</script>


<template>
    <transition mode="out-in">
        <article class="article-wrapper" :key="coin.money">
            <div class="coin-tracker bg-color">
                <h2 class="title">{{ coin.name }}


                    <ArrowCheck :show-down="showDown" :show-up="showUp" :show-arrow="showArrows" />
                </h2>

                <div>
                    <span>Current Value</span>
                    <p>{{ coin.money }}&nbsp;<small>{{ coin.name }}</small></p>
                </div>
                <div>
                    <span>USD current value</span>
                    <p>{{ coin.formatted }}</p>
                </div>
            </div>
        </article>
    </transition>
</template>


<style>
@import url(../../node_modules//vuetify/dist/vuetify.min.css);

.coin-tracker__container {
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    width: 600px;
    height: auto;
    padding: 2rem;
}

.coin-tracker__main--title {
    font-size: 14px;
    font-weight: bold;
    margin: 0.75rem;
}

.article-container {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;

}

artilce.article-wrapper {
    margin: 2rem;
}

.coin-tracker {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: 2px solid #eee;
    border-radius: 0.75rem;
    background-color: #ffff;
    margin: 2rem;
    padding: 1rem;
    box-shadow: 0px 3px 10px rgb(0 0 0 /0.2);
}

.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;

}

.title {
    display: flex;
}

.bg-color {
    background: v-bind(background)
}


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