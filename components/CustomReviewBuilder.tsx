"use client";

import React, { useState } from "react";
import { Sparkles, Copy, Check, Star } from "lucide-react";

interface CustomReviewBuilderProps {
	onSelectReview: (text: string) => void;
}

const PRODUCTS = [
	"Kids Bicycle",
	"Ranger Bicycle",
	"Toddler Tricycle",
	"Kick Scooter",
	"Bicycle Accessories",
];

const HIGHLIGHTS = [
	"Super Friendly & Helpful Staff",
	"Best Prices in Ahmedabad",
	"Sturdy Quality & Durable",
	"Quick Assembly & Great Advice",
];

export default function CustomReviewBuilder({
	onSelectReview,
}: CustomReviewBuilderProps) {
	const [selectedProduct, setSelectedProduct] =
		useState<string>("Kids Bicycle");
	const [selectedHighlight, setSelectedHighlight] = useState<string>(
		"Super Friendly & Helpful Staff",
	);
	const [copied, setCopied] = useState(false);

	const generateReviewText = () => {
		return `Had a wonderful experience at Banke Cycle Co in Panchkuva, Ahmedabad! Bought a ${selectedProduct.toLowerCase()} and the quality is outstanding. ${selectedHighlight}. Highly recommend trusted cycle showroom for anyone looking for the best bicycles in Ahmedabad!`;
	};

	const currentText = generateReviewText();

	const handleCopyAndPost = () => {
		onSelectReview(currentText);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="bg-gradient-to-br from-slate-50 via-white to-red-50/30 rounded-3xl p-5 sm:p-7 border border-slate-200 shadow-sm">
			<div className="flex items-center gap-2 mb-2">
				<div className="w-8 h-8 rounded-xl bg-[#092B3C] text-[#E53E51] flex items-center justify-center shadow-sm font-bold">
					<Sparkles className="w-4 h-4 text-[#E53E51]" />
				</div>
				<div>
					<h3 className="font-bold text-[#092B3C] text-base sm:text-lg">
						Build Your Own Custom Review
					</h3>
					<p className="text-xs text-slate-500">
						Tap tags below to craft a tailored 5-star review in 2
						seconds
					</p>
				</div>
			</div>

			{/* Step 1: Product */}
			<div className="mt-4">
				<label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
					1. What did you get?
				</label>
				<div className="flex flex-wrap gap-1.5">
					{PRODUCTS.map((prod) => (
						<button
							key={prod}
							type="button"
							onClick={() => setSelectedProduct(prod)}
							className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
								selectedProduct === prod
									? "bg-[#092B3C] text-white shadow-sm ring-2 ring-[#092B3C]/30"
									: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
							}`}
						>
							{prod}
						</button>
					))}
				</div>
			</div>

			{/* Step 2: Highlight */}
			<div className="mt-4">
				<label className="text-xs font-semibold text-slate-700 uppercase tracking-wider block mb-2">
					2. What did you like most?
				</label>
				<div className="flex flex-wrap gap-1.5">
					{HIGHLIGHTS.map((hl) => (
						<button
							key={hl}
							type="button"
							onClick={() => setSelectedHighlight(hl)}
							className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
								selectedHighlight === hl
									? "bg-[#E53E51] text-white shadow-sm ring-2 ring-[#E53E51]/30"
									: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
							}`}
						>
							{hl}
						</button>
					))}
				</div>
			</div>

			{/* Generated Preview Box */}
			<div className="mt-5 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm relative">
				<div className="flex items-center gap-1 mb-2 text-amber-500">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className="w-4 h-4 fill-amber-400 stroke-amber-500"
						/>
					))}
					<span className="text-xs font-semibold text-slate-600 ml-1.5">
						5.0 Star Rating
					</span>
				</div>
				<p className="text-sm text-slate-800 italic leading-relaxed">
					&quot;{currentText}&quot;
				</p>

				<div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
					<button
						type="button"
						onClick={handleCopyAndPost}
						className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E53E51] hover:bg-[#d03345] text-white font-bold text-xs sm:text-sm shadow-md shadow-[#E53E51]/25 active:scale-[0.98] transition-all"
					>
						{copied ? (
							<>
								<Check className="w-4 h-4" />
								<span>Copied!</span>
							</>
						) : (
							<>
								<Copy className="w-4 h-4" />
								<span>Copy &amp; Post on Google</span>
							</>
						)}
					</button>
				</div>
			</div>
		</div>
	);
}
