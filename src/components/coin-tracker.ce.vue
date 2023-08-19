<script lang="ts" setup>

import { onMounted, ref } from "vue";
import { useCoinPrices } from "../composables/useCoinPrices"
import CoinCheck from "./coin-check.vue"
interface IProps {
    pair?: string;
    background?: string
}

const show = ref(false)
const props = defineProps<IProps>()

// Composables

const { btc, eth, date, setValues, pairCoin } = useCoinPrices()

// Variables
const btcPair = 'BTC-USD'
const ethPair = 'ETH-USD'


// Functions 

const setValuesOfPair = async () => {
    await Promise.all([setValues(btcPair), setValues(ethPair)])
    if (props.pair) {
        await setValues(props.pair)
    }
}



// Life cycle
onMounted(async () => {

    await setValuesOfPair()

    setInterval(async () => { await setValuesOfPair() }, 50000)
})
</script>

<template>
    <!-- <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/vuetify@3/dist/vuetify.min.css" />
    <link href="https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css" rel="stylesheet"> -->
    <section class="coin-tracker__container">

        <VBtn variant="outlined" color="primary">Click on me</VBtn>
        <v-tooltip v-model="show" location="top">
            <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props">
                    <v-icon color="grey-lighten-1">
                        mdi-cart
                    </v-icon>
                </v-btn>
            </template>
            <span>Programmatic tooltip</span>
        </v-tooltip>

        <h1 class="coin-tracker__main--title">Crypto Coins live statics</h1>
        <p>Last Updated: {{ date }}</p>

        <article class="article-container">

            <CoinCheck :background="background" :coin="btc" />
            <CoinCheck :background="background" :coin="eth" />
            <CoinCheck :background="background" v-if="pair" :coin="pairCoin" />
        </article>

    </section>
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