// src/App.tsx
import { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getStatusDetalhado, type StatusDetalhado } from '@/api/getStatus';

import { NavigationComponent } from './components/NavigationComponent';
import { SidebarCustom } from './components/SidebarCustom';
import { QuickStats } from './components/QuickStats';
import { TestesTable } from './components/TestesTable';

function App() {
	const { data: statusDetalhado } = useQuery({
		queryKey: ['status'],
		queryFn: getStatusDetalhado,
		refetchInterval: 10, // atualiza a cada 10s
		structuralSharing: false, // força re-render mesmo com dados iguais
	});

	const statusHistoricoRef = useRef<StatusDetalhado[]>([]);
	const [historico, setHistorico] = useState<StatusDetalhado[]>([]);

	useEffect(() => {
		if (!statusDetalhado) return;

		// Filtra apenas registros novos (por horário)
		const novos = statusDetalhado.filter((novo) => {
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

			// Limita aos últimos 100 registros (opcional)
			statusHistoricoRef.current = statusHistoricoRef.current.slice(-40);

			// ✅ Inverte para mostrar o mais recente primeiro
			setHistorico([...statusHistoricoRef.current].reverse());
		}
	}, [statusDetalhado]);

	return (
		<div className="h-screen flex flex-col bg-c-base-3 p-3 text-white">
			<NavigationComponent />
			<div className="flex flex-1 py-4 overflow-hidden">
				<SidebarCustom statusDetalhado={statusDetalhado ?? []} />
				<main className="flex-1 pl-4 bg-c-base-3 space-y-4 overflow-auto">
					<div className="space-y-5">
						<QuickStats />
						<TestesTable docs={historico} />
					</div>
				</main>
			</div>
		</div>
	);
}

export default App;
