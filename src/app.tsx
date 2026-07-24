import { AppFooter } from "@/components/app-footer";
import { AppHeader } from "@/components/app-header";
import { GridBoard } from "@/components/grid-board";

export function App() {
  return (
    <div className="race-shell flex h-svh min-h-0 flex-col overflow-hidden">
      <AppHeader />
      <main className="relative min-h-0 flex-1">
        <div className="relative flex h-full min-h-0 flex-col">
          <GridBoard />
        </div>
      </main>
      <AppFooter />
    </div>
  );
}

export default App;
