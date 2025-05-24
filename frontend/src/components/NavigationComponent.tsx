import { Button } from '@/components/ui/button';
import { SettingsIcon, Sun } from 'lucide-react';

export function NavigationComponent() {
	return (
		<>
			<div className="bg-c-base-2 rounded-md p-4 flex justify-between cursor-pointer">
				<h3 className="text-xl font-semibold text-c-primary-1">Trackin.s</h3>
				<div>{/* <p className="py-2 px-3 text-sm rounded-md bg-c-base-1  ">Dasboard</p> */}</div>
				<div className="space-x-2">
					<Button size={'icon'} variant={'ghost'}>
						<Sun />
					</Button>
					<Button size={'icon'} variant={'ghost'}>
						<SettingsIcon />
					</Button>
				</div>
			</div>
		</>
	);
}
