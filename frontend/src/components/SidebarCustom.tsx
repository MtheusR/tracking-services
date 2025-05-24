// src/components/SidebarCustom.tsx
import { getProjetos } from '@/api/getProjetos';
import { useQuery } from '@tanstack/react-query';
import { CardProjetct } from './CardProject';
import type { StatusDetalhado } from '@/api/getStatus';

interface SidebarCustomProps {
	statusDetalhado: StatusDetalhado[];
}

export function SidebarCustom({ statusDetalhado }: SidebarCustomProps) {
	const { data: projetos } = useQuery({ queryKey: ['projetos'], queryFn: getProjetos });

	return (
		<aside className="w-96 bg-c-base-2 rounded-lg p-4 space-y-4">
			<h2 className="text-sm text-muted-foreground border-b pb-3">Projetos monitorados</h2>

			{projetos?.map((projeto) =>
				projeto.subprojetos.map((sub) => {
					const statusDoSubprojeto = statusDetalhado.filter(
						(st) => st.projeto === projeto.nome_do_projeto && st.dominio === sub.dominio,
					);

					const statusFormatado = {
						ping: statusDoSubprojeto.find((s) => s.tipo === 'ping')?.resposta ?? undefined,
						http: statusDoSubprojeto.find((s) => s.tipo === 'http')?.resposta ?? undefined,
						ssl: statusDoSubprojeto.find((s) => s.tipo === 'ssl')?.resposta ?? undefined,
						dns: statusDoSubprojeto.find((s) => s.tipo === 'dns')?.resposta ?? undefined,
					};

					const key = `${projeto.nome_do_projeto}-${sub.dominio}`;

					return (
						<CardProjetct
							key={key}
							nome_do_projeto={projeto.nome_do_projeto}
							status={statusFormatado}
						/>
					);
				}),
			)}
		</aside>
	);
}
