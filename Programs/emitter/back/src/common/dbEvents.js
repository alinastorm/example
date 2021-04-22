let events = {
  "002": {
    observables: ["003"],
    data: { body: "Idata" },
  },
};

const create = ({ key, event }) => {
  observer[key] = event;
};

const read = (key) => {
  console.log(events[key]);
  return events[key] ? JSON.stringify(events[key].data) : null;
};

const update = (key) => {
  return JSON.stringify(events[key]);
};

const del = (event) => {
  observer.filter((item) => item != event);
};

module.exports = { create, read, update, del };
