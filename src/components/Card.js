import PowerStat from "./PowerStat";

export const Card = ({ hero, selectHero, selectedHeroes, winner }) => {
  const isSelected =
    selectedHeroes?.length > 0 &&
    !winner &&
    selectedHeroes.find((selectedHero) => selectedHero.id === hero.id);

  const isWinner = winner?.name === hero.name;

  const otherHero =
    winner && selectedHeroes?.find((element) => element.id !== hero.id);

  return (
    <li
      className={`px-3 py-3 border-solid rounded-md cursor-pointer bg-slate-900 ${
        isSelected || isWinner
          ? "border-green-500 border-[3px]"
          : "border-sky-900 border"
      }`}
      {...(selectHero && { onClick: () => selectHero(hero) })}
    >
      <div>
        <p
          className={`py-3 text-xl font-bold text-center  ${
            isWinner ? "text-green-500" : "text-zinc-400"
          }`}
        >
          {hero.name}
        </p>
      </div>

      <img className="h-25 w-25" src={hero.images.lg} alt={hero.name} />

      <div>
        <ul key="powerstats" className="text-zinc-400">
          <li className="py-2 text-lg font-bold text-center">PowerStats</li>

          {Object.keys(hero.powerstats).map((key) => (
            <PowerStat key={key} hero={hero} otherHero={otherHero} stat={key} />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default Card;
