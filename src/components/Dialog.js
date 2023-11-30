import DialogTitle from "@mui/material/DialogTitle";
import MDialog from "@mui/material/Dialog";
import Button from "./Button";
import Card from "./Card";

const Dialog = ({ heroes, open, handleClose }) => {
  const calculateCombatPower = heroes?.reduce((acc, hero) => {
    const combatPower = Object.values(hero.powerstats).reduce((acc, value) => {
      acc += value;
      return acc;
    }, 0);

    acc.push({ name: hero.name, combatPower });

    return acc;
  }, []);

  const winner = calculateCombatPower.reduce(
    (acc, hero) => {
      if (hero.combatPower > acc.combatPower) {
        acc = hero;
      }
      return acc;
    },
    { combatPower: 0 }
  );

  return (
    <MDialog
      onClose={() => handleClose()}
      open={open}
      className="bg-slate-950/90"
    >
      <Button onClick={() => handleClose()}>Close</Button>
      <DialogTitle className="text-center text-white bg-slate-950">
        Winner: <strong className="text-green-500">{winner.name}</strong>
      </DialogTitle>
      <ul className="flex flex-col items-center justify-center gap-10 p-8 md:flex-row bg-slate-950">
        {heroes.map((hero) => (
          <Card
            key={hero.id}
            hero={hero}
            selectedHeroes={heroes}
            winner={winner}
          />
        ))}
      </ul>
    </MDialog>
  );
};

export default Dialog;