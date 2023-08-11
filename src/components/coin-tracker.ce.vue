<script lang="ts" setup>
import { onMounted } from "vue";
import { useCoinPrices } from "../composables/useCoinPrices"
import CoinCheck from "./coin-check.vue"
interface IProps {
    pair?: string;
    background?: string
}


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
    <section class="coin-tracker__container">
        <h1 class="coin-tracker__main--title">Crypto Coins live statics</h1>
        <p>Last Updated: {{ date }}</p>

        <article class="article-container">

            <CoinCheck :background="background" :coin="btc" />
            <CoinCheck :background="background" :coin="eth" />
            <CoinCheck :background="background" v-if="pair" :coin="pairCoin" />
        </article>

    </section>
</template>

<style scoped>
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
</style>