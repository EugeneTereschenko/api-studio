import { create } from "zustand";

import type { Environment } from "../types/Environment";

interface EnvironmentStore {
    environments: Environment[];

    activeEnvironmentId: string | null;

    setActiveEnvironment: (id: string) => void;

    addEnvironment: (name: string) => void;

    updateEnvironment: (environment: Environment) => void;

    removeEnvironment: (id: string) => void;
}

export const useEnvironmentStore =
create<EnvironmentStore>((set) => ({

    environments: [],

    activeEnvironmentId: null,

    setActiveEnvironment(id) {
        set({ activeEnvironmentId: id });
    },

    addEnvironment(name) {
        set(state => ({
            environments: [
                ...state.environments,
                {
                    id: crypto.randomUUID(),
                    name,
                    variables: [],
                },
            ],
        }));
    },

    updateEnvironment(environment) {
        set(state => ({
            environments: state.environments.map(env =>
                env.id === environment.id
                    ? environment
                    : env
            ),
        }));
    },

    removeEnvironment(id) {
        set(state => ({
            environments: state.environments.filter(
                env => env.id !== id
            ),
        }));
    },
}));