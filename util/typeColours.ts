export const getColourFromType = (type: string): string => {
  var result: string;

  switch (type) {
    case "electric":
      result = "#FFFF00";
      break;
    case "poison":
      result = "#9400D3";
      break;
    case "grass":
      result = "#008000";
      break;
    case "fire":
      result = "#FF8C00";
      break;
    case "water":
      result = "#0000FF";
      break;
    case "flying":
      result = "#00BFFF";
      break;
    case "psychic":
      result = "#FF00FF";
      break;
    case "bird":
      result = "#FFFAF0";
      break;
    case "ice":
      result = "#AFEEEE";
      break;
    case "flying":
      result = "#40E0D0";
      break;
    case "normal":
      result = "#708090";
      break;
    case "bug":
      result = "#9ACD32";
      break;
    case "rock":
      result = "#A0522D";
      break;
    case "ghost":
      result = "#778899";
      break;
    case "ground":
      result = "#F4A460";
      break;
    case "fairy":
      result = "#EE82EE";
      break;
    default:
      result = "black";
  }
  return result;
};
