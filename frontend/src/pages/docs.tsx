import React, { useState } from 'react';

interface CodeBlockProps {
    children: React.ReactNode;
    language?: string;
}

interface FeatureCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

interface TableProps {
    headers: string[];
    rows: (string | React.ReactNode)[][];
}

interface Section {
    id: string;
    title: string;
    icon: string;
}

const DocsPage = () => {
    const [activeSection, setActiveSection] = useState('overview');

        const sections: Section[] = [
        { id: 'overview', title: 'Overview', icon: '📌' },
        { id: 'how-it-works', title: 'How It Works', icon: '🧠' },
        { id: 'workflow', title: 'Step-by-Step Flow', icon: '🔁' },
        { id: 'inputs-outputs', title: 'Inputs & Outputs', icon: '🧪' },
        { id: 'tech-stack', title: 'Tech Stack', icon: '🧰' },
        { id: 'setup', title: 'Setup Instructions', icon: '🛠' },
        { id: 'usage', title: 'How to Use', icon: '🚀' },
        { id: 'examples', title: 'Example Applications', icon: '📊' },
        { id: 'limitations', title: 'Limitations', icon: '📍' },
        { id: 'improvements', title: 'Future Improvements', icon: '🔄' },
    ];

    const NavigationSidebar = () => (
        <nav className="fixed left-0 top-0 h-screen w-64 bg-slate-50 border-r border-slate-200 overflow-y-auto z-40">
            <div className="p-6">
                <h1 className="text-2xl font-bold text-slate-900 mb-8">
                    VisionCheck
                </h1>
                <ul className="space-y-2">
                    {sections.map((section) => (
                        <li key={section.id}>
                            <button
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-3 ${
                                    activeSection === section.id
                                        ? 'bg-primary-500 text-white'
                                        : 'text-slate-700 hover:bg-slate-100'
                                }`}
                            >
                                <span className="text-lg">{section.icon}</span>
                                {section.title}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    );

        const CodeBlock = ({ children, language = 'bash' }: CodeBlockProps) => (
        <div className="bg-slate-900 rounded-lg p-4 my-4 overflow-x-auto">
            <pre className="text-sm text-slate-100">
                <code>{children}</code>
            </pre>
        </div>
    );

    const FeatureCard = ({
        icon,
        title,
        description,
    }: FeatureCardProps) => (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="text-2xl mb-3">{icon}</div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
                {description}
            </p>
        </div>
    );

        const Table = ({ headers, rows }: TableProps) => (
        <div className="overflow-x-auto my-6">
            <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
                <thead>
                    <tr className="bg-slate-50">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-3 text-left text-sm font-semibold text-slate-900 border-b border-slate-200"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className="border-b border-slate-100 hover:bg-slate-50"
                        >
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="px-6 py-4 text-sm text-slate-700"
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

    const renderContent = () => {
        switch (activeSection) {
            case 'overview':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">📌</span>
                            Overview
                        </h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                                VisionCheck is a **computer vision tool** built
                                using Python and OpenCV, designed to detect and
                                measure the dimensions of real-world objects in
                                real time using a reference ArUco marker for
                                scale calibration.
                            </p>
                            <div className="bg-blue-50 border-l-4 border-blue-500 p-6 my-6 rounded-r-lg">
                                <p className="text-blue-800">
                                    <strong>Key Features:</strong> Real-time
                                    video capture, shape classification, size
                                    computation, and result exporting with a
                                    user-friendly GUI built in tkinter.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'how-it-works':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🧠</span>
                            How It Works
                        </h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                                The tool leverages **ArUco markers** to
                                calibrate real-world scale and uses
                                contour-based shape detection to identify
                                objects in the camera feed or static images.
                            </p>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-6 my-6">
                                <h3 className="text-lg font-semibold text-green-800 mb-3">
                                    Core Principle
                                </h3>
                                <p className="text-green-700">
                                    By knowing the real-world size of the ArUco
                                    marker, we can calculate the **pixel-to-cm
                                    ratio** and use it to compute the size of
                                    other detected objects.
                                </p>
                            </div>
                        </div>
                    </div>
                );

            case 'workflow':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🔁</span>
                            Step-by-Step Flow
                        </h2>
                        <div className="space-y-6">
                            {[
                                {
                                    step: 1,
                                    title: 'Load Camera / Image',
                                    desc: 'Live webcam feed or a static image can be selected for processing.',
                                },
                                {
                                    step: 2,
                                    title: 'Detect ArUco Marker',
                                    desc: 'The tool detects the ArUco marker in the frame and calculates the scale.',
                                },
                                {
                                    step: 3,
                                    title: 'Find Contours / Shapes',
                                    desc: "Objects are detected using OpenCV's contour detection methods.",
                                },
                                {
                                    step: 4,
                                    title: 'Classify Shapes',
                                    desc: 'Shapes such as rectangles, squares, circles, ellipses, and triangles are identified based on geometric properties.',
                                },
                                {
                                    step: 5,
                                    title: 'Compute Measurements',
                                    desc: 'Dimensions (width, height, perimeter, area) are calculated using the scale from the ArUco marker.',
                                },
                                {
                                    step: 6,
                                    title: 'Display & Export',
                                    desc: 'Detected shapes and measurements are overlaid on the image. Users can export results to CSV or JSON.',
                                },
                            ].map((item) => (
                                <div
                                    key={item.step}
                                    className="flex gap-4 p-4 bg-white rounded-lg border border-slate-200 shadow-sm"
                                >
                                    <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                                        {item.step}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">
                                            {item.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm">
                                            {item.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'inputs-outputs':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🧪</span>
                            Inputs & Outputs
                        </h2>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">✅</span>
                                    Inputs
                                </h3>
                                <Table
                                    headers={['Input Type', 'Description']}
                                    rows={[
                                        [
                                            'Camera Feed',
                                            'Live webcam stream for real-time measurement.',
                                        ],
                                        [
                                            'Static Image',
                                            'PNG, JPG image with an ArUco marker in view.',
                                        ],
                                        [
                                            'ArUco Marker Size',
                                            'Real-world length (in cm) of one side of the marker, input by user.',
                                        ],
                                    ]}
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📤</span>
                                    Outputs
                                </h3>
                                <Table
                                    headers={['Output', 'Description']}
                                    rows={[
                                        [
                                            'Annotated Image',
                                            'Objects outlined with shape name and size labels.',
                                        ],
                                        [
                                            'CSV / JSON File',
                                            'Exported data with shape type, position, and measurements (in cm).',
                                        ],
                                        [
                                            'Statistics',
                                            'Summary of all shapes: count, area, perimeter stats.',
                                        ],
                                        [
                                            'Auto Save',
                                            'CSV data is saved every few seconds (as per user input).',
                                        ],
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'tech-stack':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🧰</span>
                            Tech Stack
                        </h2>
                        <Table
                            headers={['Component', 'Tool/Library Used']}
                            rows={[
                                ['Programming Language', 'Python'],
                                ['Computer Vision', 'OpenCV'],
                                ['GUI', 'Tkinter'],
                                ['Marker Detection', 'OpenCV ArUco Module'],
                                ['Data Export', 'CSV, JSON'],
                                [
                                    'Threading',
                                    'Python threading module (for real-time display)',
                                ],
                            ]}
                        />
                    </div>
                );

            case 'setup':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🛠</span>
                            Setup Instructions
                        </h2>
                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📦</span>
                                    Installation
                                </h3>
                                <p className="text-slate-700 mb-4">
                                    Ensure you have Python 3.7+ installed. Then
                                    install dependencies:
                                </p>
                                <CodeBlock>
                                    pip install opencv-python numpy
                                </CodeBlock>
                                <p className="text-slate-700 mb-2">
                                    If cv2.aruco is missing, install:
                                </p>
                                <CodeBlock>
                                    pip install opencv-contrib-python
                                </CodeBlock>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">📁</span>
                                    Folder Structure
                                </h3>
                                <CodeBlock language="text">{`object_size_tool/
├── main.py            # GUI and main logic
├── output.csv         # (optional) auto-created after detection
├── marker_dict.png    # ArUco marker to print and use
└── README.md`}</CodeBlock>
                            </div>
                        </div>
                    </div>
                );

            case 'usage':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🚀</span>
                            How to Use
                        </h2>
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🔧</span>
                                    GUI Instructions
                                </h3>
                                <div className="space-y-4">
                                    {[
                                        {
                                            title: 'Start the Tool',
                                            desc: 'Run the script:',
                                            code: 'python main.py',
                                        },
                                        {
                                            title: 'Settings Tab',
                                            desc: 'Enter the real-world ArUco marker size (in cm). Set the auto-save interval. Select shape classification options.',
                                        },
                                        {
                                            title: 'Camera Tab',
                                            desc: 'Click Start Camera to begin live capture. Or Load Image to process a static image. Detected objects will be displayed with dimensions.',
                                        },
                                        {
                                            title: 'Data Tab',
                                            desc: 'Export data to CSV or JSON. Generate and view measurement statistics.',
                                        },
                                    ].map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-white p-6 rounded-lg border border-slate-200"
                                        >
                                            <h4 className="font-semibold text-slate-900 mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-slate-600 mb-2">
                                                {item.desc}
                                            </p>
                                            {item.code && (
                                                <CodeBlock>
                                                    {item.code}
                                                </CodeBlock>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                    <span className="text-2xl">🧮</span>
                                    Sample Output (CSV)
                                </h3>
                                <Table
                                    headers={[
                                        'Shape',
                                        'Width (cm)',
                                        'Height (cm)',
                                        'Area (cm²)',
                                        'Perimeter (cm)',
                                    ]}
                                    rows={[
                                        [
                                            'Rectangle',
                                            '2.3',
                                            '5.1',
                                            '11.73',
                                            '14.8',
                                        ],
                                        [
                                            'Circle',
                                            '1.8 (diameter)',
                                            '-',
                                            '2.54',
                                            '5.65',
                                        ],
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                );

            case 'examples':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">📊</span>
                            Example Applications
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <FeatureCard
                                icon="🏭"
                                title="Industrial Applications"
                                description="Industrial part size verification and quality control processes."
                            />
                            <FeatureCard
                                icon="📦"
                                title="Packaging Inspection"
                                description="Real-time packaging inspection and dimensional validation."
                            />
                            <FeatureCard
                                icon="🎓"
                                title="Educational Use"
                                description="Academic and educational demonstrations for computer vision concepts."
                            />
                            <FeatureCard
                                icon="🏠"
                                title="DIY Tools"
                                description="DIY home measurement tools for various household applications."
                            />
                        </div>
                    </div>
                );

            case 'limitations':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">📍</span>
                            Limitations
                        </h2>
                        <div className="space-y-4">
                            {[
                                'Requires clear visibility of ArUco marker.',
                                'Accuracy depends on camera angle and resolution.',
                                'Complex or overlapping shapes may be misclassified.',
                            ].map((limitation, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
                                >
                                    <span className="text-yellow-600 text-lg">
                                        ⚠️
                                    </span>
                                    <p className="text-yellow-800">
                                        {limitation}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            case 'improvements':
                return (
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <span className="text-4xl">🔄</span>
                            Future Improvements
                        </h2>
                        <div className="space-y-4">
                            {[
                                {
                                    icon: '🎥',
                                    title: 'Video File Support',
                                    desc: 'Add support for processing video files in addition to live camera feeds.',
                                },
                                {
                                    icon: '📐',
                                    title: '3D Object Estimation',
                                    desc: 'Include support for non-flat object estimation and 3D measurements.',
                                },
                                {
                                    icon: '📦',
                                    title: 'PyPi Package',
                                    desc: 'Upload to PyPi as a package for easier installation and distribution.',
                                },
                                {
                                    icon: '☁️',
                                    title: 'Cloud Integration',
                                    desc: 'Cloud integration for dataset storage and remote processing capabilities.',
                                },
                            ].map((improvement, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-6 bg-white border border-slate-200 rounded-lg shadow-sm"
                                >
                                    <span className="text-2xl">
                                        {improvement.icon}
                                    </span>
                                    <div>
                                        <h3 className="font-semibold text-slate-900 mb-1">
                                            {improvement.title}
                                        </h3>
                                        <p className="text-slate-600 text-sm">
                                            {improvement.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );

            default:
                return <div>Select a section to view content</div>;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <NavigationSidebar />
            <main className="ml-64 p-8">
                <div className="max-w-4xl mx-auto">{renderContent()}</div>
            </main>
        </div>
    );
};

export default DocsPage;
