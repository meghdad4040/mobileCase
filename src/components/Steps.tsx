"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const STEPS = [
	{
		name: "Step 1: Add image",
		description: "Choose an image for your case",
		url: "/upload",
	},
	{
		name: "Step 2: Customize design",
		description: "Make the case your",
		url: "/design",
	},
	{
		name: "Step 3: Summary",
		description: "Review your final design",
		url: "/preview",
	},
];

const Steps = () => {
	const pathname = usePathname();

	return (
		<ol
			className='rounded-md bg-white/40 dark:bg-black/30 lg:flex 
     lg:rounded-none lg:border-2 lg:border-r
   lg:border-gray-50 dark:lg:border-gray-800'>
			{STEPS.map((step, i) => {
				const isCurrent = pathname.endsWith(step.url);
				const isCompleted = STEPS.slice(i + 1).some(step =>
					pathname.endsWith(step.url),
				);
				const imgPath = `/snake-${i + 1}.png`;

				return (
					<li
						key={step.name}
						className='relative overflow-hidden lg:flex-1'>
						<div>
							<span
								className={cn(
									`absolute left-0 top-0 h-full w-1 bg-zinc-400 
          lg:bottom-0 lg:top-auto lg:h-1 lg:w-full`,
									{
										"bg-zinc-700": isCurrent,
										"bg-primary-content": isCompleted,
									},
								)}
								aria-hidden='true'
							/>
							<span
								className={cn(
									i !== 0 ? "lg:pl-9" : "",
									"flex items-center px-6 py-6 text-sm font-medium",
								)}>
								<span className='flex-shrink-0'>
									<img
										src={imgPath}
										alt='snake'
										className={cn(
											"flex h-20 w-20 object-contain items-center justify-center",
											{
												"border-none": isCompleted,
												"border-zinc-700": isCurrent,
											},
										)}
									/>
								</span>
								<span className='ml-4 h-full mt-0.5 flex min-w-0 flex-col justify-center'>
									<span
										className={cn(
											"text-sm font-semibold text-gray-700 dark:text-gray-300",
											{
												"text-primary": isCompleted,
												"text-gray-900 dark:text-gray-100 text-base": isCurrent,
											},
										)}>
										{step.name}
									</span>
									<span className='text-sm text-gray-500 dark:text-gray-400'>
										{step.description}
									</span>
								</span>
							</span>
							{/* separator */}
							{i !== 0 ? (
								<div className='absolute inset-0 hidden w-3 lg:block'>
									<svg
										className='h-full w-full text-gray-400 dark:text-gray-600'
										viewBox='0 0 12 82'
										fill='none'
										preserveAspectRatio='none'>
										<path
											d='M0.5 0V31L10.5 41L0.5 51V82'
											stroke='currentcolor'
											vectorEffect='non-scaling-stroke'
										/>
									</svg>
								</div>
							) : null}
						</div>
					</li>
				);
			})}
		</ol>
	);
};

export default Steps;
