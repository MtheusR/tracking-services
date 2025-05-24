const stats = [
	{ titulo: 'Projetos', cor: '' },
	{ titulo: 'Ativos', cor: 'text-green-400' },
	{ titulo: 'Parados', cor: 'text-red-500' },
	{ titulo: 'Alertas', cor: 'text-orange-400' },
];

export const QuickStats = () => {
	return (
		<div className="space-y-3 bg-c-base-2 px-4 py-2 rounded-md">
			<div>
				<h2 className="text-lg">Totalizadores</h2>
				<p className="text-sm text-muted-foreground">Informação geral dos projetos monitorados</p>
			</div>
			<div className="grid grid-cols-4 py-2 ">
				{stats.map((stat) => (
					<div key={stat.titulo} className="p-4 text-center border-l first:border-l-0">
						<p className={`text-2xl font-bold ${stat.cor}`}>0</p>
						<p className="font-medium text-muted-foreground">{stat.titulo}</p>
					</div>
				))}
			</div>
		</div>
	);
};
