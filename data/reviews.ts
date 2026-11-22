export interface Review {
	id: string | number;
	text: string;
	category: string;
}

export interface ActualGoogleReview {
	id: string;
	authorName: string;
	rating: number;
	text: string;
}

export interface CategoryGroup {
	id: number;
	name: string;
	reviews: Review[];
}

export interface StoreInfo {
	name: string;
	tagline: string;
	category: string;
	address: string;
	phone: string;
	displayPhone: string;
	googleReviewUrl: string;
	googleMapsUrl: string;
	rating: number;
	totalReviews: string;
	actualGoogleReviews: ActualGoogleReview[];
	categories: CategoryGroup[];
}

export const STORE_DATA: StoreInfo = {
	name: "Banke Cycle Co",
	tagline: "60+ Years Trusted Bicycle Showroom",
	category: "Bicycle shop",
	address: "Panchkuva, Ahmedabad, Gujarat",
	phone: "6351101722",
	displayPhone: "+91 63511 01722",
	googleReviewUrl:
		"https://search.google.com/local/writereview?placeid=ChIJ8_qnyIqEXjkR7Qnc80tTqkw",
	googleMapsUrl:
		"https://maps.google.com/?q=Banke+Cycle+Co+Panchkuva+Ahmedabad",
	rating: 4.8,
	totalReviews: "50+",

	// =========================================================================
	// 1. ACTUAL GOOGLE REVIEWS (Read-only Showcase - No Copy/Post button)
	// Edit these placeholders with your actual customer reviews from Google!
	// =========================================================================
	actualGoogleReviews: [
		{
			id: "actual-1",
			authorName: "Rajesh Raval",
			rating: 5,
			text: "I was looking for a new kids bicycle and found a perfect one here. The staff knew exactly what to recommend and were so kind throughout the process. My child can’t stop riding it! Great service, great products.",
		},
		{
			id: "actual-2",
			authorName: "Monika Parihar",
			rating: 5,
			text: "Just picked up a new BMX bike for my son, and he is thrilled! The staff was wonderful, helping us choose the right fit. The selection is impressive, and the prices are fair. I’ll be recommending this shop to friends.",
		},
		{
			id: "actual-3",
			authorName: "Yogesh Rathod",
			rating: 5,
			text: "The prices here are unbeatable. I found a fantastic BMX bike for my son. The staff was super helpful too, guiding me to the best options for him.",
		},
		{
			id: "actual-4",
			authorName: "Neha Khatri",
			rating: 5,
			text: "I had an amazing experience choosing a kids bicycle. The staff was patient and explained everything well. My daughter loves her new bike, and I’m grateful for the excellent service we received. A great place for families!",
		},
		{
			id: "actual-5",
			authorName: "Mahendra Sahani",
			rating: 5,
			text: "What a fantastic experience! I purchased a geared bicycle and was impressed by the quality and selection available. The staff was friendly and took their time to ensure I was happy with my choice. Highly recommend!",
		},
		{
			id: "actual-6",
			authorName: "Aasif Khan",
			rating: 5,
			text: "The showroom is well-organized, and the staff is eager to help. I found a beautiful hybrid bike that suits my needs perfectly. The prices are fair, and the quality is top-notch. A great place for cyclists of all levels.",
		},
	],

	// =========================================================================
	// 2. CATEGORIZED REVIEWS (5 distinct reviews each for Copy & Post)
	// =========================================================================
	categories: [
		{
			id: 1,
			name: "Kids Bicycles",
			reviews: [
				{
					id: 101,
					category: "Kids Bicycles",
					text: "Finding a solid, reliable 14T cycle was effortless here. Loved the vibrant color finish, non-slip pedals, and responsive brakes. Truly Ahmedabad's best bicycle showroom for beginner sizes.",
				},
				{
					id: 102,
					category: "Kids Bicycles",
					text: "Selected a 16T bicycle from Banke Cycle Co and the ride quality is top-notch. Sturdy steel frame, wide anti-skid tires, and great brake responsiveness. The staff assembled and tuned everything on the spot. 10/10 experience!",
				},
				{
					id: 103,
					category: "Kids Bicycles",
					text: "Excellent experience buying a 20T cycle here. Perfect balance between durability and lightweight agility. If you're looking for genuine quality and dependable advice, Banke Cycle Co is the place to visit.",
				},
				{
					id: 104,
					category: "Kids Bicycles",
					text: "Fantastic experience picking out a bicycle for my daughter's birthday. The team was patient, letting her test ride multiple models to find the perfect fit. Outstanding customer service!",
				},
				{
					id: 105,
					category: "Kids Bicycles",
					text: "Banke Cycle Co has been our family's trusted cycle store for years. Recently purchased a kids bicycle with all accessories. Smooth brakes and great durability. Highly recommend!",
				},
			],
		},
		{
			id: 2,
			name: "Ranger Bicycles",
			reviews: [
				{
					id: 201,
					category: "Ranger Bicycles",
					text: "Purchased a 21-speed ranger bicycle for daily fitness and weekend trails. Excellent build quality, smooth gear shifting, and powerful disc brakes. Best bicycle store in Panchkuva!",
				},
				{
					id: 202,
					category: "Ranger Bicycles",
					text: "Banke Cycle Co has an unmatched collection of geared ranger cycles. The staff gave expert advice on frame sizing and suspension setup. Very happy with the performance!",
				},
				{
					id: 203,
					category: "Ranger Bicycles",
					text: "Sturdy, stylish, and high-performance ranger bike at an unbeatable price. The team assembled it quickly and ensured all tuning was spotless. 10/10 recommendation!",
				},
				{
					id: 204,
					category: "Ranger Bicycles",
					text: "I visited multiple cycle shops across Ahmedabad, but Banke Cycle Co offered the best value and variety for ranger bikes. Honest advice without any sales pressure.",
				},
				{
					id: 205,
					category: "Ranger Bicycles",
					text: "Superb riding comfort on my new ranger bicycle. Premium alloy frame and durable components. Truly Ahmedabad's most trusted bicycle showroom for 60+ years!",
				},
			],
		},
		{
			id: 3,
			name: "Tricycles",
			reviews: [
				{
					id: 301,
					category: "Tricycles",
					text: "Got a toddler tricycle with parental push handle and canopy from Banke Cycle Co. Solid metal frame, comfortable seat, and very safe for little ones. My toddler loves it!",
				},
				{
					id: 302,
					category: "Tricycles",
					text: "Wonderful collection of baby and toddler tricycles. The staff demonstrated all features patiently and helped us choose the safest model. Highly satisfied with the quality!",
				},
				{
					id: 303,
					category: "Tricycles",
					text: "Affordable and durable tricycles in Ahmedabad. Found the exact musical tricycle my child wanted. Excellent store with friendly staff in Panchkuva!",
				},
				{
					id: 304,
					category: "Tricycles",
					text: "Great shopping experience for our baby's first tricycle. Sturdy build, non-slip pedals, and easy to steer. Thank you Banke Cycle Co for the reliable service!",
				},
				{
					id: 305,
					category: "Tricycles",
					text: "Best shop for toddler tricycles and ride-ons. Wide range of colors and designs at wholesale-level retail prices. 60+ years of trust truly shows in their service.",
				},
			],
		},
		{
			id: 4,
			name: "Scooters",
			reviews: [
				{
					id: 401,
					category: "Scooters",
					text: "Bought a kick scooter with LED light-up wheels for my kids. Extremely smooth gliding, sturdy aluminum body, and adjustable handlebar height. Amazing quality!",
				},
				{
					id: 402,
					category: "Scooters",
					text: "Banke Cycle Co has the best range of foldable kids scooters in Ahmedabad. Lightweight, durable, and great safety grip on the deck. Kids are enjoying it every day!",
				},
				{
					id: 403,
					category: "Scooters",
					text: "Purchased a 3-wheel balance scooter for my 4-year-old. Very stable, easy to steer, and excellent build quality. Worth every rupee!",
				},
				{
					id: 404,
					category: "Scooters",
					text: "Staff was very helpful in showing us the right scooter suitable for my child's age and weight. Great prices and prompt service. Very happy customer!",
				},
				{
					id: 405,
					category: "Scooters",
					text: "Super durable kick scooter with strong rear brakes. The kids love the smooth ride and glowing wheels. Highly recommend Banke Cycle Co for scooters and ride-ons!",
				},
			],
		},
	],
};
