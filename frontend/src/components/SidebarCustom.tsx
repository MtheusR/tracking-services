// src/components/SidebarCustom.tsx
import { useQuery } from '@tanstack/react-query';
import { getProjetos } from '@/api/getProjetos';
import { CardProjetct } from './CardProject';

export const SidebarCustom = () => {
	const {
		data: projetos,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['projetos'],
		queryFn: getProjetos,
	});

	return (
		<aside className="w-96 bg-c-base-2 rounded-lg p-4 space-y-4">
			<h2 className="text-sm text-muted-foreground border-b pb-3">Projetos monitorados</h2>
			<div className="flex flex-col gap-2 items-center w-full">
				{isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}
				{isError && <p className="text-sm text-muted-foreground">Falha ao carregar projetos.</p>}

				{projetos?.map((projeto) => (
					<CardProjetct status={} key={projeto.nome_do_projeto} nome_do_projeto={projeto.nome_do_projeto} />
				))}
			</div>
		</aside>
	);
};
