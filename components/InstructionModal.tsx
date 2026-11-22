"use client";

import React, { useEffect, useState } from "react";
import { CheckCircle2, ExternalLink, Star, Copy, X } from "lucide-react";

interface InstructionModalProps {
	isOpen: boolean;
	onClose: () => void;
	reviewText: string;
	googleReviewUrl: string;
}

export default function InstructionModal({
	isOpen,
	onClose,
	reviewText,
	googleReviewUrl,
}: InstructionModalProps) {
	const [copiedAgain, setCopiedAgain] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setCopiedAgain(false);
		}
	}, [isOpen]);

	if (!isOpen) return null;

	const handleCopyAgain = async () => {
		try {
			if (navigator.clipboard && navigator.clipboard.writeText) {
				await navigator.clipboard.writeText(reviewText);
			} else {
				const textArea = document.createElement("textarea");
				textArea.value = reviewText;
				document.body.appendChild(textArea);
				textArea.select();
				document.execCommand("copy");
				document.body.removeChild(textArea);
			}
			setCopiedAgain(true);
			setTimeout(() => setCopiedAgain(false), 2500);
		} catch (e) {
			console.error(e);
		}
	};

	const handleOpenGoogle = () => {
		window.open(googleReviewUrl, "_blank", "noopener,noreferrer");
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
			<div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
				{/* Header decoration */}
				<div className="bg-[#092B3C] p-6 text-white text-center relative border-b-4 border-[#E53E51]">
					<button
						onClick={onClose}
						className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
						aria-label="Close"
					>
						<X className="w-5 h-5" />
					</button>
					<div className="inline-flex items-center justify-center w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl mb-2 text-[#E53E51]">
						<CheckCircle2 className="w-8 h-8 text-[#E53E51]" />
					</div>
					<h3 className="text-xl sm:text-2xl font-bold tracking-tight">
						Review Copied to Clipboard! 🎉
					</h3>
					<p className="text-slate-300 text-xs sm:text-sm mt-1">
						Follow these 2 quick steps on the Google page:
					</p>
				</div>

				{/* 2-Step Visual Guide */}
				<div className="p-6 space-y-4">
					<div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200/60">
						<div className="flex-shrink-0 w-8 h-8 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow-sm">
							1
						</div>
						<div>
							<p className="font-bold text-slate-800 text-sm">
								Tap 5 Stars
							</p>
							<div className="flex items-center gap-1 mt-1 text-amber-500">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="w-4 h-4 fill-amber-400 stroke-amber-500"
									/>
								))}
							</div>
						</div>
					</div>

					<div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-red-50/60 border border-[#E53E51]/20">
						<div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#E53E51] text-white font-bold flex items-center justify-center text-sm shadow-sm">
							2
						</div>
						<div>
							<p className="font-bold text-slate-800 text-sm">
								Paste Your Copied Review
							</p>
							<p className="text-xs text-slate-600 mt-0.5">
								On mobile: <strong>Press and hold</strong> in
								the review box &rarr; tap{" "}
								<strong>&quot;Paste&quot;</strong>.
								<br />
								On computer: Right-click &rarr;{" "}
								<strong>Paste</strong> (or Ctrl+V).
							</p>
						</div>
					</div>

					{/* Copied Review Preview Box */}
					<div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700">
						<div className="flex items-center justify-between mb-1.5 font-medium text-slate-500 text-[11px] uppercase tracking-wider">
							<span>Ready in your clipboard:</span>
							<button
								onClick={handleCopyAgain}
								className="inline-flex items-center gap-1 text-[#E53E51] hover:underline font-semibold"
							>
								<Copy className="w-3.5 h-3.5" />
								{copiedAgain ? "Copied!" : "Re-copy"}
							</button>
						</div>
						<p className="italic line-clamp-2 text-slate-800">
							&quot;{reviewText}&quot;
						</p>
					</div>

					{/* Action Buttons */}
					<div className="pt-2 flex flex-col sm:flex-row gap-3">
						<button
							onClick={handleOpenGoogle}
							className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-[#E53E51] hover:bg-[#d03345] text-white font-bold text-sm shadow-lg shadow-[#E53E51]/25 active:scale-[0.98] transition-all"
						>
							<span>Open Google &amp; Paste Review</span>
							<ExternalLink className="w-4 h-4" />
						</button>
						<button
							onClick={onClose}
							className="px-5 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
