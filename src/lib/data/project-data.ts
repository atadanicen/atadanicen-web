export type ProjectItem = {
	id: string;
	title: string;
	description: string;
	bulletpoints: string[];
	techStack: string[];
	githubUrl?: string;
	liveUrl?: string;
	image?: string;
	featured?: boolean;
};

const projectsData: ProjectItem[] = [
	{
		id: 'sam',
		title: 'Smart Academic Mate (SAM)',
		description:
			'An intelligent tutoring SaaS that transforms rote memorization into question-driven learning using vision-based RAG. (Under development)',
		bulletpoints: [
			'Built a full-stack vision-based RAG SaaS as a solo founder',
			'Designed a scalable document ingestion and indexing pipeline',
			'Improved retrieval quality using agentic RAG techniques'
		],
		techStack: ['Next.js', 'Convex', 'LanceDB', 'FastAPI', 'RAG', 'LangChain'],
		featured: true
	},
	{
		id: 'ai-travel-planner',
		title: 'AI Travel Planner',
		description:
			'An AI-powered travel planner using multi-agent orchestration to generate personalized travel plans.',
		bulletpoints: [
			'Implemented AI agent orchestration using CrewAI',
			'Deployed Ollama with an open-source LLM (OpenHermes)',
			'Built an interactive Streamlit UI'
		],
		techStack: ['Python', 'CrewAI', 'Ollama', 'Streamlit'],
		githubUrl: 'https://github.com/atadanicen/travel-planner',
		liveUrl: 'https://lightning.ai/atadanicen/studios/ai-travel-planner-crewai-ollama',
		image: '/images/travel-planner.png'
	},

	{
		id: 'realistic-photo-generator',
		title: 'Realistic Photo Generator',
		description:
			'A personalized image generation system that creates realistic photos using user faces.',
		bulletpoints: [
			'Integrated Stable Diffusion with IP-Adapter for face conditioning',
			'Built a high-performance FastAPI backend',
			'Designed a user-friendly Streamlit interface'
		],
		techStack: ['Python', 'Stable Diffusion', 'FastAPI', 'Streamlit'],
		githubUrl: 'https://github.com/atadanicen/realistic-photo-generator',
		liveUrl: 'https://lightning.ai/atadanicen/studios/generative-ai-photo-generator',
		image: '/images/photo-generator.png'
	},
	{
		id: 'near-earth-observation',
		title: 'Near Earth Observation',
		description:
			'A data exploration app that simplifies NASA’s Near-Earth Object (NEO) API, enabling users to analyze asteroid flybys over extended date ranges.',
		bulletpoints: [
			'Bypassed the NASA NEO API’s 7-day limit to enable up to 31 days of asteroid data analysis',
			'Implemented sortable tables and CSV export for data-driven research and analysis',
			'Built an intuitive Streamlit interface for quick exploration'
		],
		techStack: ['Python', 'Streamlit', 'NASA NEO API', 'Pandas'],
		githubUrl: 'https://github.com/atadanicen/near-earth-observation',
		liveUrl: 'https://near-earth-observation.streamlit.app',
		image: '/images/near-earth-observation.png'
	},
	{
		id: 'currency-minds',
		title: 'Currency Minds',
		description:
			'A lightweight currency converter and time-series visualization app using European Central Bank reference rates via the Frankfurter API.',
		bulletpoints: [
			'Implemented real-time currency conversion using ECB-backed exchange rates refreshed daily',
			'Built interactive time-series charts to analyze historical currency trends',
			'Enabled CSV export of historical exchange rate data for offline analysis'
		],
		techStack: ['Python', 'Streamlit', 'Frankfurter API', 'Pandas'],
		githubUrl: 'https://github.com/atadanicen/currency-minds',
		liveUrl: 'https://currency-minds.streamlit.app',
		image: '/images/currency-minds.png'
	},

	{
		id: 'risky-form-detection',
		title: 'Risky Form Detection System',
		description:
			'A machine learning system designed to detect potentially malicious forms such as credit card theft and spam.',
		bulletpoints: [
			'Developed a high-performance detection model using PyCaret and LightGBM',
			'Achieved 98% F1 score and 97% precision in identifying risky forms',
			'Reduced manual form review workload by 20%',
			'Built a Bootstrap/PHP interface with a FastAPI backend',
			'Designed a SQL database to track predictions and optimize retraining intervals'
		],
		techStack: ['Python', 'PyCaret', 'LightGBM', 'FastAPI', 'SQL', 'Bootstrap', 'PHP']
	},
	{
		id: 'form-template-recommendation',
		title: 'Form Template Recommendation System',
		description:
			'A semantic recommendation system that suggests similar form templates based on user intent.',
		bulletpoints: [
			'Developed a recommendation system using SBERT embeddings',
			'Identified semantically similar form templates with high accuracy',
			'Mined large-scale form templates using Selenium',
			'Built a responsive Bootstrap/PHP frontend with a FastAPI backend'
		],
		techStack: ['Python', 'SBERT', 'Selenium', 'FastAPI', 'Bootstrap', 'PHP']
	},

	{
		id: 'trajectory-prediction',
		title: 'Real-Time Trajectory Prediction System',
		description:
			'A real-time system for predicting future object trajectories using computer vision.',
		bulletpoints: [
			'Used YOLOv5 for object detection',
			'Applied Kalman Filters for trajectory forecasting',
			'Visualized predictions in real time with Streamlit'
		],
		techStack: ['Python', 'PyTorch', 'OpenCV', 'Streamlit'],
		image: '/images/trajectory-prediction.png'
	}
];

export default projectsData;
