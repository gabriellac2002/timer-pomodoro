import { Play } from "phosphor-react";
import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from "./styles";

import { useForm } from "react-hook-form";
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
  const { register, handleSubmit, watch } = useForm({
    resolver: zodResolver(newCicleFormValidationSchema),
    defaultValues: {
      task: "",
      minutesAmount: 0,
    },
  });

  function handleCreateNewCicle(data: NewCicleFormData) {
    console.log(data);
  }

  const task = watch("task");
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCicle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em:</label>
          <TaskInput
            id="task"
            type="text"
            list="tasks-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register("task")}
          />

          <datalist id="tasks-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Banana" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register("minutesAmount", { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} /> Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  );
}
