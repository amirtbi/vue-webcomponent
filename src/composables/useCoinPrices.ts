import { fetchPrices } from "../Api/CoinApi";
import { reactive, ref } from "vue";
interface IPriceInfo {
  money: number;
  formatted: string;
  name: string;
}

export const useCoinPrices = () => {
  // Reactives
  const btc = reactive({} as IPriceInfo);
  const eth = reactive({} as IPriceInfo);
  const pairCoin = reactive({} as IPriceInfo);
  const date = ref("");
  const priceInfo = reactive({} as IPriceInfo);

  // Functions
  const addPricesInfo = (entries: any, pair: string) => {
    priceInfo.money = parseFloat(entries.data.amount);
    priceInfo.formatted = new Intl.NumberFormat("en-us", {
      style: "currency",
      currency: "USD",
    }).format(entries.data.amount);

    priceInfo.name = pair.split("-")[0];
  };

  const grabPrices = async (pair: string) => {
    try {
      const response = await fetchPrices(pair);
      const { data: result } = response;

      addPricesInfo(result, pair);
    } catch (e) {
      console.log("error", e);
    }
  };

  const setValues = async (value: string) => {
    try {
      const response = await grabPrices(value);

      if (value === "BTC-USD") {
        btc.name = priceInfo.name;
        btc.formatted = priceInfo.formatted;
        btc.money = priceInfo.money;
      } else if (value === "ETH-USD") {
        eth.name = priceInfo.name;
        eth.formatted = priceInfo.formatted;
        eth.money = priceInfo.money;
      } else {
        pairCoin.name = priceInfo.name;
        pairCoin.formatted = priceInfo.formatted;
        pairCoin.money = priceInfo.money;
      }

      date.value = new Date().toString();

      console.log("eth values", eth);
      console.log("btc values", btc);
    } catch (e) {
      console.log("error happened", e);
    }
  };

  return { grabPrices, setValues, eth, btc, date, pairCoin };
};
