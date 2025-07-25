import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'react-router-dom';

// Type definitions
interface Project {
    id: 'visioncheck' | 'cockpit' | 'snag';
    title: string;
    subtitle: string;
}

interface SectionProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

interface CodeBlockProps {
    children: React.ReactNode;
    language?: string;
}

type InfoCardType = 'default' | 'warning' | 'success' | 'info';
interface InfoCardProps {
    title: string;
    description: string;
    type?: InfoCardType;
}

interface TableProps {
    headers: string[];
    rows: (string | React.ReactNode)[][];
}

interface Feature {
    title: string;
    description: string;
}

interface FeatureGridProps {
    features: Feature[];
}

interface Step {
    title: string;
    description: string;
}

interface StepListProps {
    steps: Step[];
}

const DocumentationPage = ({
    active,
}: {
    active?: 'visioncheck' | 'cockpit' | 'snag';
}) => {
    const { docId } = useParams<{ docId: string }>();

    const [activeProject, setActiveProject] = useState<
        'visioncheck' | 'cockpit' | 'snag'
    >(active || 'visioncheck');

    useEffect(() => {
        if (
            docId &&
            (docId === 'visioncheck' || docId === 'cockpit' || docId === 'snag')
        ) {
            setActiveProject(docId);
        } else {
            setActiveProject('visioncheck');
        }
    }, [docId]);

    const projects: Project[] = [
        {
            id: 'visioncheck',
            title: 'VisionCheck',
            subtitle: 'Computer Vision Measurement Tool',
        },
        {
            id: 'cockpit',
            title: 'Cockpit Voice Command System',
            subtitle: 'Real-time Voice Recognition',
        },
        // Added snag project to the array for consistency
        {
            id: 'snag',
            title: 'SnaGenie',
            subtitle: 'Aircraft Snag Rectification System',
        },
    ];

    const ProjectSelector: React.FC = () => (
        <div className="border-b border-primary-200 bg-white sticky top-0 z-10">
            <div className="max-w-7xl mx-auto px-6 py-4">
                <div className="flex space-x-1">
                    {projects.map((project) => (
                        <button
                            key={project.id}
                            onClick={() => setActiveProject(project.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                                activeProject === project.id
                                    ? 'bg-accent-500 text-blue-400'
                                    : 'text-blue-800 hover:bg-primary-100'
                            }`}
                        >
                            {project.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );

    const Section: React.FC<SectionProps> = ({
        title,
        children,
        className = '',
    }) => (
        <section className={`mb-12 ${className}`}>
            <h2 className="text-2xl font-semibold text-primary-900 mb-6 pb-3 border-b border-primary-200">
                {title}
            </h2>
            {children}
        </section>
    );

    const CodeBlock: React.FC<CodeBlockProps> = ({
        children,
        language = 'bash',
    }) => (
        <div className="bg-primary-900 rounded-lg p-4 my-4 overflow-x-auto border">
            <pre className="text-sm text-primary-100">
                <code className={`language-${language}`}>{children}</code>
            </pre>
        </div>
    );

    const InfoCard: React.FC<InfoCardProps> = ({
        title,
        description,
        type = 'default',
    }) => {
        const baseClasses = 'p-4 rounded-lg border-l-4 my-4';
        const typeClasses = {
            default: 'bg-primary-50 border-primary-500 text-primary-800',
            warning: 'bg-yellow-50 border-yellow-500 text-yellow-800',
            success: 'bg-green-50 border-green-500 text-green-800',
            info: 'bg-blue-50 border-blue-500 text-blue-800',
        };

        return (
            <div className={`${baseClasses} ${typeClasses[type]}`}>
                <h4 className="font-semibold mb-2">{title}</h4>
                <p className="text-sm leading-relaxed">{description}</p>
            </div>
        );
    };

    const Table: React.FC<TableProps> = ({ headers, rows }) => (
        <div className="overflow-x-auto my-6 border border-primary-200 rounded-lg">
            <table className="w-full">
                <thead className="bg-primary-50">
                    <tr>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-sm font-semibold text-primary-900 border-b border-primary-200"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b border-primary-100 hover:bg-primary-50 transition-colors"
                        >
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="px-6 py-4 text-sm text-primary-700"
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

    const FeatureGrid: React.FC<FeatureGridProps> = ({ features }) => (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
            {features.map((feature, index) => (
                <div
                    key={index}
                    className="bg-white p-4 rounded-lg border border-primary-200 hover:shadow-sm transition-shadow"
                >
                    <h4 className="font-medium text-primary-900 mb-2">
                        {feature.title}
                    </h4>
                    <p className="text-sm text-primary-600">
                        {feature.description}
                    </p>
                </div>
            ))}
        </div>
    );

    const StepList: React.FC<StepListProps> = ({ steps }) => (
        <div className="space-y-4 my-6">
            {steps.map((step, index) => (
                <div
                    key={index}
                    className="flex gap-4 p-4 bg-white rounded-lg border border-primary-200"
                >
                    <div className="flex-shrink-0 w-8 h-8 bg-accent-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                        {index + 1}
                    </div>
                    <div>
                        <h4 className="font-medium text-primary-900 mb-1">
                            {step.title}
                        </h4>
                        <p className="text-sm text-primary-600">
                            {step.description}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );

    const VisionCheckContent = () => (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-primary-900 mb-3">
                    VisionCheck
                </h1>
                <p className="text-xl text-primary-600 leading-relaxed">
                    A computer vision tool built using Python and OpenCV,
                    designed to detect and measure the dimensions of real-world
                    objects in real time using a reference ArUco marker for
                    scale calibration.
                </p>
            </div>

            <Section title="Overview">
                <p className="text-primary-700 leading-relaxed mb-4">
                    VisionCheck is equipped with a graphical user interface
                    (GUI) built in tkinter and supports real-time video capture,
                    shape classification, size computation, and exporting of
                    results.
                </p>
                <InfoCard
                    title="Key Capabilities"
                    description="Real-time video processing, automated shape detection, precise measurements, and comprehensive data export functionality."
                    type="info"
                />
            </Section>

            <Section title="How It Works">
                <p className="text-primary-700 leading-relaxed mb-4">
                    The tool leverages ArUco markers to calibrate real-world
                    scale and uses contour-based shape detection to identify
                    objects in the camera feed or static images.
                </p>
                <InfoCard
                    title="Core Principle"
                    description="By knowing the real-world size of the ArUco marker, we can calculate the pixel-to-cm ratio and use it to compute the size of other detected objects."
                    type="success"
                />
            </Section>

            <Section title="Step-by-Step Flow">
                <StepList
                    steps={[
                        {
                            title: 'Load Camera / Image',
                            description:
                                'Live webcam feed or a static image can be selected for processing.',
                        },
                        {
                            title: 'Detect ArUco Marker',
                            description:
                                'The tool detects the ArUco marker in the frame and calculates the scale.',
                        },
                        {
                            title: 'Find Contours / Shapes',
                            description:
                                "Objects are detected using OpenCV's contour detection methods.",
                        },
                        {
                            title: 'Classify Shapes',
                            description:
                                'Shapes such as rectangles, squares, circles, ellipses, and triangles are identified based on geometric properties.',
                        },
                        {
                            title: 'Compute Measurements',
                            description:
                                'Dimensions (width, height, perimeter, area) are calculated using the scale from the ArUco marker.',
                        },
                        {
                            title: 'Display & Export',
                            description:
                                'Detected shapes and measurements are overlaid on the image. Users can export results to CSV or JSON.',
                        },
                    ]}
                />
            </Section>

            <Section title="Inputs & Outputs">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Inputs
                        </h3>
                        <Table
                            headers={['Input Type', 'Description']}
                            rows={[
                                [
                                    'Camera Feed',
                                    'Live webcam stream for real-time measurement',
                                ],
                                [
                                    'Static Image',
                                    'PNG, JPG image with an ArUco marker in view',
                                ],
                                [
                                    'ArUco Marker Size',
                                    'Real-world length (in cm) of one side of the marker',
                                ],
                            ]}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Outputs
                        </h3>
                        <Table
                            headers={['Output', 'Description']}
                            rows={[
                                [
                                    'Annotated Image',
                                    'Objects outlined with shape name and size labels',
                                ],
                                [
                                    'CSV / JSON File',
                                    'Exported data with shape type, position, and measurements',
                                ],
                                [
                                    'Statistics',
                                    'Summary of all shapes: count, area, perimeter stats',
                                ],
                                [
                                    'Auto Save',
                                    'CSV data is saved every few seconds as configured',
                                ],
                            ]}
                        />
                    </div>
                </div>
            </Section>

            <Section title="Tech Stack">
                <Table
                    headers={['Component', 'Technology']}
                    rows={[
                        ['Programming Language', 'Python'],
                        ['Computer Vision', 'OpenCV'],
                        ['GUI Framework', 'Tkinter'],
                        ['Marker Detection', 'OpenCV ArUco Module'],
                        ['Data Export', 'CSV, JSON'],
                        ['Threading', 'Python threading module'],
                    ]}
                />
            </Section>

            <Section title="How to Use">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Installation
                        </h3>
                        <p className="text-primary-700 mb-3">
                            Ensure you have Python 3.7+ installed, then install
                            dependencies:
                        </p>
                        <CodeBlock>pip install opencv-python numpy</CodeBlock>
                        <p className="text-primary-700 mb-2">
                            If cv2.aruco is missing:
                        </p>
                        <CodeBlock>pip install opencv-contrib-python</CodeBlock>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Usage Instructions
                        </h3>
                        <StepList
                            steps={[
                                {
                                    title: 'Start the Tool',
                                    description: 'Run: python main.py',
                                },
                                {
                                    title: 'Settings Tab',
                                    description:
                                        'Enter the real-world ArUco marker size (in cm), set auto-save interval, select shape classification options',
                                },
                                {
                                    title: 'Camera Tab',
                                    description:
                                        'Click Start Camera for live capture or Load Image for static processing',
                                },
                                {
                                    title: 'Data Tab',
                                    description:
                                        'Export data to CSV or JSON, generate and view measurement statistics',
                                },
                            ]}
                        />
                    </div>
                </div>
            </Section>

            <Section title="Limitations">
                <div className="space-y-3">
                    {[
                        'Requires clear visibility of ArUco marker',
                        'Accuracy depends on camera angle and resolution',
                        'Complex or overlapping shapes may be misclassified',
                    ].map((limitation, index) => (
                        <InfoCard
                            key={index}
                            title="Constraint"
                            description={limitation}
                            type="warning"
                        />
                    ))}
                </div>
            </Section>

            <Section title="Future Improvements">
                <FeatureGrid
                    features={[
                        {
                            title: 'Video File Support',
                            description:
                                'Add support for processing video files in addition to live camera feeds',
                        },
                        {
                            title: '3D Object Estimation',
                            description:
                                'Include support for non-flat object estimation and 3D measurements',
                        },
                        {
                            title: 'PyPi Package',
                            description:
                                'Upload to PyPi as a package for easier installation and distribution',
                        },
                        {
                            title: 'Cloud Integration',
                            description:
                                'Cloud integration for dataset storage and remote processing capabilities',
                        },
                    ]}
                />
            </Section>
        </div>
    );

    const CockpitContent = () => (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-primary-900 mb-3">
                    Cockpit Voice Command System
                </h1>
                <p className="text-xl text-primary-600 leading-relaxed">
                    A real-time voice command system designed to recognize
                    spoken instructions using a trigger word and execute
                    matching commands. Built with FastAPI, Streamlit, Whisper,
                    and Vosk.
                </p>
            </div>

            <Section title="Overview">
                <p className="text-primary-700 leading-relaxed mb-4">
                    The system uses advanced speech recognition to detect
                    trigger words like "system", "computer", or "assistant" and
                    execute corresponding commands through a robust backend
                    architecture.
                </p>
                <InfoCard
                    title="Architecture"
                    description="FastAPI backend handles audio processing and transcription, while Streamlit provides an intuitive frontend interface with real-time WebSocket communication."
                    type="info"
                />
            </Section>

            <Section title="How It Works">
                <p className="text-primary-700 leading-relaxed mb-4">
                    The system continuously monitors audio input for trigger
                    words, processes speech using Whisper for transcription,
                    matches commands using fuzzy logic, and provides audio
                    feedback through text-to-speech synthesis.
                </p>
                <FeatureGrid
                    features={[
                        {
                            title: 'Voice-triggered Detection',
                            description:
                                'Uses Whisper for accurate trigger word recognition',
                        },
                        {
                            title: 'Real-time Speech Recognition',
                            description:
                                'Continuous audio processing with low latency',
                        },
                        {
                            title: 'Text-to-Speech Feedback',
                            description:
                                'Both server-side (pyttsx3) and browser-based synthesis',
                        },
                        {
                            title: 'WebSocket Communication',
                            description:
                                'Real-time data exchange between backend and frontend',
                        },
                        {
                            title: 'Command Matching',
                            description:
                                'Fuzzy logic matching using difflib for command recognition',
                        },
                        {
                            title: 'Fallback Detection',
                            description:
                                'Optional Vosk integration for enhanced reliability',
                        },
                    ]}
                />
            </Section>

            <Section title="Step-by-Step Flow">
                <StepList
                    steps={[
                        {
                            title: 'Audio Capture',
                            description:
                                'System continuously monitors microphone input for speech',
                        },
                        {
                            title: 'Trigger Detection',
                            description:
                                'Whisper processes audio to detect configured trigger words',
                        },
                        {
                            title: 'Command Recognition',
                            description:
                                'Upon trigger detection, system captures and transcribes the full command',
                        },
                        {
                            title: 'Command Matching',
                            description:
                                'Fuzzy matching algorithm compares transcribed text against predefined commands',
                        },
                        {
                            title: 'Command Execution',
                            description:
                                'Matched commands trigger corresponding backend functions',
                        },
                        {
                            title: 'Audio Feedback',
                            description:
                                'System provides voice confirmation and status updates',
                        },
                    ]}
                />
            </Section>

            <Section title="Inputs & Outputs">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Inputs
                        </h3>
                        <Table
                            headers={['Input Type', 'Description']}
                            rows={[
                                [
                                    'Voice Commands',
                                    'Spoken instructions following trigger word detection',
                                ],
                                [
                                    'Configuration File',
                                    'JSON file containing valid commands and their mappings',
                                ],
                                [
                                    'Audio Stream',
                                    'Real-time microphone input for continuous monitoring',
                                ],
                            ]}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Outputs
                        </h3>
                        <Table
                            headers={['Output', 'Description']}
                            rows={[
                                [
                                    'Command Execution',
                                    'Automated execution of matched command functions',
                                ],
                                [
                                    'Audio Feedback',
                                    'Text-to-speech confirmation and status updates',
                                ],
                                [
                                    'WebSocket Messages',
                                    'Real-time communication between frontend and backend',
                                ],
                                [
                                    'Transcription Logs',
                                    'Recorded speech recognition results for debugging',
                                ],
                            ]}
                        />
                    </div>
                </div>
            </Section>

            <Section title="Tech Stack">
                <Table
                    headers={['Component', 'Technology']}
                    rows={[
                        ['Backend Framework', 'FastAPI'],
                        ['Frontend Interface', 'Streamlit'],
                        ['Speech Recognition', 'OpenAI Whisper'],
                        ['Fallback ASR', 'Vosk (optional)'],
                        ['Text-to-Speech', 'pyttsx3, Web Speech API'],
                        ['Communication', 'WebSocket'],
                        ['Command Matching', 'difflib (fuzzy matching)'],
                    ]}
                />
            </Section>

            <Section title="How to Use">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Installation
                        </h3>
                        <CodeBlock>
                            git clone
                            https://github.com/your-username/cockpit-voice-assistant.git
                            cd cockpit-voice-assistant
                        </CodeBlock>

                        <CodeBlock>
                            python -m venv venv source venv/bin/activate # On
                            Windows: venv\Scripts\activate
                        </CodeBlock>

                        <CodeBlock>pip install -r requirements.txt</CodeBlock>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Configuration
                        </h3>
                        <p className="text-primary-700 mb-3">
                            Edit{' '}
                            <code className="bg-primary-100 px-2 py-1 rounded text-sm">
                                utils/commands.json
                            </code>{' '}
                            to define supported commands:
                        </p>
                        <CodeBlock language="json">{`{
  "open landing gear": "gear_down()",
  "turn on lights": "lights_on()",
  "shut engine": "engine_shutdown()"
}`}</CodeBlock>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Running the Application
                        </h3>
                        <StepList
                            steps={[
                                {
                                    title: 'Start Backend Server',
                                    description:
                                        'Run: python backend_server.py (Available at http://localhost:8000)',
                                },
                                {
                                    title: 'Launch Frontend',
                                    description:
                                        'In new terminal: streamlit run streamlit_app.py (Opens at http://localhost:8501)',
                                },
                                {
                                    title: 'Configure Trigger Words',
                                    description:
                                        "Default triggers: 'system', 'computer', 'assistant'",
                                },
                                {
                                    title: 'Test Voice Commands',
                                    description:
                                        'Speak trigger word followed by configured command',
                                },
                            ]}
                        />
                    </div>
                </div>
            </Section>

            <Section title="Limitations">
                <div className="space-y-3">
                    {[
                        'Requires stable microphone access and clear audio input',
                        'Performance depends on ambient noise levels and speaker clarity',
                        'WebSocket connection required between frontend and backend',
                        'PyAudio installation may require additional system dependencies',
                    ].map((limitation, index) => (
                        <InfoCard
                            key={index}
                            title="Constraint"
                            description={limitation}
                            type="warning"
                        />
                    ))}
                </div>
            </Section>

            <Section title="Future Improvements">
                <FeatureGrid
                    features={[
                        {
                            title: 'Action Handlers',
                            description:
                                'Add comprehensive action handlers to execute actual system commands',
                        },
                        {
                            title: 'Multi-language Support',
                            description:
                                'Extend recognition capabilities to multiple languages',
                        },
                        {
                            title: 'Authentication',
                            description:
                                'Implement speaker verification and user authentication',
                        },
                        {
                            title: 'Confidence Scoring',
                            description:
                                'Enhanced confidence scoring for improved fuzzy matching accuracy',
                        },
                        {
                            title: 'Command Learning',
                            description:
                                'Dynamic learning system for new command patterns',
                        },
                        {
                            title: 'Integration APIs',
                            description:
                                'REST APIs for integration with external systems and IoT devices',
                        },
                    ]}
                />
            </Section>
        </div>
    );

    const SnaGenieContent = () => (
        <div>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-primary-900 mb-3">
                    ✈️ Aircraft Snag Rectification System
                </h1>
                <p className="text-xl text-primary-600 leading-relaxed">
                    A real-time intelligent snag rectification system that uses Retrieval-Augmented Generation (RAG) to diagnose and resolve aircraft snags based on historical records. Built using FastAPI, LangChain, and Gemma 2 for LLM-based reasoning.
                </p>
            </div>

            <Section title="🔍 Overview">
                <p className="text-primary-700 leading-relaxed mb-4">
                    This system leverages the power of Gemma 2 LLM, LangChain’s retrieval infrastructure, and a vector store (e.g., FAISS) to identify and suggest rectification strategies for aircraft snags, using both structured and unstructured historical data.
                </p>
            </Section>

            <Section title="🏗️ Architecture">
                <p className="text-primary-700 leading-relaxed mb-4">
                    FastAPI serves as the backend API server for snag ingestion, retrieval, and LLM responses. LangChain integrates with Gemma 2 9B using RAG pipelines to provide relevant, explainable recommendations. FAISS or any supported vector store is used to index historical snag data. MongoDB stores snag logs, recommendations, and rectification metadata.
                </p>
            </Section>

            <Section title="⚙️ How It Works">
                <p className="text-primary-700 leading-relaxed mb-4">
                    User submits a snag description through a REST or frontend form. The snag is embedded using Hugging Face sentence transformers. LangChain retrieves the top k historical cases using FAISS. Context + query is passed to Gemma 2 LLM via a prompt template. The system returns: Likely cause, Step-by-step rectification, Any safety precautions. The output is stored and sent back to the frontend.
                </p>
            </Section>

            <Section title="✈️ Features">
                <FeatureGrid
                    features={[
                        {
                            title: '🧠 LLM-Powered Analysis',
                            description:
                                'Uses Gemma 2 (via Hugging Face) for generating rectification reasoning',
                        },
                        {
                            title: '📚 RAG via LangChain',
                            description:
                                'Top k similar snags retrieved from FAISS vector store. Injected into prompt context for high-accuracy responses',
                        },
                        {
                            title: '🧩 Custom Prompt Templates',
                            description:
                                'Domain-specific prompt crafted for aircraft maintenance and snag resolution',
                        },
                        {
                            title: '📈 Analytics-Ready Storage',
                            description:
                                'Each response includes structured metadata for dashboards',
                        },
                        {
                            title: '📡 REST API Access',
                            description:
                                'FastAPI endpoints for snag submission, resolution, logs, and charts',
                        },
                    ]}
                />
            </Section>

            <Section title="📥 Inputs & 📤 Outputs">
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Inputs
                        </h3>
                        <Table
                            headers={['Input Type', 'Description']}
                            rows={[
                                [
                                    'Snag Query',
                                    'Natural language input describing a snag',
                                ],
                                [
                                    'Historical Data',
                                    'JSONL or CSV files containing past snags',
                                ],
                                [
                                    'Vector Index',
                                    'FAISS index of embedded historical cases',
                                ],
                                [
                                    'Configuration',
                                    'Prompt templates, model choice, and retrieval parameters',
                                ],
                            ]}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            Outputs
                        </h3>
                        <Table
                            headers={['Output Type', 'Description']}
                            rows={[
                                [
                                    'Rectification Plan',
                                    'Suggested steps to resolve the snag',
                                ],
                                [
                                    'Likely Cause',
                                    'Reason behind the snag, inferred by LLM',
                                ],
                                [
                                    'Retrieval Logs',
                                    'List of historical cases retrieved',
                                ],
                                [
                                    'JSON Response',
                                    'Structured API response',
                                ],
                                [
                                    'Dashboard Analytics',
                                    'Breakdown for Radar, Pie, and Bar charts',
                                ],
                            ]}
                        />
                    </div>
                </div>
            </Section>

            <Section title="🧪 Step-by-Step Flow">
                <StepList
                    steps={[
                        {
                            title: 'Snag Submission',
                            description:
                                'User sends POST request to /resolve-snag endpoint with snag description.',
                        },
                        {
                            title: 'Embedding & Retrieval',
                            description:
                                'Snag is embedded and queried against vector DB.',
                        },
                        {
                            title: 'Prompt Construction',
                            description:
                                'Top matches are formatted and inserted into the LLM prompt.',
                        },
                        {
                            title: 'Gemma 2 Inference',
                            description:
                                'LLM generates structured recommendation.',
                        },
                        {
                            title: 'Response & Logging',
                            description:
                                'Output returned as JSON and saved in MongoDB.',
                        },
                    ]}
                />
            </Section>

            <Section title="🧰 Tech Stack">
                <Table
                    headers={['Component', 'Technology']}
                    rows={[
                        ['Backend Framework', 'FastAPI'],
                        ['LLM Inference', 'Gemma 2 (via Hugging Face)'],
                        ['RAG Framework', 'LangChain'],
                        ['Vector Store', 'FAISS'],
                        ['Embeddings', 'SentenceTransformers / HuggingFace'],
                        ['Database', 'MongoDB'],
                        ['API Interaction', 'REST (FastAPI)'],
                    ]}
                />
            </Section>

            <Section title="🚀 How to Use">
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            1. Clone Repository
                        </h3>
                        <CodeBlock>
                            git clone https://github.com/your-username/snag-rectifier
                            cd snag-rectifier
                        </CodeBlock>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            2. Setup Environment
                        </h3>
                        <CodeBlock>
                            python -m venv venv
                            source venv/bin/activate  # Windows: venv\Scripts\activate
                            pip install -r requirements.txt
                        </CodeBlock>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            3. Load Historical Data
                        </h3>
                        <p className="text-primary-700 mb-3">
                            Format your historical snag cases in data/historical_snags.json
                            Run embedding script to build FAISS index:
                        </p>
                        <CodeBlock>
                            python scripts/build_vector_store.py
                        </CodeBlock>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            4. Run FastAPI Server
                        </h3>
                        <CodeBlock>
                            uvicorn app.main:app --reload
                        </CodeBlock>
                        <p className="text-primary-700 mb-3">
                            Server available at: http://localhost:8000/docs
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-medium text-primary-900 mb-4">
                            5. Submit a Snag
                        </h3>
                        <CodeBlock>
                            POST /resolve-snag
                            {`{
  "query": "Snag: hydraulic pressure low in the right gear system"
}`}
                        </CodeBlock>
                    </div>
                </div>
            </Section>

            <Section title="📊 Charts and Dashboard">
                <p className="text-primary-700 leading-relaxed mb-4">
                    /charts/summary: Radar, Pie, and Bar charts (via JSON)
                    /logs: View past snag resolutions
                    Compatible with Streamlit or React dashboards
                </p>
            </Section>

            <Section title="⚠️ Limitations">
                <div className="space-y-3">
                    {[
                        'Gemma 2 may need GPU or quantized version for speed',
                        'Poor embeddings can lead to irrelevant results',
                        'Not supported (text input only)',
                        'Handles one snag at a time',
                    ].map((limitation, index) => (
                        <InfoCard
                            key={index}
                            title="Constraint"
                            description={limitation}
                            type="warning"
                        />
                    ))}
                </div>
            </Section>

            <Section title="📈 Future Improvements">
                <FeatureGrid
                    features={[
                        {
                            title: '✅ Web frontend using Streamlit/React',
                            description: '',
                        },
                        {
                            title: '🔒 Auth & user roles for technicians and engineers',
                            description: '',
                        },
                        {
                            title: '🌐 Multilingual snag handling (Hindi, Spanish)',
                            description: '',
                        },
                        {
                            title: '🧠 Feedback loop with technician input',
                            description: '',
                        },
                        {
                            title: '🧪 Model confidence scoring',
                            description: '',
                        },
                        {
                            title: '🔄 Online learning from user-labeled corrections',
                            description: '',
                        },
                        {
                            title: '🛰️ Integration with aircraft diagnostic APIs (ACMS, CMS)',
                            description: '',
                        },
                    ]}
                />
            </Section>
        </div>
    );

    return (
        <div className="relative min-h-screen bg-primary-50">
            <a
                href="/landing"
                className="absolute top-3 left-8 z-20 p-3 rounded-full hover:bg-gray-200 duration-200"
            >
                <ArrowLeft
                    color="black"
                    className="w-5 h-5 text-primary-600 hover:text-primary-800 transition-colors"
                />
            </a>
            <ProjectSelector />
            <main className="max-w-7xl mx-auto px-6 py-8">
                {activeProject === 'visioncheck' && <VisionCheckContent />}
                {activeProject === 'cockpit' && <CockpitContent />}
                {activeProject === 'snag' && <SnaGenieContent />}
            </main>
        </div>
    );
};

export default DocumentationPage;
