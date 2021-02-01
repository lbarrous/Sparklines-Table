const compare = (a, b) => {
  return b.lastUpdate.lastChangeBid - a.lastUpdate.lastChangeBid;
};

/**
     * It sorts an array of elements using a custom comparing function
     *
     * @returns {array}
     */
const sortArray = array => {
  return array.sort(compare);
};

export default sortArray;
