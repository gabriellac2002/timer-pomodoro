import { HandPalm, Play } from "phosphor-react";
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";

import { useState } from "react";
import { Cycle } from "../../@types/types";

import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../providers/CyclesProvider";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";

// controled form -> quando o usuario digita algo, o valor é armazenado no estado em tempo real
// uncontroled form -> quando o usuario digita algo, o valor é armazenado no estado apenas quando o formulario é submetido

/*
 * Controlled Form:
 * - Vantagens:
 *   - O estado do formulário é mantido em sincronia com o estado do componente React.
 *   - Facilita a validação em tempo real e o gerenciamento de formulários complexos.
 *   - Permite manipulação e controle total sobre os dados do formulário.
 * - Desvantagens:
 *   - Pode ser mais verboso e exigir mais código para configurar.
 *   - Pode impactar a performance em formulários muito grandes devido a atualizações frequentes de estado.
 *
 * Uncontrolled Form:
 * - Vantagens:
 *   - Menos código e mais simples de configurar.
 *   - Melhor performance em formulários grandes, pois o estado não é atualizado em tempo real.
 * - Desvantagens:
 *   - Menos controle sobre os dados do formulário.
 *   - Validação e manipulação de dados podem ser mais difíceis.
 *   - Não é ideal para formulários complexos que requerem validação em tempo real.
 */

type NewCicleFormData = zod.infer<typeof newCicleFormValidationSchema>;
const newCicleFormValidationSchema = zod.object({
  task: zod.string().nonempty("Digite um nome para o projeto"),
  minutesAmount: zod.number().int().min(5, "O tempo mínimo é 5 minutos"),
});

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

  const newCycleForm = useForm({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  const { handleSubmit, watch, reset } = newCycleForm;

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

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds);
  }

  function handleCreateNewCicle(data: NewCicleFormData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
    reset();
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const task = watch("task");
  const isSubmitDisabled = !task;

  function handleStopCicle() {
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
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed,
          }}
        >
          <FormProvider {...newCycleForm}>
            <NewCycleForm />
          </FormProvider>
          <Countdown />
        </CyclesContext.Provider>
        {activeCycle ? (
          <StopCountdownButton onClick={handleStopCicle} type="button">
            <HandPalm size={24} /> Parar
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDisabled} type="submit">
            <Play size={24} /> Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
