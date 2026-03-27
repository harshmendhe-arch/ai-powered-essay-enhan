interface HistoryDetailProps {
	params: Promise<{ id: string }>;
}

export default async function HistoryDetailPage({ params }: HistoryDetailProps) {
	const { id } = await params;

	return (
		<main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
			<h1 className="text-2xl font-bold text-slate-900">Essay Snapshot {id}</h1>
			<p className="mt-2 text-sm text-slate-600">
				Detailed before/after view will be available here.
			</p>
		</main>
	);
}

