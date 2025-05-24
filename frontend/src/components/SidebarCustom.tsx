// src/components/SidebarCustom.tsx
import { useQuery } from '@tanstack/react-query';
import { getProjetos } from '@/api/getProjetos';
import { getStatus } from '@/api/getStatus';
import { CardProjetct } from './CardProject';

export function SidebarCustom() {
	const { data: projetos } = useQuery({ queryKey: ['projetos'], queryFn: getProjetos });
	const { data: status } = useQuery({
		queryKey: ['status'],
		queryFn: getStatus,
		refetchInterval: 10000,
	});

	return (
		<aside className="w-96 bg-c-base-2 rounded-lg p-4 space-y-4">
			<h2 className="text-sm text-muted-foreground border-b pb-3">Projetos monitorados</h2>

			{projetos?.map((projeto) =>
				projeto.subprojetos.map((sub) => {
					const key = `${projeto.nome_do_projeto}-${sub.dominio}`;
					const projectStatus = status?.[key];

					return (
						<CardProjetct
							key={key}
							nome_do_projeto={projeto.nome_do_projeto}
							status={projectStatus}
						/>
					);
				}),
			)}
		</aside>
	);
}
