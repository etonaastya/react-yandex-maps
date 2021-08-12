import React, { useRef, useState } from "react";
import { Map, YMaps, ZoomControl } from "react-yandex-maps";
import { Button, Divider, Form, Select, Spin } from "antd";
import ports from "../../constants/ports.json";
import settlements from "../../constants/settlements.json";
import classes from "./Principal.module.css";

const { Option } = Select;

const Principal = () => {
  const [loading, setLoading] = useState(true);

  const [currentPortAddress, setCurrentPortAddress] = useState(
    ports[0].address
  );
  const [currentSettlementAddress, setCurrentSettlementAddress] = useState(
    settlements[0].address
  );

  const map = useRef(null);
  const [route, setRoute] = useState(null);
  const [ymaps, setYmaps] = useState(null);

  const drawRoute = () => {
    setLoading(true);
    if (!map) {
      return;
    }

    if (route) {
      map.current.geoObjects.remove(route);
    }

    const selectedPort = ports.find(
      ({ address }) => address === currentPortAddress
    );
    const selectedSettlement = settlements.find(
      ({ address }) => address === currentSettlementAddress
    );

    const newRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [
          [selectedPort.latitude, selectedPort.longitude],
          [selectedSettlement.latitude, selectedSettlement.longitude],
        ],
      },
      { boundsAutoApply: true }
    );

    setRoute(newRoute);
    map.current.geoObjects.add(newRoute);
    setLoading(false);
  };

  const onLoad = (ymaps) => {
    setYmaps(ymaps);
    setTimeout(() => setLoading(false), 2000);
  };

  const clear = () => {
    setCurrentPortAddress(ports[0].address);
    setCurrentSettlementAddress(settlements[0].address);
    map.current.geoObjects.remove(route);
  };

  return (
    <div className={classes.wrapper}>
      <Spin spinning={loading}>
        <YMaps query={{ apikey: "413dad6e-973a-4e11-8762-9dc7c6a6fb64" }}>
          <Map
            width="100%"
            height="600px"
            modules={["multiRouter.MultiRoute"]}
            defaultState={{ center: [-15.7797, -47.9297], zoom: 3 }}
            instanceRef={map}
            onLoad={onLoad}
          >
            <ZoomControl options={{ float: "right" }} />
          </Map>
        </YMaps>
        <Divider />
         <Form layout={"inline"}>
          <Form.Item label="Ports" name="port">
          <div className={classes.Select}>
          <div class="blocktext">
            <Select
              onSelect={setCurrentPortAddress}
              value={currentPortAddress}
              defaultValue={currentPortAddress}
            >
              {ports.map((port, index) => (
                <Option key={index} value={port.address}>
                  {port.address}
                </Option>
              ))}
            </Select></div>
            </div>
          </Form.Item>
          <Form.Item label="Settlements" name="settlement">
          <div className={classes.Select}>
          <div class="blocktext">
            <Select
              onSelect={setCurrentSettlementAddress}
              value={currentSettlementAddress}
              defaultValue={currentSettlementAddress}
            >
              {settlements.map((settlement, index) => (
                <Option key={index} value={settlement.address}>
                  {settlement.address}
                </Option>
              ))}
            </Select></div>
            </div>  
          </Form.Item>
          <div className={classes.Button}>
          <Button type="primary" htmlType="submit" onClick={drawRoute}>
          Build a route
          </Button>
          </div>
          <div className={classes.Button}>
          <Button type="danger" htmlType="submit" onClick={clear}>
          Clear
          </Button>
          </div>
        </Form>
      </Spin>
    </div> 
  );
};

export default Principal;
