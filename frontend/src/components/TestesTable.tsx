import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

export interface Teste {
	resposta: boolean;
	tipo: string;
	projeto: string;
	dominio: string;
	horario: string;
}

export interface TestesTableProps {
	docs: Teste[];
}

export const TestesTable = ({ docs }: TestesTableProps) => {
	console.log('📋 Dados recebidos na tabela:', docs);

	return (
		<div className="space-y-3 bg-c-base-2 px-4 py-2 rounded-md">
			<div>
				<h2 className="text-lg">Histórico de testes</h2>
				<p className="text-sm text-muted-foreground">
					Acompanhe em tempo real os testes realizados
				</p>
			</div>
			<div className="border rounded-md">
				<div className="max-h-[590px] overflow-y-auto">
					<Table className="bg-c-base-2 rounded-md w-full">
						<TableHeader>
							<TableRow>
								<TableHead className="text-start w-[90px]">Resposta</TableHead>
								<TableHead className="w-[100px] text-center">Tipo</TableHead>
								<TableHead className="text-start">Projeto</TableHead>
								<TableHead className="w-[250px] text-center">Domínio/IP</TableHead>
								<TableHead className="w-[170px] text-center">Data e Hora</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{docs.map((item) => (
								<TableRow key={`${item.projeto}-${item.tipo}-${item.horario}`} className="text-sm">
									<TableCell
										className={`py-4 ${
											item.resposta ? 'font-medium text-green-600' : 'font-medium text-red-600'
										}`}
									>
										{item.resposta ? '🟢 OK' : '🔴 Falhou'}
									</TableCell>
									<TableCell className="py-4 text-center">{item.tipo.toUpperCase()}</TableCell>
									<TableCell className="py-4">{item.projeto}</TableCell>
									<TableCell className="py-4 text-center">{item.dominio}</TableCell>
									<TableCell className="py-4 text-center">{item.horario}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
};
