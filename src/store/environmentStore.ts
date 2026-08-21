import { create } from "zustand";

import type { Environment, EnvironmentVariable } from "../types/Environment";


interface EnvironmentStore {
    environments: Environment[];
    activeEnvironmentId: string | null;

    addEnvironment: (name: string) => void;

    deleteEnvironment: (id: string) => void;

    updateVariable: (envId: string, variable: EnvironmentVariable) => void;


    setActive: (id: string) => void;

    replaceEnvironments: (
        environments: Environment[],
        activeEnvironmentId: string | null
    ) => void;
}

export const useEnvironmentStore =
create<EnvironmentStore>((set) => ({

    environments: [],

    activeEnvironmentId: null,

    addEnvironment(name) {
        const id = crypto.randomUUID();

        set(state => ({
            environments: [
                ...state.environments,
                {
                    id,
                    name,
                    variables: [],
                },
            ],
            activeEnvironmentId: id,
        }));
    },

    deleteEnvironment(id) {
        set(state => ({
            environments: state.environments.filter(
                e => e.id !== id
            ),
        }));
    },

    updateVariable(envId, variable) {
    set(state => ({
        environments: state.environments.map(env =>
            env.id === envId
                ? {
                      ...env,
                      variables: env.variables.some(
                          v => v.key === variable.key
                      )
                          ? env.variables.map(v =>
                                v.key === variable.key
                                    ? variable
                                    : v
                            )
                          : [...env.variables, variable],
                  }
                : env
        ),
    }));
},

    setActive(id) {
        set({
            activeEnvironmentId: id,
        });
    },

    replaceEnvironments(environments, activeEnvironmentId) {
        set({
            environments,
            activeEnvironmentId,
        });
    },

}));