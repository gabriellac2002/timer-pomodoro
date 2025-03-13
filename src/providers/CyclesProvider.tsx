import { createContext, useState } from "react";
import { Cycle } from "../@types/types";

interface NewCicleFormData {
  task: string;
  minutesAmount: number;
}

interface CyclesContextData {
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markCurrentCycleAsFinished: () => void;
  amountSecondsPassed: number;
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: NewCicleFormData) => void;
  stopCicle: () => void;
  cycles: Cycle[];
}

export const CyclesContext = createContext({} as CyclesContextData);

export function CyclesContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function markCurrentCycleAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            finishedAt: new Date(),
          };
        } else {
          return cycle;
        }
      })
    );
  }

  function createNewCycle(data: NewCicleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
    //reset();
  }

  function stopCicle() {
    setActiveCycleId(null);

    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return {
            ...cycle,
            interuptedAt: new Date(),
          };
        } else {
          return cycle;
        }
      })
    );
  }

  return (
    <CyclesContext.Provider
      value={{
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        stopCicle,
        cycles,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
}
