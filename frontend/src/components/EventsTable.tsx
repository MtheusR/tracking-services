import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export const EventsTable = () => {
	return (
		<div className="space-y-3 bg-c-base-2 px-4 py-2 rounded-md">
			<div>
				<h2 className="text-lg">Histórico de testes</h2>
				<p className="text-sm text-muted-foreground">
					Acompanhe em tempo real os testes realizados
				</p>
			</div>
			<div className="border rounded-md">
				<Table className="bg-c-base-2 rounded-md ">
					<TableHeader>
						<TableRow>
							<TableHead className="w-[90px]" />
							<TableHead className="text-start w-[130px]">Teste</TableHead>
							<TableHead className="text-start w-[250px]">Projeto</TableHead>
							<TableHead>Resposta</TableHead>
							<TableHead className="w-[170px]">Data e Hora</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell colSpan={5} className="text-center py-4 text-sm">
								No important events
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};
