import { getProjetos } from '@/api/getProjetos';
import { useQuery } from '@tanstack/react-query';
import { CardProjetct } from './CardProject';
import type StatusDetalhado from '@/api/getStatus';

interface SidebarCustomProps {
	statusDetalhado: StatusDetalhado[];
}

export function SidebarCustom({ statusDetalhado }: SidebarCustomProps) {
	const { data: projetos } = useQuery({ queryKey: ['projetos'], queryFn: getProjetos });

	function calcularStatusProjeto(projetoNome: string): {
		ping?: boolean;
		http?: boolean;
		ssl?: boolean;
		port?: boolean;
	} {
		const statusPorTipo: Record<'ping' | 'http' | 'ssl' | 'port', (boolean | undefined)[]> = {
			ping: [],
			http: [],
			ssl: [],
			port: [],
		};

		const subStatus = statusDetalhado.filter((s) => s.projeto === projetoNome);

		for (const tipo of Object.keys(statusPorTipo) as (keyof typeof statusPorTipo)[]) {
			statusPorTipo[tipo] = subStatus.filter((s) => s.tipo === tipo).map((s) => s.resposta);
		}

		const calcularCor = (arr: (boolean | undefined)[]): boolean | undefined => {
			if (arr.every((v) => v === undefined)) return undefined;
			if (arr.every((v) => v === true)) return true;
			return false;
		};

		return {
			ping: calcularCor(statusPorTipo.ping),
			http: calcularCor(statusPorTipo.http),
			ssl: calcularCor(statusPorTipo.ssl),
			port: calcularCor(statusPorTipo.port),
		};
	}

	return (
		<aside className="w-[600px] bg-c-base-2 rounded-lg p-4 space-y-4">
			<h2 className="text-sm text-muted-foreground border-b pb-3">Projetos monitorados</h2>

			{projetos?.map((projeto) => {
				const status = calcularStatusProjeto(projeto.nome_do_projeto);

				return (
					<CardProjetct
						key={projeto.nome_do_projeto}
						nome_do_projeto={projeto.nome_do_projeto}
						status={status}
					/>
				);
			})}
		</aside>
	);
}
