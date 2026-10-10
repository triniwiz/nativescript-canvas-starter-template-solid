import { createSignal, For } from 'solid-js';
import { DemoPage } from '../../components/DemoPage';
import { CanvasView } from '../../components/CanvasView';
import { Segmented } from '../../components/Segmented';
import { shaderGallery, type GLInfo, type ShaderGallery, type ShaderName } from './shaders';

const options: { label: string; value: ShaderName }[] = [
  { label: 'Plasma', value: 'plasma' },
  { label: 'Aurora', value: 'aurora' },
  { label: 'Metaballs', value: 'metaballs' },
  { label: 'Tunnel', value: 'tunnel' },
];

const pill = 'rounded-full bg-black/40 px-3 py-1 text-xs font-semibold text-white';

export function WebGLDemo() {
  const [shader, setShader] = createSignal<ShaderName>('plasma');
  const [info, setInfo] = createSignal<GLInfo>();
  let gallery: ShaderGallery | undefined;

  const demo = shaderGallery({ shader: shader(), onInfo: setInfo });

  function chooseShader(name: ShaderName) {
    setShader(name);
    gallery?.setShader(name);
  }

  const details = () => {
    const gl = info();
    return gl
      ? [
          { label: 'Version', value: gl.version },
          { label: 'Renderer', value: gl.renderer },
          { label: 'Vendor', value: gl.vendor },
          { label: 'GLSL', value: gl.shadingLanguage },
          { label: 'Max texture', value: `${gl.maxTextureSize}px` },
        ]
      : [];
  };

  return (
    <DemoPage
      fill={760}
      eyebrow="WebGL"
      title="Fragment shaders"
      description="Raw WebGL 1: one full-screen triangle, a GLSL fragment shader, and time, resolution and pointer uniforms. Drag across the canvas to move the effect."
    >
      <section class="card flex flex-1 flex-col gap-4">
        <CanvasView
          demo={demo}
          class="min-h-[240] w-full flex-1 rounded-2xl"
          onStarted={(instance) => (gallery = instance)}
        >
          <div class="absolute bottom-3 left-3 flex flex-row gap-2">
            <span class={pill}>getContext('webgl')</span>
            <span class={pill}>{`${shader()}.frag`}</span>
          </div>
        </CanvasView>
        <Segmented options={options} value={shader()} onChange={chooseShader} />
      </section>

      <section class="card flex flex-col gap-4">
        <h2 class="text-xl font-semibold text-slate-900 dark:text-white">This context</h2>
        <div class="grid grid-cols-[repeat(auto-fill,minmax(200,1fr))] gap-3">
          <For each={details()}>
            {(item) => (
              <div class="flex flex-col gap-1 rounded-2xl bg-slate-100 p-4 dark:bg-slate-800">
                <span class="text-xs font-semibold uppercase text-slate-500 dark:text-slate-400">{item.label}</span>
                <span class="text-sm font-medium text-slate-900 dark:text-white">{item.value}</span>
              </div>
            )}
          </For>
        </div>
      </section>
    </DemoPage>
  );
}
