"use client";

import React from "react";
import {
	MapPin,
	Phone,
	MessageCircle,
	Navigation,
	QrCode,
	ShieldCheck,
	Star,
} from "lucide-react";

import Image from "next/image";

interface StoreHeaderProps {
	onOpenQR: () => void;
	rating?: number;
	totalReviews?: string;
}

export default function StoreHeader({
	onOpenQR,
	rating = 4.8,
	totalReviews = "50+",
}: StoreHeaderProps) {
	return (
		<header className="relative bg-white border-b border-slate-100 shadow-sm pt-6 pb-6 px-4 sm:px-6">
			<div className="max-w-3xl mx-auto">
				{/* Top Badges */}
				<div className="flex flex-wrap items-center justify-between gap-2 mb-3">
					<div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[11px] font-bold">
						<span className="w-2 h-2 rounded-full bg-blue-500" />
						Google Verified Store
					</div>

					<button
						onClick={onOpenQR}
						className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
						title="Open Cashier Counter QR Code"
					>
						<QrCode className="w-3.5 h-3.5 text-blue-600" />
						<span>Counter QR</span>
					</button>
				</div>

				{/* Main Branding Card */}
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
					<div className="flex items-start gap-3.5">
						{/* Logo Avatar */}
						<Image
							src="/assets/images/banke-logo.svg"
							alt="Banke Cycle Co"
							priority
							width={100}
							height={64}
							className="w-auto h-12 object-contain"
						/>

						<div>
							<h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
									Banke Cycle Co
								</h1>
							<p className="text-slate-500 text-xs sm:text-sm font-medium flex items-center gap-1 mt-0.5">
								<MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
								<span>Panchkuva, Ahmedabad, Gujarat - 380001</span>
							</p>
						</div>
					</div>

					{/* Rating Pill */}
					<div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center p-3 sm:p-2.5 rounded-2xl bg-amber-50/80 border border-amber-200/70">
						<div className="flex items-center gap-1 text-amber-500">
							<span className="font-black text-slate-900 text-base sm:text-lg mr-1">
								{rating.toFixed(1)}
							</span>
							{[...Array(5)].map((_, i) => (
								<Star
									key={i}
									className="w-4 h-4 fill-amber-400 stroke-amber-500"
								/>
							))}
						</div>
						<span className="text-[11px] font-medium text-slate-600 mt-0.5 mx-0 sm:mx-auto">
							{totalReviews} Google Reviews
						</span>
					</div>
				</div>

				{/* Quick Contact Bar */}
				<div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100">
					<a
						href="tel:6351101722"
						className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
					>
						<Phone className="w-3.5 h-3.5 text-blue-600" />
						<span>Call</span>
					</a>

					<a
						href="https://wa.me/916351101722?text=Hello%20Banke%20Cycle%20Co,%20I%20have%20an%20enquiry"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition-colors"
					>
						<MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
						<span>WhatsApp</span>
					</a>

					<a
						href="https://maps.google.com/?q=Banke+Cycle+Co+Panchkuva+Ahmedabad"
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors"
					>
						<Navigation className="w-3.5 h-3.5 text-rose-500" />
						<span>Directions</span>
					</a>
				</div>
			</div>
		</header>
	);
}
