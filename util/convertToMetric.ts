 export const formatToMetric = (value: number) => {
    let valInCM = value * 10;
    let valInM = valInCM / 100;
    return valInM
  }