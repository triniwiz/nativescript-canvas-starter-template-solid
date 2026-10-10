import { createContext, useContext, type Component } from 'solid-js';
import { Frame, type NavigatedData, type Page } from '@nativescript/core';
import { render } from '@nativescript-community/solid-js';
import { document } from 'dominative';

const PageContext = createContext<Page | null>(null);

/** The Page this screen was navigated to, or null on the home screen. */
export function usePage() {
  return useContext(PageContext);
}

/**
 * Shows `Screen` on a new Page. Each Page is its own Solid root, and it is
 * disposed when you navigate back from it, so `onCleanup` runs (canvases stop
 * drawing, Workers end) just as it would on the web.
 */
export function navigate(Screen: Component) {
  const page = document.createElement('page') as Page;
  page.actionBarHidden = true;
  const dispose = render(
    () => (
      <PageContext.Provider value={page}>
        <Screen />
      </PageContext.Provider>
    ),
    page,
  );
  page.on('navigatedFrom', (args: NavigatedData) => {
    if (args.isBackNavigation) {
      dispose();
    }
  });
  Frame.topmost().navigate({ create: () => page });
}

export function goBack() {
  Frame.topmost().goBack();
}
