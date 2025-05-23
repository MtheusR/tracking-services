import { FolderCode } from 'lucide-react';

export function CardProjetct() {
	return (
		<div className="p-3 rounded-md bg-c-base-1 hover:bg-c-base-1 cursor-pointer hover:bg-c-base-1/70">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<FolderCode className="h-7 w-7 text-muted-foreground " />
					<div className="flex flex-col">
						<p>Longtech Site </p>
					</div>
				</div>
				<div className="flex gap-2">
					<div className="bg-red-500 h-3 w-3 rounded-full" />
					<div className="bg-green-400 h-3 w-3 rounded-full" />
					<div className="bg-green-400 h-3 w-3 rounded-full" />
					<div className="bg-orange-400 h-3 w-3 rounded-full" />
				</div>
			</div>
		</div>
	);
}
