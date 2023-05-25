import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  getMcDon,
  getKFC,
  getSushi,
  getUkCuisine,
  getPizza,
} from "../../api/api";
import CardList from "../CardList/CardList";

export default function Menu() {
  const [mcDonList, setMcDonList] = useState();
  const [kfcList, setKFCList] = useState();
  const [sushiList, setSushiList] = useState();
  const [ukCuisineList, setUkCuisineList] = useState();
  const [pizzaList, setPizzaList] = useState();

  const getMcDonList = async () => {
    const { data } = await getMcDon();
    setMcDonList(data.mcDonList);
  };
  const getKFCList = async () => {
    const { data } = await getKFC();
    setKFCList(data.kfcList);
  };
  const getSushiList = async () => {
    const { data } = await getSushi();
    setSushiList(data.sushiList);
  };
  const getUkCuisineList = async () => {
    const { data } = await getUkCuisine();
    setUkCuisineList(data.ukCuisineList);
  };
  const getPizzaList = async () => {
    const { data } = await getPizza();
    setPizzaList(data.pizzaList);
  };
  useEffect(() => {
    getMcDonList();
    getKFCList();
    getSushiList();
    getUkCuisineList();
    getPizzaList();
  }, []);

  return (
    <Tabs isFitted variant="enclosed">
      <TabList mb="1em">
        <Tab>McDonald's</Tab>
        <Tab>KFC</Tab>
        <Tab>Sushi</Tab>
        <Tab>Ukrainian Cuisine</Tab>
        <Tab>Italian Pizza</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CardList list={mcDonList} />
        </TabPanel>
        <TabPanel>
          <CardList list={kfcList} />
        </TabPanel>
        <TabPanel>
          <CardList list={sushiList} />
        </TabPanel>
        <TabPanel>
          <CardList list={ukCuisineList} />
        </TabPanel>
        <TabPanel>
          <CardList list={pizzaList} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
