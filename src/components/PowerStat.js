import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const PowerStat = ({ stat, hero, otherHero }) => {
  return (
    <li className="text-justify">
      <span className="font-bold capitalize">{stat}: </span>
      <span className="text-yellow-200">
        {hero.powerstats[stat]}
        {otherHero &&
          (otherHero.powerstats[stat] > hero.powerstats[stat] ? (
            <ArrowDropDownIcon
              className="self-center text-red-500"
              fontSize="medium"
            />
          ) : (
            <ArrowDropUpIcon
              fontSize="medium"
              className="self-center text-green-500"
            />
          ))}
      </span>
    </li>
  );
};

export default PowerStat;
