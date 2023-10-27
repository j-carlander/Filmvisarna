import { NavBar } from "../NavBar/NavBar";
import { SearchBar } from "../SearchBar/SearchBar";

export function Header({ matchDesktop }) {
  return (
    <header className="page-header">
      <NavBar matchDesktop={matchDesktop} />
      <SearchBar matchDesktop={matchDesktop} />
    </header>
  );
}
