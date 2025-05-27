type QuickStatsProps = {
	resumo?: {
		totalProjetos: number;
		totalOk: number;
		totalComErro: number;
	};
};

export function QuickStats({ resumo }: QuickStatsProps) {
	if (!resumo) return null;

	return (
		<div className="grid grid-cols-3 gap-4 text-center">
			<div className="bg-c-base-2 p-4 rounded-2xl shadow">
				<h2 className="text-xl font-semibold">Total Projetos</h2>
				<p className="text-3xl">{resumo.totalProjetos}</p>
			</div>
			<div className="bg-green-700 p-4 rounded-2xl shadow">
				<h2 className="text-xl font-semibold">OK</h2>
				<p className="text-3xl">{resumo.totalOk}</p>
			</div>
			<div className="bg-red-700 p-4 rounded-2xl shadow">
				<h2 className="text-xl font-semibold">Com Erros</h2>
				<p className="text-3xl">{resumo.totalComErro}</p>
			</div>
		</div>
	);
}
