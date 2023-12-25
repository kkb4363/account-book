const utils = () => {
  const costFormatter = (cost) => {
    const formattedCost = cost.toString().replace(/\D/g, "");
    const costWithCommas = formattedCost.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return costWithCommas;
  };

  return { costFormatter };
};

export default utils;
