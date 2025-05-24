import { NavigationComponent } from './components/NavigationComponent';
import { SidebarCustom } from './components/SidebarCustom';
import { QuickStats } from './components/QuickStats';
import { EventsTable } from './components/EventsTable';

function App() {
	return (
		<div className="h-screen flex flex-col bg-c-base-3 p-3 text-white">
			<NavigationComponent />
			<div className="flex flex-1 py-4 overflow-hidden">
				<SidebarCustom />
				<main className="flex-1 pl-4  bg-c-base-3 space-y-4 overflow-auto">
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
