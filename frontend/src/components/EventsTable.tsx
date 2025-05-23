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
		<div className="space-y-3">
			<h2 className="text-lg">Testes realizados</h2>
			<Table className="bg-c-base-2 rounded-md">
				<TableHeader>
					<TableRow>
						<TableHead className="w-[60px]" />
						<TableHead className="text-start w-[130px]">Teste</TableHead>
						<TableHead>Resposta</TableHead>
						<TableHead className="w-[170px]">Data e Hora</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody className="h-screen">
					<TableRow>
						<TableCell colSpan={4} className="text-center py-4 text-sm">
							No important events
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</div>
	);
};
