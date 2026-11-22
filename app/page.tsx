"use client";

import React, { useState, useMemo } from "react";
import confetti from "canvas-confetti";
import {
	Star,
	Copy,
	ExternalLink,
	Search,
	Sparkles,
	CheckCircle2,
	Bike,
	ArrowRight,
	MessageSquarePlus,
	ChevronDown,
	ChevronUp,
	Award,
} from "lucide-react";
import { STORE_DATA, Review } from "@/data/reviews";
import StoreHeader from "@/components/StoreHeader";
import InstructionModal from "@/components/InstructionModal";
import QRCodeModal from "@/components/QRCodeModal";
import CustomReviewBuilder from "@/components/CustomReviewBuilder";

export default function ReviewPage() {
	const [activeCategory, setActiveCategory] = useState<string>("ALL");
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [selectedReviewText, setSelectedReviewText] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isQROpen, setIsQROpen] = useState<boolean>(false);
	const [showCustomBuilder, setShowCustomBuilder] = useState<boolean>(false);
	const [copiedId, setCopiedId] = useState<string | number | null>(null);

	// Flatten the 20 reviews (5 per category) for "ALL"
	const allReviews: Review[] = useMemo(() => {
		return STORE_DATA.categories.flatMap((cat) => cat.reviews);
	}, []);

	// Filter reviews by selected category and search input
	const filteredReviews = useMemo(() => {
		let list: Review[] = [];

		if (activeCategory === "ALL") {
			list = allReviews;
		} else {
			const group = STORE_DATA.categories.find(
				(c) => c.name.toLowerCase() === activeCategory.toLowerCase(),
			);
			list = group ? group.reviews : [];
		}

		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			list = list.filter(
				(r) =>
					r.text.toLowerCase().includes(q) ||
					r.category.toLowerCase().includes(q),
			);
		}

		return list;
	}, [activeCategory, searchQuery, allReviews]);

	  // Copy review to clipboard and show the friendly Paste instruction modal
  const handleCopyAndPost = async (text: string, id?: string | number) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
    } catch (e) {
      console.error("Clipboard error:", e);
    }

    if (id !== undefined) {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 3000);
    }

    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch (e) {}

    setSelectedReviewText(text);
    setIsModalOpen(true);
    // Note: Google opens when the user taps "Open Google & Paste" on the modal, 
    // ensuring they know to paste!
  };

	const handleDirect5Star = () => {
		try {
			confetti({
				particleCount: 100,
				spread: 70,
				origin: { y: 0.6 },
			});
		} catch (e) {}
		window.open(
			STORE_DATA.googleReviewUrl,
			"_blank",
			"noopener,noreferrer",
		);
	};

	return (
		<div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-between">
			<div>
				{/* Store Top Header */}
				<StoreHeader
					onOpenQR={() => setIsQROpen(true)}
					rating={STORE_DATA.rating}
					totalReviews={STORE_DATA.totalReviews}
				/>

				<main className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-7">
					{/* 1-Tap Google Review Prompt Banner (Navy & Coral Red Brand Gradient) */}
					<div className="bg-gradient-to-r from-[#092B3C] via-[#0D384D] to-[#092B3C] rounded-3xl p-5 sm:p-6 text-white shadow-xl shadow-[#092B3C]/15 relative overflow-hidden border border-[#092B3C]/30">
						<div className="absolute -right-8 -bottom-8 w-36 h-36 bg-[#E53E51]/20 rounded-full blur-2xl pointer-events-none" />
						<div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
							<div>
								<span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-rose-200 mb-2 border border-white/10">
									<Sparkles className="w-3.5 h-3.5 text-[#E53E51]" />
									Your Opinion Matters to Us
								</span>
								<h2 className="text-xl sm:text-2xl font-black tracking-tight">
									Rate Your Experience on Google
								</h2>
								<p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-md">
									Tap 5 stars below to open Google directly,
									or select a pre-written review below to copy
									&amp; post in 1 click!
								</p>
							</div>

							{/* 5-Star Quick Tap */}
							<button
								onClick={handleDirect5Star}
								className="w-full sm:w-fit group flex flex-col items-center justify-center p-3.5 rounded-2xl bg-white text-slate-900 shadow-lg hover:scale-105 active:scale-95 transition-all flex-shrink-0"
								title="Tap to review 5 stars on Google"
							>
								<div className="flex items-center gap-1 text-amber-400 group-hover:scale-110 transition-transform">
									{[...Array(5)].map((_, i) => (
										<Star
											key={i}
											className="w-5 h-5 fill-amber-400 stroke-amber-500"
										/>
									))}
								</div>
								<span className="text-xs font-bold text-[#E53E51] mt-1 flex items-center gap-1">
									Rate 5 Stars on Google{" "}
									<ExternalLink className="w-3 h-3" />
								</span>
							</button>
						</div>
					</div>

					{/* Custom Review Builder Accordion */}
					<div>
						<button
							type="button"
							onClick={() =>
								setShowCustomBuilder(!showCustomBuilder)
							}
							className="w-full flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:border-[#E53E51]/40 transition-all text-left"
						>
							<div className="flex items-center gap-2.5">
								<div className="w-9 h-9 rounded-xl bg-red-50 text-[#E53E51] flex items-center justify-center font-bold">
									<MessageSquarePlus className="w-5 h-5" />
								</div>
								<div>
									<h3 className="text-sm font-bold text-[#092B3C]">
										Want to personalize your review?
									</h3>
									<p className="text-xs text-slate-500">
										Use our 1-tap review builder with
										customized tags
									</p>
								</div>
							</div>
							<div className="text-slate-400">
								{showCustomBuilder ? (
									<ChevronUp className="w-5 h-5" />
								) : (
									<ChevronDown className="w-5 h-5" />
								)}
							</div>
						</button>

						{showCustomBuilder && (
							<div className="mt-3 animate-fadeIn">
								<CustomReviewBuilder
									onSelectReview={(text) =>
										handleCopyAndPost(text)
									}
								/>
							</div>
						)}
					</div>

					{/* =============================================================== */}
					{/* CATEGORIES SECTION (5 Reviews Each for Copy & Post) */}
					{/* =============================================================== */}
					<div className="space-y-3.5">
						<div>
							<h3 className="font-bold text-[#092B3C] text-base">
								Choose a Review to Copy &amp; Post
							</h3>
							<p className="text-xs text-slate-500">
								Select your product category below
							</p>
						</div>

						{/* Category Pills (Horizontal Scroll) */}
						<div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0">
							<button
								onClick={() => setActiveCategory("ALL")}
								className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
									activeCategory === "ALL"
										? "bg-[#092B3C] text-white shadow-md shadow-[#092B3C]/25 scale-[1.02]"
										: "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
								}`}
							>
								All ({allReviews.length})
							</button>

							{STORE_DATA.categories.map((cat) => {
								const isActive =
									activeCategory.toLowerCase() ===
									cat.name.toLowerCase();
								return (
									<button
										key={cat.id}
										onClick={() =>
											setActiveCategory(cat.name)
										}
										className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
											isActive
												? "bg-[#E53E51] text-white shadow-md shadow-[#E53E51]/25 scale-[1.02]"
												: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
										}`}
									>
										{cat.name === "Kids Bicycles" &&
											"Kids Bicycles"}
										{cat.name === "Ranger Bicycles" &&
											"Ranger Bicycles"}
										{cat.name === "Tricycles" &&
											"Tricycles"}
										{cat.name === "Scooters" && "Scooters"}
										<span className="ml-1.5 opacity-80">
											({cat.reviews.length})
										</span>
									</button>
								);
							})}
						</div>

						{/* Live Search */}
						<div className="relative">
							<Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
							<input
								type="text"
								placeholder="Search reviews by keyword (e.g., training wheels, gear, toddler, brakes)..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#092B3C]/20 focus:border-[#092B3C] transition-all shadow-sm"
							/>
							{searchQuery && (
								<button
									onClick={() => setSearchQuery("")}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
								>
									Clear
								</button>
							)}
						</div>
					</div>

					{/* Review Cards List for Copy & Post */}
					<div className="space-y-3.5 max-h-[36rem] overflow-y-scroll">
						{filteredReviews.length === 0 ? (
							<div className="text-center py-12 px-4 bg-white rounded-3xl border border-slate-200">
								<Bike className="w-12 h-12 text-slate-300 mx-auto mb-3" />
								<h4 className="font-bold text-slate-800 text-base">
									No reviews found
								</h4>
								<p className="text-slate-500 text-xs mt-1">
									Try searching for a different keyword or
									select another category above.
								</p>
								<button
									onClick={() => {
										setActiveCategory("ALL");
										setSearchQuery("");
									}}
									className="mt-4 px-4 py-2 bg-[#092B3C] text-white rounded-xl text-xs font-semibold"
								>
									Show All Reviews
								</button>
							</div>
						) : (
							filteredReviews.map((item) => {
								const isCopied = copiedId === item.id;

								return (
									<div
										key={item.id}
										className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4 group hover:border-[#E53E51]/30"
									>
										<div>
											{/* Top Card Bar */}
											<div className="flex items-center justify-between mb-2.5">
												<div className="flex items-center gap-1 text-amber-400">
													{[...Array(5)].map(
														(_, i) => (
															<Star
																key={i}
																className="w-4 h-4 fill-amber-400 stroke-amber-500"
															/>
														),
													)}
												</div>
												<span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
													{item.category}
												</span>
											</div>

											{/* Review Text */}
											<p className="text-slate-700 text-sm sm:text-base leading-relaxed">
												&quot;{item.text}&quot;
											</p>
										</div>

										{/* Action Button (Coral Red / Brand Navy) */}
										<div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
											<span className="text-[11px] text-slate-400 hidden sm:inline">
												1-Click Copy &amp; Open Google
											</span>
											<button
												type="button"
												onClick={() =>
													handleCopyAndPost(
														item.text,
														item.id,
													)
												}
												className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] ${
													isCopied
														? "bg-emerald-600 text-white shadow-emerald-600/25"
														: "bg-[#E53E51] hover:bg-[#d03345] text-white shadow-[#E53E51]/25"
												}`}
											>
												{isCopied ? (
													<>
														<CheckCircle2 className="w-4 h-4" />
														<span>
															Copied &amp; Opening
															Google...
														</span>
													</>
												) : (
													<>
														<Copy className="w-4 h-4" />
														<span>
															Copy &amp; Post on
															Google
														</span>
														<ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
													</>
												)}
											</button>
										</div>
									</div>
								);
							})
						)}
					</div>
				</main>
			</div>

			{/* =============================================================== */}
			{/* ACTUAL GOOGLE REVIEWS SECTION (Professional Social Proof Showcase) */}
			{/* =============================================================== */}
			<section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-sm">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
							<Award className="w-4 h-4" />
						</div>
						<div>
							<h3 className="text-base font-bold text-[#092B3C]">
								What Our Customers Say on Google
							</h3>
							<p className="text-xs text-slate-500">
								Real feedback from Google Maps verified
								customers
							</p>
						</div>
					</div>
					<a
						href="https://share.google/O8CWylaJSVjyjF3lp"
						target="_blank"
						rel="noopener noreferrer"
						className="opacity-0 sm:opacity-100 text-xs font-bold text-[#092B3C] hover:text-[#E53E51] inline-flex items-center gap-1 transition-colors"
					>
						<span>View on Google</span>
						<ExternalLink className="w-3 h-3" />
					</a>
				</div>

				{/* Scrollable / Grid of Actual Reviews */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
					{STORE_DATA.actualGoogleReviews.map((rev) => (
						<div
							key={rev.id}
							className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/70 flex flex-col justify-between"
						>
							<div>
								<div className="flex items-center justify-between mb-2">
									<div>
										<p className="text-xs font-bold text-slate-900 leading-tight">
											{rev.authorName}
										</p>
									</div>

									<span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
										✓ Google Verified
									</span>
								</div>

								<div className="flex items-center gap-0.5 text-amber-400 mb-2">
									{[...Array(rev.rating)].map((_, i) => (
										<Star
											key={i}
											className="w-3.5 h-3.5 fill-amber-400 stroke-amber-500"
										/>
									))}
								</div>

								<p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
									&quot;{rev.text}&quot;
								</p>
							</div>
						</div>
					))}
				</div>
			</section>

			{/* Footer */}
			<footer className="mt-12 py-6 px-4 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
				<div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
					<p>
						© {new Date().getFullYear()}{" "}
						<strong>Banke Cycle Co</strong> • Panchkuva, Ahmedabad -
						380001
					</p>
					<div className="flex items-center gap-4">
						<button
							onClick={() => setIsQROpen(true)}
							className="text-[#092B3C] hover:text-[#E53E51] hover:underline font-semibold"
						>
							Get Counter QR Code
						</button>
						<a
							href="https://share.google/O8CWylaJSVjyjF3lp"
							target="_blank"
							rel="noopener noreferrer"
							className="text-[#092B3C] hover:text-[#E53E51] hover:underline font-semibold inline-flex items-center gap-1"
						>
							<span>Direct Google Link</span>
							<ExternalLink className="w-3 h-3" />
						</a>
					</div>
				</div>
			</footer>

			{/* Modal Guide */}
			<InstructionModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				reviewText={selectedReviewText}
				googleReviewUrl={STORE_DATA.googleReviewUrl}
			/>

			{/* Standee QR Code Modal */}
			<QRCodeModal
				isOpen={isQROpen}
				onClose={() => setIsQROpen(false)}
				targetUrl={
					typeof window !== "undefined"
						? window.location.href
						: STORE_DATA.googleReviewUrl
				}
				storeName={STORE_DATA.name}
			/>
		</div>
	);
}
