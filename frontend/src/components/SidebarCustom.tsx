// import { CirclePlus } from 'lucide-react';
// import { Button } from './ui/button';

import { CardProjetct } from './CardProject';

export const SidebarCustom = () => {
	return (
		<aside className="w-96 bg-c-base-2 rounded-lg p-4 space-y-4 ">
			<h2 className="text-sm text-muted-foreground border-b pb-3">Projetos monitorados</h2>
			{/* <Button className="w-full">
				<CirclePlus />
				Adicionar projeto
			</Button> */}
			<CardProjetct />
		</aside>
	);
};
