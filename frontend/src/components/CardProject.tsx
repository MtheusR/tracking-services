import { FolderCode } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface Status {
	http?: boolean;
	ping?: boolean;
	ssl?: boolean;
	port?: boolean;
}

interface CardProjetctProps {
	nome_do_projeto: string;
	status?: Status;
}

const statusDescriptions: Record<keyof Status, string> = {
	ping: 'Verifica se a VPS está ativa',
	http: 'Verificar se o site/API está online',
	ssl: 'Verifica a segurança SSL do domínio',
	port: 'Verifica se a porta configurada está ativa',
};

export function CardProjetct({ nome_do_projeto, status }: CardProjetctProps) {
	return (
		<div className="p-3 rounded-md bg-c-base-1 hover:text-c-primary-1 cursor-pointer hover:bg-c-base-1/70 w-full">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<FolderCode className="h-7 w-7" />
					<p className="text-foreground">{nome_do_projeto}</p>
				</div>

				<div className="flex gap-2">
					<TooltipProvider>
						{(['ping', 'http', 'ssl', 'port'] as (keyof Status)[]).map((key) => {
							const value = status?.[key];
							const colorClass =
								value === undefined
									? 'bg-gray-600 text-gray-400'
									: value
										? 'bg-green-400 text-green-900'
										: 'bg-red-500 text-white';

							return (
								<Tooltip key={key}>
									<TooltipTrigger asChild>
										<div
											className={`h-8 w-14 rounded-xl flex items-center justify-center font-bold ${colorClass}`}
										>
											<p className="text-xs">{key.toUpperCase()}</p>
										</div>
									</TooltipTrigger>
									<TooltipContent className="bg-gray-700 text-white">
										<p>
											{statusDescriptions[key]}
											{value === undefined
												? ' (verificação ignorada)'
												: value
													? ' (OK)'
													: ' (falhou)'}
										</p>
									</TooltipContent>
								</Tooltip>
							);
						})}
					</TooltipProvider>
				</div>
			</div>
		</div>
	);
}
