const compare = (a, b) => {
  if (a.lastUpdate.lastChangeBid < b.lastUpdate.lastChangeBid) {
    return -1;
  }
  if (a.lastUpdate.lastChangeBid > b.lastUpdate.lastChangeBid) {
    return 1;
  }
  return 0;
};

export default compare;
