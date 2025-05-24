import { FolderCode } from 'lucide-react';

interface Status {
	http: boolean;
	ping: boolean;
	ssl: boolean;
	dns: boolean;
}

interface CardProjetctProps {
	nome_do_projeto: string;
	status: Status;
}

export function CardProjetct({ nome_do_projeto, status }: CardProjetctProps) {
	return (
		<div className="p-3 rounded-md bg-c-base-1 hover:text-c-primary-1 hover:bg-c-base-1 cursor-pointer hover:bg-c-base-1/70 w-full">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<FolderCode className="h-7 w-7" />
					<p className="text-foreground">{nome_do_projeto}</p>
				</div>
				<div className="flex gap-2">
					<div className={`h-3 w-3 rounded-full ${status.http ? 'bg-green-400' : 'bg-red-500'}`} />
					<div className={`h-3 w-3 rounded-full ${status.ping ? 'bg-green-400' : 'bg-red-500'}`} />
					<div className={`h-3 w-3 rounded-full ${status.ssl ? 'bg-green-400' : 'bg-red-500'}`} />
					<div className={`h-3 w-3 rounded-full ${status.dns ? 'bg-green-400' : 'bg-red-500'}`} />
				</div>
			</div>
		</div>
	);
}
