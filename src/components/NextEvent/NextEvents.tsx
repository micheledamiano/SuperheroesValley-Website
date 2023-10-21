import { Dict } from "@trpc/server";
import { Events } from "../../const/Events";
import { useEffect, useState } from "react";
import Link from "next/link";

type EventDetails = {
	category: string;
	guest_id: number[];
	title: string;
	imageUrl?: string;
	href: string;
	description?: string;
	day: string;
	month: string;
	year: string;
};

export const NextEvents = () => {
	const current_date = new Date();
	let current_year = current_date.getFullYear();
	let current_day = current_date.getDate();
	let current_month = current_date.getMonth() + 1;

	const [loading, setLoading] = useState(true); // anyting you want !!!
	const [eventsList, setEventsList] = useState<EventDetails[]>([]);

	useEffect(() => {
		if (loading) {
			const events: EventDetails[] = [];

			Events.forEach((dict) => {
				// filter the events that are in events and are in the future
				// using the current date and the date of the event
				[...dict.events].reverse().forEach((event) => {
					const event_date = new Date(
						parseInt(event.year),
						parseInt(event.month) - 1,
						parseInt(event.day),
					);
					if (event_date >= current_date) {
						events.push({
							category: event.category,
							guest_id: event.guest_id,
							title: event.title,
							imageUrl: event.imageUrl ? event.imageUrl : "",
							href: event.href,
							description: event.description,
							day: event.day,
							month: event.month,
							year: event.year,
						});
					}
				});
			});
			console.log(events);

			setEventsList(events);
			setLoading(false);
		}
	}, [loading]);

	console.log(current_day, current_month, current_year);
	return (
		<div className="bg-white">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					I prossimi eventi:
				</h2>

				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{loading ? (
						<div>loading ... </div>
					) : (
						eventsList.map((event) => (
							<div key={"test3"} className="group relative" style={{ display: 'flex', flexDirection: 'column' }}>
								<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
									<img
										src={event.imageUrl}
										className="h-full w-full object-cover object-center lg:h-full lg:w-full"
									/>
								</div>

                                
								<div className="mt-4 justify-between " style={{ flexGrow: 50 }}>
									<a className="mt-4 justify-between text-xl font-bold text-gray-700">
										{event.title}
									</a>
								</div>

                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-transparent"></div>
                                    <div className="flex-grow border-t border-transparent"></div>
                                </div>


								<div className="mt-4 justify-between" style={{ flexGrow: 1 }}>
									<a className="mt-4 justify-between text-xl font-bold text-gray-700">
										{new Date(parseInt(event.year), parseInt(event.month) - 1, parseInt(event.day)).toLocaleString('default', { day: "2-digit", year: "numeric", month: 'long' })}
									</a>
								</div>

								<div className="mt-4 justify-between" >
									<Link href={event.href}>
										<a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 md:py-4 md:text-lg md:px-10">
											Registrati
										</a>
									</Link>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
};
