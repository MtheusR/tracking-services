import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStatusDetalhado, type StatusItem, type StatusResponse } from '@/api/getStatus';

import { NavigationComponent } from './components/NavigationComponent';
import { SidebarCustom } from './components/SidebarCustom';
import { QuickStats } from './components/QuickStats';
import { TestesTable } from './components/TestesTable';

function App() {
	const { data } = useQuery<StatusResponse>({
		queryKey: ['status'],
		queryFn: getStatusDetalhado,
		refetchInterval: 10,
		structuralSharing: false,
	});

	console.log('📡 Dados recebidos da API:', data);

	const statusHistoricoRef = useRef<StatusItem[]>([]);
	const [historico, setHistorico] = useState<StatusItem[]>([]);

	useEffect(() => {
		if (!data?.projetos) return;

		const novos = data.projetos.filter((novo) => {
			return !statusHistoricoRef.current.some(
				(existente) =>
					existente.projeto === novo.projeto &&
					existente.dominio === novo.dominio &&
					existente.tipo === novo.tipo &&
					existente.horario === novo.horario,
			);
		});

		if (novos.length > 0) {
			statusHistoricoRef.current = [...statusHistoricoRef.current, ...novos];
			statusHistoricoRef.current = statusHistoricoRef.current.slice(-40);
			setHistorico([...statusHistoricoRef.current].reverse());
		}
	}, [data?.projetos]);

	return (
		<div className="h-screen flex flex-col bg-c-base-3 p-3 text-white">
			<NavigationComponent />
			<div className="flex flex-1 py-4 overflow-hidden">
				<SidebarCustom statusDetalhado={data?.projetos ?? []} />
				<main className="flex-1 pl-4 bg-c-base-3 space-y-4 overflow-auto">
					<div className="space-y-5">
						<QuickStats resumo={data?.resumo} />
						<TestesTable docs={historico} />
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
