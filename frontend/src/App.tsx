import { NavigationComponent } from './pages/Navigation/NavigationComponent';
import { SidebarCustom } from './components/SidebarCustom';
import { QuickStats } from './components/QuickStats';
import { EventsTable } from './components/EventsTable';

function App() {
	return (
		<div className="h-screen flex flex-col bg-c-base-3 p-3 text-white">
			<NavigationComponent />
			<div className="flex flex-1 py-4 overflow-hidden">
				<SidebarCustom />
				<main className="flex-1 px-8 bg-c-base-3 py-4 space-y-4 overflow-auto">
					<h1 className="text-xl font-semibold text-c-primary-1">Painel de Controle</h1>
					<div className="space-y-5 ">
						<QuickStats />
						<EventsTable />
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
