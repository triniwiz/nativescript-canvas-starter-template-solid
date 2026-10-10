import { For } from 'solid-js';

export function Segmented<V extends string | number>(props: {
  options: readonly { label: string; value: V }[];
  value: V;
  onChange: (value: V) => void;
}) {
  return (
    <div class="flex flex-row flex-wrap gap-2">
      <For each={props.options}>
        {(option) => (
          <button
            class={`rounded-xl px-4 py-2 text-sm font-semibold ${
              props.value === option.value
                ? 'bg-indigo-500 text-white'
                : 'bg-slate-100 text-slate-700 active:bg-slate-200 dark:bg-slate-800 dark:text-slate-300'
            }`}
            on:tap={() => props.onChange(option.value)}
          >
            {option.label}
          </button>
        )}
      </For>
    </div>
  );
}
