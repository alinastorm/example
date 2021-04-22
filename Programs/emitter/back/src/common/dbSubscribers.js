let subscribers = {
  "001": {
    observables: ["002"],
    data: { body: "Idata" },
  },
};


const create = ({ key, event }) => {
  observer[key] = event;
};

const read = (key) => {
  return JSON.stringify(observer[key]["data"]);
};

const update = (key) => {
  return JSON.stringify(observer[key]);
};

const del = (event) => {
  observer.filter((item) => item != event);
};


module.exports = { create, read, update, del};
