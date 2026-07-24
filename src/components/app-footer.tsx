export function AppFooter() {
  return (
    <footer className="flex shrink-0 items-center justify-between border-t border-white/6 bg-[#070b10]/90 px-4 py-2 text-[10px] text-muted-foreground">
      <p>© {new Date().getFullYear()} F1 Grid — placeholder copyright</p>
      <a
        href="https://github.com/example/f1grid"
        className="underline-offset-2 hover:text-foreground hover:underline"
        target="_blank"
        rel="noreferrer"
      >
        GitHub (placeholder)
      </a>
    </footer>
  );
}
